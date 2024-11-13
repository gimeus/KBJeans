import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HeaderMain from '@/components/HeaderMain';
import Button from '@/components/Button';

const OnboardingIntro = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/onboarding');
  };

  return (
    <Container>
      <HeaderMain />
      <Footer>
        <Button onClick={handleButtonClick}>
          주택 청약 희망 면적 알아보기
        </Button>
      </Footer>
    </Container>
  );
};

export default OnboardingIntro;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  justify-content: space-between;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 16px 0;
`;
