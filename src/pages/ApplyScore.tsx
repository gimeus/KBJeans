import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';
import Button from '@/components/Button';
import Select from '@/components/Select';

const ApplyScore = () => {
  const [birthDate, setBirthDate] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [noHousePeriod, setNoHousePeriod] = useState('');
  const [dependentCount, setDependentCount] = useState('');
  const navigate = useNavigate();

  const noHousePeriodScores = {
    '30세 미만 미혼 무주택자': 0,
    '1년 미만': 2,
    '1년 이상 ~ 2년 미만': 4,
    '2년 이상 ~ 3년 미만': 6,
    '3년 이상 ~ 4년 미만': 8,
    '4년 이상 ~ 5년 미만': 10,
    '5년 이상 ~ 6년 미만': 12,
    '6년 이상 ~ 7년 미만': 14,
    '7년 이상 ~ 8년 미만': 16,
    '8년 이상 ~ 9년 미만': 18,
    '9년 이상 ~ 10년 미만': 20,
    '10년 이상 ~ 11년 미만': 22,
    '11년 이상 ~ 12년 미만': 24,
    '12년 이상 ~ 13년 미만': 26,
    '13년 이상 ~ 14년 미만': 28,
    '14년 이상 ~ 15년 미만': 30,
    '15년 이상': 32,
  };

  const dependentScores = {
    '1명': 10,
    '2명': 15,
    '3명': 20,
    '4명': 25,
    '5명': 30,
    '6명 이상': 35,
  };

  const calculateScore = () => {
    const noHouseScore = noHousePeriodScores[noHousePeriod] || 0;
    const dependentScore = dependentScores[dependentCount] || 0;
    const joinDateScore = joinDate ? calculateJoinDateScore(joinDate) : 0;

    const totalScore = noHouseScore + dependentScore + joinDateScore;

    navigate('/score', {
      state: { totalScore, noHousePeriod, dependentCount, joinDateScore },
    });
  };

  const calculateJoinDateScore = (date: string): number => {
    const joinDate = new Date(date);
    const currentDate = new Date();
    const diffInMonths =
      (currentDate.getFullYear() - joinDate.getFullYear()) * 12 +
      (currentDate.getMonth() - joinDate.getMonth());

    if (diffInMonths < 6) return 1;
    if (diffInMonths < 12) return 2;
    if (diffInMonths < 24) return 3;
    if (diffInMonths < 36) return 4;
    return 5;
  };

  return (
    <Container>
      <HeaderMain />
      <HeaderSub title="청약 가점 계산기" />
      <Form>
        <InputSection>
          <InputContainer>
            <InputLabel>가입자 생일</InputLabel>
            <Input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>청약통장 가입일</InputLabel>
            <Input
              type="date"
              value={joinDate}
              onChange={(e) => setJoinDate(e.target.value)}
            />
          </InputContainer>
        </InputSection>
        <SelectSection>
          <SelectContainer>
            <SelectLabelWithScore>
              <SelectLabel>무주택기간</SelectLabel>
              {noHousePeriod && (
                <ScoreText>{noHousePeriodScores[noHousePeriod]}점</ScoreText>
              )}
            </SelectLabelWithScore>
            <Select
              label="무주택기간 선택"
              options={Object.keys(noHousePeriodScores)}
              onSelect={(option) => setNoHousePeriod(option)}
            />
          </SelectContainer>
          <SelectContainer>
            <SelectLabelWithScore>
              <SelectLabel>부양가족수</SelectLabel>
              {dependentCount && (
                <ScoreText>{dependentScores[dependentCount]}점</ScoreText>
              )}
            </SelectLabelWithScore>
            <Select
              label="부양가족수 선택"
              options={Object.keys(dependentScores)}
              onSelect={(option) => setDependentCount(option)}
            />
          </SelectContainer>
        </SelectSection>
      </Form>
      <Button onClick={calculateScore}>계산하기</Button>
    </Container>
  );
};

export default ApplyScore;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--g60);
  min-height: 100vh;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  padding: 20px 18px 0 18px;
`;

const InputSection = styled.div``;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

const InputLabel = styled.label`
  color: var(--g10);
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 14px;
  line-height: 100%;
  margin-left: 2px;
`;

const Input = styled.input`
  color: var(--g40);
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
  padding: 20px;
  appearance: none;
  border-radius: 8px;
  border: 1px solid var(--g50);
  background: var(--g60);
`;

const SelectSection = styled.div``;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

const SelectLabelWithScore = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  margin-left: 2px;
`;

const SelectLabel = styled.span`
  color: var(--g10);
  font-size: 18px;
  font-weight: 600;
  line-height: 100%;
`;

const ScoreText = styled.span`
  color: var(--p10);
  text-align: right;
  font-size: 15px;
  font-weight: 400;
  line-height: 100%;
  margin-right: 4px;
`;
