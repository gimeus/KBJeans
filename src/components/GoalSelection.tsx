import React from 'react';
import styled from 'styled-components';
import GoalCard from '@/components/GoalCard';

import country from '/icons/country.svg';
import metropolitan from '/icons/metropolitan.svg';
import city from '/icons/city.svg';

const regions = [
  { label: '그 외 지역', imageSrc: country },
  { label: '기타 광역시', imageSrc: metropolitan },
  { label: '서울/부산', imageSrc: city },
];

const GoalSelection: React.FC = () => (
  <Wrapper>
    <CardGroup>
      {regions.map((region, index) => (
        <GoalCard key={index} label={region.label} imageSrc={region.imageSrc} />
      ))}
    </CardGroup>
  </Wrapper>
);

export default GoalSelection;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CardGroup = styled.div`
  display: flex;
  gap: 8px;
`;
