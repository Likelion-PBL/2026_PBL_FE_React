import { useNavigate } from "react-router-dom";
import type { KeyboardEvent } from "react";
import type { Lion } from "../types/lion";

interface ProfileCardProps {
  lion: Lion;
}

export default function ProfileCard({ lion }: ProfileCardProps) {
  const navigate = useNavigate();

  function handleClick(): void {
    navigate(`/lions/${lion.id}`);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLElement>): void {
    if (e.key === "Enter") {
      navigate(`/lions/${lion.id}`);
    }
  }

  return (
    <article
      className={`profile-card${lion.isMe ? " is-me" : ""}`}
      onClick={handleClick}
      role="link"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <figure className="profile-image">
        <span className="profile-badge">{lion.badge}</span>
        <img src={lion.imgSrc} alt="" />
      </figure>
      <section className="profile-content">
        <h2 className="name">{lion.name}</h2>
        <p className="part">{lion.part}</p>
        <p className="introduction">{lion.introduction}</p>
      </section>
    </article>
  );
}
