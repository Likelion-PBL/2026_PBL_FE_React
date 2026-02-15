import ProfileDetail from "./ProfileDetail";
import type { Lion } from "../types/lion";

interface ProfileDetailListProps {
  lions: Lion[];
}

export default function ProfileDetailList({ lions }: ProfileDetailListProps) {
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

interface EmptyStateProps {
  message: string;
}

function EmptyState({ message }: EmptyStateProps) {
  return <div className="empty-state">{message}</div>;
}
