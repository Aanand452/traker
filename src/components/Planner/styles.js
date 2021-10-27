import styled from "styled-components";

export const Container = styled.div`
  background-color: #f4f6f9;
`;

export const Banner = styled.img`
  margin-top: 50px;
`;

export const CardsContainer = styled.ul`
  display: flex;
  justify-content: space-around;
`;

export const Card = styled.li`
  background-color: #2a7c6f;
  width: 22%;
  margin: 1.5rem 0;
  transition: transform 0.4s;
  text-decoration: none;
  &:hover {
    transform: scale(1.05);
    text-decoration: none;
  }
`;

export const CardTitle = styled.h3`
  text-align: center;
  font-size: 1.2rem;
  background-color: #2a7c6f;
  color: white;
  text-transform: uppercase;
  text-decoration: none;
  margin: 1.3rem 0;
  &:hover {
    text-decoration: none;
  }
`;

export const CardBody = styled.div`
  width: 100%;
  text-align: center;
`;

export const CardAction = styled.div`
  width: 100%;
  text-align: center;
  margin: 1rem 0;
`;

export const CardImage = styled.img`
  border-radius: none;
`;
