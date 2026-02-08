const RANDOM_USER_API_URL = "https://randomuser.me/api/";
const SUPPORTED_NATIONALITIES = "us,gb,ca,au,nz";

export async function fetchRandomUsers(count) {
  const url = `${RANDOM_USER_API_URL}?results=${count}&nat=${SUPPORTED_NATIONALITIES}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  return data.results || [];
}
