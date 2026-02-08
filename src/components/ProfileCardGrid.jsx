import ProfileCard from "./ProfileCard.jsx";

export default function ProfileCardGrid({ lions }) {
  if (!lions || lions.length === 0) {
    return (
      <section className="profile-card-grid">
        <EmptyState message="표시할 아기 사자가 없습니다. (필터/검색 조건을 확인해 주세요)" />
      </section>
    );
  }

  return (
    <section className="profile-card-grid">
      {lions.map((lion) => (
        <ProfileCard key={lion.id} lion={lion} />
      ))}
    </section>
  );
}

function EmptyState({ message }) {
  return <div className="empty-state">{message}</div>;
}
