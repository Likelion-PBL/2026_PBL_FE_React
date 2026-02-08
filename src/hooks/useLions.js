import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { lions as initialLions } from "../data/lions.js";
import { fetchRandomUsers } from "../utils/api.js";
import { createLionFromRandomUser, createLionFromFormData } from "../utils/lion.js";

const STATUS_MESSAGE_RESET_DELAY_MS = 900;

const INITIAL_NEXT_ID = initialLions.reduce((max, lion) => Math.max(max, lion.id), 0) + 1;

export function useLions() {
  const [lions, setLions] = useState(initialLions);
  const [nextId, setNextId] = useState(INITIAL_NEXT_ID);

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


export function useViewOptions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(() => searchParams.get("q") || "");

  const partFilter = searchParams.get("part") || "ALL";
  const sortOption = searchParams.get("sort") || "latest";

  function updateParam(key, value, defaultValue) {
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

  function setPartFilter(value) {
    updateParam("part", value, "ALL");
  }

  function setSortOption(value) {
    updateParam("sort", value, "latest");
  }

  function setSearchQuery(value) {
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
