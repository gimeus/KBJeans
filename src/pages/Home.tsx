import styled from 'styled-components';
import HeaderMain from '@/components/HeaderMain';
import StatusInfo from '@/components/StatusInfo';
import ApplyScore from '@/components/ApplyScore';
import OfferBanner from '@/components/OfferBanner';
import Select from '@/components/Select';
import { useArea } from '@/context/AreaContext';
import GoalSelection from '@/components/GoalSelection';
import Message from '@/components/Message';
import { useState, useEffect } from 'react';
import { fetchDesiredArea, fetchBadgeCount, updateDesiredArea } from '@/api/userApi';
import {
  fetchUserAccounts,
  incrementDeposit,
  fetchTotalBalance,
  fetchDepositsByAccountId,
} from '@/api/accountApi';

const Home = () => {
  const { selectedArea, depositAmount, setSelectedArea } = useArea();
  // const subscriptionAmount = 150000;
  const message = '다음 건물까지 100,000원 예치';

  const [subscriptionAmount, setSubscriptionAmount] = useState<number>(0);
  const [badgeCount, setBadgeCount] = useState<number>(0);

  const areaOptions = [
    {label: '모든 면적', amount: '500-1500만원 이상 예치' },
    { label: '85㎡ 이하 (32평)', amount: '200-300만원 이상 예치' },
    { label: '102㎡ 이하 (39평)', amount: '300-600만원 이상 예치' },
    { label: '135㎡ 이하 (51평)', amount: '400-1000만원 이상 예치' },
  ];

  // 희망 면적 선택 변경 핸들러
  const handleSelectChange = async (selectedLabel: string) => {
    const selectedOption = areaOptions.find(
      (option) => option.label === selectedLabel
    );
    if (selectedOption) {
      setSelectedArea(selectedLabel, selectedOption.amount);

      try {
        const userId = 1; // 예제 사용자 ID
        const desiredAreaIndex = areaOptions.indexOf(selectedOption);

        // 서버에 업데이트 요청
        await updateDesiredArea(userId, desiredAreaIndex);
        console.log('희망 면적 업데이트 완료');
      } catch (error) {
        console.error('희망 면적 업데이트 실패:', error);
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const userId = 1; // 예시 사용자 ID
      try {
        const badges = await fetchBadgeCount(userId);
        setBadgeCount(badges);

        const depositAmount = await fetchTotalBalance(userId);
        setSubscriptionAmount(depositAmount); 
        
        // 희망 면적 데이터 가져오기
        const desiredAreaResponse = await fetchDesiredArea(userId);
        const { desiredArea } = desiredAreaResponse; // API의 desiredArea 필드
        if (desiredArea >= 0 && desiredArea < areaOptions.length) {
          const selectedOption = areaOptions[desiredArea];
          setSelectedArea(selectedOption.label, selectedOption.amount);
        }
      } 
      catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  return (
    <Wrapper>
      <HeaderMain backgroundColor="#D0F0FE" />
      <BackgroundSection>
        <StatusInfo
          badgeCount={badgeCount}
          subscriptionAmount={subscriptionAmount}
        />
        <Message message={message} />
      </BackgroundSection>
      <ContentGroup>
        <BannerGroup>
          <OfferBanner />
        </BannerGroup>
        <MainContentGroup>
          <AlignCenter>
            <ApplyScore />
          </AlignCenter>
          <Group>
            <Section>
              <SectionTitle>청약 희망 면적</SectionTitle>
              <DepositInfo>{depositAmount}</DepositInfo>
            </Section>
            <Select
              label={selectedArea}
              options={areaOptions.map((option) => option.label)}
              onSelect={handleSelectChange}
            />
          </Group>
          <Group>
            <SectionTitle>청약 지역 달성율</SectionTitle>
            <GoalSelection 
              selectedArea={selectedArea}
              subscriptionAmount={subscriptionAmount}
            />
          </Group>
        </MainContentGroup>
      </ContentGroup>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const BackgroundSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 300px;
  background: linear-gradient(180deg, #d0f0fe 4.68%, #e5f6fe 40.64%);
  position: relative;
  padding: 20px;
`;

const ContentGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const BannerGroup = styled.div`
  width: 100%;
  max-width: 375px;
`;

const MainContentGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  width: 100%;
  max-width: 375px;
  background-color: var(--g60);
`;

const AlignCenter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 10px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0 18px;
  width: 100%;
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 2px;
`;

const SectionTitle = styled.h2`
  color: var(--g20);
  font-size: 18px;
  font-weight: 600;
  line-height: 100%;
  flex: 1;
`;

const DepositInfo = styled.p`
  font-size: 14px;
  color: var(--p10);
  line-height: 100%;
  flex: 1;
  text-align: right;
`;
