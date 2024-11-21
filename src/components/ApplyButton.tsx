import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const heartIcon = '/icons/heart.svg';
const heartFillIcon = '/icons/heart-fill.svg';

interface ApplyButtonProps {
  onClick: () => void;
  initialLiked: boolean; // 초기 찜 상태
  pblancNo: string; // 공고번호
  houseManageNo: string; // 주택관리번호
  userId: number; // 사용자 ID
}

const ApplyButton: React.FC<ApplyButtonProps> = ({
  onClick,
  initialLiked,
  pblancNo,
  houseManageNo,
  userId,
}) => {
  // 초기값을 props에서 받아옴
  const [isLiked, setIsLiked] = useState(initialLiked);

  useEffect(() => {
    setIsLiked(initialLiked);
  }, [initialLiked]);

  // 찜하기/취소 핸들러 추가
  const handleHeartClick = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    try {
      if (!isLiked) {
        // 찜 추가
        await axios.post('http://localhost:8080/api/v1/likes', null, {
          params: {
            userId,
            pblancNo,
            houseManageNo,
          },
        });
      } else {
        // 찜 삭제
        await axios.delete('http://localhost:8080/api/v1/likes', {
          params: {
            userId,
            pblancNo,
            houseManageNo,
          },
        });
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('찜하기 처리 실패:', error);
    }
  };

  return (
    <Wrapper>
      <HeartIcon
        src={isLiked ? heartFillIcon : heartIcon}
        alt="Favorite Icon"
        onClick={handleHeartClick} // 이벤트 핸들러 직접 전달
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
