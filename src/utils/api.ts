import type { RandomUser } from "../types/lion";
import { isRandomUser } from "../types/lion";

const RANDOM_USER_API_URL = "https://randomuser.me/api/";
const SUPPORTED_NATIONALITIES = "us,gb,ca,au,nz";

export async function fetchRandomUsers(count: number): Promise<RandomUser[]> {
  const url = `${RANDOM_USER_API_URL}?results=${count}&nat=${SUPPORTED_NATIONALITIES}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  const results: unknown[] = data.results || [];

  const validatedUsers = results.filter((user): user is RandomUser => {
    const isValid = isRandomUser(user);
    if (!isValid) {
      console.warn("Invalid user data received:", user);
    }
    return isValid;
  });

  return validatedUsers;
}
