import React from 'react';
import styled from 'styled-components';
import tailIcon from '/icons/tail.svg';

interface MessageProps {
  message: string;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <MessageContainer>
      <MessageContent>{message}</MessageContent>
      <Tail src={tailIcon} alt="Tail" />
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--n10);
  border-radius: 20px;
  padding: 10px 12px;
  position: relative;
  max-width: 350px;
  height: 34px;
  color: white;
  font-size: 14px;
  font-weight: 400;
`;

const MessageContent = styled.div`
  flex-grow: 1;
  text-align: center;
`;

const Tail = styled.img`
  position: absolute;
  bottom: -10px;
  right: 12px;
  width: 20px;
  height: auto;
`;
