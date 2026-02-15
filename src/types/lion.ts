export interface Contacts {
  email: string;
  phone: string;
  website: string;
}

export interface Lion {
  id: number;
  name: string;
  part: Part;
  badge: string;
  introduction: string;
  imgSrc: string;
  description: string;
  contacts: Contacts;
  skills: string[];
  oneWord: string;
  isMe: boolean;
}

export type Part = "Frontend" | "Backend" | "Design";

export interface LionFormData {
  name: string;
  part: Part;
  skills: string;
  oneLineIntro: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  oneWord: string;
}

export interface RandomUser {
  name: {
    first: string;
    last: string;
  };
  login: {
    uuid: string;
    username: string;
  };
  location: {
    city: string;
    country: string;
  };
  email: string;
  phone: string;
  picture: {
    large: string;
  };
}

export interface ViewOptionsState {
  partFilter: string;
  sortOption: string;
  searchQuery: string;
}

// 보너스 2: 비동기 상태를 위한 Discriminated Union 타입
export type FetchStatus =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success" }
  | { status: "error"; error: string };

export function isContacts(data: unknown): data is Contacts {
  if (typeof data !== "object" || data === null) return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.email === "string" &&
    typeof obj.phone === "string" &&
    typeof obj.website === "string"
  );
}

export function isLion(data: unknown): data is Lion {
  if (typeof data !== "object" || data === null) return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.part === "string" &&
    ["Frontend", "Backend", "Design"].includes(obj.part as string) &&
    typeof obj.badge === "string" &&
    typeof obj.introduction === "string" &&
    typeof obj.imgSrc === "string" &&
    typeof obj.description === "string" &&
    isContacts(obj.contacts) &&
    Array.isArray(obj.skills) &&
    obj.skills.every((s) => typeof s === "string") &&
    typeof obj.oneWord === "string" &&
    typeof obj.isMe === "boolean"
  );
}

export function isRandomUser(data: unknown): data is RandomUser {
  if (typeof data !== "object" || data === null) return false;
  const obj = data as Record<string, unknown>;

  const hasName =
    typeof obj.name === "object" &&
    obj.name !== null &&
    typeof (obj.name as Record<string, unknown>).first === "string" &&
    typeof (obj.name as Record<string, unknown>).last === "string";

  const hasLogin =
    typeof obj.login === "object" &&
    obj.login !== null &&
    typeof (obj.login as Record<string, unknown>).uuid === "string" &&
    typeof (obj.login as Record<string, unknown>).username === "string";

  const hasLocation =
    typeof obj.location === "object" &&
    obj.location !== null &&
    typeof (obj.location as Record<string, unknown>).city === "string" &&
    typeof (obj.location as Record<string, unknown>).country === "string";

  const hasPicture =
    typeof obj.picture === "object" &&
    obj.picture !== null &&
    typeof (obj.picture as Record<string, unknown>).large === "string";

  return (
    hasName &&
    hasLogin &&
    hasLocation &&
    hasPicture &&
    typeof obj.email === "string" &&
    typeof obj.phone === "string"
  );
}
