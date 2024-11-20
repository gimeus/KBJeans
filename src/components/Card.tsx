import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const heartIcon = '/icons/heart.svg';
const heartFillIcon = '/icons/heart-fill.svg';

interface CardProps {
  status: string;
  scale: string;
  apartmentName: string;
  address: string;
  pblanc_no: string;
  house_manage_no: string;
  liked: boolean;
  onLikeClick: (
    pblancNo: string,
    houseManageNo: string,
    isLiked: boolean
  ) => Promise<void>;
}

const Card: React.FC<CardProps> = ({
  status,
  scale,
  apartmentName,
  address,
  pblanc_no,
  house_manage_no,
  liked,
  onLikeClick,
}) => {
  const [isLiked, setIsLiked] = useState(liked);

  const handleHeartClick = async () => {
    // async 추가
    await onLikeClick(pblanc_no, house_manage_no, isLiked);
    setIsLiked(!isLiked);
  };

  return (
    <CardContainer>
      <TagContainer>
        <StatusTag status={status}>{status}</StatusTag>
        <ScaleTag>{scale}</ScaleTag>
        <HeartIcon
          src={isLiked ? heartFillIcon : heartIcon}
          alt="하트"
          onClick={handleHeartClick}
        />
      </TagContainer>
      <Title>{apartmentName}</Title>
      <Address>{address}</Address>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  width: 100%;
  max-width: calc(100% - 36px);
  padding: 18px;
  background-color: var(--g60);
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 10px;
  margin: 12px auto;
  box-sizing: border-box;
  overflow: hidden;
`;

const TagContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const ScaleTag = styled.span`
  color: var(--n10);
  font-size: 12px;
  font-weight: 500;
  line-height: 100%;
  margin-left: 8px;
`;

const StatusTag = styled.span<{ status: string }>`
  font-size: 11px;
  font-weight: 600;
  line-height: 100%;
  padding: 5px 6px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  ${({ status }) =>
    status === '접수 종료' &&
    css`
      background-color: var(--n30);
      color: var(--n10);
    `}
  ${({ status }) =>
    (status === '접수 예정' || status === '접수 시작') &&
    css`
      background-color: var(--p20);
      color: var(--p10);
    `}
`;

const Title = styled.h2`
  color: var(--g10);
  font-size: 18px;
  font-weight: 500;
  line-height: 100%;
  margin-bottom: 10px;
  margin-left: 2px;
`;

const Address = styled.p`
  color: var(--g40);
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
  margin-left: 2px;
`;

const HeartIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: auto;
`;
