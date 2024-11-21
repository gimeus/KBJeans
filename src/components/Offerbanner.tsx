import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { HousingResponse } from '@/types/housing';

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
  const [bannerData, setBannerData] = useState<
    { label: string; text: string }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBannerData = async () => {
      try {
        const userId = 1;
        const response = await axios.get<HousingResponse>(
          'http://localhost:8080/api/v1/housing/getAnnouncement',
          {
            params: {
              page: 1,
              pageSize: 10,
              userId,
            },
          }
        );

        // 최근 2일 이내의 공고만 필터링
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 30);

        const recentAnnouncements = response.data.data
          .filter((housing) => {
            const announceDate = new Date(housing.rcrit_pblanc_de);
            return announceDate >= twoDaysAgo && announceDate <= new Date();
          })
          .map((housing) => ({
            label: 'NEW',
            text: housing.house_nm,
          }));

        setBannerData(recentAnnouncements);
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

  if (isLoading || bannerData.length === 0) {
    return null; // 로딩 중이거나 데이터가 없으면 아무것도 표시하지 않음
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
