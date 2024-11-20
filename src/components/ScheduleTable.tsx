import React from 'react';
import styled from 'styled-components';

interface TableRow {
  [key: string]: string | number;
}

interface TableProps {
  headers: string[];
  rows: TableRow[];
}

const ScheduleTable: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <TableWrapper>
      <TableTitle>청약접수</TableTitle>
      <Table>
        <thead>
          <TableHeaderRow>
            {headers.map((header, index) => (
              <TableHeader key={index}>{header}</TableHeader>
            ))}
          </TableHeaderRow>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header, colIndex) => (
                <TableCell key={colIndex}>{row[header]}</TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

export default ScheduleTable;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const TableTitle = styled.div`
  color: var(--n10);
  font-size: 14px;
  font-weight: 500;
  line-height: 100%;
  margin-bottom: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeaderRow = styled.tr`
  background-color: var(--g60);
`;

const TableHeader = styled.th`
  padding: 6px;
  color: var(--g60);
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
  width: 339px;
  height: 26px;
  flex-shrink: 0;
  background: var(--n10);
`;

const TableRow = styled.tr``;

const TableCell = styled.td`
  padding: 6px;
  color: var(--g40);
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
  border-bottom: 1px solid var(--g50);
`;
