import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const nextIcon = '/icons/next.svg';

const ApplyScore = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/apply-score');
  };

  return (
    <ButtonContainer onClick={handleClick}>
      <Title>청약 가점 계산기</Title>
      <Arrow src={nextIcon} alt="Next" />
    </ButtonContainer>
  );
};

export default ApplyScore;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 339px;
  height: 56px;
  padding: 0 20px;
  background-color: var(--n30);
  border-radius: 8px;
  cursor: pointer;
`;

const Title = styled.span`
  color: var(--n10);
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
`;

const Arrow = styled.img`
  width: 24px;
  height: 24px;
`;
