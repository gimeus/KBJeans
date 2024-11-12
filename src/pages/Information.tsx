import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Tab from '@/components/Tab(1)';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';

const MyComponent = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();

  const tabs = ['청약 정보', '청약 일정', '청약 지도'];

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
    if (index === 1) {
      navigate('/information-calendar');
    } else if (index === 2) {
      navigate('/information-map');
    }
  };

  return (
    <Container>
      <HeaderMain />
      <HeaderSub title={tabs[selectedTab]} />
      <Tab tabs={tabs} onTabChange={handleTabChange} />
      <Content>
        {selectedTab === 0}
        {selectedTab === 1}
        {selectedTab === 2}
      </Content>
    </Container>
  );
};

export default MyComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Content = styled.div`
  margin-top: 16px;
  padding: 16px;
`;
