import React from 'react';
import Icon from './Icon';
import AnnualToggle from './AnnualToggle';
import ThrottledInput from './ThrottledInput';
import { css } from 'glamor';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

/**
 * FilterBar Component:
 * Contains search input, Filters and toggles for the Price list.
 */

let filterStyles = css({
  position: 'fixed',
  top: '130px',
  width: 'calc(100% - 6rem)',
  left: '0',
  padding: '0.7rem 1.5rem',
  margin: '0 3rem',
  background: 'white',
  borderRadius: '0.25rem 0.25rem 0 0',
  zIndex: '2',
  minWidth: '1145px',
  '@media(max-width: 767px)': {
    top: '138px',
    width: '100% !important',
    padding: '0.5rem 1rem',
    margin: '0',
    minWidth: '357px'
  },
  '@media print': {
    position: 'absolute'
  },
  ' .search-container': {
    '@media(max-width: 767px)': {
      position: 'absolute',
      top: '-37px',
      left: '0',
      width: '100%',
      minWidth: '345px'
    },
    '@media(min-width: 767px)': {
      padding: '0'
    }
  },
  ' .filters-container': {
    '@media(max-width: 767px)': {
      width: '100%',
      minWidth: '330px'
    }
  },
  ' .select-container': {
    '@media(max-width: 767px)': {
      width: 'calc(100% / 3)',
      '.currency': {
        paddingRight: '0'
      }
    }
  },
  ' .checkbox-filter': {
    lineHeight: '2rem',
    textAlign: 'right'
  },
  ' .select-picker': {
    '@media(max-width: 767px)': {
      padding: '0',
      ' .Select-arrow-zone': {
        width: '15px !important'
      },
      ' .Select-value': {
        paddingRight: '15px !important',
        fontSize: '12px',
        paddingLeft: '5px !important'
      }
    }
  },
  ' .currency-picker': {
    width: '95px'
  },
  ' .discount-button': {
    height: '36px'
  },
  ' .edition-picker': {
    width: '110px',
    ' .Select-menu-outer': {
      '@media(max-width: 767px)': {
        width: '170px'
      }
    }
  },
  ' .list-picker': {
    width: '155px',
    '@media(max-width: 767px)': {
      width: '100px'
    },
    ' .Select-menu-outer': {
      '@media(max-width: 767px)': {
        width: '130px'
      }
    }
  },
  ' .annual-toggle': {
    marginTop: '5px'
  }
});

export default function FilterBar({
  currencies,
  editions,
  priceListTypes,
  filters,
  toggles,
  onSearchChange,
  toggleAnnual,
  selectCurrency,
  selectEdition,
  selectList,
  closeAllDropDowns
}) {
  return (
    <div
      className={`slds-grid slds-m-vertical_medium filter-bar ${filterStyles}`}
      onClick={e => closeAllDropDowns()}
    >
      <div className="slds-col slds-size_1-of-2 slds-p-horizontal_medium search-container">
        <div className="search">
          <div className="slds-form-element">
            <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon_left">
              <Icon type="utility" name="search" />
              <ThrottledInput
                type="text"
                id="text-input-id-1"
                className="slds-input"
                placeholder="Search the price list"
                value={filters.search}
                onChange={e => onSearchChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="slds-col slds-size_1-of-2 filters-container">
        <AnnualToggle
          annual={toggles.annual}
          toggleAnnual={toggleAnnual}
          css="slds-show_medium slds-float_right annual-toggle"
        />
        <div className="slds-float_right slds-p-right_medium select-container currency">
          <Select
            name="form-field-name"
            className="select-picker slds-float_right currency-picker"
            placeholder="Currency"
            value={filters.currency}
            onChange={selectCurrency}
            options={currencies}
            searchable={false}
            clearable={false}
          />
        </div>
        <div className="slds-float_right select-container slds-hide_medium">
          <Select
            name="form-field-name"
            className="select-picker margin-auto edition-picker"
            placeholder="Edition"
            value={filters.edition}
            onChange={selectEdition}
            options={editions}
            searchable={false}
            clearable={false}
          />
        </div>
        <div className="slds-float_right select-container">
          <Select
            name="form-field-name"
            className="select-picker slds-float_left slds-p-right_medium list-picker"
            placeholder="Pricelist"
            value={filters.list}
            onChange={selectList}
            options={priceListTypes}
            searchable={false}
            clearable={false}
          />
        </div>
      </div>
    </div>
  );
}
