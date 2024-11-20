import React from 'react';
import styled from 'styled-components';
import GoalCard from '@/components/GoalCard';

import country from '/icons/country.svg';
import metropolitan from '/icons/metropolitan.svg';
import city from '/icons/city.svg';
import test1 from '/icons/country-c.svg';
import test2 from '/icons/metropolitan-c.svg';
import test3 from '/icons/city-c.svg';

interface GoalSelectionProps {
  selectedArea: string;
  subscriptionAmount: number;
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

const GoalSelection: React.FC<GoalSelectionProps> = ({
  selectedArea,
  subscriptionAmount,
  onDeficitChange,
}) => {
  // 현재 선택된 희망 면적의 최소 예치금을 안전하게 가져오기
  const requiredDeposit = areaDepositLimits[selectedArea] || []; // 기본값으로 빈 배열 설정
  let lowestDeficit = 0; // 최소 부족 금액 계산

  return (
    <Wrapper>
      <CardGroup>
        {regions.map((region, index) => {
          // requiredDeposit[index]가 유효한지 확인 후 계산
          const depositRequirement = requiredDeposit[index];
          const deficit =
            depositRequirement !== undefined
              ? depositRequirement - subscriptionAmount
              : Infinity;
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
      {/* 부모 컴포넌트로 최소 부족 금액 전달 */}
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
