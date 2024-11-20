import React from 'react';
import styled from 'styled-components';
import ScheduleTable from '@/components/ScheduleTable';

interface ScheduleRow {
  구분: string;
  해당지역: string;
  기타지역: string;
}

interface ScheduleAProps {
  title: string;
  rows: ScheduleRow[];
  모집공고일: string;
}

const ScheduleA: React.FC<ScheduleAProps> = ({ title, rows, 모집공고일 }) => {
  const headers = ['구분', '해당지역', '기타지역'];

  return (
    <Wrapper>
      <Header>
        <Title>🗓️ {title}</Title>
      </Header>
      <Box>
        <Content>
          <Row>
            <Label>모집공고일</Label>
            <Value>{모집공고일}</Value>
          </Row>
          <ScheduleTable headers={headers} rows={rows} />
        </Content>
        <ExtraContent>
          <Row>
            <Label>당첨자 발표일</Label>
            <Value>2024.11.12</Value>
          </Row>
          <Row>
            <Label>계약일</Label>
            <Value>2024.11.25 ~ 2024.11.27</Value>
          </Row>
        </ExtraContent>
      </Box>
    </Wrapper>
  );
};

export default ScheduleA;

const Wrapper = styled.div`
  background-color: var(--n30);
  padding: 24px 18px;
  margin-top: 24px;
`;

const Header = styled.div`
  margin-bottom: 22px;
`;

const Title = styled.h2`
  margin: 0;
  color: var(--g20);
  font-size: 18px;
  font-weight: 600;
  line-height: 100%;
`;

const Box = styled.div`
  background-color: var(--g60);
  border-radius: 8px;
  padding: 24px 18px;
`;

const Content = styled.div`
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const ExtraContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.span`
  color: var(--n10);
  font-size: 14px;
  font-weight: 500;
  line-height: 100%;
`;

const Value = styled.span`
  color: var(--g40);
  text-align: right;
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
`;
