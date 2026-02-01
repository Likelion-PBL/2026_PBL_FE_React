import PropTypes from "prop-types";

export default function ProfileCard({ lion, showBadge = true }) {
    return (
      <article className={`profile-card${lion.isMe ? " is-me" : ""}`}>
        <figure className="profile-image">
          {showBadge && <span className="profile-badge">{lion.badge}</span>}
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

ProfileCard.propTypes = {
  lion: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    part: PropTypes.string.isRequired,
    badge: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    isMe: PropTypes.bool.isRequired,
  }).isRequired,
  showBadge: PropTypes.bool,
};