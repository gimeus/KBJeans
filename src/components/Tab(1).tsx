import React, { useState } from 'react';
import styled from 'styled-components';

interface TabProps {
  tabs: string[];
  onTabChange?: (tabIndex: number) => void;
}

const Tab: React.FC<TabProps> = ({ tabs, onTabChange }) => {
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
      <Underline $selectedTab={selectedTab} $tabCount={tabs.length} />
    </TabContainer>
  );
};

export default Tab;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: var(--g60); /* 배경색 설정 */
  border-bottom: 0.75px solid var(--g50);
  padding-bottom: 2.5px;
`;

interface TabItemProps {
  $selected: boolean;
}

const TabItem = styled.div<TabItemProps>`
  color: ${({ $selected }) => ($selected ? 'var(--g30)' : 'var(--g40)')};
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  line-height: 100%;
  cursor: pointer;
  padding: 8px 0;
  width: 100%;
`;

interface UnderlineProps {
  $selectedTab: number;
  $tabCount: number;
}

const Underline = styled.div<UnderlineProps>`
  position: absolute;
  bottom: 0;
  left: ${({ $selectedTab, $tabCount }) =>
    `calc(${($selectedTab / $tabCount) * 100}%)`};
  width: ${({ $tabCount }) => `calc(100% / ${$tabCount})`};
  height: 2px;
  background-color: var(--g30);
  transition: left 0.3s ease;
`;
