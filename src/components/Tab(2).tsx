import React, { useState } from 'react';
import styled from 'styled-components';

interface TabProps {
  tabs: string[];
  onTabChange?: (tabIndex: number) => void;
}

const Tab2: React.FC<TabProps> = ({ tabs, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
    if (onTabChange) onTabChange(index);
  };

  return (
    <TabContainer>
      {tabs.map((tab, index) => (
        <TabItem
          key={index}
          onClick={() => handleTabClick(index)}
          $selected={selectedTab === index}
        >
          {tab}
        </TabItem>
      ))}
    </TabContainer>
  );
};

export default Tab2;

const TabContainer = styled.div`
  display: flex;
  height: 52px;
  background-color: var(--n30);
  border-radius: 10px;
  margin: 0 16px;
`;

interface TabItemProps {
  $selected: boolean;
}

const TabItem = styled.div<TabItemProps>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 100%;

  color: ${({ $selected }) => ($selected ? 'var(--g30)' : 'var(--n20)')};
  background-color: ${({ $selected }) =>
    $selected ? 'var(--g60)' : 'transparent'};
  border-radius: 8px;
  cursor: pointer;
  padding: 14px 0;
  transition: all 0.3s ease;
  height: 42px;
  margin: 5px;
`;
