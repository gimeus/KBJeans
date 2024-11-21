import React from "react";
import styled from "styled-components";

interface InfoSectionProps {
    title?: string;
    address?: string;
    details: { label: string; value: string }[];
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, address, details }) => {
    return (
        <Wrapper>
            <Title>{title}</Title>
            <Address>{address}</Address>
            <Details>
                {details.map((detail, index) => (
                    <DetailRow key={index}>
                        <DetailLabel>{detail.label}</DetailLabel>
                        <DetailValue>{detail.value}</DetailValue>
                    </DetailRow>
                ))}
            </Details>
        </Wrapper>
    );
};

export default InfoSection;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px 18px;
`;

const Title = styled.h1`
    margin-bottom: 12px;
    color: var(--g10);
    font-size: 20px;
    font-weight: 500;
    line-height: 100%;
`;

const Address = styled.p`
    margin-bottom: 40px;
    color: var(--g40);
    font-size: 14px;
    font-weight: 400;
    line-height: 100%;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const DetailRow = styled.div`
    display: flex;
    justify-content: space-between;
`;

const DetailLabel = styled.span`
    color: var(--n10);
    font-size: 14px;
    font-weight: 500;
    line-height: 100%;
`;

const DetailValue = styled.span`
    color: var(--g20);
    text-align: right;
    font-size: 15px;
    font-weight: 400;
    line-height: 100%;
`;
