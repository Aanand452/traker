import React, { useState, useEffect, memo } from "react";
import { ButtonGroup, Button } from "@salesforce/design-system-react";

import { PagerContainer } from "./styles";

const areEqual = (prev, next) =>
  prev.data === next.data && prev.currentPage === next.currentPage;

const pagesPerView = 14;
const Pager = memo((props) => {
  const { data, itemsPerPage, setDisplayedItems, currentPage: page } = props;
  const [pages, setPages] = useState([1]);
  const maxPages =
    itemsPerPage === 0 ? 1 : Math.ceil(data.length / itemsPerPage);
  const leftPages =
    page - Math.ceil(pagesPerView / 2) >= 0
      ? Math.ceil(pagesPerView / 2)
      : page;
  const end = Math.min(page + pagesPerView - leftPages, maxPages);

  const getPages = () => {
    const newPage = [];
    console.log(data.length, itemsPerPage);
    for (let i = page - leftPages; i < end; i++) {
      newPage.push(i + 1);
    }
    return newPage;
  };

  const nextPage = () => {
    let newPage = 1;
    if (page + 1 <= Math.ceil(data.length / itemsPerPage)) newPage = page + 1;
    getCurrentData(newPage);
  };

  const prevPage = () => {
    let newPage = 1;
    if (page - 1 >= 1) newPage = page - 1;
    getCurrentData(newPage);
  };

  const goToPage = (currentPage) => {
    getCurrentData(currentPage);
  };

  const getCurrentData = (currentPage) => {
    const start = itemsPerPage * currentPage - itemsPerPage;
    const end = itemsPerPage * currentPage;
    const newData = data
      .map((el) => ({ id: el.programId, ...el }))
      .slice(start, end);

    setDisplayedItems(newData, currentPage);
  };

  useEffect(() => {
    setPages(getPages);
    getCurrentData(page);
  }, [data, page]);

  return (
    <PagerContainer>
      {console.log("PAGE", data, pages)}
      {pages.length > 1 && (
        <ButtonGroup>
          <Button disabled={page === 1} onClick={prevPage} label="Prev" />
          {pages.map((el, index) => (
            <Button
              className={page === el ? "active" : ""}
              disabled={page === el}
              onClick={() => goToPage(el)}
              label={el}
              key={`${index}-${el || ""}`}
            />
          ))}
          {end !== maxPages && <Button disabled={true} label="..." />}
          <Button
            onClick={nextPage}
            disabled={page === Math.ceil(data.length / itemsPerPage)}
            label="Next"
          />
        </ButtonGroup>
      )}
    </PagerContainer>
  );
}, areEqual);

export default Pager;
