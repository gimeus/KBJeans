import { useState, useEffect } from 'react';
import axios from 'axios';
import { NotificationResponse } from '@/types/notification';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationResponse[]>(
    []
  );
  const userId = 1; // TODO: 실제 사용자 ID로 교체 필요

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
      // 읽음 상태 업데이트
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.notificationId === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error('알림 읽음 처리 실패:', error);
    }
  };

  // 알림 목록 조회
  const fetchNotifications = async () => {
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
    } catch (error) {
      console.error('알림 목록 조회 실패:', error);
    }
  };

  useEffect(() => {
    // SSE 연결 설정
    const eventSource = new EventSource(
      `http://localhost:8080/api/v1/notifications/subscribe?userId=${userId}`
    );

    // 새 알림 수신 시 목록에 추가
    eventSource.addEventListener('notification', (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prev) => [newNotification, ...prev]);
    });

    // 초기 알림 목록 로드
    fetchNotifications();

    // 컴포넌트 언마운트 시 SSE 연결 종료
    return () => eventSource.close();
  }, []);

  return { notifications, markAsRead };
};
