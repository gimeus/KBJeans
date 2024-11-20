import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchHousingAnnouncements } from '@/api/housingApi';

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

  const [bannerData, setBannerData] = useState<{ label: string; text: string }[]>(
    []
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const loadBannerData = async () => {
      try {
        const userId = 1; // 예제 사용자 ID
        const page = 1;
        const pageSize = 3;

        const data = await fetchHousingAnnouncements(page, pageSize, userId);
        
        // API 결과에서 house_nm 값만 추출하여 bannerData로 설정
        const transformedData = data.data.map((house: { house_nm: string }) => ({
          label: 'NEW',
          text: house.house_nm,
        }));

        setBannerData(transformedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching banner data:', error);
        setIsLoading(false);
      }
    };

    loadBannerData();
  }, []);

  useEffect(() => {
    if (bannerData.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
        setIsTransitioning(true);
        setTimeout(() => setIsTransitioning(false), 500);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [bannerData]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (bannerData.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <OfferBanner
      label={bannerData[currentIndex].label}
      text={bannerData[currentIndex].text}
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
