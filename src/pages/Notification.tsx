import styled from 'styled-components';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';
import NotificationCard from '@/components/NotificationCard';

// 더미 데이터 정의
const notifications = [
  {
    notificationId: 1,
    title: '청약 마감일 하루 전입니다!',
    houseName: 'VIORR(비오르)',
    createdAt: '2024-11-18T10:30:00',
    isRead: false,
  },
  {
    notificationId: 2,
    title: '무순위 청약 신청일이 내일입니다!',
    houseName: '이문월드메르디앙 힐트리움 더테라스',
    createdAt: '2024-11-17T08:15:00',
    isRead: true,
  },
  {
    notificationId: 3,
    title: '청약이 시작되었습니다!',
    houseName: '이문월드메르디앙 힐트리움 더테라스',
    createdAt: '2024-11-17T12:00:00',
    isRead: false,
  },
];

const Notification = () => {
  return (
    <PageWrapper>
      <HeaderMain />
      <HeaderSub title="알림" />
      <Content>
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.notificationId}
            title={notification.title}
            houseName={notification.houseName}
            createdAt={notification.createdAt}
            isRead={notification.isRead}
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
