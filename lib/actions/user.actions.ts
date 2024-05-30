"use server";

import { createSessionClient } from "../appwrite";

export const signIn = async () => {
  try {
    // Mutation / Modify database / Make fetch
  } catch (error) {
    console.error("Error", error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  try {
    // Create a user account
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
    return await account.get();
  } catch (error) {
    return null;
  }
}
