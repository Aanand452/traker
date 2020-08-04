import { connect } from 'react-redux';
import PageTitle from '../components/PageTitle';
import {
  exportFile,
  getDiscountMatrixProducts,
  toggleDocumentsMenu,
  closeAllDropDowns
} from '../actions';

/**
 * ComponentHeader Container:
 * Handles PageTitle Component
 */

const mapStateToProps = state => {
  return {
    products: state.products,
    editions: state.editions,
    currency: state.filters.currency,
    annual: state.toggles.annual,
    checkedProducts: state.checkedProducts,
    hiddenEditions: state.hiddenColumns,
    revisionDate: state.revisionDate,
    revisionNumber: state.revisionNumber,
    selectedEdition: state.filters.edition,
    buttons: state.buttons,
    selectedList: state.filters.list,
    priceListTypes: state.priceListTypes,
    exportInProgress: state.exportInProgress,
    documentsOpened: state.toggles.documentsOpened
  };
};

const mapDispatchToProps = dispatch => {
  return {
    exportFile(
      products,
      editions,
      currency,
      annual,
      checkedProducts,
      hiddenEditions,
      selectedEdition
    ) {
      const data = {
        products,
        editions,
        currency,
        annual,
        checkedProducts,
        hiddenEditions,
        selectedEdition
      };
      const productKeys = Object.keys(checkedProducts);
      for (let i = 0; i < productKeys.length; i++) {
        if (checkedProducts[productKeys[i]]) {
          dispatch(exportFile(data));
          return;
        }
      }
      alert(
        'There are no products selected for exporting.\nPlease select the products you want to export.'
      );
    },
    togglePricingModal(
      products,
      editions,
      currency,
      checkedProducts,
      hiddenEditions,
      selectedEdition
    ) {
      const data = {
        products,
        editions,
        currency,
        checkedProducts,
        hiddenEditions,
        selectedEdition
      };
      const productKeys = Object.keys(checkedProducts);
      for (let i = 0; i < productKeys.length; i++) {
        if (checkedProducts[productKeys[i]]) {
          dispatch(getDiscountMatrixProducts(data));
          return;
        }
      }
      alert('There are no products selected.\n');
    },
    toggleDocumentsMenu(e, open) {
      e.stopPropagation();
      dispatch(toggleDocumentsMenu(open));
    },
    closeAllDropDowns(e) {
      e.stopPropagation();
      dispatch(closeAllDropDowns());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageTitle);
