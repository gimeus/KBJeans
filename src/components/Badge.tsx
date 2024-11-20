import React from 'react';
import styled from 'styled-components';

interface BadgeProps {
  icon: string;
  title: string;
  date: string;
  isActive: boolean;
}

const Badge: React.FC<BadgeProps> = ({ icon, title, date, isActive }) => {
  return (
    <BadgeWrapper isActive={isActive}>
      <BadgeIcon src={icon} alt={`${title} 아이콘`} />
      <BadgeTitle isActive={isActive}>{title}</BadgeTitle>
      <BadgeDate>{date}</BadgeDate>
    </BadgeWrapper>
  );
};

export default Badge;

const BadgeWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BadgeIcon = styled.img`
  width: 86px;
  height: auto;
  margin-bottom: 14px;
`;

const BadgeTitle = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  margin-bottom: 6px;
  color: ${({ isActive }) => (isActive ? 'var(--g20)' : 'var(--g40)')};
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  line-height: 100%;
`;

const BadgeDate = styled.span`
  color: var(--g40);
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  line-height: 100%;
`;
