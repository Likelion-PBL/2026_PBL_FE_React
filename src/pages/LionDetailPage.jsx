import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ProfileDetail from "../components/ProfileDetail.jsx";

export default function LionDetailPage({ lions }) {
  const { id } = useParams();

  const lion = lions.find((l) => String(l.id) === id);

  if (!lion) {
    return (
      <section className="empty-state">
        <h2>아기 사자를 찾을 수 없습니다</h2>
        <p>id가 {id}인 아기 사자가 명단에 존재하지 않습니다.</p>
        <Link to="/" className="control-btn">
          목록으로 돌아가기
        </Link>
      </section>
    );
  }

  return <ProfileDetail lion={lion} />;
}
