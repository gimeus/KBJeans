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
import {
  fetchDesiredArea,
  fetchBadgeCount,
  updateDesiredArea,
} from '@/api/userApi';
import { fetchTotalBalance } from '@/api/accountApi';

const Home = () => {
  const { selectedArea, setSelectedArea } = useArea();
  const [subscriptionAmount, setSubscriptionAmount] = useState<number>(0);
  const [badgeCount, setBadgeCount] = useState<number>(0);
  const [deficit, setDeficit] = useState<number>(0);
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [rectangleText, setRectangleText] = useState<string>('');
  const [characterImage, setCharacterImage] = useState<string>(
    '/icons/character.svg'
  );
  const [isGoalAchieved, setIsGoalAchieved] = useState<boolean>(false); // 목표 달성 여부 상태 추가

  const backgrounds = {
    '그 외 지역': '/img/background-country.png',
    '기타 광역시': '/img/background-metropolitan.png',
    '서울/부산': '/img/background-city.png',
    '모든 청약 지역 달성': '/img/background.png',
  };

  const areaDepositLimits = {
    '85㎡ 이하 (32평)': [2000000, 2500000, 3000000],
    '102㎡ 이하 (39평)': [3000000, 4000000, 6000000],
    '135㎡ 이하 (51평)': [4000000, 7000000, 10000000],
    '모든 면적': [5000000, 10000000, 15000000],
  };

  const updateBackgroundAndText = () => {
    const thresholds = areaDepositLimits[selectedArea] || [];
    if (subscriptionAmount >= thresholds[2]) {
      setBackgroundImage(backgrounds['모든 청약 지역 달성']);
      setRectangleText('');
      setCharacterImage('/icons/character-f.svg');
      setIsGoalAchieved(true);
    } else if (subscriptionAmount >= thresholds[1]) {
      setBackgroundImage(backgrounds['서울/부산']);
      setRectangleText('서울/부산');
      setCharacterImage('/icons/character.svg');
      setIsGoalAchieved(false);
    } else if (subscriptionAmount >= thresholds[0]) {
      setBackgroundImage(backgrounds['기타 광역시']);
      setRectangleText('기타 광역시');
      setCharacterImage('/icons/character.svg');
      setIsGoalAchieved(false);
    } else {
      setBackgroundImage(backgrounds['그 외 지역']);
      setRectangleText('그 외 지역');
      setCharacterImage('/icons/character.svg');
      setIsGoalAchieved(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const userId = 1;
      try {
        const badges = await fetchBadgeCount(userId);
        setBadgeCount(badges);

        const depositAmount = await fetchTotalBalance(userId);
        setSubscriptionAmount(depositAmount);

        const desiredAreaResponse = await fetchDesiredArea(userId);
        const { desiredArea } = desiredAreaResponse;

        if (
          desiredArea >= 0 &&
          desiredArea < Object.keys(areaDepositLimits).length
        ) {
          const selectedOption = Object.keys(areaDepositLimits)[desiredArea];
          setSelectedArea(selectedOption);
        }
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    updateBackgroundAndText();
  }, [subscriptionAmount, selectedArea]);

  const handleSelectChange = async (selectedLabel: string) => {
    setSelectedArea(selectedLabel);
    try {
      const userId = 1;
      const desiredAreaIndex =
        Object.keys(areaDepositLimits).indexOf(selectedLabel);
      await updateDesiredArea(userId, desiredAreaIndex);
      console.log('희망 면적 업데이트 완료');
    } catch (error) {
      console.error('희망 면적 업데이트 실패:', error);
    }
  };

  const message =
    deficit > 0
      ? `다음 건물까지\n${deficit.toLocaleString()}원 예치`
      : '모든 목표를 달성했습니다!';

  return (
    <Wrapper>
      <HeaderMain backgroundColor="#D0F0FE" />
      <StatusInfoWrapper>
        <StatusInfo
          badgeCount={badgeCount}
          subscriptionAmount={subscriptionAmount}
        />
      </StatusInfoWrapper>
      <BackgroundSection style={{ backgroundImage: `url(${backgroundImage})` }}>
        <MessageContainer>
          <Message message={message} isGoalAchieved={isGoalAchieved} />
        </MessageContainer>
        <CharacterWrapper isGoalAchieved={isGoalAchieved}>
          <CharacterImage src={characterImage} alt="Character" />
        </CharacterWrapper>
      </BackgroundSection>
      <Rectangle>
        <LeftRectangle isGoalAchieved={isGoalAchieved} />
        <CenterRectangle isGoalAchieved={isGoalAchieved} />
        <RightRectangle isGoalAchieved={isGoalAchieved}>
          <CenterText>{rectangleText}</CenterText>
        </RightRectangle>
      </Rectangle>
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
            </Section>
            <Select
              label={selectedArea}
              options={Object.keys(areaDepositLimits)}
              onSelect={handleSelectChange}
            />
          </Group>
          <Group>
            <SectionTitle>청약 지역 달성율</SectionTitle>
            <GoalSelection
              selectedArea={selectedArea}
              subscriptionAmount={subscriptionAmount}
              onDeficitChange={setDeficit}
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

const StatusInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: #d0f0fe;
  z-index: 1;
`;

const BackgroundSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 235px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom center;
  overflow: hidden;
`;

const CharacterWrapper = styled.div<{ isGoalAchieved: boolean }>`
  margin-top: ${(props) => (props.isGoalAchieved ? '18px' : '16px')};
  align-self: ${(props) => (props.isGoalAchieved ? 'center' : 'flex-start')};
  margin-left: ${(props) => (props.isGoalAchieved ? '0' : '18%')};
  position: relative;
  height: ${(props) => (props.isGoalAchieved ? '142px' : '110px')};
`;

const MessageContainer = styled.div<{ isGoalAchieved: boolean }>`
  margin-top: ${(props) => (props.isGoalAchieved ? '24px' : '16px')};
`;

const CharacterImage = styled.img`
  height: 100%;
`;

const Rectangle = styled.div<{ isGoalAchieved: boolean }>`
  display: flex;
  width: 100%;
  height: 25px;
`;

const LeftRectangle = styled.div<{ isGoalAchieved: boolean }>`
  flex: 1.2;
  background-color: ${(props) =>
    props.isGoalAchieved ? 'var(--p10)' : 'var(--p10)'};
`;

const CenterRectangle = styled.div<{ isGoalAchieved: boolean }>`
  flex: 1;
  background-color: ${(props) =>
    props.isGoalAchieved ? 'var(--p10)' : 'var(--n30)'};
`;

const RightRectangle = styled.div<{ isGoalAchieved: boolean }>`
  flex: 2;
  background-color: ${(props) =>
    props.isGoalAchieved ? 'var(--p10)' : 'var(--n30)'};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterText = styled.div`
  color: var(--n20);
  font-size: 14px;
  line-height: 25px;
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
  margin-bottom: 10px;
`;

const MainContentGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  width: 100%;
`;

const AlignCenter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0 18px;
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h2`
  color: var(--g20);
  font-size: 18px;
  font-weight: 600;
`;
