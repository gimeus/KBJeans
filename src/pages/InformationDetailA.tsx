import styled from 'styled-components';
import InfoSection from '@/components/InfoSection';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';
import ScheduleA from '@/components/ScheduleA';
import TableComponent from '@/components/Table';
import ApplyButton from '@/components/ApplyButton';

const InformationDetailA = () => {
  const handleApplyClick = () => {
    alert('신청하기 버튼이 클릭되었습니다!');
  };

  const infoDetails = [
    { label: '공급규모', value: '53세대' },
    { label: '문의처', value: '1899-7727' },
    { label: '주택구분', value: '민영' },
  ];

  const table1Headers = ['타입', '전용면적', '공급규모 일반', '공급규모 특별'];
  const table1Rows = [
    {
      타입: '0.59.3518A',
      전용면적: '79.8921',
      '공급규모 일반': 5,
      '공급규모 특별': 7,
    },
    {
      타입: '0.59.1113B',
      전용면적: '80.61769',
      '공급규모 일반': 5,
      '공급규모 특별': 7,
    },
    {
      타입: '0.75.7637A',
      전용면적: '100.9899',
      '공급규모 일반': 7,
      '공급규모 특별': 5,
    },
    {
      타입: '0.75.7637P',
      전용면적: '100.9899',
      '공급규모 일반': 1,
      '공급규모 특별': 0,
    },
    {
      타입: '0.84.6231A',
      전용면적: '113.5201',
      '공급규모 일반': 7,
      '공급규모 특별': 5,
    },
  ];

  const table2Headers = ['타입', '공급금액'];
  const table2Rows = [
    { 타입: '0.59.3518A', 공급금액: '129,500' },
    { 타입: '0.59.1113B', 공급금액: '128,000' },
    { 타입: '0.75.7637A', 공급금액: '154,800' },
    { 타입: '0.75.7637P', 공급금액: '157,800' },
    { 타입: '0.84.6231A', 공급금액: '176,800' },
  ];

  const scheduleData = [
    { 구분: '특별공급', 해당지역: '2024.11.04', 기타지역: '2024.11.04' },
    { 구분: '1순위', 해당지역: '2024.11.05', 기타지역: '2024.11.05' },
    { 구분: '2순위', 해당지역: '2024.11.06', 기타지역: '2024.11.06' },
  ];

  return (
    <Wrapper>
      <HeaderMain backgroundColor="var(--g60)" />
      <HeaderSub title="청약 정보 상세보기" />
      <Content>
        <InfoSection
          title="VIORR(비오르)"
          address="서울특별시 강동구 천호동 356, 356-1번지"
          details={infoDetails}
        />
        <TableWrapper>
          <TableComponent headers={table1Headers} rows={table1Rows} />
          <TableComponent headers={table2Headers} rows={table2Rows} />
        </TableWrapper>
        <ScheduleA
          title="청약 일정"
          rows={scheduleData}
          모집공고일="2024.11.01"
        />
      </Content>
      <ApplyButton onClick={handleApplyClick} />
    </Wrapper>
  );
};

export default InformationDetailA;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  gap: 24px;
  padding-bottom: 120px;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;
