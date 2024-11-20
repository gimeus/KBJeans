import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';
import starFriends from '/icons/starfrends.svg';
import ScoreMessage from '@/components/ScoreMessage';

const dependentScores = {
  '1명': 10,
  '2명': 15,
  '3명': 20,
  '4명': 25,
  '5명': 30,
  '6명 이상': 35,
};

const Score = () => {
  const location = useLocation();

  const { totalScore, noHousePeriod, dependentCount, joinDateScore } =
    location.state || {};

  const dependentScore = dependentScores[dependentCount] || 0;

  return (
    <Container>
      <HeaderMain />
      <HeaderSub title="청약 가점 계산결과" />
      <CharacterSection>
        <ScoreMessage title="종합점수" score={totalScore || 0} />
        <Character src={starFriends} alt="Star Friends Character" />
      </CharacterSection>
      <TableSection>
        <TableWrapper>
          <ResultTable>
            <TableRow>
              <TableCellHeader>청약통장 가입일</TableCellHeader>
              <TableCellContent>6개월 이상 ~ 1년 미만</TableCellContent>
              <TableCellScore>{joinDateScore || 0}점</TableCellScore>
            </TableRow>
            <TableRow>
              <TableCellHeader>무주택기간</TableCellHeader>
              <TableCellContent>
                {noHousePeriod || '선택되지 않음'}
              </TableCellContent>
              <TableCellScore>
                {noHousePeriod ? `${joinDateScore}점` : '0점'}
              </TableCellScore>
            </TableRow>
            <TableRow>
              <TableCellHeader>부양가족수</TableCellHeader>
              <TableCellContent>
                {dependentCount || '선택되지 않음'}
              </TableCellContent>
              <TableCellScore>{dependentScore}점</TableCellScore>
            </TableRow>
            <TableRow>
              <TableCellHeader>종합점수</TableCellHeader>
              <TableCellContent />
              <TableCellScore>{totalScore || 0}점</TableCellScore>
            </TableRow>
          </ResultTable>
        </TableWrapper>
      </TableSection>
    </Container>
  );
};

export default Score;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--g60);
  min-height: 100vh;
`;

const CharacterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 36px;
  gap: 36px;
`;

const Character = styled.img`
  width: 109px;
  height: auto;
`;

const TableSection = styled.div`
  width: 100%;
  background-color: var(--n30);
  padding: 36px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
`;

const TableWrapper = styled.div`
  width: 100%;
  max-width: 360px;
  background-color: white;
  border-radius: 8px;
  padding: 10px;
`;

const ResultTable = styled.div`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  border: 0.75px solid var(--g50);
`;

const TableRow = styled.div`
  display: flex;
  padding: 14px 0;
  border-bottom: 0.75px solid var(--g50);

  &:last-child {
    border-bottom: none;
  }
`;

const TableCellHeader = styled.div`
  flex: 120;
  color: var(--g20);
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  padding-left: 16px;
`;

const TableCellContent = styled.div`
  flex: 143;
  color: var(--g30);
  font-size: 14px;
  font-weight: 400;
  text-align: left;
`;

const TableCellScore = styled.div`
  flex: 58;
  color: var(--n10);
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  padding-right: 16px;
`;
