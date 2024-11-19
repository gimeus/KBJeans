import { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';
import Tab from '@/components/Tab(2)';
import Calendar from '@/components/Calendar';
import HeaderCalendar from '@/components/HeaderCalendar';
import Card from '@/components/Card';

const dummyEvents = [
  {
    id: 1,
    title: 'VIORR(비오르)',
    date: 10,
    month: 11,
    year: 2024,
    category: '2순위',
    isBookmarked: false,
    address: '서울특별시 강남구 역삼동',
    scale: '공급규모 4세대',
    status: '접수 시작',
  },
  {
    id: 2,
    title: '이문 월드메르디앙 힐트리움 더 테라스',
    date: 15,
    month: 11,
    year: 2024,
    category: '특별공급',
    isBookmarked: true,
    address: '서울특별시 동대문구 이문동',
    scale: '공급규모 4세대',
    status: '접수 예정',
  },
  {
    id: 3,
    title: '이문 월드메르디앙 힐트리움 더 테라스',
    date: 20,
    month: 11,
    year: 2024,
    category: '무순위',
    isBookmarked: false,
    address: '서울특별시 동대문구 이문동',
    scale: '공급규모 4세대',
    status: '접수 종료',
  },
  {
    id: 4,
    title: 'VIORR(비오르)',
    date: 10,
    month: 12,
    year: 2024,
    category: '2순위',
    isBookmarked: true,
    address: '서울특별시 강남구 역삼동',
    scale: '공급규모 4세대',
    status: '접수 시작',
  },
];

const InformationCalendar = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(11);
  const [events, setEvents] = useState<any[]>(dummyEvents);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedDateEvents, setSelectedDateEvents] = useState<any[]>([]);

  const tabs = ['전체 청약 캘린더', '찜한 청약 캘린더'];

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  const handleDateChange = (newYear: number, newMonth: number) => {
    setYear(newYear);
    setMonth(newMonth);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((item) => item !== filter)
        : [...prevFilters, filter]
    );
  };

  const handleBookmarkChange = (id: number) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id
          ? { ...event, isBookmarked: !event.isBookmarked }
          : event
      )
    );
  };

  const filteredEvents = events.filter((event) =>
    selectedFilters.length > 0 ? selectedFilters.includes(event.category) : true
  );

  const bookmarkedEvents = events.filter((event) => event.isBookmarked);

  const handleSelectDate = (date: number) => {
    const eventsForSelectedDate = events.filter(
      (event) =>
        event.date === date && event.month === month && event.year === year
    );
    setSelectedDateEvents(eventsForSelectedDate);
  };

  useEffect(() => {
    setEvents(dummyEvents);
  }, []);

  return (
    <Container>
      <HeaderMain />
      <HeaderSub title="청약 정보" />
      <TabWrapper>
        <Tab tabs={tabs} onTabChange={handleTabChange} />
      </TabWrapper>
      <HeaderCalendarWrapper>
        <HeaderCalendar
          onDateChange={handleDateChange}
          onFilterChange={handleFilterChange}
        />
      </HeaderCalendarWrapper>
      <Content>
        <CalendarSection>
          <Calendar
            year={year}
            month={month}
            events={selectedTab === 0 ? filteredEvents : bookmarkedEvents}
            onBookmarkChange={handleBookmarkChange}
            onSelectDate={handleSelectDate}
          />
        </CalendarSection>

        <EventCardsWrapper>
          {selectedDateEvents.length > 0 ? (
            selectedDateEvents.map((event) => (
              <Card
                key={event.id}
                status={event.status}
                scale={event.scale}
                apartmentName={event.title}
                address={event.address}
              />
            ))
          ) : (
            <NoEventsText>
              선택한 날짜에 해당하는 청약 정보가 없습니다.
            </NoEventsText>
          )}
        </EventCardsWrapper>
      </Content>
    </Container>
  );
};

export default InformationCalendar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Content = styled.div`
  margin-top: 20px;
`;

const CalendarSection = styled.div`
  background-color: var(--g60);
`;

const EventCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--n30);
`;

const NoEventsText = styled.p`
  color: var(--n20);
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  line-height: 100%;
  padding: 62px 0;
`;

const TabWrapper = styled.div`
  margin-top: 10px;
`;

const HeaderCalendarWrapper = styled.div`
  margin-top: 20px;
`;
