import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { fetchRandomUsers } from "../utils/api";
import { createLionFromRandomUser } from "../utils/lion";
import { lionFromRow } from "../types/lion";
import type { Lion, LionFormData } from "../types/lion";
import type { LionInsert } from "../types/database";

const STATUS_MESSAGE_RESET_DELAY_MS = 900;

let tempIdCounter = -1;
function generateTempId(): number {
  return tempIdCounter--;
}

interface UseLionsOptions {
  userId?: string;
}

export function useLions(options: UseLionsOptions = {}) {
  const { userId } = options;
  const [lions, setLions] = useState<Lion[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    loadLions();
  }, []);

  async function loadLions(): Promise<void> {
    const { data, error } = await supabase
      .from("lions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load lions:", error);
      return;
    }

    setLions(data.map(lionFromRow));
    setIsInitialLoading(false);
  }

  async function addLion(formData: LionFormData): Promise<void> {
    const skills = formData.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const tempId = generateTempId();
    const optimisticLion: Lion = {
      id: tempId,
      name: formData.name.trim(),
      part: formData.part,
      badge: skills[0] || "",
      introduction: formData.oneLineIntro.trim(),
      imgSrc: `https://picsum.photos/seed/${Date.now()}/200/200`,
      description: formData.description.trim(),
      contacts: {
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        website: formData.website.trim(),
      },
      skills,
      oneWord: formData.oneWord.trim(),
      isMe: false,
      createdBy: userId,
      isPending: true,
    };

    setLions((prev) => [optimisticLion, ...prev]);

    const newLion: LionInsert = {
      name: formData.name.trim(),
      part: formData.part,
      badge: skills[0] || null,
      introduction: formData.oneLineIntro.trim(),
      description: formData.description.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      website: formData.website.trim(),
      skills,
      one_word: formData.oneWord.trim(),
      is_me: false,
      created_by: userId,
    };

    try {
      const { data, error } = await supabase
        .from("lions")
        .insert(newLion)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      setLions((prev) =>
        prev.map((lion) => (lion.id === tempId ? lionFromRow(data) : lion))
      );
    } catch (error) {
      setLions((prev) => prev.filter((lion) => lion.id !== tempId));
      throw error;
    }
  }

  async function removeLion(id: number): Promise<void> {
    const lionToRemove = lions.find((lion) => lion.id === id);
    if (!lionToRemove) return;

    setLions((prev) =>
      prev.map((lion) => (lion.id === id ? { ...lion, isPending: true } : lion))
    );

    try {
      const { error } = await supabase.from("lions").delete().eq("id", id);

      if (error) {
        throw new Error(error.message);
      }

      setLions((prev) => prev.filter((lion) => lion.id !== id));
    } catch (error) {
      setLions((prev) =>
        prev.map((lion) => (lion.id === id ? { ...lion, isPending: false } : lion))
      );
      throw error;
    }
  }

  async function removeLastLion(): Promise<void> {
    const myLions = lions.filter((lion) => lion.createdBy === userId && !lion.isPending);
    if (myLions.length === 0) return;

    const lastLion = myLions[myLions.length - 1];
    await removeLion(lastLion.id);
  }

  async function appendRandomLions(count: number): Promise<void> {
    const users = await fetchRandomUsers(count);

    const optimisticLions: Lion[] = users.map((user) => {
      const lion = createLionFromRandomUser(user, 0);
      return {
        ...lion,
        id: generateTempId(),
        createdBy: userId,
        isPending: true,
      };
    });

    setLions((prev) => [...optimisticLions, ...prev]);

    const newLions: LionInsert[] = users.map((user) => {
      const lion = createLionFromRandomUser(user, 0);
      return {
        name: lion.name,
        part: lion.part,
        badge: lion.badge,
        introduction: lion.introduction,
        description: lion.description,
        email: lion.contacts.email,
        phone: lion.contacts.phone,
        website: lion.contacts.website,
        skills: lion.skills,
        one_word: lion.oneWord,
        is_me: false,
        img_src: lion.imgSrc,
        created_by: userId,
      };
    });

    try {
      const { data, error } = await supabase.from("lions").insert(newLions).select();

      if (error) {
        throw new Error(error.message);
      }

      const tempIds = optimisticLions.map((l) => l.id);
      setLions((prev) => {
        const withoutTemp = prev.filter((lion) => !tempIds.includes(lion.id));
        return [...data.map(lionFromRow), ...withoutTemp];
      });
    } catch (error) {
      const tempIds = optimisticLions.map((l) => l.id);
      setLions((prev) => prev.filter((lion) => !tempIds.includes(lion.id)));
      throw error;
    }
  }

  async function refreshAll(): Promise<void> {
    const myNonMeLions = lions.filter(
      (lion) => lion.createdBy === userId && !lion.isMe && !lion.isPending
    );
    const fetchCount = myNonMeLions.length || 5;

    if (myNonMeLions.length > 0) {
      const ids = myNonMeLions.map((lion) => lion.id);
      const { error: deleteError } = await supabase.from("lions").delete().in("id", ids);
      if (deleteError) {
        throw new Error(deleteError.message);
      }
    }

    const users = await fetchRandomUsers(fetchCount);
    const newLions: LionInsert[] = users.map((user) => {
      const lion = createLionFromRandomUser(user, 0);
      return {
        name: lion.name,
        part: lion.part,
        badge: lion.badge,
        introduction: lion.introduction,
        description: lion.description,
        email: lion.contacts.email,
        phone: lion.contacts.phone,
        website: lion.contacts.website,
        skills: lion.skills,
        one_word: lion.oneWord,
        is_me: false,
        img_src: lion.imgSrc,
        created_by: userId,
      };
    });

    const { data, error } = await supabase.from("lions").insert(newLions).select();

    if (error) {
      throw new Error(error.message);
    }

    const deletedIds = myNonMeLions.map((l) => l.id);
    setLions((prev) => {
      const remaining = prev.filter((lion) => !deletedIds.includes(lion.id));
      return [...data.map(lionFromRow), ...remaining];
    });
  }

  async function getRandomFormData(): Promise<Lion> {
    const users = await fetchRandomUsers(1);
    const user = users[0];
    if (!user) throw new Error("랜덤 유저를 불러오지 못했습니다.");
    return createLionFromRandomUser(user, 0);
  }

  function canDelete(lion: Lion): boolean {
    if (!userId) return false;
    return lion.createdBy === userId;
  }

  function isOwnLion(lion: Lion): boolean {
    if (!userId) return false;
    return lion.createdBy === userId;
  }

  return {
    lions,
    isInitialLoading,
    loadLions,
    addLion,
    removeLion,
    removeLastLion,
    appendRandomLions,
    refreshAll,
    getRandomFormData,
    canDelete,
    isOwnLion,
  };
}

type ActionFn = () => Promise<void>;

export function useFetchStatus() {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("준비 완료");
  const [showRetry, setShowRetry] = useState(false);
  const [lastAction, setLastAction] = useState<ActionFn | null>(null);

  async function runAction(actionFn: ActionFn): Promise<void> {
    setLastAction(() => actionFn);
    setShowRetry(false);
    setIsLoading(true);
    setStatusMessage("불러오는 중...");

    try {
      await actionFn();
      setStatusMessage("완료!");
      setTimeout(() => setStatusMessage("준비 완료"), STATUS_MESSAGE_RESET_DELAY_MS);
    } catch (error) {
      const message = error instanceof Error ? error.message : "알 수 없는 오류";
      setStatusMessage(`실패: ${message}`);
      setShowRetry(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function retry(): void {
    if (lastAction) runAction(lastAction);
  }

  return { isLoading, statusMessage, showRetry, runAction, retry };
}

export function useViewOptions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(() => searchParams.get("q") || "");

  const partFilter = searchParams.get("part") || "ALL";
  const sortOption = searchParams.get("sort") || "latest";

  function updateParam(key: string, value: string, defaultValue: string): void {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value === defaultValue) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      return next;
    });
  }

  function setPartFilter(value: string): void {
    updateParam("part", value, "ALL");
  }

  function setSortOption(value: string): void {
    updateParam("sort", value, "latest");
  }

  function setSearchQuery(value: string): void {
    setSearchInput(value);
    updateParam("q", value, "");
  }

  return {
    partFilter,
    sortOption,
    searchQuery: searchInput,
    setPartFilter,
    setSortOption,
    setSearchQuery,
  };
}
