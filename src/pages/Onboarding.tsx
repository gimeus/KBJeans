import styled from 'styled-components';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';
import Button from '@/components/Button';
import Select from '@/components/Select';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };

  const areaOptions = [
    '85㎡ 이하 (32평)',
    '102㎡ 이하 (39평)',
    '135㎡ 이하 (51평)',
  ];

  return (
    <Container>
      <HeaderMain />
      <HeaderSub title="희망 면적 선택" />
      <Content>
        <Select label="면적 선택" options={areaOptions} />
      </Content>
      <Footer>
        <Button onClick={handleButtonClick}>청약 도우미 시작하기</Button>
      </Footer>
    </Container>
  );
};

export default Onboarding;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer = styled.div`
  padding: 18px;
`;
