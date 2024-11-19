import { useState } from 'react';
import styled from 'styled-components';

const dateIcon = '/icons/choice.svg';
const filterIcon = '/icons/multimedia.svg';

interface HeaderCalendarProps {
  onDateChange: (year: number, month: number) => void;
  onFilterChange: (filter: string) => void;
}

const HeaderCalendar: React.FC<HeaderCalendarProps> = ({
  onDateChange,
  onFilterChange,
}) => {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(11);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleDateClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = Number(e.target.value);
    setYear(newYear);
    onDateChange(newYear, month);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = Number(e.target.value);
    setMonth(newMonth);
    onDateChange(year, newMonth);
  };

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((item) => item !== filter)
        : [...prevFilters, filter]
    );

    // 필터 변경시 onFilterChange 호출
    onFilterChange(filter);
  };

  return (
    <Container>
      <DateContainer>
        <DateText onClick={handleDateClick}>
          {year}. {month.toString().padStart(2, '0')}
        </DateText>
        <DateIcon src={dateIcon} alt="날짜 선택" onClick={handleDateClick} />
      </DateContainer>
      <FilterIcon
        src={filterIcon}
        alt="카테고리 선택"
        onClick={handleFilterClick}
      />
      {isFilterOpen && (
        <FilterMenu>
          <FilterOption
            color="#004EB8"
            onClick={() => handleFilterChange('특별공급')}
          >
            <Checkbox
              type="checkbox"
              checked={selectedFilters.includes('특별공급')}
              onChange={() => handleFilterChange('특별공급')}
            />
            <Label>특별공급</Label>
          </FilterOption>
          <FilterOption
            color="#1d8f8c"
            onClick={() => handleFilterChange('1순위')}
          >
            <Checkbox
              type="checkbox"
              checked={selectedFilters.includes('1순위')}
              onChange={() => handleFilterChange('1순위')}
            />
            <Label>1순위</Label>
          </FilterOption>
          <FilterOption
            color="#9f4d7f"
            onClick={() => handleFilterChange('2순위')}
          >
            <Checkbox
              type="checkbox"
              checked={selectedFilters.includes('2순위')}
              onChange={() => handleFilterChange('2순위')}
            />
            <Label>2순위</Label>
          </FilterOption>
          <FilterOption
            color="#ff5a3c"
            onClick={() => handleFilterChange('무순위')}
          >
            <Checkbox
              type="checkbox"
              checked={selectedFilters.includes('무순위')}
              onChange={() => handleFilterChange('무순위')}
            />
            <Label>무순위</Label>
          </FilterOption>
          <FilterOption
            color="#b6cc35"
            onClick={() => handleFilterChange('임의공급')}
          >
            <Checkbox
              type="checkbox"
              checked={selectedFilters.includes('임의공급')}
              onChange={() => handleFilterChange('임의공급')}
            />
            <Label>임의공급</Label>
          </FilterOption>
          <FilterOption
            color="#666666"
            onClick={() => handleFilterChange('취소후재공급')}
          >
            <Checkbox
              type="checkbox"
              checked={selectedFilters.includes('취소후재공급')}
              onChange={() => handleFilterChange('취소후재공급')}
            />
            <Label>취소후재공급</Label>
          </FilterOption>
        </FilterMenu>
      )}
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
  cursor: pointer;
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

const FilterMenu = styled.div`
  position: absolute;
  top: 42px;
  right: 20px;
  background-color: var(--g60);
  border: 0.75px solid var(--g50);
  border-radius: 8px;
  box-shadow: 0 0px 6px rgba(0, 0, 0, 0.05);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 1;
`;

const FilterOption = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  background-color: ${({ color }) => color};
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
  color: var(--g60);
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const Label = styled.label`
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
`;
