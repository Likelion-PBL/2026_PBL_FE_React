import PropTypes from "prop-types";
import ProfileDetail from "./ProfileDetail.jsx";

export default function ProfileDetailList({ lions }) {
  return (
    <section className="profile-detail-list" id="profileDetailList">
      {lions.map((lion) => (
        <ProfileDetail key={lion.id} lion={lion} />
      ))}
    </section>
  );
}

ProfileDetailList.propTypes = {
  lions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      part: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      contacts: PropTypes.shape({
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        website: PropTypes.string.isRequired,
      }).isRequired,
      skills: PropTypes.arrayOf(PropTypes.string).isRequired,
      oneWord: PropTypes.string.isRequired,
      isMe: PropTypes.bool.isRequired,
    })
  ).isRequired,
};
