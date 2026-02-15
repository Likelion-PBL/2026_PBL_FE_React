import { useNavigate } from "react-router-dom";
import type { KeyboardEvent, MouseEvent } from "react";
import type { Lion } from "../types/lion";

interface ProfileCardProps {
  lion: Lion;
  isOwn: boolean;
  canDelete: boolean;
  onDelete: () => void;
}

export default function ProfileCard({ lion, isOwn, canDelete, onDelete }: ProfileCardProps) {
  const navigate = useNavigate();
  const isPending = lion.isPending ?? false;

  function handleClick(): void {
    if (isPending) return;
    navigate(`/lions/${lion.id}`);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLElement>): void {
    if (e.key === "Enter" && !isPending) {
      navigate(`/lions/${lion.id}`);
    }
  }

  function handleDelete(e: MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();
    onDelete();
  }

  const classNames = [
    "profile-card",
    lion.isMe ? "is-me" : "",
    isOwn ? "is-own" : "",
    isPending ? "is-pending" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={classNames}
      onClick={handleClick}
      role="link"
      tabIndex={isPending ? -1 : 0}
      onKeyDown={handleKeyDown}
    >
      {isPending && (
        <div className="pending-overlay">
          <span className="pending-spinner" />
          <span className="pending-text">처리 중...</span>
        </div>
      )}

      {isOwn && <span className="own-badge">내가 추가</span>}

      <figure className="profile-image">
        <span className="profile-badge">{lion.badge}</span>
        <img src={lion.imgSrc} alt="" />
      </figure>
      <section className="profile-content">
        <h2 className="name">{lion.name}</h2>
        <p className="part">{lion.part}</p>
        <p className="introduction">{lion.introduction}</p>

        {canDelete && !isPending && (
          <button
            type="button"
            className="card-delete-btn"
            onClick={handleDelete}
            title="이 아기 사자 삭제"
          >
            삭제
          </button>
        )}
      </section>
    </article>
  );
}
