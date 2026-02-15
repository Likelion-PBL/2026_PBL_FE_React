import { useParams, useNavigate } from "react-router-dom";
import ProfileDetail from "../components/ProfileDetail";
import type { Lion } from "../types/lion";

interface LionDetailPageProps {
  lions: Lion[];
}

export default function LionDetailPage({ lions }: LionDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const lion = lions.find((l) => String(l.id) === id);

  if (!lion) {
    return (
      <section className="empty-state">
        <p>해당 아기 사자를 찾을 수 없습니다.</p>
        <button type="button" className="control-btn" onClick={() => navigate("/")}>
          목록으로 돌아가기
        </button>
      </section>
    );
  }

  return (
    <>
      <button type="button" className="control-btn" onClick={() => navigate("/")}>
        ← 목록으로
      </button>

      <ProfileDetail lion={lion} />
    </>
  );
}
