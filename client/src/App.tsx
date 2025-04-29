import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PostsPage from './pages/PostsPage';
import MinutesPage from './pages/MinutesPage';
import StudentGovPortal from './pages/StudentGovPortal';
import PostAnnouncementPage from './pages/PostAnnouncementPage';
import CreatePostPage from './pages/CreatePostPage';
import WriteMinutesPage from './pages/WriteMinutesPage';
import StudentsListPage from './pages/StudentsListPage';
import ElectionPortal from './pages/ElectionPortal';
import CreateElectionPage from './pages/CreateElectionPage';
import ElectionOverviewPage from './pages/ElectionOverviewPage';
import CandidacyReviewPage from './pages/CandidacyReviewPage';
import CandidatesListPage from './pages/CandidatesListPage';
import SubmitCandidacyPage from './pages/SubmitCandidacyPage';
import VotingPage from './pages/VotingPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/minutes" element={<MinutesPage />} />
        <Route path="/student-gov" element={<StudentGovPortal />} />
        <Route path="/post-announcement" element={<PostAnnouncementPage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/write-minutes" element={<WriteMinutesPage />} />
        <Route path="/students" element={<StudentsListPage />} />
        <Route path="/elections" element={<ElectionPortal />} />
        <Route path="/elections/create" element={<CreateElectionPage />} />
        <Route path="/elections/overview" element={<ElectionOverviewPage />} />
        <Route path="/elections/review" element={<CandidacyReviewPage />} />
        <Route path="/elections/candidates" element={<CandidatesListPage />} />
        <Route path="/elections/submit" element={<SubmitCandidacyPage />} />
        <Route path="/elections/vote" element={<VotingPage />} />
        <Route path="/elections/results" element={<ResultsPage />} />
      </Routes>
    </>
  );
}

export default App;
