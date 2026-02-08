const SKILLS_BY_PART = {
  Backend: ["Node.js", "Spring", "Database"],
  Design: ["Figma", "Typography", "Design System"],
  Frontend: ["JavaScript", "React", "HTML/CSS"],
};

const PARTS = ["Frontend", "Backend", "Design"];

export function parseSkills(input) {
  return String(input || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function pickPart(seedStr) {
  const seed = String(seedStr || "");
  let sum = 0;
  for (let i = 0; i < seed.length; i++) {
    sum += seed.charCodeAt(i);
  }
  return PARTS[sum % PARTS.length];
}

function getSkillsByPart(part) {
  return SKILLS_BY_PART[part] || SKILLS_BY_PART.Frontend;
}

export function createLionFromRandomUser(user, id) {
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
      "6주차 미션에서 useState와 useEffect로 상태를 관리하는 연습을 하고 있습니다.",
      "React의 상태가 변하면 UI가 자동으로 다시 렌더링되는 흐름을 이해하려고 합니다.",
      '목표는 "상태가 UI를 만든다"는 React의 핵심 원리를 체득하는 것입니다.',
    ].join(" "),
    oneWord: "상태가 바뀌면 UI도 바뀐다!",
    imgSrc: user?.picture?.large || `https://picsum.photos/seed/${id}/200/200`,
    isMe: false,
    contacts: {
      email: user?.email || "",
      phone: user?.phone || "",
      website: `https://example.com/${user?.login?.username || `lion${id}`}`,
    },
  };
}

export function createLionFromFormData(formData, id) {
  const skills = parseSkills(formData.skills);

  return {
    id,
    name: formData.name.trim(),
    part: formData.part,
    badge: skills[0],
    skills,
    introduction: formData.oneLineIntro.trim(),
    description: formData.description.trim(),
    oneWord: formData.oneWord.trim(),
    imgSrc: `https://picsum.photos/seed/${id}/200/200`,
    isMe: false,
    contacts: {
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      website: formData.website.trim(),
    },
  };
}

export function filterAndSortLions(lions, { partFilter, sortOption, searchQuery }) {
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
    result.sort((a, b) => b.id - a.id);
  }

  return result;
}
