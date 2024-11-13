import React, { useState } from 'react';
import styled from 'styled-components';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';
import Tab from '@/components/Tab(2)';
import HeaderCalendar from '@/components/HeaderCalendar';

const InformationCalendar = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = ['전체 청약 캘린더', '찜한 청약 캘린더'];

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <Container>
      <HeaderMain />
      <HeaderSub title="청약 정보" />
      <Tab tabs={tabs} onTabChange={handleTabChange} />
      <Content>
        <HeaderCalendar />
        {selectedTab === 0 && (
          <CalendarContent>전체 청약 일정 내용</CalendarContent>
        )}
        {selectedTab === 1 && (
          <CalendarContent>찜한 청약 일정 내용</CalendarContent>
        )}
      </Content>
    </Container>
  );
};

export default InformationCalendar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Content = styled.div`
  margin-top: 20px;
`;

const CalendarContent = styled.div`
  margin-top: 16px;
  font-size: 16px;
  color: var(--g60);
`;
