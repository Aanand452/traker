import React from 'react';
import { connect } from 'react-redux';
import {
  ButtonGroup,
  Button
} from '@salesforce/design-system-react';

import { setCurrentPage } from '../../actions/DataTable';

const Pager = props => {
  
  let { currentPage, pages, limit, items } = props.dataTable;
  let end = items.length/limit;

  let prevBtn = () => {
    if(currentPage <= 1) {
      return
    }
    props.setCurrentPage(currentPage - 1);
  }

  let nextBtn = () => {
    if(currentPage >= end) {
      return
    }
    props.setCurrentPage(currentPage + 1);
  }

  return (
    <ButtonGroup>
      <Button onClick={prevBtn} disabled={!(currentPage > 1)} label="Prev" />
      {
        pages.map(el => {
          return <Button disabled={el === currentPage} onClick={() => props.setCurrentPage(el)} label={el} />
        })
      }
      <Button onClick={nextBtn} disabled={!(currentPage < end)} label="Next" />
    </ButtonGroup>
  )
}

let mapState = ({ dataTable }) => ({
  dataTable
});

export default connect(mapState, { setCurrentPage })(Pager);