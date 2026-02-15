import { useState } from "react";
import { useViewOptions } from "../hooks/useLions";
import { filterAndSortLions } from "../utils/lion";
import { ControlsSection, MainControls, FetchControls, ViewOptions } from "../components/Controls";
import LionForm from "../components/LionForm";
import ProfileCardGrid from "../components/ProfileCardGrid";
import type { Lion, LionFormData, FetchStatus } from "../types/lion";

interface HomePageProps {
  lions: Lion[];
  fetchStatus: FetchStatus;
  addLion: (formData: LionFormData) => void;
  removeLion: () => void;
  appendRandomLions: (count: number) => Promise<void>;
  refreshAll: () => Promise<void>;
  getRandomFormData: () => Promise<Lion>;
  runAction: (actionFn: () => Promise<void>) => Promise<void>;
  retry: () => void;
}

export default function HomePage({
  lions,
  fetchStatus,
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

  const isLoading = fetchStatus.status === "loading";

  function handleAddLion(formData: LionFormData): void {
    addLion(formData);
    setIsFormVisible(false);
  }

  return (
    <>
      <ControlsSection>
        <MainControls
          totalCount={lions.length}
          isLoading={isLoading}
          onToggleForm={() => setIsFormVisible((prev) => !prev)}
          onRemoveLion={removeLion}
        />

        <FetchControls
          fetchStatus={fetchStatus}
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

      <LionForm
        isVisible={isFormVisible}
        isLoading={isLoading}
        onSubmit={handleAddLion}
        onCancel={() => setIsFormVisible(false)}
        getRandomFormData={getRandomFormData}
        runAction={runAction}
      />

      <ProfileCardGrid lions={visibleLions} />
    </>
  );
}
