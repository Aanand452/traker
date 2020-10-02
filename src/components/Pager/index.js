import React, { useState, useEffect } from 'react';
import { ButtonGroup, Button } from '@salesforce/design-system-react';

import { PagerContainer } from './styles';

const Pager = props => {
  const { data, itemsPerPage, setDisplayedItems } = props;

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([1]);

  const getPages = () => {
    const newPage = [];

    for (let i = 0; i < Math.ceil(data.length/itemsPerPage); i++) {
      newPage.push(i+1);
    }

    return newPage;
  };

  const nextPage = () => {
    let newPage = 1;
    if (page+1 <= Math.ceil(data.length/itemsPerPage)) newPage = page+1;

    setPage(newPage);
    getCurrentData(newPage);
  };

  const prevPage = () => {
    let newPage = 1;
    if (page-1 >= 1) newPage = page-1; 

    setPage(newPage);
    getCurrentData(newPage);
  };

  const goToPage = (currentPage) => {
    setPage(currentPage);
    getCurrentData(currentPage);
  };

  const getCurrentData = (currentPage) => {
    const start = (itemsPerPage*currentPage)-itemsPerPage;
    const end = (itemsPerPage*currentPage);
    const newData = data.slice(start, end);
    
    setDisplayedItems(newData);
  };

  useEffect(() => {
    setPages(getPages);
    getCurrentData(page);
  }, [data]);

  return (
    <PagerContainer>
      {(pages.length > 1) && (
        <ButtonGroup>
          <Button disabled={page === 1} onClick={prevPage} label="Prev" />
          {pages.map((el, index) => (
            <Button className={page === index+1 ? 'active' :''} disabled={page === index+1} onClick={() => goToPage(index+1)} label={el} key={`${index}-${el||''}`} />
          ))}
          <Button onClick={nextPage} disabled={page === Math.ceil(data.length/itemsPerPage)} label="Next" />
        </ButtonGroup>
      )}
    </PagerContainer>
  );
};

export default Pager;