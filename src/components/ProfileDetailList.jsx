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
