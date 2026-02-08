import { useState } from "react";
import { useLions, useFetchStatus, useViewOptions } from "./hooks/useLions.js";
import { filterAndSortLions } from "./utils/lion.js";
import { ControlsSection, MainControls, FetchControls, ViewOptions } from "./components/Controls.jsx";
import LionForm from "./components/LionForm.jsx";
import ProfileCardGrid from "./components/ProfileCardGrid.jsx";
import ProfileDetailList from "./components/ProfileDetailList.jsx";

export default function App() {
  const { lions, isInitialLoading, addLion, removeLion, appendRandomLions, refreshAll, getRandomFormData } =
    useLions();

  const { isLoading, statusMessage, showRetry, runAction, retry } = useFetchStatus();

  const {
    partFilter, sortOption, searchQuery, debouncedSearchQuery, isSearchPending,
    setPartFilter, setSortOption, setSearchQuery,
  } = useViewOptions();

  const [isFormVisible, setIsFormVisible] = useState(false);

  const visibleLions = filterAndSortLions(lions, { partFilter, sortOption, searchQuery: debouncedSearchQuery });

  function handleAddLion(formData) {
    addLion(formData);
    setIsFormVisible(false);
  }

  if (isInitialLoading) {
    return (
      <main className="container">
        <p className="fetch-status" role="status" aria-live="polite">
          명단을 불러오는 중...
        </p>
      </main>
    );
  }

  return (
    <main className="container">
      <ControlsSection>
        <MainControls
          totalCount={lions.length}
          isLoading={isLoading}
          onToggleForm={() => setIsFormVisible((prev) => !prev)}
          onRemoveLion={removeLion}
        />

        <FetchControls
          isLoading={isLoading}
          statusMessage={statusMessage}
          showRetry={showRetry}
          onAppendOne={() => runAction(() => appendRandomLions(1))}
          onAppendFive={() => runAction(() => appendRandomLions(5))}
          onRefreshAll={() => runAction(refreshAll)}
          onRetry={retry}
        />

        <ViewOptions
          partFilter={partFilter}
          sortOption={sortOption}
          searchQuery={searchQuery}
          isSearchPending={isSearchPending}
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

      <ProfileDetailList lions={visibleLions} />
    </main>
  );
}
