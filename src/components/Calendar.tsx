import styled from 'styled-components';
import dayjs from 'dayjs';

interface Event {
  id: number;
  title: string;
  date: number;
  category: string;
  year: number;
  month: number;
}

const categoryColors: { [key: string]: string } = {
  특별공급: '#004EB8',
  '1순위': '#1E8F8C',
  '2순위': '#A04C7F',
  무순위: '#FF5A3B',
  임의공급: '#B6CC35',
  취소후재공급: '#666666',
};

const Calendar = ({ year, month, events, onSelectDate }: any) => {
  const startOfMonth = dayjs()
    .year(year)
    .month(month - 1)
    .startOf('month');
  const endOfMonth = dayjs()
    .year(year)
    .month(month - 1)
    .endOf('month');
  const daysInMonth = endOfMonth.date();
  const startDayOfWeek = startOfMonth.day();

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(<EmptyDay key={`empty-start-${i}`} />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isSunday = (startDayOfWeek + i - 1) % 7 === 0;

      days.push(
        <CalendarDay key={`day-${i}`} onClick={() => onSelectDate(i)}>
          <DayNumber isSunday={isSunday}>{i}</DayNumber>
          {events
            .filter(
              (event: any) =>
                event.date === i && event.year === year && event.month === month
            )
            .map((e: any, idx: number) => (
              <EventBox key={`event-${e.id}-${idx}`} category={e.category}>
                {e.title}
              </EventBox>
            ))}
        </CalendarDay>
      );
    }

    const remainingDays = (7 - (days.length % 7)) % 7;
    for (let i = 0; i < remainingDays; i++) {
      days.push(<EmptyDay key={`empty-end-${i}`} />);
    }

    return days;
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <DayName isSunday={true}>일</DayName>
        <DayName isSunday={false}>월</DayName>
        <DayName isSunday={false}>화</DayName>
        <DayName isSunday={false}>수</DayName>
        <DayName isSunday={false}>목</DayName>
        <DayName isSunday={false}>금</DayName>
        <DayName isSunday={false}>토</DayName>
      </CalendarHeader>
      <CalendarGrid>{renderDays()}</CalendarGrid>
    </CalendarContainer>
  );
};

export default Calendar;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  padding: 0 18px 16px 18px;
`;

const DayName = styled.div<{ isSunday: boolean }>`
  color: ${({ isSunday }) => (isSunday ? 'var(--r10)' : 'var(--g30)')};
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  line-height: 16px;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 1fr;
  padding: 0 18px;
`;

const CalendarDay = styled.div`
  position: relative;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: var(--g60);
  overflow: hidden;
  cursor: pointer;
`;

const EmptyDay = styled(CalendarDay)`
  background-color: var(--g60);
`;

const DayNumber = styled.div.attrs<{ isSunday: boolean }>(({ isSunday }) => ({
  // 'isSunday' prop을 DOM에 직접 전달하지 않음
}))`
  color: ${({ isSunday }) => (isSunday ? 'var(--r10)' : 'var(--g30)')};
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
`;

const EventBox = styled.div<{ category: string }>`
  padding: 2px 2px;
  font-size: 12px;
  line-height: 100%;
  max-width: 100%;
  font-weight: 400;
  color: var(--g60);
  background-color: ${({ category }) =>
    categoryColors[category] || 'var(--n30)'};
  border-radius: 2px;
  white-space: nowrap;
  overflow: hidden;
`;
