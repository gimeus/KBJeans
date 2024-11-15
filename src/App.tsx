import { useLocation } from 'react-router-dom';
import Router from './routes/Router';
import { AreaProvider } from './context/AreaContext'; // AreaProvider 임포트

const App = () => {
  return (
    <AreaProvider>
      {' '}
      {/* AreaProvider로 전체 감싸기 */}
      <div className="app-container">
        <Router />
      </div>
    </AreaProvider>
  );
};

export default App;
