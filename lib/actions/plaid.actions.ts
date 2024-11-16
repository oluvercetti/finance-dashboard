'use server';
import { encryptId, parseStringify } from "../utils"
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid"
import { plaidClient } from "../plaid"
import { revalidatePath } from "next/cache";
import { createAdminClient } from "../appwrite";
import { ID, Query } from "node-appwrite";
import { addFundingSource } from "./dwolla.actions";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const createLinkToken = async (user: User) => {
    try {
        const tokenParams = {
            user: {
                client_user_id: user.$id,
            },
            client_name: `${user.firstName} ${user.lastName}`,
            products: ["auth", "transactions"] as Products[],
            language: "en",
            country_codes: ["US"] as CountryCode[],
        }

        const response = await plaidClient.linkTokenCreate(tokenParams);
        return parseStringify({ linkToken: response?.data?.link_token });
    }
    catch (error) {

    }
}

export const createBankAccount = async ({ userId, bankId, accountId, accessToken, fundingSourceUrl, sharableId }: createBankAccountProps) => {
    try {
        const { database } = await createAdminClient();

        const bankAccount = await database.createDocument(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            ID.unique(),
            {
                userId,
                bankId,
                accountId,
                accessToken,
                fundingSourceUrl,
                sharableId,
            });

        return parseStringify(bankAccount);
    } catch (error) {
    }
}

export const exchangePublicToken = async ({ publicToken, user }: exchangePublicTokenProps) => {
    try {
        // Exchange public token for access token and item ID
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken,
        });

        const accessToken = response?.data?.access_token;
        const itemId = response?.data?.item_id;

        // Get account info from Plaid using the access token
        const accountsResponse = await plaidClient.accountsGet({
            access_token: accessToken,
        });

        const accountData = accountsResponse?.data?.accounts[0];

        // Create a processor token for Dwolla using the access token and account ID
        const request: ProcessorTokenCreateRequest = {
            access_token: accessToken,
            account_id: accountData?.account_id,
            processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
        };

        const processorTokenResponse = await plaidClient.processorTokenCreate(request);
        const processorToken = processorTokenResponse?.data?.processor_token;

        // Add funding source to Dwolla
        const fundingSourceUrl = await addFundingSource({
            dwollaCustomerId: user.dwollaCustomerId,
            processorToken,
            bankName: accountData?.name,
        })

        if (!fundingSourceUrl) throw Error;

        await createBankAccount({
            userId: user.$id,
            bankId: itemId,
            accountId: accountData?.account_id,
            accessToken,
            fundingSourceUrl,
            sharableId: encryptId(accountData?.account_id),
        })

        revalidatePath("/");

        return parseStringify({
            publicTokenExchange: "complete",
        })
    } catch (error) {

    }
}

export const getBanks = async ({ userId }: getBanksProps) => {
    try {
        const { database } = await createAdminClient();

        const banks = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            [Query.equal("userId", [userId])]
        );

        return parseStringify(banks.documents);
    } catch (error) {
        
    }
}

export const getBank = async ({ documentId }: getBankProps) => {
    try {
        const { database } = await createAdminClient();

        const bank = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            [Query.equal("$id", [documentId])]
        );

        return parseStringify(bank.documents[0]);
    } catch (error) {
    }
}

export const getBankByAccountId = async ({ accountId }: getBankByAccountIdProps) => {
    try {
        const { database } = await createAdminClient();

        const bank = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            [Query.equal("accountId", [accountId])]
        );

        if(bank.total !== 1) return null;

        return parseStringify(bank.documents[0]);
    } catch (error) {
    }
}