import React from 'react';
import styled from 'styled-components';
import tailIcon from '/icons/tail.svg';

interface MessageProps {
  message: string;
  isGoalAchieved: boolean; // 새로운 props 추가
}

const Message: React.FC<MessageProps> = ({ message, isGoalAchieved }) => {
  const [line1, line2] = message.split('\n');

  return (
    <MessageContainer>
      <MessageContent>
        {line2 ? (
          <>
            <Line1>{line1}</Line1>
            <Line2>{line2}</Line2>
          </>
        ) : (
          <SingleLine>{line1}</SingleLine>
        )}
      </MessageContent>
      <Tail isGoalAchieved={isGoalAchieved} src={tailIcon} alt="Tail" />
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--n10);
  border-radius: 20px;
  padding: 8px 14px;
  position: relative;
  max-width: 350px;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  flex-grow: 1;
`;

const Line1 = styled.div`
  line-height: 1.5;
  color: var(--n20);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`;

const Line2 = styled.div`
  color: var(--g60);
  font-size: 18px;
  font-weight: 400;
  line-height: 1.4;
`;

const SingleLine = styled.div`
  font-size: 15px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--g60);
`;

const Tail = styled.img<{ isGoalAchieved: boolean }>`
  position: absolute;
  bottom: -6px;
  left: ${(props) => (props.isGoalAchieved ? '50%' : '20px')};
  transform: ${(props) => (props.isGoalAchieved ? 'translateX(-50%)' : 'none')};
  width: 11px;
  height: auto;
`;
