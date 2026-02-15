import AuthForm from "../components/AuthForm";

interface LoginPageProps {
  onSignIn: (email: string, password: string) => Promise<string | null>;
  onSignUp: (email: string, password: string) => Promise<string | null>;
}

export default function LoginPage({ onSignIn, onSignUp }: LoginPageProps) {
  return (
    <div className="login-page">
      <h1 className="login-title">Lion Track</h1>
      <p className="login-subtitle">아기사자 명단을 관리하려면 로그인하세요</p>
      <AuthForm onSignIn={onSignIn} onSignUp={onSignUp} />
    </div>
  );
}
