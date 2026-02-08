import { Routes, Route } from "react-router-dom";
import { useLions, useFetchStatus } from "./hooks/useLions.js";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import LionDetailPage from "./pages/LionDetailPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  const { lions, addLion, removeLion, appendRandomLions, refreshAll, getRandomFormData } =
    useLions();

  const { isLoading, statusMessage, showRetry, runAction, retry } = useFetchStatus();

  return (
    <main className="container">
      <Routes>
        <Route element={<Layout totalCount={lions.length} />}>
          <Route
            index
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
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </main>
  );
}
