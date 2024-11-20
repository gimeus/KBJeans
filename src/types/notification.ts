// 백엔드 API 응답 타입 정의
export interface NotificationResponse {
  notificationId: number; // 알림 고유 ID
  title: string; // 알림 제목
  message: string; // 주택명
  createdAt: string; // 알림 생성 시간
  isRead: boolean; // 읽음 여부
}
