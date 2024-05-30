"use server";
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

/**
 * Creates a new session client with the specified endpoint and project.
 * Retrieves the session from cookies and sets it in the client.
 * Throws an error if no session is found.
 * @returns An object with an 'account' property that allows access to the account related functionalities.
 */
export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = cookies().get("appwrite-session");

  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    /**
     * Getter method to retrieve an instance of the Account class.
     * @returns {Account} An instance of the Account class.
     */
    get account() {
      return new Account(client);
    },
  };
}

/**
 * Asynchronously creates an admin client for interacting with the Appwrite API.
 * The client is configured with the endpoint, project ID, and API key from environment variables.
 * @returns An object containing getters for accessing account, database, and user resources.
 */
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    /**
     * Getter for accessing the account resource using the provided client.
     * @returns An Account instance for interacting with account-related operations.
     */
    get account() {
      return new Account(client);
    },
    /**
     * Getter for accessing the database resource using the provided client.
     * @returns A Databases instance for interacting with database-related operations.
     */
    get database() {
      return new Databases(client);
    },
    /**
     * Getter for accessing the user resource using the provided client.
     * @returns A Users instance for interacting with user-related operations.
     */
    get user() {
      return new Users(client);
    },
  };
}
