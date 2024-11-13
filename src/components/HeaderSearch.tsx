import styled from 'styled-components';

const backIcon = '/icons/back.svg';
const searchIcon = '/icons/search.svg';
const categoryIcon = '/icons/multimedia.svg';

const HeaderSearch = () => {
  return (
    <Container>
      <BackIcon src={backIcon} />
      <SearchBox>
        <SearchIcon src={searchIcon} />
        <PlaceholderText>지역 검색</PlaceholderText>
      </SearchBox>
      <CategoryIcon src={categoryIcon} />
    </Container>
  );
};

export default HeaderSearch;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  background-color: var(--g60);
  padding: 0 21px 0 8px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 46px;
  background-color: var(--n30);
  border-radius: 10px;
  padding: 0 16px;
`;

const BackIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const CategoryIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 14px;
`;

const PlaceholderText = styled.span`
  color: var(--n20);
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
`;
