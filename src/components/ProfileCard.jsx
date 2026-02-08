import { useNavigate } from "react-router-dom";

export default function ProfileCard({ lion }) {
  const navigate = useNavigate();

  return (
    <article
      className={`profile-card${lion.isMe ? " is-me" : ""}`}
      onClick={() => navigate(`/lions/${lion.id}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate(`/lions/${lion.id}`);
      }}
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
  