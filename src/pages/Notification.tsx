// src/pages/Notification.tsx
import styled from 'styled-components';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';
import NotificationCard from '@/components/NotificationCard';
import { useNotifications } from '@/hooks/useNotification';

const Notification = () => {
  const { notifications, markAsRead } = useNotifications();

  return (
    <PageWrapper>
      <HeaderMain />
      <HeaderSub title="알림" />
      <Content>
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.notificationId}
            notificationId={notification.notificationId} // prop 추가
            title={notification.title}
            message={notification.message}
            createdAt={notification.createdAt}
            isRead={notification.isRead}
            onRead={markAsRead} // prop 추가
          />
        ))}
      </Content>
    </PageWrapper>
  );
};

export default Notification;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: var(--n30);
  box-sizing: border-box;
  padding-bottom: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  gap: 12px;
  width: 100%;
  max-width: 600px;
  padding: 0 16px;
  box-sizing: border-box;
`;
