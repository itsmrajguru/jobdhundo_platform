import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import JobsPage from "./pages/JobsPage";
import ResumePage from "./pages/ResumePage";
import ProfilePage from "./pages/ProfilePage";

// ...

import Footer from "./components/Footer";
import JobDetailsPage from "./pages/JobDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-bg">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/resume" element={<ResumePage />} />
            {/* Redirect old dashboard link if anyone tries to access it */}
            <Route path="/dashboard" element={<JobsPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}


export default App;



