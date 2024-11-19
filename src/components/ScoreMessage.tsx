import styled from 'styled-components';
import tailImage from '/icons/tail.svg';

interface ScoreMessageProps {
  title: string;
  score: number;
}

const ScoreMessage: React.FC<ScoreMessageProps> = ({ title, score }) => {
  return (
    <MessageContainer>
      <Bubble>
        <BubbleText>{title}</BubbleText>
        <ScoreValue>{score}점</ScoreValue>
      </Bubble>
      <Tail src={tailImage} alt="Bubble Tail" />
    </MessageContainer>
  );
};

export default ScoreMessage;

const MessageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bubble = styled.div`
  background-color: var(--n10);
  color: white;
  padding: 30px 40px 26px;
  border-radius: 16px;
  text-align: center;
`;

const BubbleText = styled.div`
  margin-bottom: 8px;
  color: var(--n20);
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  line-height: 100%;
`;

const ScoreValue = styled.div`
  color: var(--g60);
  text-align: center;
  font-size: 50px;
  font-weight: 500;
  line-height: 100%;
`;

const Tail = styled.img`
  position: absolute;
  bottom: -13.5px;
  width: 26px;
  height: 14px;
  right: 26px;
`;
