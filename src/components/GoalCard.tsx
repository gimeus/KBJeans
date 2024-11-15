import React from 'react';
import styled from 'styled-components';

interface RegionCardProps {
  label: string;
  imageSrc: string;
}

const RegionCard: React.FC<RegionCardProps> = ({ label, imageSrc }) => (
  <CardWrapper>
    <CardContainer>
      <Image src={imageSrc} alt={label} />
    </CardContainer>
    <Label>{label}</Label>
  </CardWrapper>
);

export default RegionCard;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 108px;
  justify-content: space-between;
  gap: 10px;
`;

const CardContainer = styled.div`
  border-radius: 8px;
  border: 1px solid var(--g50);
  background: var(--g60);
  width: 100%;
  height: 108px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Image = styled.img`
  width: 108px;
  height: 108px;
`;

const Label = styled.p`
  text-align: center;
  color: var(--g20);
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 100%;
`;
