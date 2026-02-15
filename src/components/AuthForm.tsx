import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";

interface AuthFormProps {
  onSignIn: (email: string, password: string) => Promise<string | null>;
  onSignUp: (email: string, password: string) => Promise<string | null>;
}

export default function AuthForm({ onSignIn, onSignUp }: AuthFormProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    setIsLoading(true);

    if (isSignUp) {
      const errorMsg = await onSignUp(email, password);
      if (errorMsg) {
        setError(errorMsg);
      } else {
        setMessage("회원가입이 완료되었습니다. 이메일을 확인해주세요.");
        setIsSignUp(false);
      }
    } else {
      const errorMsg = await onSignIn(email, password);
      if (errorMsg) {
        setError(errorMsg);
      }
    }

    setIsLoading(false);
  }

  function toggleMode(): void {
    setIsSignUp((prev) => !prev);
    setError("");
    setMessage("");
    setConfirmPassword("");
  }

  return (
    <section className="auth-form-section">
      <h2 className="auth-title">{isSignUp ? "회원가입" : "로그인"}</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-row form-row--full">
          <label className="form-label" htmlFor="email">
            이메일
          </label>
          <input
            className="form-input"
            id="email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="form-row form-row--full">
          <label className="form-label" htmlFor="password">
            비밀번호
          </label>
          <input
            className="form-input"
            id="password"
            type="password"
            placeholder="6자 이상"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {isSignUp && (
          <div className="form-row form-row--full">
            <label className="form-label" htmlFor="confirmPassword">
              비밀번호 확인
            </label>
            <input
              className="form-input"
              id="confirmPassword"
              type="password"
              placeholder="비밀번호 재입력"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
        )}

        {error && <p className="auth-error">{error}</p>}
        {message && <p className="auth-message">{message}</p>}

        <div className="form-actions">
          <button type="submit" className="control-btn" disabled={isLoading}>
            {isLoading ? "처리 중..." : isSignUp ? "회원가입" : "로그인"}
          </button>
        </div>
      </form>

      <p className="auth-toggle">
        {isSignUp ? "이미 계정이 있으신가요?" : "계정이 없으신가요?"}{" "}
        <button type="button" className="auth-toggle-btn" onClick={toggleMode}>
          {isSignUp ? "로그인" : "회원가입"}
        </button>
      </p>
    </section>
  );
}
