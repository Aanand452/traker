import React, { useState, useEffect } from 'react';
import { ButtonGroup, Button } from '@salesforce/design-system-react';

import { PagerContainer } from './styles';
import { get } from 'lodash';

const Pager = props => {
  const { data, itemsPerPage, setDisplayedItems } = props;

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([1]);

  // let end = items.length/limit;

  // let prevBtn = () => {
  //   if(currentPage <= 1) {
  //     return
  //   }
  //   props.setCurrentPage(currentPage - 1);
  // }

  // let nextBtn = () => {
  //   if(currentPage >= end) {
  //     return
  //   }
  //   props.setCurrentPage(currentPage + 1);
  // }

  const getPages = () => {
    const newPage = [];

    for (let i = 0; i < Math.ceil(data.length/itemsPerPage); i++) {
      newPage.push(i+1);
    }

    return newPage;
  };

  useEffect(() => {
    setPages(getPages);
  }, [data]);

  return (
    <PagerContainer>
      {(pages.length > 1) && (
        <ButtonGroup>
          <Button onClick={() => {}} label="Prev" />
          {pages.map((el, index) => {
            console.log(index);
            return <Button disabled={false} onClick={() => {}} label={el} />
          })}
          <Button onClick={() => {}} disabled={false} label="Next" />
        </ButtonGroup>
      )}
    </PagerContainer>
  );
};

export default Pager;