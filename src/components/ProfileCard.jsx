export default function ProfileCard({ lion }) {
    return (
      <article className={`profile-card${lion.isMe ? " is-me" : ""}`}>
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
  