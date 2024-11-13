import React, { useState } from 'react';
import styled from 'styled-components';

const dateIcon = '/icons/choice.svg';
const filterIcon = '/icons/multimedia.svg';

const HeaderCalendar = () => {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(11);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(e.target.value));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(Number(e.target.value));
  };

  return (
    <Container>
      <DateContainer>
        <DateText onClick={handleDateClick}>
          {year}. {month.toString().padStart(2, '0')}
        </DateText>
        <DateIcon src={dateIcon} alt="날짜 선택" onClick={handleDateClick} />
      </DateContainer>
      <FilterIcon src={filterIcon} alt="카테고리 선택" />
      {isDatePickerOpen && (
        <DatePicker>
          <Select value={year} onChange={handleYearChange}>
            {[2023, 2024, 2025].map((yr) => (
              <option key={yr} value={yr}>
                {yr}년
              </option>
            ))}
          </Select>
          <Select value={month} onChange={handleMonthChange}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((mth) => (
              <option key={mth} value={mth}>
                {mth}월
              </option>
            ))}
          </Select>
        </DatePicker>
      )}
    </Container>
  );
};

export default HeaderCalendar;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: var(--g60);
  padding: 0 28px 0 24px;
  position: relative;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  cursor: pointer;
`;

const DateText = styled.span`
  color: var(--g10);
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 100%;
  margin-right: 4px;
`;

const DateIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const FilterIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: auto;
`;

const DatePicker = styled.div`
  position: absolute;
  top: 42px;
  left: 20px;
  background-color: var(--g60);
  border: 0.75px solid var(--g50);
  border-radius: 8px;
  box-shadow: 0 0px 6px rgba(0, 0, 0, 0.05);
  padding: 12px;
  display: flex;
  gap: 6px;
`;

const Select = styled.select`
  border: none;
  appearance: none;
  cursor: pointer;
  color: var(--g20);
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
`;
