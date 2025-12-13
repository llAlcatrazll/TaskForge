import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import Landing from "./pages/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/landing" element={<Landing />} />
    </Routes>
  );
}

export default App;
