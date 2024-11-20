import styled from 'styled-components';
import HeaderMain from '@/components/HeaderMain';
import KakaoMap from '@/components/KakaoMap';

const InformationMap = () => {
  return (
    <Container>
      <HeaderMain />
      <KakaoMap/>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: var(--n30);
`;

export default InformationMap;
