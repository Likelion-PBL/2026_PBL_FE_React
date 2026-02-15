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
