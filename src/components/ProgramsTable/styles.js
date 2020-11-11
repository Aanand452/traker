import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-top: 5.6rem;  

  & .slds-page-header__name h1 {
    line-height: unset;
  }

  & .slds-table_header-fixed_container, .slds-table--header-fixed_container, .slds-table_header-fixed_scroller {
		overflow: unset !important;
	}
`; 