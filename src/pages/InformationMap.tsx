import styled from 'styled-components';
import HeaderMain from '@/components/HeaderMain';
import HeaderSearch from '@/components/HeaderSearch';

const InformationMap = () => {
  return (
    <Container>
      <HeaderMain />
      <HeaderSearch />
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
