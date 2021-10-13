import styled from 'styled-components';

const Container = styled.div`
  & .slds-spinner_container {
    position: fixed;
  }
`;
const BoxShadow = styled.div`
  width:250px;
  padding-top:30px;
  box-shadow: 10px 5px 5px gray`;


export {BoxShadow, Container}