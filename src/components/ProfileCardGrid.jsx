import ProfileCard from "./ProfileCard.jsx";

export default function ProfileCardGrid({ lions }) {
  return (
    <section className="profile-card-grid" id="profileCardGrid">
      {lions.map((lion) => (
        <ProfileCard key={lion.id} lion={lion} />
      ))}
    </section>
  );
}
