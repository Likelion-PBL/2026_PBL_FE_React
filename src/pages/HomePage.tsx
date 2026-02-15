import { useState } from "react";
import { Link } from "react-router-dom";
import { useViewOptions } from "../hooks/useLions";
import { filterAndSortLions } from "../utils/lion";
import { ControlsSection, MainControls, FetchControls, ViewOptions } from "../components/Controls";
import LionForm from "../components/LionForm";
import ProfileCardGrid from "../components/ProfileCardGrid";
import type { Lion, LionFormData } from "../types/lion";

interface HomePageProps {
  lions: Lion[];
  isInitialLoading: boolean;
  isLoading: boolean;
  statusMessage: string;
  showRetry: boolean;
  isAuthenticated: boolean;
  addLion: (formData: LionFormData) => Promise<void>;
  removeLion: () => Promise<void>;
  appendRandomLions: (count: number) => Promise<void>;
  refreshAll: () => Promise<void>;
  getRandomFormData: () => Promise<Lion>;
  runAction: (actionFn: () => Promise<void>) => Promise<void>;
  retry: () => void;
}

export default function HomePage({
  lions,
  isInitialLoading,
  isLoading,
  statusMessage,
  showRetry,
  isAuthenticated,
  addLion,
  removeLion,
  appendRandomLions,
  refreshAll,
  getRandomFormData,
  runAction,
  retry,
}: HomePageProps) {
  const { partFilter, sortOption, searchQuery, setPartFilter, setSortOption, setSearchQuery } =
    useViewOptions();

  const [isFormVisible, setIsFormVisible] = useState(false);

  const visibleLions = filterAndSortLions(lions, { partFilter, sortOption, searchQuery });

  async function handleAddLion(formData: LionFormData): Promise<void> {
    await runAction(async () => {
      await addLion(formData);
      setIsFormVisible(false);
    });
  }

  if (isInitialLoading) {
    return <div className="loading-state">명단을 불러오는 중...</div>;
  }

  return (
    <>
      {/* 비로그인 시 안내 메시지 */}
      {!isAuthenticated && (
        <div className="auth-notice">
          <p>
            명단을 수정하려면 <Link to="/login">로그인</Link>이 필요합니다.
          </p>
        </div>
      )}

      <ControlsSection>
        <MainControls
          totalCount={lions.length}
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
          onToggleForm={() => setIsFormVisible((prev) => !prev)}
          onRemoveLion={() => runAction(removeLion)}
        />

        <FetchControls
          isLoading={isLoading}
          statusMessage={statusMessage}
          showRetry={showRetry}
          isAuthenticated={isAuthenticated}
          onAppendOne={() => runAction(() => appendRandomLions(1))}
          onAppendFive={() => runAction(() => appendRandomLions(5))}
          onRefreshAll={() => runAction(refreshAll)}
          onRetry={retry}
        />

        <ViewOptions
          partFilter={partFilter}
          sortOption={sortOption}
          searchQuery={searchQuery}
          onPartFilterChange={setPartFilter}
          onSortChange={setSortOption}
          onSearchChange={setSearchQuery}
        />
      </ControlsSection>

      {isAuthenticated && (
        <LionForm
          isVisible={isFormVisible}
          isLoading={isLoading}
          onSubmit={handleAddLion}
          onCancel={() => setIsFormVisible(false)}
          getRandomFormData={getRandomFormData}
          runAction={runAction}
        />
      )}

      <ProfileCardGrid lions={visibleLions} />
    </>
  );
}
