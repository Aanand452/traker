import styled from 'styled-components';

const bgImg = ['./images/winter-background.png', './images/background.png'];

const SfdcPageAppWrapper = styled.div`
  background-color: #f4f6f9;
  background: url(${bgImg[Math.round(Math.random(bgImg*1))]}) no-repeat;
  background-size: contain;
  background-position: left 0;
  background-attachment: fixed;
  height: 100vh;
`;

export {
  SfdcPageAppWrapper
};