import styled from 'styled-components';

export const NavContainer = styled.div`
  & .slds-context-bar {
    position: fixed;
    width: 100%;
    top: 50px;
    left: 0;
    z-index: 99;
  }

  & .progress-bar {
    position: fixed;
    width: 100%;
    top: 90px;
    left: 0;
    z-index: 99;
  }

  > .slds-notification-bar > .slds-media__body {
    flex: inherit;
  }
`;
