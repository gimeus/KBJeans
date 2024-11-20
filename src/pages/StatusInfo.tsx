import { useState } from 'react';
import styled from 'styled-components';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';
import Tab2 from '@/components/Tab(2)';
import Badge from '@/components/Badge';
import PaymentCard from '@/components/PaymentCard';
import TotalAmount from '@/components/TotalAmount';

const StatusInfoPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [badges, setBadges] = useState([
    {
      icon: '/icons/access-1.svg',
      title: '첫 발걸음',
      date: '2023.01.14',
      isActive: true,
    },
    {
      icon: '/icons/access-10.svg',
      title: '꾸준한 관심',
      date: '-',
      isActive: false,
    },
    {
      icon: '/icons/access-50.svg',
      title: '청약 마스터',
      date: '-',
      isActive: false,
    },
    {
      icon: '/icons/access-100.svg',
      title: '명예의 전당',
      date: '-',
      isActive: false,
    },
    {
      icon: '/icons/bookmark-1.svg',
      title: '첫 관심 등록',
      date: '-',
      isActive: false,
    },
    {
      icon: '/icons/bookmark-10.svg',
      title: '꾸준한 관심자',
      date: '-',
      isActive: false,
    },
    {
      icon: '/icons/bookmark-50.svg',
      title: '정보 애호가',
      date: '-',
      isActive: false,
    },
    {
      icon: '/icons/bookmark-100.svg',
      title: '정보 수집가',
      date: '-',
      isActive: false,
    },
    {
      icon: '/icons/savings-1.svg',
      title: '첫 저축',
      date: '-',
      isActive: false,
    },
    {
      icon: '/icons/savings-10.svg',
      title: '저축의 시작',
      date: '-',
      isActive: false,
    },
    {
      icon: '/icons/savings-50.svg',
      title: '꾸준한 저축가',
      date: '-',
      isActive: false,
    },
    {
      icon: '/icons/savings-100.svg',
      title: '저축의 달인',
      date: '-',
      isActive: false,
    },
  ]);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <HeaderMain backgroundColor="var(--g60)" />
        <HeaderSub title="" />
      </HeaderWrapper>
      <TabWrapper>
        <Tab2 tabs={['내 납입금액', '내 뱃지']} onTabChange={handleTabChange} />
      </TabWrapper>
      <Content>
        {activeTab === 0 && (
          <>
            <TotalAmount totalAmount={150000} />
            <PaymentHistorySection>
              <PaymentHistory>
                {[
                  { date: '11. 01', description: '3회차', amount: 50000 },
                  { date: '10. 01', description: '2회차', amount: 50000 },
                  { date: '09. 01', description: '1회차', amount: 50000 },
                ].map((payment, index) => (
                  <PaymentCard
                    key={index}
                    date={payment.date}
                    description={payment.description}
                    amount={payment.amount}
                  />
                ))}
              </PaymentHistory>
            </PaymentHistorySection>
          </>
        )}
        {activeTab === 1 && (
          <BadgeGridSection>
            <BadgeGrid>
              {badges.map((badge, index) => (
                <Badge
                  key={index}
                  icon={badge.isActive ? badge.icon : '/icons/badge-more.svg'}
                  title={badge.title}
                  date={badge.date}
                  isActive={badge.isActive}
                />
              ))}
            </BadgeGrid>
          </BadgeGridSection>
        )}
      </Content>
    </Wrapper>
  );
};

export default StatusInfoPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const TabWrapper = styled.div`
  flex-shrink: 0;
  margin-top: 10px;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  overflow-y: auto;
`;

const PaymentHistorySection = styled.div`
  flex: 1;
  background-color: var(--n30);
  padding: 18px;
  border-radius: 8px;
`;

const PaymentHistory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BadgeGridSection = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 40px 20px;
  overflow-y: auto;
`;

const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 24px;
  column-gap: 18px;
  justify-items: center;
`;
