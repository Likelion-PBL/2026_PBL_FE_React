import type { LionRow } from "./database";

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
  createdAt?: string;
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

// 데이터베이스 Row를 앱에서 사용하는 Lion 타입으로 변환
export function lionFromRow(row: LionRow): Lion {
  return {
    id: row.id,
    name: row.name,
    part: row.part as Part,
    badge: row.badge || "",
    introduction: row.introduction || "",
    imgSrc: row.img_src || `https://picsum.photos/seed/${row.id}/200/200`,
    description: row.description || "",
    contacts: {
      email: row.email || "",
      phone: row.phone || "",
      website: row.website || "",
    },
    skills: row.skills || [],
    oneWord: row.one_word || "",
    isMe: row.is_me,
    createdAt: row.created_at || undefined,
  };
}
