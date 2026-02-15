import type { Lion, Part, RandomUser, ViewOptionsState } from "../types/lion";

const SKILLS_BY_PART: Record<Part, string[]> = {
  Backend: ["Node.js", "Spring", "Database"],
  Design: ["Figma", "Typography", "Design System"],
  Frontend: ["JavaScript", "React", "HTML/CSS"],
};

const PARTS: Part[] = ["Frontend", "Backend", "Design"];

export function parseSkills(input: string | undefined): string[] {
  return String(input || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function pickPart(seedStr: string | undefined): Part {
  const seed = String(seedStr || "");
  let sum = 0;
  for (let i = 0; i < seed.length; i++) {
    sum += seed.charCodeAt(i);
  }
  return PARTS[sum % PARTS.length];
}

function getSkillsByPart(part: Part): string[] {
  return SKILLS_BY_PART[part] || SKILLS_BY_PART.Frontend;
}

export function createLionFromRandomUser(user: RandomUser, id: number): Lion {
  const name = `${user?.name?.first || "Baby"} ${user?.name?.last || "Lion"}`;
  const part = pickPart(user?.login?.uuid || String(id));
  const skills = getSkillsByPart(part);

  const city = user?.location?.city || "어딘가";
  const country = user?.location?.country || "지구";

  return {
    id,
    name,
    part,
    badge: skills[0],
    skills,
    introduction: `${part} · ${country} ${city}에서 합류했어요!`,
    description: [
      "Supabase와 연동하여 데이터를 저장하고 불러오는 연습을 하고 있습니다.",
      "클라우드 데이터베이스를 활용해 영구적인 데이터 관리를 경험하고 있습니다.",
      "BaaS를 통해 별도의 백엔드 없이 풀스택 개발을 체험하는 것이 목표입니다.",
    ].join(" "),
    oneWord: "클라우드 DB로 데이터를 영구 저장!",
    imgSrc: user?.picture?.large || `https://picsum.photos/seed/${id}/200/200`,
    isMe: false,
    contacts: {
      email: user?.email || "",
      phone: user?.phone || "",
      website: `https://example.com/${user?.login?.username || `lion${id}`}`,
    },
    createdAt: new Date().toISOString(),
  };
}

export function filterAndSortLions(
  lions: Lion[],
  { partFilter, sortOption, searchQuery }: ViewOptionsState
): Lion[] {
  let result = [...lions];

  if (partFilter !== "ALL") {
    result = result.filter((lion) => lion.part === partFilter);
  }

  const query = searchQuery.trim().toLowerCase();
  if (query) {
    result = result.filter((lion) => lion.name.toLowerCase().includes(query));
  }

  if (sortOption === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // 최신순: createdAt 또는 id 기준
    result.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return b.id - a.id;
    });
  }

  return result;
}
