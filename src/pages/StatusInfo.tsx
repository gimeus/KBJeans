import { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';
import Tab2 from '@/components/Tab(2)';
import Badge from '@/components/Badge';
import PaymentCard from '@/components/PaymentCard';
import TotalAmount from '@/components/TotalAmount';
import { fetchBadges } from '@/api/userApi'; // API 호출 함수

const StatusInfoPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const loadBadges = async () => {
      try {
        const userId = 1; // 예제 사용자 ID
        const response = await fetchBadges(userId);

        // badgeNumber를 기반으로 아이콘 번호를 결정하는 함수
        const getBadgeIconNumber = (badgeNumber: number): string => {
          if ([1, 5, 9].includes(badgeNumber)) {
            return '1';
          } else if ([2, 6, 10].includes(badgeNumber)) {
            return '10';
          } else if ([3, 7, 11].includes(badgeNumber)) {
            return '50';
          } else if ([4, 8, 12].includes(badgeNumber)) {
            return '100';
          }
          return 'default'; // 기본값 설정 (필요 시)
        };

        // `ownedBadges`와 `unownedBadges`를 합쳐 상태 업데이트
        const combinedBadges = [
          ...response.ownedBadges.map((badge) => ({
            icon: `/icons/access-${getBadgeIconNumber(badge.badgeNumber)}.svg`,
            title: badge.badgeName,
            date: badge.receiveDate || '-',
            isActive: true,
          })),
          ...response.unownedBadges.map((badge) => ({
            icon: '/icons/badge-more.svg', // 비활성화된 뱃지 기본 아이콘
            title: badge.badgeName,
            date: '-', // date를 항상 '-'로 설정
            isActive: false,
          })),
        ];
        
        

        setBadges(combinedBadges);
      } catch (error) {
        console.error('Failed to fetch badges:', error);
      }
    };

    loadBadges();
  }, []);

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
                  icon={badge.icon}
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
