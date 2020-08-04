import { connect } from 'react-redux';
import FilterBar from '../components/FilterBar';
import {
  search,
  toggleAnnual,
  selectCurrency,
  selectEdition,
  selectList,
  productsLoad,
  closeAllDropDowns
} from '../actions';

/**
 * ProductsFilterBar Container:
 * Handles FilterBar Component
 */

const mapStateToProps = state => {
  return {
    currencies: state.currencies,
    editions: state.editions,
    priceListTypes: state.priceListTypes,
    filters: state.filters,
    toggles: state.toggles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange(query) {
      dispatch(search(query));
    },
    toggleAnnual() {
      dispatch(toggleAnnual());
    },
    selectCurrency(obj) {
      dispatch(selectCurrency(obj.value));
    },
    selectEdition(obj) {
      dispatch(selectEdition(obj.value));
    },
    selectList(obj) {
      dispatch(selectList(obj.value));
      dispatch(productsLoad(obj.value));
    },
    closeAllDropDowns() {
      dispatch(closeAllDropDowns());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
