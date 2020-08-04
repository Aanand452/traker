/*global ga */
import React from 'react';
import Icon from './Icon';
import AnnualToggle from './AnnualToggle';
import Select from 'react-select';
import CurrencyFormatter from 'currency-formatter';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import 'react-select/dist/react-select.css';
import { css } from 'glamor';
import { CURRENCY_FORMAT } from '../config/config';
import debounce from 'lodash/debounce';

/**
 * DiscountMatrix Component:
 * Pricing scratchpad content after disclaimer accepted
 */

let cmpStyles = css({
  ' .ps-table-row': {
    paddingLeft: '2rem',
    textAlign: 'right',
    borderBottom: '2px solid #dddbda',
    ' >div': {
      padding: '1rem 0'
    },
    '.product': {
      color: '#52678F'
    },
    '.total': {
      fontWeight: 'bold',
      fontSize: '0.9rem',
      color: '#52678F',
      borderBottom: '0',
      ' >div': {
        padding: '0.6rem 0'
      }
    }
  },
  ' .ps-dm-row': {
    textAlign: 'center',
    borderBottom: '2px solid #dddbda'
  },
  ' .quantity-container': {
    minWidth: '100px'
  },
  ' .discount-container': {
    minWidth: '100px'
  },
  ' .ps-product-input': {
    margin: '-0.42rem 0',
    '>input': {
      textAlign: 'right',
      fontSize: '0.8125rem',
      padding: '0 0 0 7px',
      '.quantity-input': {
        width: '70px'
      },
      '.discount-input': {
        width: '70px'
      }
    }
  },
  ' .ps-gray-area': {
    padding: '0 0 0 2rem !important',
    '>div': {
      background: '#F7F7F7',
      padding: '1rem 2rem 1rem 0',
      textAlign: 'center'
    }
  },
  ' .ps-operator': {
    margin: '1px -20px 0 0',
    float: 'right',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    color: '#142E5D',
    '.input': {
      marginTop: '8px'
    }
  },
  ' .ps-currency-label': {
    marginTop: '4px',
    color: '#52678F',
    marginRight: '2rem',
    fontWeight: 'bold'
  },
  ' .ps-modal': {
    color: '#142E5D'
  },
  ' .ps-header': {
    width: '235px',
    marginTop: '7px',
    textAlign: 'left'
  },
  ' .ps-disclaimer': {
    width: '60%',
    margin: 'auto'
  },
  ' .chevron-icon': {
    transitionDuration: '0.2s',
    transitionProperty: 'transform',
    width: '18px',
    height: '18px',
    marginRight: '-0.8rem',
    imageRendering: '-webkit-optimize-contrast',
    '.down': {
      transform: 'rotate(90deg)'
    }
  },
  ' .edition-picker': {
    width: '200px',
    textAlign: 'left'
  },
  ' .price-cell': {
    paddingLeft: '2rem !important',
    float: 'right',
    wordBreak: 'break-all',
    '.text': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '90%'
    }
  },
  ' .product-name': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  ' .highlight-column': {
    background: '#EEF5FD'
  },
  ' .highlight-row': {
    background: '#EEF5FD'
  },
  ' .highlight-column.highlight-row': {
    background: '#BAD7F3 !important'
  },
  ' .default-icon': {
    fill: '#70849E'
  },
  ' .watermark-modal': {
    color: '#ababab',
    textAlign: 'center',
    width: '90%',
    position: 'absolute',
    left: '0'
  },
  ' .export-button': {
    width: '74px',
    height: '32px',
    ' .slds-spinner': {
      ':before,:after': {
        background: '#6d6d6d !important'
      },
      ' div:before, div:after': {
        background: '#6d6d6d !important'
      }
    }
  },
  ' .pricing-color': {
    width: '18px',
    height: '18px',
    margin: 'auto',
    borderRadius: '50%'
  }
});

/**
 * HTML color names por pricing guidance
 */

const PRICING_COLORS = {
  green: 'darkgreen',
  yellow: 'gold',
  red: 'darkred'
};

const sendChangeDiscountEventGA = debounce(() => {
  ga('send', 'event', {
    eventCategory: 'button',
    eventAction: 'click',
    eventLabel: 'discount-matrix-discount-change'
  });
}, 1000);

/**
 * Gets the list price for a product in the Pricing Scratchpad
 */

const getProductPrice = (product, selectedEdition, annual) => {
  let editionPrice = { id: 0, price: null };
  if (product.editionPrices) {
    for (let i = 0; i < product.editionPrices.length; i++) {
      if (
        product.editionPrices[i] &&
        product.editionPrices[i].edition.name === selectedEdition
      ) {
        editionPrice.id = product.editionPrices[i].id;
        if (isNaN(product.editionPrices[i].price)) {
          editionPrice.price = product.editionPrices[i].price.replace(
            /n\/a/gi,
            '—'
          );
        } else {
          editionPrice.price = annual
            ? product.editionPrices[i].price
            : product.editionPrices[i].price / 12;
        }
      }
    }
  }

  return editionPrice;
};

/**
 * Disables quanitity input when a the product price selected
 * for the scratchpad is n/a (doesn't exist)
 */

const disableQuantityInput = productPrice => productPrice === '—';

/**
 * Gets the total price for the pricing scratchpad
 */

const getTotalListPrice = (products, selectedEdition, annual) => {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    let productPrice = getProductPrice(products[i], selectedEdition, annual)
      .price;
    if (!isNaN(productPrice)) {
      total += productPrice * products[i].quantity;
    }
  }
  return total;
};

/**
 * Gets the total discounted price for the pricing scratchpad
 */

const getTotalDiscountedPrice = (products, selectedEdition, annual) => {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    let productPrice = getProductPrice(products[i], selectedEdition, annual)
      .price;
    if (!isNaN(productPrice)) {
      total +=
        productPrice * products[i].quantity * (1 - products[i].discount / 100);
    }
  }
  return total;
};

/**
 * Gets the Discount Matrix and Pricing Guidance matrixes of a product
 */

const getProductMatrixes = (editionPriceId, selectedEdition, matrix) => {
  if (matrix) {
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i].editionPriceId === editionPriceId) {
        if(matrix[i].discountMatrix){
          matrix[i].discountMatrix.groupedEditions = matrix[
            i
          ].discountMatrix.groupedEditions.filter(
            edition => edition.edition === selectedEdition
          );
        }
        return {
          discountMatrix: matrix[i].discountMatrix,
          pricingGuidance: matrix[i].pricingGuidance
        };
      }
    }
  }
  return null;
};

/**
 * Gets the accumulated quantity of a product when is part of a product set
 */

const getLevelQuantity = (products, groupedEditions) => {
  let quantities = 0;
  for (let i = 0; i < groupedEditions.length; i++) {
    quantities +=
      products[groupedEditions[i].productIndex].quantity &&
      parseInt(products[groupedEditions[i].productIndex].quantity, 10);
  }
  return quantities;
};

/**
 * Calculates the approval level for a product and returns the level name
 */

const getApprovalLevel = (quantity, discount, matrix) => {
  if (quantity && discount && matrix) {
    let ranges = matrix.productDiscountRanges;
    for (let i = 0; i < ranges.length; i++) {
      if (
        quantity >= ranges[i].lowerLicencesRange &&
        (quantity <= ranges[i].upperLicencesRange ||
          ranges[i].upperLicencesRange < 0)
      ) {
        let levels = ranges[i].approvalLevelRanges;
        for (let j = 0; j < levels.length; j++) {
          if (
            discount > levels[j].lowerRate &&
            discount <= levels[j].upperRate
          ) {
            return levels[j].name;
          }
        }
      }
    }
  }
  return '—';
};

/**
 * Calculates the pricing guidance for a product and returns the color name
 */

const getPricingGuidanceColor = (product, editionPrice, annual, matrix) => {
  if (product.quantity && editionPrice && matrix) {
    let quantity = product.quantity;
    let price = editionPrice * (1 - product.discount / 100);
    price = annual ? price : price * 12;
    let ranges = matrix.discountedPriceRanges;
    if (ranges) {
      for (let i = 0; i < ranges.length; i++) {
        if (
          quantity >= ranges[i].lowerLicencesRange &&
          (quantity <= ranges[i].upperLicencesRange ||
            ranges[i].upperLicencesRange < 0)
        ) {
          let colors = ranges[i].colors;
          for (let j = 0; j < colors.length; j++) {
            let color = colors[j];
            //Upper range
            if (color.upperRate < 0 && price >= color.lowerRate) {
              return color.name;
              //Lower range
            } else if (color.lowerRate === 0 && price <= color.upperRate) {
              return color.name;
              //Medium ranges
            } else if (price > color.lowerRate && price < color.upperRate) {
              return color.name;
            }
          }
        }
      }
    }
  }
  return '—';
};

/**
 * Draws the pricing guidance color dot from a color name
 */

const formatPricingGuidanceColor = colorName => {
  let color = PRICING_COLORS[colorName.toLowerCase()];
  if (color) {
    return <div className="pricing-color" style={{ backgroundColor: color }} />;
  }
  return colorName;
};

/**
 * Gets the value to show in a cell of the Discount Matrix
 */

const getLevelRange = (ranges, levelName) => {
  for (let i = 0; i < ranges.length; i++) {
    if (ranges[i].name === levelName) {
      if (ranges[i].upperRate === 100) {
        return (
          '>' +
          CurrencyFormatter.format(ranges[i].lowerRate, CURRENCY_FORMAT)
        );
      } else {
        return CurrencyFormatter.format(ranges[i].upperRate, CURRENCY_FORMAT);
      }
    }
  }
  return '—';
};

/**
 * Checks if a product should be highlight according to the licence range
 */

const highlightByQuantity = (
  quantity,
  lowerLicencesRange,
  upperLicencesRange
) =>
  quantity >= lowerLicencesRange &&
  (quantity <= upperLicencesRange || upperLicencesRange < 0);

/**
 * Gets the discount matrix table for a product when expanding the Approval level
 */

const productDMContent = (discountMatrix, approvalLevel, levelQuantity) =>
  discountMatrix && (
    <div className="ps-dm-row">
      <div className="slds-grid slds-grid_align-end slds-p-right_large">
        <div className="slds-size_2-of-12 slds-p-around_x-small left">
          <strong># of Subscribers</strong>
        </div>
        {discountMatrix.approvalLevels.map(level => (
          <div
            className={`slds-size_1-of-12 slds-p-vertical_x-small
          ${approvalLevel === level ? 'highlight-column' : ''}`}
            key={level}
          >
            <strong>{level}</strong>
          </div>
        ))}
      </div>
      {discountMatrix.productDiscountRanges.map(range => (
        <div
          className="slds-grid slds-grid_align-end slds-p-right_large"
          key={range.id}
        >
          <div
            className={`slds-size_2-of-12 slds-p-around_x-small left
          ${
            highlightByQuantity(
              levelQuantity,
              range.lowerLicencesRange,
              range.upperLicencesRange
            )
              ? 'highlight-row'
              : ''
          }`}
          >
            {range.lowerLicencesRange}
            {range.upperLicencesRange > 0
              ? '-' + range.upperLicencesRange
              : '+'}
            {hasProductSet(discountMatrix) &&
              highlightByQuantity(
                levelQuantity,
                range.lowerLicencesRange,
                range.upperLicencesRange
              ) && (
                <Tooltip
                  placement="topLeft"
                  trigger={['click']}
                  overlay={
                    <div>
                      <div className="tooltip-description">
                        {"All grouped products' quantities are"}
                        <br />
                        {'considered for this Approval Level'}
                      </div>
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
          </div>
          {discountMatrix.approvalLevels.map(level => {
            let levelRange = getLevelRange(range.approvalLevelRanges, level);
            return (
              <div
                className={`slds-size_1-of-12 slds-p-vertical_x-small
              ${approvalLevel === level ? 'highlight-column' : ''}
              ${
                highlightByQuantity(
                  levelQuantity,
                  range.lowerLicencesRange,
                  range.upperLicencesRange
                )
                  ? 'highlight-row'
                  : ''
              }`}
                key={level}
              >
                {levelRange}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

/**
 * Checks if a product is part of a product set in the pricing scratchpad
 */

const hasProductSet = discountMatrix => {
  return (
    discountMatrix &&
    discountMatrix.groupedEditions &&
    discountMatrix.groupedEditions.length > 1
  );
};

/**
 * Gets the discounted price for a product
 */

const getDiscountedPrice = (product, price, currency) =>
  !isNaN(price)
    ? CurrencyFormatter.format(
        price * product.quantity * (1 - product.discount / 100),
        {
          code: currency,
          ...CURRENCY_FORMAT
        }
      )
    : '—';

/**
 * ProductRows subComponent for showing each Pricing Scratchpad product
 */

const getProductsRows = (
  products,
  selectedEdition,
  annual,
  currency,
  matrix,
  setDMProductQuantity,
  setDMProductDiscount,
  toggleProductMatrix
) =>
  products.map((product, index) => {
    let ep = getProductPrice(product, selectedEdition, annual);
    let isValidProductPrice = !isNaN(ep.price);
    let editionMatrixes = getProductMatrixes(ep.id, selectedEdition, matrix);
    let discountMatrix = editionMatrixes && editionMatrixes.discountMatrix;
    let pricingGuidanceMatrix =
      editionMatrixes && editionMatrixes.pricingGuidance;
    let levelQuantity =
      discountMatrix &&
      getLevelQuantity(products, discountMatrix.groupedEditions);
    let discountedPrice = getDiscountedPrice(product, ep.price, currency);
    let approvalLevel = getApprovalLevel(
      levelQuantity,
      product.discount,
      discountMatrix
    );
    let pricingGuidanceColor = getPricingGuidanceColor(
      product,
      ep.price,
      annual,
      pricingGuidanceMatrix
    );

    return (
      <div key={product.id}>
        <div className="slds-grid ps-table-row product">
          <div
            className="slds-size_3-of-12 product-name left"
            title={product.name}
          >
            {product.name}
            {hasProductSet(discountMatrix) && (
              <Tooltip
                placement="topLeft"
                trigger={['click']}
                overlay={
                  <div>
                    <div className="tooltip-description">
                      The following products are grouped together to provide a
                      higher volume discount
                    </div>
                    {discountMatrix &&
                      discountMatrix.groupedEditions.map(edition => (
                        <div className="tooltip-footnote" key={edition.product}>
                          {edition.product}
                        </div>
                      ))}
                  </div>
                }
              >
                <span>
                  <Icon
                    type="utility"
                    name="link"
                    css="slds-show_medium slds-icon_x-small pointer default-icon slds-m-left_xx-small"
                  />
                </span>
              </Tooltip>
            )}
          </div>
          <div className="slds-size_2-of-12">
            <div className="ps-operator">X</div>
            <div
              className={`price-cell ${isValidProductPrice ? '' : 'text'}`}
              title={`${isValidProductPrice ? '' : ep.price}`}
            >
              {isValidProductPrice
                ? CurrencyFormatter.format(ep.price, {
                    code: currency,
                    ...CURRENCY_FORMAT
                  })
                : ep.price}
            </div>
          </div>
          <div className="slds-size_1-of-12 ps-product-input quantity-container">
            <input
              type="number"
              min="0"
              disabled={disableQuantityInput(ep.price)}
              className="slds-input quantity-input"
              value={product.quantity}
              onChange={e => setDMProductQuantity(index, e.target.value)}
            />
            <div className="ps-operator input">X</div>
          </div>
          <div className="slds-size_1-of-12 ps-product-input discount-container">
            <input
              type="number"
              min="0"
              max="100"
              step="any"
              disabled={!discountMatrix || !isValidProductPrice}
              className="slds-input discount-input"
              value={product.discount}
              onChange={e => {
                sendChangeDiscountEventGA();
                setDMProductDiscount(index, e.target.value);
              }}
            />
            <div className="ps-operator input">=</div>
          </div>
          <div className="slds-size_2-of-12">
            <div className={`price-cell ${isValidProductPrice ? '' : 'text'}`}>
              {discountedPrice}
            </div>
          </div>
          <div className="slds-size_3-of-12 slds-grid ps-gray-area">
            <div className="slds-size_1-of-2">
              {approvalLevel}
              <span>
                <img
                  alt="Chevron"
                  src="images/chevron_icon.png"
                  className={`chevron-icon ${
                    product.showMatrix ? 'down' : ''
                  } ${discountMatrix ? 'pointer' : 'invisible'}`}
                  onClick={e => toggleProductMatrix(index)}
                />
              </span>
            </div>
            <div className="slds-size_1-of-2">
              {formatPricingGuidanceColor(pricingGuidanceColor)}
            </div>
          </div>
        </div>
        {product.showMatrix &&
          productDMContent(discountMatrix, approvalLevel, levelQuantity)}
      </div>
    );
  });

/**
 * DiscountMatrix main component
 */

export default function DiscountMatrixComp({
  togglePricingModal,
  products,
  editions,
  matrix,
  currency,
  selectedEdition,
  annual,
  exportInProgress,
  selectDiscountEdition,
  setDMProductQuantity,
  setDMProductDiscount,
  toggleAnnual,
  toggleProductMatrix,
  exportPricingScratchpadFile
}) {
  return (
    <div className={cmpStyles}>
      <section
        role="dialog"
        tabIndex="-1"
        aria-labelledby="modal-heading-01"
        aria-modal="true"
        aria-describedby="modal-content-id-1"
        className="slds-modal slds-modal_large slds-slide-up-open"
      >
        <div className="slds-modal__container ps-modal">
          <header className="slds-modal__header slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
            <button
              className="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse"
              title="Close"
              onClick={e => togglePricingModal(null)}
            >
              <Icon
                type="utility"
                name="close"
                cleanCss="true"
                css="slds-button__icon slds-button__icon_large"
              />
              <span className="slds-assistive-text">Close</span>
            </button>
            <div className="slds-grid slds-grid_align-spread">
              <div className="slds-text-heading_medium ps-header">
                Pricing Scratchpad
              </div>
              <div className="slds-app-launcher__header-search">
                <Select
                  name="form-field-name"
                  className="select-picker edition-picker"
                  placeholder="Edition"
                  value={selectedEdition}
                  onChange={selectDiscountEdition}
                  options={editions}
                  searchable={false}
                  clearable={false}
                />
              </div>
            </div>
            <div className="slds-grid slds-grid_align-spread">
              <label className="ps-currency-label">
                {currency} ({CurrencyFormatter.findCurrency(currency).symbol})
              </label>
              <AnnualToggle annual={annual} toggleAnnual={toggleAnnual} />
            </div>
          </header>
          <div className="slds-modal__content">
            <div
              className="slds-scrollable"
              style={{ width: '100%', maxHeight: '455px' }}
            >
              <div className="slds-grid ps-table-row">
                <div className="slds-size_3-of-12 left">Products</div>
                <div className="slds-size_2-of-12">List Price</div>
                <div className="slds-size_1-of-12 quantity-container">
                  Quantity
                </div>
                <div className="slds-size_1-of-12 discount-container">
                  Discount (%)
                </div>
                <div className="slds-size_2-of-12">Discounted Price</div>
                <div className="slds-size_3-of-12 slds-grid ps-gray-area">
                  <div className="slds-size_1-of-2">Approval Level</div>
                  <div className="slds-size_1-of-2">Pricing Guidance</div>
                </div>
              </div>
              {getProductsRows(
                products,
                selectedEdition,
                annual,
                currency,
                matrix,
                setDMProductQuantity,
                setDMProductDiscount,
                toggleProductMatrix
              )}
              <div className="slds-grid ps-table-row total">
                <div className="slds-size_3-of-12">Total</div>
                <div className="slds-size_2-of-12">
                  <div className="price-cell">
                    {CurrencyFormatter.format(
                      getTotalListPrice(products, selectedEdition, annual),
                      {
                        code: currency,
                        ...CURRENCY_FORMAT
                      }
                    )}
                  </div>
                </div>
                <div className="slds-size_1-of-12 quantity-container" />
                <div className="slds-size_1-of-12 discount-container" />
                <div className="slds-size_2-of-12">
                  <div className="price-cell">
                    {CurrencyFormatter.format(
                      getTotalDiscountedPrice(
                        products,
                        selectedEdition,
                        annual
                      ),
                      {
                        code: currency,
                        ...CURRENCY_FORMAT
                      }
                    )}
                  </div>
                </div>
                <div className="slds-size_3-of-12 slds-grid ps-gray-area">
                  <div className="slds-size_1-of-1" />
                </div>
              </div>
            </div>
          </div>
          <footer className="slds-modal__footer">
            <span
              className={`watermark-modal slds-text-heading_medium slds-m-right_small`}
            >
              INTERNAL USE ONLY
            </span>
            <button
              className="slds-button slds-button_neutral"
              onClick={e => togglePricingModal(null)}
            >
              Close
            </button>
            <button
              className="slds-button slds-button_brand export-button"
              disabled={exportInProgress}
              onClick={() =>
                exportPricingScratchpadFile(
                  products,
                  selectedEdition,
                  currency,
                  annual
                )
              }
            >
              <span className={exportInProgress ? 'hidden' : ''}>Export</span>
              <div
                role="status"
                className={`slds-spinner slds-spinner_x-small ${
                  exportInProgress ? '' : 'hidden'
                }`}
              >
                <span className="slds-assistive-text">Loading</span>
                <div className="slds-spinner__dot-a" />
                <div className="slds-spinner__dot-b" />
              </div>
            </button>
          </footer>
        </div>
      </section>
      <div
        className="slds-backdrop slds-backdrop_open"
        onClick={e => togglePricingModal(null)}
      />
    </div>
  );
}
