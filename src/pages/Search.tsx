import React from 'react';
import styled from 'styled-components';
import HeaderSearch from '@/components/HeaderSearch';

const Search = () => {
  return (
    <Container>
      <HeaderSearch />
      <Title>검색</Title>
    </Container>
  );
};

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
`;

export default Search;
