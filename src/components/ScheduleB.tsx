import React from 'react';
import styled from 'styled-components';

interface ScheduleItem {
  label: string;
  value: string;
}

interface ScheduleBProps {
  items: ScheduleItem[];
}

const ScheduleB: React.FC<ScheduleBProps> = ({ items }) => {
  return (
    <Wrapper>
      <Header>
        <Title>🗓️ 청약 일정</Title>
      </Header>
      <Content>
        <RowWrapper>
          {items.map((item, index) => (
            <Row key={index}>
              <Label>{item.label}</Label>
              <Value>{item.value}</Value>
            </Row>
          ))}
        </RowWrapper>
      </Content>
    </Wrapper>
  );
};

export default ScheduleB;

const Wrapper = styled.div`
  background-color: var(--n30);
  padding: 24px 18px;
  margin-top: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
`;

const Title = styled.h2`
  margin: 0;
  color: var(--g20);
  font-size: 18px;
  font-weight: 600;
  line-height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowWrapper = styled.div`
  background-color: var(--g60);
  border-radius: 10px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span`
  color: var(--n10);
  font-size: 14px;
  font-weight: 500;
  line-height: 100%;
`;

const Value = styled.span`
  color: var(--g40);
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
  text-align: right;
`;
