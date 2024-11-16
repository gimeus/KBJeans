import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { requestFirebaseNotificationPermission } from './firebase'; // 올바른 경로를 사용하여 import

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

// Service Worker 등록이 완료된 후에 FCM 토큰 요청하기
if ('serviceWorker' in navigator) {
  // 브라우저가 Service Worker를 지원하는지 확인
  window.addEventListener('load', () => {
    // 페이지 로드 완료 시 실행
    // 사용자 정의 Service Worker 등록
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js') // Service Worker 파일 경로
      .then((registration) => {
        console.log(
          'Service Worker registered with scope:',
          registration.scope
        );

        // Service Worker 상태에 따른 FCM 토큰 요청 처리
        if (registration.active) {
          // 이미 활성 상태라면 바로 FCM 토큰 요청
          requestFirebaseNotificationPermission()
            .then(() => {
              console.log('FCM 토큰이 성공적으로 요청되었습니다.');
            })
            .catch((err) => {
              console.error('FCM 토큰 요청 실패: ', err);
            });
        } else {
          // 서비스 워커가 설치/활성화될 때까지 대기
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;

            // Service Worker의 상태 변화 감지
            newWorker?.addEventListener('statechange', () => {
              if (newWorker.state === 'activated') {
                // 활성화 완료 시
                console.log('Service Worker activated.');
                requestFirebaseNotificationPermission() // FCM 토큰 요청
                  .then(() => {
                    console.log('FCM 토큰이 성공적으로 요청되었습니다.');
                  })
                  .catch((err) => {
                    console.error('FCM 토큰 요청 실패: ', err);
                  });
              }
            });
          });
        }
      })
      .catch((err) => {
        console.error('Service Worker registration failed:', err);
      });
  });
}
