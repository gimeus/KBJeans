import { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';
import Tab2 from '@/components/Tab(2)';
import Badge from '@/components/Badge';
import PaymentCard from '@/components/PaymentCard';
import TotalAmount from '@/components/TotalAmount';
import { fetchDepositsByAccountId } from '@/api/accountApi'; // API 호출 함수
import { fetchBadges } from '@/api/userApi'; // API 호출 함수

const StatusInfoPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [badges, setBadges] = useState([]);
  const [payments, setPayments] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // 뱃지 데이터 로드
    const loadBadges = async () => {
      try {
        const userId = 1; // 예제 사용자 ID
        const response = await fetchBadges(userId);
    
        const combinedBadges = [
          ...response.ownedBadges.map((badge) => ({
            icon: `/icons/${getBadgeIconFileName(badge.badgeNumber)}`,
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

    const getBadgeIconFileName = (badgeNumber: number): string => {
      // 카테고리 매핑
      const categories = ['access', 'savings', 'bookmark'];
    
      // 배지 번호를 기준으로 카테고리와 숫자 결정
      const categoryIndex = Math.floor((badgeNumber - 1) / 4); // 카테고리 결정 (0: access, 1: savings, 2: bookmark)
      const iconNumber = [1, 10, 50, 100][(badgeNumber - 1) % 4]; // 배지 번호에 따라 숫자 결정
    
      // 파일 이름 생성
      return `${categories[categoryIndex]}-${iconNumber}.svg`;
    };

    // 납입 데이터 로드
    const loadPayments = async () => {
      try {
        const accountId = 1; // 예제 계좌 ID
        const response = await fetchDepositsByAccountId(accountId);

        const total = response.reduce((sum: number, payment: any) => sum + payment.depositAmount, 0);
        setTotalAmount(total);

        const formattedPayments = response.map((payment: any) => ({
          date: payment.depositDate,
          description: `${payment.depositId}회차`, // 회차를 예제로 표시
          amount: payment.depositAmount,
        }));

        setPayments(formattedPayments);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      }
    };

    loadBadges();
    loadPayments();
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
            <TotalAmount totalAmount={totalAmount} />
            <PaymentHistorySection>
              <PaymentHistory>
                {payments.map((payment, index) => (
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
