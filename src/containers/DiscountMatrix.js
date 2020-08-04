import { connect } from 'react-redux';
import DiscountMatrixComp from '../components/DiscountMatrixComp';
import {
  togglePricingModal,
  selectDiscountEdition,
  setDMProductQuantity,
  setDMProductDiscount,
  toggleAnnual,
  toggleProductMatrix,
  exportPricingScratchpadFile
} from '../actions';

/**
 * DiscountMatrix Container:
 * Handles DiscountMatrixComp Component
 */

const mapStateToProps = state => {
  return {
    pricingModalOpened: state.discountMatrix.modalOpened,
    products: state.discountMatrix.products,
    editions: state.discountMatrix.editions,
    matrix: state.discountMatrix.matrix,
    selectedEdition: state.discountMatrix.edition,
    currency: state.filters.currency,
    annual: state.toggles.annual,
    exportInProgress: state.discountMatrix.exportInProgress
  };
};

const mapDispatchToProps = dispatch => {
  return {
    togglePricingModal() {
      dispatch(togglePricingModal());
    },
    selectDiscountEdition(obj) {
      dispatch(selectDiscountEdition(obj.value));
    },
    setDMProductQuantity(index, quantity) {
      dispatch(setDMProductQuantity(index, quantity));
    },
    setDMProductDiscount(index, discount) {
      dispatch(setDMProductDiscount(index, discount));
    },
    toggleAnnual() {
      dispatch(toggleAnnual());
    },
    toggleProductMatrix(index) {
      dispatch(toggleProductMatrix(index));
    },
    exportPricingScratchpadFile(products, edition, currency, annual) {
      let data = {
        editionName: edition,
        currencyCode: currency,
        annual,
        products
      };
      dispatch(exportPricingScratchpadFile(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscountMatrixComp);
