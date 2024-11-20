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

    // const token = await getToken(messaging, vapidKey);

    // Service Worker 등록 상태 확인, 준비될 때까지 대기
    const registration = await navigator.serviceWorker.ready;

    // FCM 토큰 요청
    // vapidKey와 서비스 워커 등록 정보를 포함하여 요청
    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: registration,
    });

    // 토큰이 성공적으로 생성된 경우
    if (token) {
      console.log('Firebase FCM Token:', token);

      // 백엔드 서버로 FCM 토큰 전송
      // 서버는 이 토큰을 저장하고 나중에 알림을 보낼 때 사용
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
      console.log('FCM Token이 성공적으로 전송되었습니다.');
    } else {
      console.log('사용 가능한 Token이 없습니다.');
    }
  } catch (err) {
    console.error('Token 검색 중 오류가 발생했습니다 : ', err);
  }
};

// 포그라운드 상태(앱이 활성화된 상태)에서 메시지를 수신했을 때의 핸들러
onMessage(messaging, (payload) => {
  console.log('[React] 포그라운드 메시지 수신: ', payload);

  // 알림 데이터를 안전하게 추출 (옵셔널 체이닝 사용)
  const title = payload.notification?.title;
  const body = payload.notification?.body;

  console.log(title, body);

  // 알림 권한이 허용되어 있고, 제목과 내용이 있는 경우에만 알림 표시
  if (Notification.permission === 'granted' && title && body) {
    // 브라우저 알림 API를 사용하여 알림 생성
    new Notification(title, {
      body: body.substring(0, 20) + '...',
      icon: '/icons/firebase-logo.svg', // 알림에 표시될 아이콘
      badge: '/icons/firebase-logo.svg',
    });
  }
});

// Firebase 앱 인스턴스를 다른 파일에서 사용할 수 있도록 export
export default app;
