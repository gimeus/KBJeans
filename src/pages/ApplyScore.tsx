import styled from 'styled-components';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';

const ApplyScore = () => {
  return (
    <Container>
      <HeaderMain />
      <HeaderSub title="청약가점계산기" />
    </Container>
  );
};

export default ApplyScore;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
