import { useState, useEffect } from "react";
import { lions as initialLions } from "../data/lions.js";
import { fetchRandomUsers } from "../utils/api.js";
import { createLionFromRandomUser, createLionFromFormData } from "../utils/lion.js";

const STATUS_MESSAGE_RESET_DELAY_MS = 900;

const INITIAL_ME = initialLions.find((lion) => lion.isMe) || null;
const INITIAL_FETCH_COUNT = initialLions.length - (INITIAL_ME ? 1 : 0);
const INITIAL_NEXT_ID = initialLions.reduce((max, lion) => Math.max(max, lion.id), 0) + 1;

const STORAGE_KEY_LIONS = "lions";
const STORAGE_KEY_NEXT_ID = "lions_nextId";

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_LIONS);
    const storedNextId = localStorage.getItem(STORAGE_KEY_NEXT_ID);
    if (stored) {
      return {
        lions: JSON.parse(stored),
        nextId: storedNextId ? Number(storedNextId) : INITIAL_NEXT_ID,
      };
    }
  } catch (error) {
    console.error("localStorage 복원 실패:", error);
  }
  return null;
}

export function useLions() {
  const saved = loadFromStorage();
  const hasSavedData = saved !== null;

  const [lions, setLions] = useState(
    hasSavedData ? saved.lions : (INITIAL_ME ? [INITIAL_ME] : [])
  );
  const [nextId, setNextId] = useState(
    hasSavedData ? saved.nextId : INITIAL_NEXT_ID
  );
  const [isInitialLoading, setIsInitialLoading] = useState(!hasSavedData);

  useEffect(() => {
    if (hasSavedData) return;

    let cancelled = false;

    async function loadInitialLions() {
      try {
        const users = await fetchRandomUsers(INITIAL_FETCH_COUNT);
        if (cancelled) return;

        const fetched = users.map((user, index) =>
          createLionFromRandomUser(user, INITIAL_NEXT_ID + index)
        );

        setLions(INITIAL_ME ? [INITIAL_ME, ...fetched] : fetched);
        setNextId(INITIAL_NEXT_ID + fetched.length);
      } catch (error) {
        console.error("초기 데이터 로드 실패:", error);
        if (cancelled) return;
        setLions(initialLions);
      } finally {
        if (!cancelled) setIsInitialLoading(false);
      }
    }

    loadInitialLions();

    return () => {
      cancelled = true;
    };
  }, [hasSavedData]);

  useEffect(() => {
    if (isInitialLoading) return;

    localStorage.setItem(STORAGE_KEY_LIONS, JSON.stringify(lions));
    localStorage.setItem(STORAGE_KEY_NEXT_ID, String(nextId));
  }, [lions, nextId, isInitialLoading]);

  function addLion(formData) {
    const newLion = createLionFromFormData(formData, nextId);
    setLions((prev) => [...prev, newLion]);
    setNextId((prev) => prev + 1);
  }

  function removeLion() {
    if (lions.length === 0) return;
    setLions((prev) => prev.slice(0, -1));
  }

  async function appendRandomLions(count) {
    const users = await fetchRandomUsers(count);
    const newLions = users.map((user, index) =>
      createLionFromRandomUser(user, nextId + index)
    );
    setLions((prev) => [...prev, ...newLions]);
    setNextId((prev) => prev + users.length);
  }

  async function refreshAll() {
    const me = lions.find((lion) => lion.isMe);
    const fetchCount = me ? Math.max(0, lions.length - 1) : lions.length;

    if (fetchCount === 0) return;

    const users = await fetchRandomUsers(fetchCount);
    const newLions = users.map((user, index) =>
      createLionFromRandomUser(user, nextId + index)
    );

    setLions(me ? [me, ...newLions] : newLions);
    setNextId((prev) => prev + fetchCount);
  }

  async function getRandomFormData() {
    const users = await fetchRandomUsers(1);
    const user = users[0];
    if (!user) throw new Error("랜덤 유저를 불러오지 못했습니다.");
    return createLionFromRandomUser(user, nextId);
  }

  return {
    lions,
    isInitialLoading,
    addLion,
    removeLion,
    appendRandomLions,
    refreshAll,
    getRandomFormData,
  };
}

export function useFetchStatus() {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("준비 완료");
  const [showRetry, setShowRetry] = useState(false);
  const [lastAction, setLastAction] = useState(null);

  async function runAction(actionFn) {
    setLastAction(() => actionFn);
    setShowRetry(false);
    setIsLoading(true);
    setStatusMessage("불러오는 중...");

    try {
      await actionFn();
      setStatusMessage("완료!");
      setTimeout(() => setStatusMessage("준비 완료"), STATUS_MESSAGE_RESET_DELAY_MS);
    } catch (error) {
      setStatusMessage(`실패: ${error?.message || "알 수 없는 오류"}`);
      setShowRetry(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function retry() {
    if (lastAction) runAction(lastAction);
  }

  return { isLoading, statusMessage, showRetry, runAction, retry };
}


const SEARCH_DEBOUNCE_DELAY_MS = 300;

export function useViewOptions() {
  const [partFilter, setPartFilter] = useState("ALL");
  const [sortOption, setSortOption] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, SEARCH_DEBOUNCE_DELAY_MS);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const isSearchPending = searchQuery !== debouncedSearchQuery;

  return {
    partFilter,
    sortOption,
    searchQuery,
    debouncedSearchQuery,
    isSearchPending,
    setPartFilter,
    setSortOption,
    setSearchQuery,
  };
}
