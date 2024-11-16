import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Router from './routes/Router';
import { requestFirebaseNotificationPermission } from './firebase'; // Firebase FCM 관련 함수 import

const App = () => {
  // 애플리케이션이 로드될 때 알림 권한 요청
  useEffect(() => {
    // 브라우저의 현재 알림 권한 상태 확인
    if (Notification.permission !== 'granted') {
      // 권한이 없는 경우, 사용자에게 알림 권한 요청
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          // 사용자가 권한을 허용한 경우
          console.log('Notification permission granted.');
          // FCM 토큰 요청
          requestFirebaseNotificationPermission()
            .then(() => {
              console.log('FCM 토큰이 성공적으로 요청되었습니다.');
            })
            .catch((err) => {
              console.error('FCM 토큰 요청 실패: ', err);
            });
        } else {
          // 사용자가 권한을 거부하거나 기본 상태인 경우
          console.warn('Notification permission denied or set to default.');
        }
      });
    } else {
      // 이미 알림 권한이 허용된 경우, FCM 토큰 직접 요청
      requestFirebaseNotificationPermission()
        .then(() => {
          console.log('FCM 토큰이 성공적으로 요청되었습니다.');
        })
        .catch((err) => {
          console.error('FCM 토큰 요청 실패: ', err);
        });
    }
  }, []); // 빈 의존성 배열로 컴포넌트 마운트 시 한 번만 실행

  return (
    <div className="app-container">
      <Router />
    </div>
  );
};

export default App;
