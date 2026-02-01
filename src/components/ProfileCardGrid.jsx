import PropTypes from "prop-types";
import ProfileCard from "./ProfileCard.jsx";

export default function ProfileCardGrid({ lions }) {
  return (
    <section className="profile-card-grid" id="profileCardGrid">
      {lions.map((lion, index) => (
        <ProfileCard key={lion.id} lion={lion} showBadge={index % 2 === 0} />
      ))}
    </section>
  );
}

ProfileCardGrid.propTypes = {
  lions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      part: PropTypes.string.isRequired,
      badge: PropTypes.string.isRequired,
      introduction: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
      isMe: PropTypes.bool.isRequired,
    })
  ).isRequired,
};
