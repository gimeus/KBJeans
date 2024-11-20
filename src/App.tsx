import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Router from './routes/Router';
import { requestFirebaseNotificationPermission } from './firebase'; // Firebase FCM 관련 함수 import
import { AreaProvider } from './context/AreaContext'; // AreaProvider 임포트

const App = () => {
  // FCM 및 Service Worker 초기화를 위한 useEffect
  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        // 브라우저의 Service Worker 지원 여부 확인
        if (!('serviceWorker' in navigator)) {
          console.log('이 브라우저는 Service Worker를 지원하지 않습니다.');
          return;
        }

        // Service Worker 등록
        const registration = await navigator.serviceWorker.register(
          '/firebase-messaging-sw.js'
        );
        console.log(
          'Service Worker가 다음 범위로 등록됨 : ',
          registration.scope
        );

        // 알림 권한 상태 확인 및 처리
        if (Notification.permission === 'granted') {
          // 이미 권한이 있는 경우 FCM 토큰 요청
          await requestFirebaseNotificationPermission();
          console.log('기존 알림 권한으로 FCM 토큰 요청 완료');
        } else {
          // 권한이 없는 경우 권한 요청
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            // 권한을 받은 경우 FCM 토큰 요청
            await requestFirebaseNotificationPermission();
            console.log('새로운 알림 권한으로 FCM 토큰 요청 완료');
          } else {
            console.log('알림 권한이 거부되었습니다.');
          }
        }
      } catch (error) {
        console.error('알림 초기화 중 오류 발생 :', error);
      }
    };

    // 컴포넌트 마운트 시 초기화 함수 실행
    initializeNotifications();
  }, []); // 빈 의존성 배열로 최초 1회만 실행

  return (
    <AreaProvider>
      <div className="app-container">
        <Router />
      </div>
    </AreaProvider>
  );
};

export default App;
