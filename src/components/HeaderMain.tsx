import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  useNotifications,
  NOTIFICATION_UPDATE_EVENT,
  notificationEventEmitter,
} from '@/hooks/useNotification';
import { useEffect, useState } from 'react';

const HeaderMain = ({ backgroundColor = 'var(--g60)' }) => {
  const navigate = useNavigate();
  const { notifications, fetchNotifications } = useNotifications(); // 알림 목록 가져오기
  const [hasUnread, setHasUnread] = useState(false); // 읽지 않은 알림 상태 추가

  // 추가: 알림 상태 체크 함수
  const checkUnreadStatus = () => {
    const hasUnreadNotification = notifications.some(
      (notification) => !notification.isRead
    );
    setHasUnread(hasUnreadNotification);
  };

  // notifications 변경 감지
  useEffect(() => {
    checkUnreadStatus();
  }, [notifications]);

  // 추가: 이벤트 리스너
  useEffect(() => {
    const handleNotificationUpdate = () => {
      fetchNotifications();
    };

    notificationEventEmitter.addEventListener(
      NOTIFICATION_UPDATE_EVENT,
      handleNotificationUpdate
    );

    return () => {
      notificationEventEmitter.removeEventListener(
        NOTIFICATION_UPDATE_EVENT,
        handleNotificationUpdate
      );
    };
  }, [fetchNotifications]);

  return (
    <HeaderContainer backgroundColor={backgroundColor}>
      <LeftSection>
        <BackIcon
          src="/icons/back-big.svg"
          alt="Back"
          onClick={() => navigate('/kb-starbanking')}
        />
        <Title>부동산</Title>
      </LeftSection>
      <IconGroup>
        <Icon
          // 읽지 않은 알림이 있으면 bell-n.svg, 없으면 bell.svg 사용
          src={hasUnread ? '/icons/bell-n.svg' : '/icons/bell.svg'}
          alt="Notifications"
          onClick={() => navigate('/notification')}
        />
        <Icon
          src="/icons/box.svg"
          alt="Calendar"
          onClick={() => navigate('/information')}
        />
      </IconGroup>
    </HeaderContainer>
  );
};

export default HeaderMain;

const HeaderContainer = styled.header.withConfig({
  shouldForwardProp: (prop) => prop !== 'backgroundColor',
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  padding: 0 22px 0 20px;
  box-sizing: border-box;
  background-color: ${(props) => props.backgroundColor};
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const BackIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Title = styled.h1`
  color: var(--g20);
  font-size: 18px;
  font-weight: 400;
  line-height: 100%;
  margin: 0;
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
