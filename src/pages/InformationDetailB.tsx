import styled from 'styled-components';
import InfoSection from '@/components/InfoSection';
import TableComponent from '@/components/Table';
import ScheduleB from '@/components/ScheduleB';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';
import ApplyButton from '@/components/ApplyButton';

const InformationDetailB = () => {
  const infoDetails = [
    { label: '공급규모', value: '4세대' },
    { label: '문의처', value: '02-995-5949' },
    { label: '주택구분', value: '도시형생활주택' },
  ];

  const tableHeaders = ['타입', '전용면적', '공급규모', '공급금액'];
  const tableRows = [
    { 타입: '75D', 전용면적: '75.6300', 공급규모: '1', 공급금액: '87,100' },
    { 타입: '77E', 전용면적: '77.8200', 공급규모: '1', 공급금액: '81,100' },
    { 타입: '79A', 전용면적: '79.9600', 공급규모: '1', 공급금액: '84,500' },
    { 타입: '83B', 전용면적: '83.8900', 공급규모: '1', 공급금액: '84,500' },
  ];

  const scheduleItems = [
    { label: '모집공고일', value: '2024.11.06' },
    { label: '청약접수', value: '2024.11.18 ~ 2024.11.18' },
    { label: '당첨자 발표일', value: '2024.11.21' },
    { label: '계약일', value: '2024.11.25 ~ 2024.11.25' },
  ];

  const handleApplyClick = () => {
    alert('주택 청약 공고 링크로 이동이 됩니다.');
  };

  return (
    <Wrapper>
      <HeaderMain backgroundColor="var(--g60)" />
      <HeaderSub title="청약 정보 상세보기" />

      <Content>
        <InfoSection
          title="이문월드메르디앙 힐트리움 더테라스"
          address="서울특별시 동대문구 이문동 348-11, 348-12"
          details={infoDetails}
        />
        <TableComponent headers={tableHeaders} rows={tableRows} />
        <ScheduleB items={scheduleItems} />
      </Content>
      <ApplyButton onClick={handleApplyClick} />
    </Wrapper>
  );
};

export default InformationDetailB;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 120px;
`;
