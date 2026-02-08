import { useState } from "react";
import { useViewOptions } from "../hooks/useLions.js";
import { filterAndSortLions } from "../utils/lion.js";
import { ControlsSection, MainControls, FetchControls, ViewOptions } from "../components/Controls.jsx";
import LionForm from "../components/LionForm.jsx";
import ProfileCardGrid from "../components/ProfileCardGrid.jsx";

export default function HomePage({
  lions,
  isLoading,
  statusMessage,
  showRetry,
  addLion,
  removeLion,
  appendRandomLions,
  refreshAll,
  getRandomFormData,
  runAction,
  retry,
}) {
  const { partFilter, sortOption, searchQuery, setPartFilter, setSortOption, setSearchQuery } =
    useViewOptions();

  const [isFormVisible, setIsFormVisible] = useState(false);

  const visibleLions = filterAndSortLions(lions, { partFilter, sortOption, searchQuery });

  function handleAddLion(formData) {
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
