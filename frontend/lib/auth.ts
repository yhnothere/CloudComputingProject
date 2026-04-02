import { Amplify } from "aws-amplify";
import { AuthUser } from "aws-amplify/auth";

export function configureAmplify() {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
        userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      },
    },
  });
}

import {
  signUp, signIn, signOut,
  confirmSignUp, getCurrentUser,
  fetchAuthSession, updateUserAttributes,
  fetchUserAttributes,
} from "aws-amplify/auth";

export async function registerUser(email: string, password: string) {
  return signUp({
    username: email,
    password,
    options: { userAttributes: { email } },
  });
}

export async function confirmUser(email: string, code: string) {
  return confirmSignUp({ username: email, confirmationCode: code });
}

export async function loginUser(email: string, password: string) {
  return signIn({ username: email, password });
}

export async function logoutUser() {
  return signOut();
}

export async function getUser(): Promise<AuthUser | null> {
  try {
    return await getCurrentUser();
  } catch {
    return null;
  }
}

export async function getUserAttributes() {
  try { return await fetchUserAttributes(); } // includes name, email, sub
  catch { return null; }
}

export async function updateDisplayName(name: string) {
  return updateUserAttributes({ userAttributes: { name } });
}

export async function getToken() {
  try {
    const session = await fetchAuthSession();
    return session.tokens?.idToken?.toString() ?? null;
  } catch {
    return null;
  }
}