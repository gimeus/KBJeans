import React from 'react';
import styled from 'styled-components';
import GoalCard from '@/components/GoalCard';

import country from '/icons/country.svg';
import metropolitan from '/icons/metropolitan.svg';
import city from '/icons/city.svg';
import test1 from '/icons/access-1.svg';
import test2 from '/icons/access-10.svg';
import test3 from '/icons/access-50.svg';

interface GoalSelectionProps {
  selectedArea: string;
  subscriptionAmount: number;
  onDeficitChange: (deficit: number) => void;
}

const regions = [
  { label: '그 외 지역', activeImage: country, inactiveImage: test1 },
  { label: '기타 광역시', activeImage: metropolitan, inactiveImage: test2 },
  { label: '서울/부산', activeImage: city, inactiveImage: test3 },
];

const areaDepositLimits = {
  '85㎡ 이하 (32평)': [2000000, 2500000, 3000000],
  '102㎡ 이하 (39평)': [3000000, 4000000, 6000000],
  '135㎡ 이하 (51평)': [4000000, 7000000, 10000000],
  '모든 면적': [5000000, 10000000, 15000000],
};

const GoalSelection: React.FC<GoalSelectionProps> = ({ selectedArea, subscriptionAmount , onDeficitChange}) => {
  // 현재 선택된 희망 면적의 최소 예치금
  const requiredDeposit = areaDepositLimits[selectedArea];
  let lowestDeficit = 0; // 최소 부족 금액 계산

  return (
    <Wrapper>
      <CardGroup>
        {regions.map((region, index) => {
          const deficit = requiredDeposit[index] - subscriptionAmount;
          const isActive = deficit <= 0;

          // 가장 작은 부족 금액 업데이트
          if (!isActive && (lowestDeficit === 0 || deficit < lowestDeficit)) {
            lowestDeficit = deficit;
          }
          return (
            <GoalCard
              key={index}
              label={region.label}
              imageSrc={isActive ? region.activeImage : region.inactiveImage}
            />
          );
        })}
      </CardGroup>
      {onDeficitChange(lowestDeficit > 0 ? lowestDeficit : 0)}
    </Wrapper>
  );
};

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
