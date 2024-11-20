import { Routes, Route } from 'react-router-dom';
import KBStarBanking from '../pages/KBStarBanking.tsx';
import Onboarding from '../pages/Onboarding.tsx';
import OnboardingIntro from '../pages/OnboardingIntro.tsx';
import Information from '../pages/Information.tsx';
import InformationCalendar from '../pages/InformationCalendar.tsx';
import InformationMap from '../pages/InformationMap.tsx';
import Notification from '../pages/Notification.tsx';
import Home from '../pages/Home.tsx';
import Search from '../pages/Search.tsx';
import ApplyScore from '../pages/ApplyScore.tsx';
import Score from '../pages/Score.tsx';
import StatusInfo from '../pages/StatusInfo.tsx';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/kb-starbanking" element={<KBStarBanking />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/onboarding-intro" element={<OnboardingIntro />} />
      <Route path="/information" element={<Information />} />
      <Route path="/information-calendar" element={<InformationCalendar />} />
      <Route path="/information-map" element={<InformationMap />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/search" element={<Search />} />
      <Route path="/apply-score" element={<ApplyScore />} />
      <Route path="/score" element={<Score />} />
      <Route path="/status-info" element={<StatusInfo />} />
    </Routes>
  );
}

export default Router;
