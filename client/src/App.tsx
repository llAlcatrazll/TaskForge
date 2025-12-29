import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import Landing from "./pages/LandingPage";
import CreateAccountPage from "./pages/Create_AccountPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/create_account" element={<CreateAccountPage />} />
    </Routes>
  );
}

export default App;
