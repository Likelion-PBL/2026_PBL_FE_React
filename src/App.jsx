
import { lions } from "./data/lions.js";
import Controls from "./components/Controls.jsx";
import LionForm from "./components/LionForm.jsx";
import ProfileCardGrid from "./components/ProfileCardGrid.jsx";
import ProfileDetailList from "./components/ProfileDetailList.jsx";

export default function App() {
  return (
    <main className="container">
      <Controls totalCount={lions.length} />

      <LionForm />

      <ProfileCardGrid lions={lions} />

      <ProfileDetailList lions={lions} />
    </main>
  );
}
