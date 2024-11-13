import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Tab1 from '@/components/Tab(1)';
import Tab2 from '@/components/Tab(2)';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';
import OfferBanner from '@/components/OfferBanner';

const Component = () => {
  const [selectedTab1, setSelectedTab1] = useState(0);
  const [selectedTab2, setSelectedTab2] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const tabs1 = ['청약 정보', '청약 일정', '청약 지도'];
  const tabs2 = ['전체 청약 정보', '찜한 청약 정보'];

  // 더미 데이터
  const dummyData = [
    { label: 'NEW', text: '다산 센트럴파크단지 영구임대주택' },
    { label: 'NEW', text: '서울 강남구 청담동 신축 아파트' },
    { label: 'NEW', text: '용인 수지구 오피스텔 특별 분양' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dummyData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTab1Change = (index: number) => {
    setSelectedTab1(index);
    if (index === 1) {
      navigate('/information-calendar');
    } else if (index === 2) {
      navigate('/information-map');
    }
  };

  const handleTab2Change = (index: number) => {
    setSelectedTab2(index);
  };

  return (
    <Container>
      <HeaderMain />
      <HeaderSub title={tabs1[selectedTab1]} />
      <Tab1 tabs={tabs1} onTabChange={handleTab1Change} />
      {selectedTab1 === 0 && (
        <Tab2Container>
          <Tab2 tabs={tabs2} onTabChange={handleTab2Change} />
          <OfferBanner
            label={dummyData[currentIndex].label}
            text={dummyData[currentIndex].text}
          />
          <Content>
            {selectedTab2 === 0 && <div>전체 청약 정보 내용</div>}
            {selectedTab2 === 1 && <div>찜한 청약 정보 내용</div>}
          </Content>
        </Tab2Container>
      )}
    </Container>
  );
};

export default Component;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Tab2Container = styled.div`
  margin-top: 16px;
`;

const Content = styled.div`
  margin-top: 16px;
  padding: 16px;
`;
