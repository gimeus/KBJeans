// Firebase 설정 및 초기화

// Firebase 관련 라이브러리 import
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import axios from 'axios'; // 서버로 FCM 토큰을 전송하기 위해 사용, HTTP 요청을 위함.

// Firebase 설정 객체 - Vite의 환경 변수를 사용해 민감한 정보 보호
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// FCM 인스턴스 생성
const messaging = getMessaging(app);

// FCM 토큰을 요청하고 서버로 전송하는 함수
export const requestFirebaseNotificationPermission = async () => {
  try {
    // 웹 푸시 알림을 위한 VAPID 키 설정
    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;

    // 명시적으로 등록한 Service Worker를 참조
    // const registration = await navigator.serviceWorker.ready;

    // FCM 토큰 요청 시 명시적으로 등록한 Service Worker 사용
    // const token = await getToken(messaging, {
    //   vapidKey,
    //   serviceWorkerRegistration: registration,
    // });
    const token = await getToken(messaging, vapidKey);

    if (token) {
      console.log('Firebase FCM Token:', token);

      // 백엔드 서버로 FCM 토큰 전송
      await axios.post(
        'http://localhost:8080/api/v1/notifications/token',
        {
          token, // 요청 본문에 토큰 포함
        },
        {
          headers: {
            'X-USER-ID': '1', // 사용자 식별을 위한 헤더
          },
        }
      );
      // 토큰을 받지 못한 경우
      console.log('FCM Token has been sent to the server.');
    } else {
      console.log(
        'No registration token available. Request permission to generate one.'
      );
    }
  } catch (err) {
    console.error('An error occurred while retrieving token: ', err);
  }
};

// 포그라운드 상태에서 메시지를 수신했을 때의 핸들러
onMessage(messaging, (payload) => {
  console.log('[React] 포그라운드 메시지 수신: ', payload);

  // 알림 데이터의 안전한 접근을 위한 옵셔널 체이닝
  const title = payload.notification?.title;
  const body = payload.notification?.body;

  console.log(title, body);
  // 알림 권한이 있고 필요한 데이터가 있는 경우에만 알림 표시
  if (Notification.permission === 'granted' && title && body) {
    new Notification(title, {
      body,
      icon: '/icons/firebase-logo.png', // 알림에 표시될 아이콘
    });
  }
});

export default app;
