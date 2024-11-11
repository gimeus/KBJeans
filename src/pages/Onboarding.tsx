import styled from 'styled-components';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <div>
      <HeaderMain />
      <HeaderSub title="희망 면적 선택" />
      <Footer>
        <Button onClick={handleButtonClick}>청약 도우미 시작하기</Button>
      </Footer>
      <div></div>
    </div>
  );
};

const Footer = styled.div``;

export default Onboarding;
