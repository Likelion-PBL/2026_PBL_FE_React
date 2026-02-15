import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { useLions, useFetchStatus } from "./hooks/useLions";
import HomePage from "./pages/HomePage";
import LionDetailPage from "./pages/LionDetailPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  const { user, isLoading: isAuthLoading, isAuthenticated, signIn, signUp, signOut } = useAuth();
  const {
    lions,
    isInitialLoading,
    addLion,
    removeLion,
    removeLastLion,
    appendRandomLions,
    refreshAll,
    getRandomFormData,
    canDelete,
    isOwnLion,
  } = useLions({ userId: user?.id });
  const { isLoading, statusMessage, showRetry, runAction, retry } = useFetchStatus();

  if (isAuthLoading) {
    return (
      <main className="container">
        <div className="loading-state">인증 상태 확인 중...</div>
      </main>
    );
  }

  return (
    <main className="container">
      {isAuthenticated && (
        <header className="app-header">
          <span className="user-email">{user?.email}</span>
          <button type="button" className="control-btn" onClick={signOut}>
            로그아웃
          </button>
        </header>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              lions={lions}
              isInitialLoading={isInitialLoading}
              isLoading={isLoading}
              statusMessage={statusMessage}
              showRetry={showRetry}
              isAuthenticated={isAuthenticated}
              addLion={addLion}
              removeLion={removeLastLion}
              removeLionById={removeLion}
              appendRandomLions={appendRandomLions}
              refreshAll={refreshAll}
              getRandomFormData={getRandomFormData}
              runAction={runAction}
              retry={retry}
              isOwnLion={isOwnLion}
              canDelete={canDelete}
            />
          }
        />
        <Route path="/lions/:id" element={<LionDetailPage lions={lions} />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage onSignIn={signIn} onSignUp={signUp} />
            )
          }
        />
      </Routes>
    </main>
  );
}
