import styled from 'styled-components';

// Icon 경로
const backIcon = '/icons/back.svg';
const searchIcon = '/icons/search.svg';
const categoryIcon = '/icons/multimedia.svg';

const HeaderSearch = () => {
  return (
    <Container>
      <Icon src={backIcon} alt="뒤로가기" margin="0 10px 0 0" />
      <SearchBox>
        <Icon src={searchIcon} alt="서치 아이콘" margin="0 10px 0 0" />
        <PlaceholderText>지역 검색</PlaceholderText>
      </SearchBox>
      <Icon src={categoryIcon} alt="카테고리 선택" margin="0 0 0 14px" />
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

const Icon = styled.img<{ margin?: string }>`
  width: 24px;
  height: 24px;
  margin: ${({ margin }) => margin || '0'};
`;

const PlaceholderText = styled.span`
  color: var(--n20);
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
`;
