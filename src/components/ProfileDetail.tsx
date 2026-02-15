import type { Lion } from "../types/lion";

interface ProfileDetailProps {
  lion: Lion;
}

export default function ProfileDetail({ lion }: ProfileDetailProps) {
  return (
    <section className="profile-detail">
      <header className="detail-header">
        <h1 className="detail-name">{lion.name}</h1>
        <span className="detail-part">{lion.part}</span>
        <p className="detail-organization">LION TRACK</p>
      </header>

      <section className="detail-section">
        <h3>자기소개</h3>
        <p>{lion.description}</p>
      </section>

      <section className="detail-section">
        <h3>연락처</h3>
        <ul className="contact-list">
          <li>Email: {lion.contacts.email}</li>
          <li>Phone: {lion.contacts.phone}</li>
          <li>
            <a href={lion.contacts.website}>{lion.contacts.website}</a>
          </li>
        </ul>
      </section>

      <section className="detail-section">
        <h3>관심 기술</h3>
        <ul className="skill-list">
          {lion.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="detail-section">
        <h3>한 마디</h3>
        <p>{lion.oneWord}</p>
      </section>
    </section>
  );
}
