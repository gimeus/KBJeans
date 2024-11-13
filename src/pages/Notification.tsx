import styled from 'styled-components';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';

const Notification = () => {
  return (
    <Container>
      <HeaderMain />
      <HeaderSub title="알림" />
    </Container>
  );
};

export default Notification;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
