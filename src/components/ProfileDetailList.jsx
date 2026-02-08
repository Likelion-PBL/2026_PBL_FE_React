import ProfileDetail from "./ProfileDetail.jsx";

export default function ProfileDetailList({ lions }) {
  if (!lions || lions.length === 0) {
    return (
      <section className="profile-detail-list">
        <EmptyState message="상세 정보가 없습니다." />
      </section>
    );
  }

  return (
    <section className="profile-detail-list">
      {lions.map((lion) => (
        <ProfileDetail key={lion.id} lion={lion} />
      ))}
    </section>
  );
}

function EmptyState({ message }) {
  return <div className="empty-state">{message}</div>;
}
