import styled from 'styled-components';
import HeaderMain from '@/components/HeaderMain';

const Home = () => {
  return (
    <Container>
      <HeaderMain />
      <Title>홈</Title>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  color: var(--g10);
  font-size: 24px;
  font-weight: bold;
  margin-top: 16px;
`;
