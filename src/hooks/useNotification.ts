import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { NotificationResponse } from '@/types/notification';

// 전역 이벤트 이미터 추가
export const notificationEventEmitter = new EventTarget();
export const NOTIFICATION_UPDATE_EVENT = 'notificationUpdate';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationResponse[]>(
    []
  );
  const userId = 1; // TODO: 실제 사용자 ID로 교체 필요

  // 알림 목록 조회
  const fetchNotifications = useCallback(async () => {
    try {
      const response = await axios.get<NotificationResponse[]>(
        'http://localhost:8080/api/v1/notifications',
        {
          headers: {
            'X-USER-ID': userId.toString(),
          },
        }
      );

      setNotifications(response.data);
      notificationEventEmitter.dispatchEvent(
        new CustomEvent(NOTIFICATION_UPDATE_EVENT)
      );
    } catch (error) {
      console.error('알림 목록 조회 실패:', error);
    }
  }, [userId]);

  // 알림 읽음 처리
  const markAsRead = async (notificationId: number) => {
    try {
      await axios.patch(
        `http://localhost:8080/api/v1/notifications/${notificationId}/read`,
        null,
        {
          headers: {
            'X-USER-ID': userId.toString(),
          },
        }
      );

      await fetchNotifications();
      notificationEventEmitter.dispatchEvent(
        new CustomEvent(NOTIFICATION_UPDATE_EVENT)
      );
    } catch (error) {
      console.error('알림 읽음 처리 실패:', error);
    }
  };

  useEffect(() => {
    // SSE 연결 설정
    const eventSource = new EventSource(
      `http://localhost:8080/api/v1/notifications/subscribe?userId=${userId}`
    );

    // SSE 이벤트 핸들러에서 fetchNotifications 직접 호출
    eventSource.addEventListener('notification', () => {
      fetchNotifications();
    });

    // 초기 알림 목록 로드
    fetchNotifications();

    // 컴포넌트 언마운트 시 SSE 연결 종료
    return () => eventSource.close();
  }, [fetchNotifications]);

  return { notifications, markAsRead, fetchNotifications };
};
