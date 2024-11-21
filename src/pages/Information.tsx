import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Tab1 from '@/components/Tab(1)';
import Tab2 from '@/components/Tab(2)';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';
import OfferBanner from '@/components/Offerbanner';
import Card from '@/components/Card';
import { useHousing } from '@/hooks/useHousing';

const Information = () => {
  const [selectedTab1, setSelectedTab1] = useState(0);
  const [selectedTab2, setSelectedTab2] = useState(0);
  const navigate = useNavigate();
  const { housingResponse, loading, fetchHousings } = useHousing(selectedTab2);

  const tabs1 = ['청약 정보', '청약 일정', '청약 지도'];
  const tabs2 = ['전체 청약 정보', '찜한 청약 정보'];

  // 청약 상태 계산
  const getStatus = (
    startDate: string | null,
    endDate: string | null
  ): string => {
    if (!startDate || !endDate) return '접수 예정';

    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return '접수 예정';
    if (now > end) return '접수 종료';
    return '접수 시작';
  };

  // 상태에 따른 정렬 우선순위 부여
  const getStatusPriority = (status: string): number => {
    switch (status) {
      case '접수 시작':
        return 0;
      case '접수 예정':
        return 1;
      case '접수 종료':
        return 2;
      default:
        return 3;
    }
  };

  // 정렬된 주택 데이터 얻기
  const getSortedHousings = () => {
    if (!housingResponse?.data) return [];

    return [...housingResponse.data].sort((a, b) => {
      const statusA = getStatus(
        a.subscrpt_rcept_bgnde || a.rcept_bgnde,
        a.subscrpt_rcept_endde || a.rcept_endde
      );
      const statusB = getStatus(
        b.subscrpt_rcept_bgnde || b.rcept_bgnde,
        b.subscrpt_rcept_endde || b.rcept_endde
      );

      return getStatusPriority(statusA) - getStatusPriority(statusB);
    });
  };

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
          {loading ? (
            <SpinnerWrapper>
              <Spinner />
            </SpinnerWrapper>
          ) : (
            <div>
              {getSortedHousings().map((housing) => (
                <Card
                  key={housing.house_manage_no}
                  status={getStatus(
                    housing.subscrpt_rcept_bgnde || housing.rcept_bgnde,
                    housing.subscrpt_rcept_endde || housing.rcept_endde
                  )}
                  scale={`공급규모 ${housing.tot_suply_hshldco}세대`}
                  apartmentName={housing.house_nm}
                  address={housing.hssply_adres}
                  pblanc_no={housing.pblanc_no}
                  house_manage_no={housing.house_manage_no}
                  house_secd={housing.house_secd} // 주택구분코드 전달
                  liked={housing.isLiked}
                  userId={1} // 사용자 ID 전달
                  fetchHousings={fetchHousings} // fetchHousings 전달
                />
              ))}
            </div>
          )}
        </Content>
      )}
    </PageWrapper>
  );
};

export default Information;

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

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; /* 로딩 스피너의 영역 높이 */
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid var(--n20);
  border-top: 4px solid var(--g60);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite; /* 회전 애니메이션 */
`;
