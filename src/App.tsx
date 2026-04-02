import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import MeetingDetails from './pages/MeetingDetails';
import ScrollToTop from './components/ScrollToTop';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/projetos/:projectId" element={<ProjectDetails />} />
        <Route path="/projetos/:projectId/encontros/:meetingId" element={<MeetingDetails />} />
      </Routes>
    </Router>
  );
}
