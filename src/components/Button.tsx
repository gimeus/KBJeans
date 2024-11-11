import styled from 'styled-components';

const Button = ({ children, onClick }) => (
  <ButtonWrapper>
    <StyledButton onClick={onClick}>{children}</StyledButton>
  </ButtonWrapper>
);

export default Button;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 122px;
  background-color: var(--g60);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledButton = styled.button`
  width: calc(100% - 36px);
  height: 54px;
  background-color: var(--n10);
  color: var(--g60);
  font-size: 17px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 50px;
`;
