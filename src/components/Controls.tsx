import type { ReactNode, ChangeEvent } from "react";
import type { FetchStatus } from "../types/lion";

interface ControlsSectionProps {
  children: ReactNode;
}

export function ControlsSection({ children }: ControlsSectionProps) {
  return (
    <section className="controls" aria-label="명단 조작">
      {children}
    </section>
  );
}

interface MainControlsProps {
  totalCount: number;
  isLoading: boolean;
  onToggleForm: () => void;
  onRemoveLion: () => void;
}

export function MainControls({
  totalCount,
  isLoading,
  onToggleForm,
  onRemoveLion,
}: MainControlsProps) {
  return (
    <div className="controls-row">
      <button
        type="button"
        className="control-btn"
        onClick={onToggleForm}
        disabled={isLoading}
      >
        아기 사자 추가
      </button>
      <button
        type="button"
        className="control-btn"
        onClick={onRemoveLion}
        disabled={isLoading}
      >
        마지막 아기 사자 삭제
      </button>
      <p className="lion-count">총 {totalCount}명</p>
    </div>
  );
}

interface FetchControlsProps {
  fetchStatus: FetchStatus;
  onAppendOne: () => void;
  onAppendFive: () => void;
  onRefreshAll: () => void;
  onRetry: () => void;
}

export function FetchControls({
  fetchStatus,
  onAppendOne,
  onAppendFive,
  onRefreshAll,
  onRetry,
}: FetchControlsProps) {
  // discriminated union 패턴: status에 따라 타입이 자동으로 좁혀짐
  const isLoading = fetchStatus.status === "loading";

  function getStatusMessage(): string {
    switch (fetchStatus.status) {
      case "idle":
        return "준비 완료";
      case "loading":
        return "불러오는 중...";
      case "success":
        return "완료!";
      case "error":
        return `실패: ${fetchStatus.error}`;
    }
  }

  return (
    <div className="controls-row controls-row--secondary" aria-label="외부 데이터 불러오기">
      <button type="button" className="control-btn" onClick={onAppendOne} disabled={isLoading}>
        랜덤 1명 추가
      </button>
      <button type="button" className="control-btn" onClick={onAppendFive} disabled={isLoading}>
        랜덤 5명 추가
      </button>
      <button type="button" className="control-btn" onClick={onRefreshAll} disabled={isLoading}>
        전체 새로고침
      </button>

      <p className="fetch-status" role="status" aria-live="polite">
        {getStatusMessage()}
      </p>

      {fetchStatus.status === "error" && (
        <button
          type="button"
          className="control-btn retry-btn"
          onClick={onRetry}
          disabled={isLoading}
        >
          재시도
        </button>
      )}
    </div>
  );
}

interface ViewOptionsProps {
  partFilter: string;
  sortOption: string;
  searchQuery: string;
  onPartFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

export function ViewOptions({
  partFilter,
  sortOption,
  searchQuery,
  onPartFilterChange,
  onSortChange,
  onSearchChange,
}: ViewOptionsProps) {
  return (
    <div className="controls-row controls-row--secondary" aria-label="보기 옵션">
      <label className="control-label" htmlFor="partFilter">
        파트
      </label>
      <select
        className="control-input"
        id="partFilter"
        value={partFilter}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onPartFilterChange(e.target.value)}
      >
        <option value="ALL">전체</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Design">Design</option>
      </select>

      <label className="control-label" htmlFor="sortSelect">
        정렬
      </label>
      <select
        className="control-input"
        id="sortSelect"
        value={sortOption}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onSortChange(e.target.value)}
      >
        <option value="latest">최신추가순</option>
        <option value="name">이름순</option>
      </select>

      <label className="control-label" htmlFor="nameSearch">
        검색
      </label>
      <input
        className="control-input"
        id="nameSearch"
        type="search"
        placeholder="이름으로 검색"
        autoComplete="off"
        value={searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
