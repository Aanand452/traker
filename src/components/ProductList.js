/*global ga */
import React from 'react';
import { css } from 'glamor';
import Highlight from 'react-highlight-words';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import CurrencyFormatter from 'currency-formatter';
import Icon from '../components/Icon';
import startsWith from 'lodash/startsWith';
import ProductModal from '../containers/ProductModal';
import PricingScratchpad from '../containers/PricingScratchpad';
import chevron_icon from '../images/chevron_icon.png';
import { CURRENCY_FORMAT } from '../config/config';

/**
 * ProductList Component
 * Main price list table, applying all filters and some responsiveness
 * done with Javascript needed because of the floating header
 */

let compStyles = css({
  marginTop: '54px',
  '@media(max-width: 767px)': {
    marginTop: '48px',
    paddingBottom: '50px'
  }
});

let productsTable = css({
  color: '#18345D !important',
  ' thead tr th': {
    background: '#fff'
  },
  ' .sort-column': {
    cursor: 'pointer'
  },
  ' .sort-column.-sort-asc': {
    WebkitBoxShadow: 'inset 0 -2px 0 0 rgb(0, 161, 224) !important',
    boxShadow: 'inset 0 2px 0 0 rgb(0, 161, 224) !important'
  },
  ' .sort-column.-sort-desc': {
    WebkitBoxShadow: 'inset 0 -2px 0 0 rgb(0, 161, 224) !important',
    boxShadow: 'inset 0 -2px 0 0 rgb(0, 161, 224) !important'
  },
  ' .expand-all-button': {
    lineHeight: '1rem',
    marginRight: '13px',
    padding: '0 7px 0 4px',
    position: 'absolute',
    top: '4px',
    right: '0',
    height: '26px',
    '>svg': {
      width: '1.2rem',
      height: '1.2rem'
    },
    ':focus': {
      boxShadow: 'none'
    }
  },
  ' .side-note': {
    display: 'inline-block',
    width: '17px',
    textAlign: 'center',
    background: 'hsla(197, 100%, 44%, 0.6)',
    marginLeft: '0.5rem',
    borderRadius: '50%',
    color: '#fff',
    fontSize: '0.7rem'
  },
  ' .additional-td': {
    minWidth: '165px',
    maxWidth: '175px'
  },
  ' .additional-resource': {
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
    color: '#0070d2',
    ':hover': {
      textDecoration: 'underline',
      color: '#005fb2'
    }
  },
  ' .group-row .product-th': {
    textTransform: 'uppercase'
  },
  ' .group-row.selected': {
    backgroundColor: '#EAF4FD'
  },
  ' .group-row > th': {
    fontWeight: '700 !important'
  },
  ' .no-results': {
    backgroundColor: '#f3f3f3',
    fontWeight: '700 !important',
    textAlign: 'center'
  },
  ' .editions-button': {
    height: '1.6rem',
    width: '32px'
  },
  ' .default-icon': {
    fill: '#16325c',
    opacity: '0.6'
  },
  ' .chevron-icon': {
    transitionDuration: '0.2s',
    transitionProperty: 'transform',
    width: '18px',
    height: '18px',
    imageRendering: '-webkit-optimize-contrast',
    '.down': {
      transform: 'rotate(90deg)'
    }
  },
  ' .product-th': {
    whiteSpace: 'normal !important',
    minWidth: '250px',
    width: '50%',
    maxHeight: '0',
    ' .slds-checkbox': {
      width: 'calc(100% - 18px - 0.75rem)'
    },
    '@media(max-width: 767px)': {
      minWidth: '200px'
    }
  },
  ' .product-row.selected': {
    backgroundColor: '#f9fcff'
  },
  ' .hiddenTableHeader': {
    opacity: '0',
    minWidth: '1098px'
  },
  ' .productsTableHeader': {
    position: 'fixed',
    width: 'calc(100% - 9rem)',
    left: '0',
    margin: '0 4.5rem',
    top: '188px',
    zIndex: '1',
    minWidth: '1098px',
    borderTop: '1px solid #d8d8d8',
    borderBottom: '1px solid #d8d8d8',
    background: 'white',
    '@media print': {
      position: 'absolute'
    }
  },
  ' .productsTableHeader tr': {
    width: '100%',
    display: 'inline-block'
  },
  ' .product-header': {
    display: 'inline-block',
    float: 'left',
    paddingTop: '0.5rem',
    width: '100%'
  },
  ' .product-name': {
    display: 'inline-block !important',
    width: 'calc(100% - 28px)',
    marginRight: '0 !important'
  },
  ' .product-price': {
    maxWidth: '120px',
    minWidth: '100px',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    whiteSpace: 'normal',
    textAlign: 'right'
  },
  ' .product-price-mobile': {
    maxWidth: '120px',
    minWidth: '120px',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    whiteSpace: 'normal',
    textAlign: 'right'
  },
  ' .edition-header': {
    padding: '0',
    width: '120px'
  },
  ' .editions-drop-th': {
    width: '48px',
    minWidth: '48px',
    maxWidth: '48px'
  },
  ' .edition-pill': {
    width: '94%',
    float: 'right'
  },
  ' .slds-checkbox_faux': {
    verticalAlign: 'top !important',
    marginTop: '3px !important'
  },
  ' .blue-icon': {
    fill: '#146fd2'
  },
  ' .green-icon': {
    fill: '#41844b'
  },
  ' .highlight': {
    background: '#c6ffd0'
  },
  ' .slds-dropdown__item > button': {
    width: '100%',
    background: 'none',
    border: 'none',
    minHeight: '2rem',
    padding: '0 0.7rem',
    textAlign: 'left',
    ':hover': {
      backgroundColor: '#fafaf9'
    },
    ':focus': {
      outline: '0'
    }
  },
  '@media print': {
    ' td:last-child, th:last-child': {
        display: 'none'
    },
    ' .productsTableHeader': {
      display: 'none'
    },
    ' .hiddenTableHeader': {
      display: 'table-header-group',
      opacity: '1'
    }
  }
});

/**
 * Returns name of the icon to be shown in the "Products" tahble header
 * when ordering asc, desc or disabled.
 */

const getSortIcon = (sort, key) => {
  if (sort.key === key) {
    return sort.asc ? 'arrowdown' : 'arrowup';
  } else {
    return '';
  }
};

/**
 * Checks if parent product has selected children for highlighting it
 */

const isGroupSelected = (checkedProducts, groupId) => {
  let isSelected = false;
  if (checkedProducts) {
    for (var property in checkedProducts) {
      if (
        property.toString() !== groupId &&
        startsWith(property.toString(), groupId)
      ) {
        if (checkedProducts[property]) {
          isSelected = true;
        }
      }
    }
  }
  return isSelected;
};

/**
 * Formats string replacing the '\n' replacing them with <p> elements
 * for displaying correctly in the HTML
 */

const formatString = description => {
  const lines = description.split('\n');
  return lines.map((line, index) => <p key={index}>{line}</p>);
};

/**
 * Opens links (This had to be done like this instead of using <a> elements
 * for avoiding a Safari Bug that crashes links after doing an export)
 */

const openLink = uri => {
  ga('send', 'event', {
    eventCategory: 'additionalResources',
    eventAction: 'click',
    eventLabel: uri
  });
  window.open(uri);
};

/**
 * Returns annual or monthly price
 */

const getNumericPrice = (price, annual) => {
  return annual ? price : price / 12;
};

/**
 * Handles a product tooltip footnotes content
 */

const ProductDescriptionFootnotes = ({product, toggleProductInfoModal}) => {
  return (
    <span>
      {(product.description ||
        (product.footnotes &&
          Boolean(product.footnotes.length))) && (
        <Tooltip
          placement="topLeft"
          trigger={['click']}
          overlay={
            <div>
              {product.description && (
                <div className="tooltip-description">
                  {formatString(product.description)}
                </div>
              )}
              {product.footnotes &&
                product.footnotes.map(
                  note =>
                    note && (
                      <div
                        className="tooltip-footnote"
                        key={note.number}
                      >
                        {formatString(note.text)}
                      </div>
                    )
                )}
            </div>
          }
        >
          <span>
            <Icon
              type="utility"
              name="info"
              css="slds-show_medium slds-icon_x-small pointer default-icon slds-m-left_xx-small"
            />
          </span>
        </Tooltip>
      )}
      {(product.description ||
        (product.footnotes && Boolean(product.footnotes.length)) ||
        product.additionalResourcesLink) && (
        <span
          className="slds-hide_medium"
          onClick={e => toggleProductInfoModal(product, e)}
        >
          <Icon
            type="utility"
            name="info"
            css="slds-icon_x-small pointer default-icon slds-m-left_xx-small"
          />
        </span>
      )}
    </span>
  );
}

/**
 * Gets the product price cell in the product list table according to its
 * edition, currency, and annual/monthly price
 */

const ProductPrice = ({currency, selectedEdition, annual, editionPrices = []}) => {
  return editionPrices && editionPrices.map(editionP => {
    if (editionP.currencyCode === currency && editionP.edition.name === selectedEdition){
      if (isNaN(editionP.price)) {
        return editionP.price.replace(/n\/a/gi, '—');
      } else {
        return CurrencyFormatter.format(
          getNumericPrice(editionP.price, annual), {
            code: currency,
            ...CURRENCY_FORMAT
          }
        );
      }
    } else {
      return '';
    }
  });
}

/**
 * Handles the renderig of a product and its children (each table row)
 */

const renderProduct = (
  product,
  editions,
  filters,
  annual,
  openedParents,
  checkedProducts,
  hiddenColumns,
  toggleParent,
  toggleProductInfoModal,
  checkProduct,
  parentId = 0,
  level = 0
) => {
  const childPaddingUnit = 1.7;
  const searchWords = filters.search.split(' ').map(word => {
    return word.replace(/[!@#$%^&*()+=\-[\]\\';,./{}|":<>?~_]/g, '\\$&');
  });
  let elements = [
    <tr
      key={product.uniqueId}
      product-id={product.uniqueId}
      className={`${parentId ? 'product-row' : 'group-row'}
        ${
          isGroupSelected(checkedProducts, product.uniqueId) ? 'selected' : ''
        }`}
    >
      <th
        scope="row"
        data-label="Product"
        className={`product-th ${
          product.relatedProducts && product.relatedProducts.length
            ? 'pointer'
            : ''
        }`}
        onClick={() => toggleParent(product, openedParents[product.uniqueId])}
      >
        <div style={{ paddingLeft: childPaddingUnit * level + 'rem' }}>
          {Boolean(product.editionPrices && product.editionPrices.length) && (
            <span className="slds-checkbox" onClick={e => e.stopPropagation()}>
              <input
                type="checkbox"
                id={`checkbox_${product.uniqueId}`}
                checked={checkedProducts[product.uniqueId]}
                onChange={e => checkProduct(e, product.uniqueId)}
              />
              <label
                className="slds-checkbox__label pointer"
                htmlFor={`checkbox_${product.uniqueId}`}
              >
                <span className="slds-checkbox_faux slds-m-right_small" />
                <span className="product-name slds-form-element__label slds-text-color_default">
                  <Highlight
                    highlightClassName="highlight"
                    searchWords={searchWords}
                    textToHighlight={product.name}
                  />
                  <ProductDescriptionFootnotes product={product} toggleProductInfoModal={toggleProductInfoModal} />
                </span>
              </label>
            </span>
          )}
          {(!product.editionPrices || product.editionPrices.length < 1) && (
            <Highlight
              highlightClassName="highlight"
              searchWords={searchWords}
              textToHighlight={product.name}
            />
          )}
          {product.relatedProducts &&
            Boolean(product.relatedProducts.length) && (
              <span>
                <img
                  alt="Chevron"
                  src={chevron_icon}
                  className={`pointer chevron-icon ${
                    openedParents[product.uniqueId] ? 'down' : ''
                  } slds-m-right_small`}
                />
              </span>
            )}
        </div>
      </th>
      <td data-label="Price" className="slds-hide_medium">
        <div className="product-price-mobile">
          <ProductPrice editionPrices={product.editionPrices}
            currency={filters.currency}
            annual={annual}
            selectedEdition={filters.edition} />
        </div>
      </td>
      {editions.map( edition =>
        !hiddenColumns[edition.value] && (
          <td
            data-label="Price"
            className="slds-show_medium"
            key={edition.value}
          >
            <div className="product-price">
              <ProductPrice editionPrices={product.editionPrices}
                currency={filters.currency}
                annual={annual}
                selectedEdition={edition.value} />
            </div>
          </td>
        )
      )}
      <td className="editions-drop-th" />
      <td
        data-label="Additional Resources"
        className="slds-show_medium additional-td"
      >
        {product.additionalResourcesLink ? (
          <div
            onClick={e => openLink(product.additionalResourcesLink.uri)}
            className="additional-resource"
            title={product.additionalResourcesLink.label}
          >
            {product.additionalResourcesLink.label}
          </div>
        ) : (
          ''
        )}
      </td>
    </tr>
  ];

  /**
   * Adds children to parent row it had to be concatted because
   * it's a table and a row inside can't be include inside another row
  */
  if (openedParents[product.uniqueId] && product.relatedProducts) {
    product.relatedProducts.map(
      child =>
        (elements = elements.concat(
          renderProduct(
            child,
            editions,
            filters,
            annual,
            openedParents,
            checkedProducts,
            hiddenColumns,
            toggleParent,
            toggleProductInfoModal,
            checkProduct,
            product.uniqueId,
            level + 1
          )
        ))
    );
  }
  return elements;
};

/**
 * Handles product row responsiveness.
 * Had to be done like this because it's a fixed (floating) header
 */

const fixColumnsWidth = refs => {
  if (refs && refs.hiddenTableHeaderProduct) {
    let columnWidth = refs.hiddenTableHeaderProduct.offsetWidth;

    if (columnWidth) {
      refs.productsTableHeaderProduct.style.width = columnWidth + 'px';
    }
  }
};

/**
 * ProductList main component
 */

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  /**
   * Handles fixed header responsiveness when scrolling horizontally
   * Had to be done like this because it's a fixed (floating) header
   */

  onScrollHeader() {
    let filterBar = document.getElementsByClassName('filter-bar')[0];
    let pageTitle = document.getElementsByClassName('page-title')[0];
    let tableHeader = document.getElementsByClassName('productsTableHeader')[0];
    const WINDOW_OFFSET = window.pageXOffset;
    if (tableHeader) {
      tableHeader.style.left = WINDOW_OFFSET * -1 + 'px';
    }
    if (pageTitle) {
      pageTitle.style.left = WINDOW_OFFSET * -1 + 'px';
    }
    if (filterBar) {
      filterBar.style.left = WINDOW_OFFSET * -1 + 'px';
      if (WINDOW_OFFSET) {
        filterBar.style.width = 'calc(100% - 3rem + ' + WINDOW_OFFSET + 'px)';
      }
    }
  }

  /**
   * Handles page responsiveness.
   * Had to be done like this because it's a fixed (floating) header
   */

  onWindowResize() {
    let panel = document.getElementsByClassName('slds-panel')[0];
    let filterBar = document.getElementsByClassName('filter-bar')[0];
    let table = document.getElementsByClassName('slds-table')[0];
    const tableWidth = table.offsetWidth + 75;
    if (tableWidth <= window.innerWidth) {
      //This means: There's no horizontal scroll
      filterBar.style.width = 'calc(100% - 6rem)';
      panel.style.width = '';
      table.style.width = '';
      panel.style.marginRight = '';
    } else {
      filterBar.style.width =
        'calc(100% - 3rem + ' + window.pageXOffset + 'px)';
      panel.style.marginRight = '0';
    }
    fixColumnsWidth(this.refs);
  }

  componentWillMount() {
    this.props.productsLoad(this.props.filters.list);
  }

  componentDidMount() {
    window.onscroll = this.onScrollHeader;
    window.onresize = this.onWindowResize;
    window.onresize();
  }

  componentDidUpdate() {
    fixColumnsWidth(this.refs);
  }

  componentWillUnmount() {
    window.onscroll = null;
    window.onresize = null;
  }

  render() {
    const {
      products,
      productsLoaded,
      editions,
      filters,
      sort,
      toggles,
      sortColumn,
      openedParents,
      checkedProducts,
      hiddenColumns,
      toggleParent,
      toggleAllParents,
      checkProduct,
      toggleColumn,
      toggleSettingsMenu,
      toggleProductInfoModal,
      closeAllDropDowns
    } = this.props;
    const THEADS = ['productsTableHeader', 'hiddenTableHeader'];
    const WIDTH_EDITIONS = 125;

    return (
      <div className={`${compStyles}`} onClick={e => closeAllDropDowns(e)}>
        <div className={productsLoaded ? 'hidden' : ''}>
          <div role="status" className="slds-spinner slds-spinner_medium">
            <span className="slds-assistive-text">Loading</span>
            <div className="slds-spinner__dot-a" />
            <div className="slds-spinner__dot-b" />
          </div>
        </div>
        <table
          className={`slds-table slds-resizable slds-no-row-hover
              slds-table_bordered slds-table_cell-buffer
            ${productsLoaded ? '' : 'hidden'} ${productsTable}`}
        >
          {THEADS.map(headerClass => (
            <thead
              className={`slds-show_medium ${headerClass}`}
              key={headerClass}
            >
              <tr className="slds-text-title header-tr">
                <th
                  scope="col"
                  onClick={e => sortColumn('name', e)}
                  className="sort-column product-header"
                  ref={`${headerClass}Product`}
                >
                  <div className="slds-truncate slds-text-color_default">
                    Products
                    <Icon
                      type="utility"
                      name={getSortIcon(sort, 'name')}
                      css="slds-button__icon slds-icon_x-small slds-p-left_xx-small"
                    />
                    <Tooltip
                      placement="topLeft"
                      trigger={['hover']}
                      overlay={
                        <span>
                          {toggles.allParentsOpened
                            ? 'Collapse all'
                            : 'Expand all'}
                        </span>
                      }
                    >
                      <button
                        className="expand-all-button slds-button slds-button_neutral slds-float_right"
                        onClick={e => toggleAllParents(e)}
                      >
                        <Icon
                          type="utility"
                          name={
                            toggles.allParentsOpened
                              ? 'collapse_all'
                              : 'expand_all'
                          }
                          css="slds-button__icon slds-p-left_xx-small"
                        />
                      </button>
                    </Tooltip>
                  </div>
                </th>
                {editions.map(
                  (edition, index) =>
                    !hiddenColumns[edition.value] && (
                      <th
                        scope="col"
                        key={edition.value}
                        className={`${headerClass}-tr-edition edition-header`}
                      >
                        <div
                          className="slds-truncate slds-text-color_default"
                          style={{
                            width: WIDTH_EDITIONS + 'px',
                            minWidth: WIDTH_EDITIONS + 'px'
                          }}
                        >
                          <span
                            className="slds-pill edition-pill"
                            title={edition.label}
                          >
                            <span className="slds-pill__label slds-p-left_xx-small">
                              {edition.label}
                            </span>
                            <button
                              className="slds-button slds-button_icon slds-button_icon slds-pill__remove"
                              onClick={e => toggleColumn(edition.value)}
                              title="Hide Edition"
                            >
                              <Icon
                                type="utility"
                                name="close"
                                css="slds-button__icon slds-icon_x-small"
                              />
                              <span className="slds-assistive-text">
                                Hide column
                              </span>
                            </button>
                          </span>
                        </div>
                      </th>
                    )
                )}
                <th scope="col" className={`editions-drop-th`}>
                  <div
                    className={`slds-dropdown-trigger slds-size_1-of-1
                      slds-dropdown-trigger_click ${
                        toggles.settingsOpen ? 'slds-is-open' : ''
                      }`}
                  >
                    <button
                      className="editions-button slds-button slds-size_1-of-1 slds-button_icon slds-button_icon-border-filled"
                      aria-haspopup="true"
                      title="Editions"
                      onClick={e => toggleSettingsMenu(e)}
                    >
                      <svg
                        className="slds-button__icon slds-icon_xx-small slds-m-horizontal_x-small"
                        aria-hidden="true"
                      >
                        <Icon type="utility" name="add" />
                      </svg>
                      <span className="slds-assistive-text">Settings</span>
                    </button>
                    <div className="slds-dropdown slds-is-open slds-dropdown_right">
                      <ul className="slds-dropdown__list" role="menu">
                        {editions.map(edition => (
                          <li
                            className={`slds-dropdown__item
                              ${
                                hiddenColumns[edition.value]
                                  ? ''
                                  : 'slds-is-selected'
                              }`}
                            role="presentation"
                            key={edition.value}
                          >
                            <button
                              role="menuitemcheckbox"
                              aria-checked={!hiddenColumns[edition.value]}
                              tabIndex="0"
                              onClick={e => toggleColumn(edition.value, e)}
                            >
                              <span title={edition.value}>
                                <svg
                                  className="slds-icon slds-icon_selected slds-icon_x-small slds-icon-text-default slds-m-right_x-small"
                                  aria-hidden="true"
                                >
                                  <Icon
                                    type="utility"
                                    css="blue-icon"
                                    name="check"
                                  />
                                </svg>
                                {edition.label}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </th>
                <th scope="col" id={`${headerClass}-additional`}>
                  <div className="slds-truncate slds-text-color_default">
                    Additional Resources
                  </div>
                </th>
              </tr>
            </thead>
          ))}
          <tbody>
            {products &&
              products.map(
                product =>
                  product &&
                  renderProduct(
                    product,
                    editions,
                    filters,
                    toggles.annual,
                    openedParents,
                    checkedProducts,
                    hiddenColumns,
                    toggleParent,
                    toggleProductInfoModal,
                    checkProduct
                  )
              )}
            {!products.length && (
              <tr>
                <th
                  colSpan="7"
                  scope="row"
                  data-label="No results"
                  className="no-results"
                >
                  <div>Nothing found</div>
                </th>
              </tr>
            )}
          </tbody>
        </table>
        <ProductModal />
        <PricingScratchpad />
      </div>
    );
  }
}

export default ProductList;
