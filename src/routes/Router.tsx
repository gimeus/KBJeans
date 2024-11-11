import { Routes, Route } from 'react-router-dom';
import KBStarBanking from '../pages/KBStarBanking.tsx';
import Onboarding from '../pages/Onboarding.tsx';
import Information from '../pages/Information.tsx';
import Notification from '../pages/Notification.tsx';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<KBStarBanking />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/information" element={<Information />} />
      <Route path="/notification" element={<Notification />} />
      {/* 추가 라우트 */}
    </Routes>
  );
}

export default Router;
