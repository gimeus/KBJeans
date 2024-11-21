import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub'; // HeaderSub 컴포넌트 임포트
import Button from '@/components/Button';

const OnboardingIntro = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/onboarding');
  };

  return (
    <Container>
      <HeaderWrapper>
        <HeaderMain />
        <HeaderSub title="청약 도우미" />
        <OnboardingImage src="/img/onboarding.png" alt="Onboarding Content" />
      </HeaderWrapper>
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

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OnboardingImage = styled.img`
  width: 100%;
  max-width: 768px;
  height: auto;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 16px 0;
`;
