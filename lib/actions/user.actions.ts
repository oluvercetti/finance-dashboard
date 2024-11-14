'use server'

import { createAdminClient, createSessionClient } from "@/lib/appwrite"
import { cookies } from "next/headers"
import { ID } from "node-appwrite"
import { parseStringify } from "../utils"

export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();
        const response = await account.createEmailPasswordSession(email, password);
        return parseStringify(response);
    } catch (error) {
        console.log("🚀 ~ signIn ~ error:", error)

    }
}
export const signUp = async (data: SignUpParams) => {
    try {
        const { email, password, firstName, lastName } = data;
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("wbank-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return parseStringify(newUserAccount);
    } catch (error) {
        console.log("🚀 ~ signUp ~ error:", error)

    }
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();
        return parseStringify(user);
    } catch (error) {
        return null;
    }
}

export async function logoutAccount() {
    try {
        const { account } = await createSessionClient();
        await account.deleteSession("current");
        cookies().delete("wbank-session");
    } catch (error) {
        return null;
    }
}
