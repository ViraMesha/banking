"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async () => {
  try {
    // Mutation / Modify database / Make fetch
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
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}
