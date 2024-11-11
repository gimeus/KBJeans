import { Routes, Route } from 'react-router-dom';
import KBStarBanking from '../pages/KBStarBanking.tsx';
import Onboarding from '../pages/Onboarding.tsx';
import Information from '../pages/Information.tsx';
import Notification from '../pages/Notification.tsx';
import Home from '../pages/Home.tsx';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/KBStarBanking" element={<KBStarBanking />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/information" element={<Information />} />
      <Route path="/notification" element={<Notification />} />
    </Routes>
  );
}

export default Router;
