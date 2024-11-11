import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.tsx';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* 추가 라우트 */}
    </Routes>
  );
}

export default Router;
