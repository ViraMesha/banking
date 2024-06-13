"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";
import { CountryCode, Products } from "plaid";
import { plaidClient } from "../plaid";

/**
 * Signs in a user with the provided email and password.
 * @param {SignInProps} email - The email of the user.
 * @param {SignInProps} password - The password of the user.
 * @returns {Promise<string>} A promise that resolves to a response string after signing in.
 */
export const signIn = async ({ email, password }: SignInProps) => {
  try {
    const { account } = await createSessionClient();
    const response = await account.createEmailPasswordSession(email, password);
    console.log("Response in Sign In", response);

    return parseStringify(response);
  } catch (error) {
    console.error("Error", error);
  }
};

/**
 * Creates a new user account with the provided user data.
 * @param userData - An object containing user data including email, password, first name, and last name.
 * @returns A parsed stringified version of the newly created user account.
 */
export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;
  const name = `${firstName} ${lastName}`;
  try {
    // Create a user account
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    );
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("Error", error);
  }
};

/**
 * Asynchronously retrieves the logged-in user's account information.
 * This function first creates a session client and then fetches the account details.
 * @returns {Promise<Object|null>} A promise that resolves with the account information if successful, or null if an error occurs.
 */
export const getLoggedInUser = async () => {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    console.error("Failed to get logged-in user:", error);
    return null;
  }
};

export const logOutAccount = async () => {
  try {
    const { account } = await createSessionClient();
    cookies().delete("appwrite-session");
    await account.deleteSession("current");
  } catch (error) {
    console.error("Failed to log out", error);
    return null;
  }
};

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: user.name,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);
    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    console.error("Failed to create link token", error);
    console.error(error);
  }
};
