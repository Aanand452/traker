import styled from 'styled-components';
import { PillContainer, InputIcon } from '@salesforce/design-system-react';

const FormContainer = styled.div`
  & button.vertical-center {
    margin-top: 24px;
  }
`;

export const Container = styled.div`
  width: 100%;
  padding-top: 5.6rem;
`;
const Sfdch1NewRow = styled.h1`
  text-align: center;
  font-size: 2em;
`;

const PillContianerStyled = styled(PillContainer)`
  border: none;
  li {
    max-width: 200px;
    span {
      padding: 2px;
    }
  }
`;

const InputIconStyled = styled(InputIcon)`
  color: #0070d2;
  width: 0.875rem;
  height: 0.875rem;
  position: absolute;
  top: 50%;
  margin-top: -0.4375rem;
  line-height: 1;
  border: 0;
  z-index: 2;
  right: 0.75rem;
`;
export { FormContainer, PillContianerStyled, InputIconStyled, Sfdch1NewRow};
