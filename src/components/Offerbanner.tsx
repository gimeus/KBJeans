import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface OfferBannerProps {
  label: string;
  text: string;
  currentIndex: number;
  isTransitioning: boolean;
}

const OfferBanner: React.FC<OfferBannerProps> = ({ label, text }) => {
  return (
    <BannerContainer>
      <Slide>
        <Label>{label}</Label>
        <Text>{text}</Text>
      </Slide>
    </BannerContainer>
  );
};

const OfferBannerContainer = () => {
  const dummyData = [
    { label: 'NEW', text: '다산 센트럴파크단지 영구임대주택' },
    { label: 'NEW', text: '서울 강남구 청담동 신축 아파트' },
    { label: 'NEW', text: '용인 수지구 오피스텔 특별 분양' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dummyData.length);
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <OfferBanner
      label={dummyData[currentIndex].label}
      text={dummyData[currentIndex].text}
      currentIndex={currentIndex}
      isTransitioning={isTransitioning}
    />
  );
};

export default OfferBannerContainer;

const BannerContainer = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: var(--g60);
  padding: 0 20px;
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  display: inline-block;
  background-color: var(--p20);
  color: var(--p10);
  text-align: center;
  font-size: 10px;
  font-weight: 600;
  line-height: 100%;
  border-radius: 12px;
  padding: 4px 6px;
  margin-right: 8px;
`;

const Text = styled.span`
  white-space: nowrap;
  color: var(--g30);
  font-size: 14px;
  font-weight: 500;
  line-height: 100%;
`;
