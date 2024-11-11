import React, { useState } from 'react';
import styled from 'styled-components';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';
import Button from '@/components/Button';
import Select from '@/components/Select';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState('200-300만원 이상 예치');

  const handleButtonClick = () => {
    navigate('/');
  };

  const areaOptions = [
    { label: '85㎡ 이하 (32평)', amount: '200-300만원 이상 예치' },
    { label: '102㎡ 이하 (39평)', amount: '300-600만원 이상 예치' },
    { label: '135㎡ 이하 (51평)', amount: '400-1000만원 이상 예치' },
    { label: '모든 면적', amount: '500-1500만원 이상 예치' },
  ];

  const handleSelectChange = (selectedLabel) => {
    const selectedOption = areaOptions.find(
      (option) => option.label === selectedLabel
    );
    if (selectedOption) {
      setSelectedAmount(selectedOption.amount);
    }
  };

  return (
    <Container>
      <HeaderMain />
      <HeaderSub title="희망 면적 선택" />
      <Content>
        <TextSection>
          <Label>희망하는 면적을 선택해주세요</Label>
          <DepositInfo>
            <span>예치금</span>
            <DepositAmount>{selectedAmount}</DepositAmount>
          </DepositInfo>
        </TextSection>

        <SelectSection>
          <Select
            label="면적 선택"
            options={areaOptions.map((option) => option.label)}
            onSelect={handleSelectChange}
          />
        </SelectSection>

        <InfoBox>
          <InfoTitle>주택 청약 예치금 기준</InfoTitle>
          <InfoDescription>
            <Highlight>거주 지역</Highlight>과 <Highlight>주택 면적</Highlight>
            을 선택하여 예치금 기준을 확인하세요.
          </InfoDescription>
          <InfoImage
            src="/img/deposit-standard.png"
            alt="주택 청약 예치금 기준"
          />
        </InfoBox>
      </Content>
      <Footer>
        <Button onClick={handleButtonClick}>청약 도우미 시작하기</Button>
      </Footer>
    </Container>
  );
};

export default Onboarding;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Label = styled.p`
  color: var(--g30);
  font-size: 18px;
  font-weight: 400;
  line-height: 100%;
  padding: 0 2px;
`;

const DepositInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--g40);
  font-size: 15px;
  font-weight: 400;
  line-height: 100%;
  padding: 0 2px;
`;

const DepositAmount = styled.span`
  color: var(--p10);
  font-size: 15px;
  font-weight: 400;
`;

const SelectSection = styled.div``;

const InfoBox = styled.div`
  background-color: var(--n30);
  padding: 22px 12px 14px 12px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoTitle = styled.p`
  color: var(--g30);
  font-size: 20px;
  font-weight: 600;
  line-height: 100%;
  padding-left: 6px;
`;

const InfoDescription = styled.p`
  font-size: 16px;
  color: var(--g30);
  font-weight: 300;
  line-height: 140%;
  padding-left: 6px;
`;

const Highlight = styled.span`
  color: var(--p10);
  font-size: 16px;
  font-weight: 300;
  line-height: 140%;
`;

const InfoImage = styled.img`
  width: 100%;
`;

const Footer = styled.div``;
