import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const KBStarBanking = () => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate('/onboarding-intro');
  };

  return (
    <Container>
      <Image src="/img/kb-starbanking.png" alt="KB Star Banking" />
      <ServiceListImage
        src="/img/service.png"
        alt="KB 부동산 서비스 목록"
        onClick={handleImageClick}
      />
    </Container>
  );
};

export default KBStarBanking;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  max-width: 375px;
`;

const ServiceListImage = styled.img`
  width: 100%;
  max-width: 375px;
  margin-top: 2px;
`;
