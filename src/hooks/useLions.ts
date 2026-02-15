import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { fetchRandomUsers } from "../utils/api";
import { createLionFromRandomUser } from "../utils/lion";
import { lionFromRow } from "../types/lion";
import type { Lion, LionFormData } from "../types/lion";
import type { LionInsert } from "../types/database";

const STATUS_MESSAGE_RESET_DELAY_MS = 900;

export function useLions() {
  const [lions, setLions] = useState<Lion[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // 최초 데이터 로드
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
    };

    const { data, error } = await supabase
      .from("lions")
      .insert(newLion)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    setLions((prev) => [lionFromRow(data), ...prev]);
  }

  async function removeLion(id: number): Promise<void> {
    const { error } = await supabase.from("lions").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    setLions((prev) => prev.filter((lion) => lion.id !== id));
  }

  async function removeLastLion(): Promise<void> {
    if (lions.length === 0) return;

    const lastLion = lions[lions.length - 1];
    await removeLion(lastLion.id);
  }

  async function appendRandomLions(count: number): Promise<void> {
    const users = await fetchRandomUsers(count);

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
      };
    });

    const { data, error } = await supabase.from("lions").insert(newLions).select();

    if (error) {
      throw new Error(error.message);
    }

    setLions((prev) => [...data.map(lionFromRow), ...prev]);
  }

  async function refreshAll(): Promise<void> {
    // 기존 데이터 중 is_me가 아닌 것들의 수만큼 새로 불러오기
    const nonMeLions = lions.filter((lion) => !lion.isMe);
    const fetchCount = nonMeLions.length || 5; // 최소 5명

    // 기존 non-me 삭제
    if (nonMeLions.length > 0) {
      const ids = nonMeLions.map((lion) => lion.id);
      const { error: deleteError } = await supabase.from("lions").delete().in("id", ids);
      if (deleteError) {
        throw new Error(deleteError.message);
      }
    }

    // 새 데이터 추가
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
      };
    });

    const { data, error } = await supabase.from("lions").insert(newLions).select();

    if (error) {
      throw new Error(error.message);
    }

    const meLions = lions.filter((lion) => lion.isMe);
    setLions([...data.map(lionFromRow), ...meLions]);
  }

  async function getRandomFormData(): Promise<Lion> {
    const users = await fetchRandomUsers(1);
    const user = users[0];
    if (!user) throw new Error("랜덤 유저를 불러오지 못했습니다.");
    return createLionFromRandomUser(user, 0);
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
