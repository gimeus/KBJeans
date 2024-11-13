import React from 'react';
import styled, { keyframes } from 'styled-components';

interface OfferBannerProps {
  label: string;
  text: string;
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

export default OfferBanner;

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
