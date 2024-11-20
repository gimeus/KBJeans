import React, { useState } from 'react';
import styled from 'styled-components';

interface ApplyButtonProps {
  onClick: () => void;
}

const ApplyButton: React.FC<ApplyButtonProps> = ({ onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <Wrapper>
      <HeartIcon
        src={isFavorite ? '/icons/heart-fill.svg' : '/icons/heart.svg'}
        alt="Favorite Icon"
        onClick={handleFavoriteToggle}
      />
      <Button onClick={onClick}>신청하기</Button>
    </Wrapper>
  );
};

export default ApplyButton;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px 17px 50px 26px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--g60);
  z-index: 10;
`;

const HeartIcon = styled.img`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: var(--n10);
  padding: 19px 115px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: var(--g60);
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.34px;
`;
