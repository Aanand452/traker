import styled from 'styled-components';
import { PillContainer } from '@salesforce/design-system-react';

const FormContainer = styled.div`
  & button.vertical-center {
    margin-top: 24px;
  }
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

export { FormContainer, PillContianerStyled };
