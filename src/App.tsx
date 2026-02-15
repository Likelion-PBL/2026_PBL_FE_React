import { Routes, Route } from "react-router-dom";
import { useLions, useFetchStatus } from "./hooks/useLions";
import HomePage from "./pages/HomePage";
import LionDetailPage from "./pages/LionDetailPage";

export default function App() {
  const { lions, addLion, removeLion, appendRandomLions, refreshAll, getRandomFormData } =
    useLions();

  const { isLoading, statusMessage, showRetry, runAction, retry } = useFetchStatus();

  return (
    <main className="container">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              lions={lions}
              isLoading={isLoading}
              statusMessage={statusMessage}
              showRetry={showRetry}
              addLion={addLion}
              removeLion={removeLion}
              appendRandomLions={appendRandomLions}
              refreshAll={refreshAll}
              getRandomFormData={getRandomFormData}
              runAction={runAction}
              retry={retry}
            />
          }
        />
        <Route
          path="/lions/:id"
          element={<LionDetailPage lions={lions} />}
        />
      </Routes>
    </main>
  );
}
