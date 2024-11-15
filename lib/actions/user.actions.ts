'use server'

import { createAdminClient, createSessionClient } from "@/lib/appwrite"
import { cookies } from "next/headers"
import { ID, Query } from "node-appwrite"
import { extractCustomerIdFromUrl, parseStringify } from "../utils"
import { createDwollaCustomer } from "./dwolla.actions"
const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
    try {
        const { database } = await createAdminClient();
        const user = await database.listDocuments(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            [Query.equal("userId", userId)]
        );
        return parseStringify(user.documents[0]);
    } catch (error) {
        throw error;
    }
}

export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("wbank-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        const user = await getUserInfo({ userId: session.userId });

        return parseStringify(user);
    } catch (error) {
        throw error;

    }
}
export const signUp = async ({ password, ...userData }: SignUpParams) => {
    let newUserAccount;

    try {
        const { email, firstName, lastName } = userData;
        const { account, database } = await createAdminClient();

        newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);

        if (!newUserAccount) throw new Error("Account creation failed");

        const dwollaCustomerUrl = await createDwollaCustomer({
            ...userData,
            type: "personal",
        });

        if (!dwollaCustomerUrl) throw new Error("Dwolla customer creation failed");

        const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

        const newUser = await database.createDocument(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            ID.unique(), {
            ...userData,
            userId: newUserAccount.$id,
            dwollaCustomerId,
            dwollaCustomerUrl

        }
        )
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("wbank-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUser);
    } catch (error) {
        throw error;
    }
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const result = await account.get();

        const user = await getUserInfo({ userId: result.$id });
        return parseStringify(user);
    } catch (error) {
        throw error;
    }
}

export async function logoutAccount() {
    try {
        const { account } = await createSessionClient();
        await account.deleteSession("current");
        cookies().delete("wbank-session");
        return true;
    } catch (error) {
        throw error;
    }
}
