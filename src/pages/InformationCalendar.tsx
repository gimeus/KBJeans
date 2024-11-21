import { useState, useEffect, SetStateAction } from 'react';
import styled from 'styled-components';
import HeaderMain from '@/components/HeaderMain';
import HeaderSub from '@/components/HeaderSub';
import Tab from '@/components/Tab(2)';
import Calendar from '@/components/Calendar';
import HeaderCalendar from '@/components/HeaderCalendar';
import Card from '@/components/Card';
import axios from 'axios';


const InformationCalendar = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(11);
  const [events, setEvents] = useState<any[]>([]);
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
    const filteredData = selectedTab === 0 ? filteredEvents : bookmarkedEvents;
    const eventsForSelectedDate = filteredData.filter(
      (event) =>
        event.date === date && event.month === month && event.year === year
    );
    setSelectedDateEvents(eventsForSelectedDate);
  };
  

  const getAnnouncementStatus = (announcement: any) => {
    let startDate: string;
    let endDate: string;
  
    if (announcement.house_secd === '01' || announcement.house_secd === '10') {
      startDate = announcement.rcept_bgnde;
      endDate = announcement.rcept_endde;
    } else {
      startDate = announcement.subscrpt_rcept_bgnde!;
      endDate = announcement.subscrpt_rcept_endde!;
    }
  
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // 날짜 비교 로직
    if (today >= start && today <= end) {
      return "접수 시작";
    } else if (today < start) {
      return `접수 예정`;
    } else {
      return "접수 종료";
    }
  };

  useEffect(() => {
    const loadData = async ()=>{
      const response = await axios.get<{ data: any[] }>(
        "http://localhost:8080/api/v1/housing/getMonthlyAnnouncement",
        { params: { userId: 1,
          month : month,
          year : year
        } }
      );
      const fetchedAnnouncements = response.data.data;
      const eventList: SetStateAction<any[]> = [];
      fetchedAnnouncements.forEach(data=>{
        if(data.house_secd === "01" || data.house_secd === "10"){
          if(data.gnrl_rnk1_crsparea_rcptde && data.gnrl_rnk1_crsparea_endde){
            const start = new Date(data.gnrl_rnk1_crsparea_rcptde);
            const end = new Date(data.gnrl_rnk1_crsparea_endde);
            while(start <= end){
              eventList.push({
                title: data.house_nm,
                date: start.getDate(),
                month: start.getMonth()+1,
                year: start.getFullYear(),
                category: "1순위",
                isBookmarked: data.isLiked,
                address: data.hssply_adres,
                scale: data.tot_suply_hshldco,
                status: getAnnouncementStatus(data)
              })
              start.setDate(start.getDate() + 1); 
            }
          }
          if(data.gnrl_rnk2_crsparea_rcptde && data.gnrl_rnk2_crsparea_endde){
            const start = new Date(data.gnrl_rnk2_crsparea_rcptde);
            const end = new Date(data.gnrl_rnk2_crsparea_endde);
            while(start <= end){
              eventList.push({
                title: data.house_nm,
                date: start.getDate(),
                month: start.getMonth()+1,
                year: start.getFullYear(),
                category: "2순위",
                isBookmarked: data.isLiked,
                address: data.hssply_adres,
                scale: data.tot_suply_hshldco,
                status: getAnnouncementStatus(data)
              })
              start.setDate(start.getDate() + 1); 
            }
          }
          if(data.spsply_rcept_bgnde && data.spsply_rcept_endde){
            const start = new Date(data.spsply_rcept_bgnde);
            const end = new Date(data.spsply_rcept_endde);
            while(start <= end){
              eventList.push({
                title: data.house_nm,
                date: start.getDate(),
                month: start.getMonth()+1,
                year: start.getFullYear(),
                category: "특별공급",
                isBookmarked: data.isLiked,
                address: data.hssply_adres,
                scale: data.tot_suply_hshldco,
                status: getAnnouncementStatus(data)
              })
              start.setDate(start.getDate() + 1); 
            }
          }
        }else{
          let categoryType;
          if(data.house_secd === '04'){
            categoryType = "무순위"
          }else if(data.house_secd === '06'){
            categoryType = "취소후재공급"
          }else if(data.house_secd === '11'){
            categoryType = "임의공급"
          }else{
            categoryType = "임의공급"
          }
          if(data.subscrpt_rcept_bgnde && data.subscrpt_rcept_endde){
            const start = new Date(data.subscrpt_rcept_bgnde);
            const end = new Date(data.subscrpt_rcept_endde);
            while(start <= end){
              eventList.push({
                title: data.house_nm,
                date: start.getDate(),
                month: start.getMonth()+1,
                year: start.getFullYear(),
                category: categoryType,
                isBookmarked: data.isLiked,
                address: data.hssply_adres,
                scale: data.tot_suply_hshldco,
                status: getAnnouncementStatus(data)
              })
              start.setDate(start.getDate() + 1); 
            }
          }

        }
        
      })
      setEvents(eventList);
    }
    loadData();
    
  }, [year, month]);

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
                scale={`공급규모 ${event.scale}세대`}
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
