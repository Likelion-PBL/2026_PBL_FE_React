import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="empty-state">
      <h2>페이지를 찾을 수 없습니다</h2>
      <p>요청하신 주소가 존재하지 않습니다.</p>
      <Link to="/" className="control-btn">
        목록으로 돌아가기
      </Link>
    </section>
  );
}
