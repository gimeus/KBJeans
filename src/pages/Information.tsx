import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Tab1 from '@/components/Tab(1)';
import Tab2 from '@/components/Tab(2)';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';
import OfferBanner from '@/components/OfferBanner';
import Card from '@/components/Card';

const Component = () => {
  const [selectedTab1, setSelectedTab1] = useState(0);
  const [selectedTab2, setSelectedTab2] = useState(0);
  const navigate = useNavigate();

  const tabs1 = ['청약 정보', '청약 일정', '청약 지도'];
  const tabs2 = ['전체 청약 정보', '찜한 청약 정보'];

  const dummyCardData = [
    {
      status: '접수 종료',
      scale: '공급규모 4세대',
      apartmentName: '이문월드메르디앙 힐트리움 더테라스',
      address: '서울특별시 동대문구 이문동 348-11, 348-12',
    },
    {
      status: '접수 시작',
      scale: '공급규모 10세대',
      apartmentName: '강남 오피스텔',
      address: '서울특별시 강남구 역삼동 123-45',
    },
    {
      status: '접수 예정',
      scale: '공급규모 20세대',
      apartmentName: '부산 해운대 타워',
      address: '부산광역시 해운대구 해운대동 567-89',
    },
  ];

  const handleTab1Change = (index: number) => {
    setSelectedTab1(index);
    if (index === 1) {
      navigate('/information-calendar');
    } else if (index === 2) {
      navigate('/information-map');
    }
  };

  const handleTab2Change = (index: number) => {
    setSelectedTab2(index);
  };

  return (
    <PageWrapper>
      <HeaderMain />
      <HeaderSub title={tabs1[selectedTab1]} />
      <GroupWrapper>
        <Tab1 tabs={tabs1} onTabChange={handleTab1Change} />
        {selectedTab1 === 0 && (
          <>
            <Tab2Wrapper>
              <Tab2 tabs={tabs2} onTabChange={handleTab2Change} />
            </Tab2Wrapper>
            <OfferBanner />
          </>
        )}
      </GroupWrapper>
      {selectedTab1 === 0 && (
        <Content>
          {selectedTab2 === 0 && (
            <div>
              {dummyCardData.map((card, index) => (
                <Card
                  key={index}
                  status={card.status}
                  scale={card.scale}
                  apartmentName={card.apartmentName}
                  address={card.address}
                />
              ))}
            </div>
          )}
          {selectedTab2 === 1 && <div>찜한 청약 정보 내용</div>}
        </Content>
      )}
    </PageWrapper>
  );
};

export default Component;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: var(--n30);
  box-sizing: border-box;
`;

const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--g60);
  box-sizing: border-box;
`;

const Tab2Wrapper = styled.div`
  padding: 12px 0 10px 0;
  box-sizing: border-box;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
`;
