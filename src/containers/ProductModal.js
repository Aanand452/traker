import { connect } from 'react-redux';
import ProductInfoModal from '../components/ProductInfoModal';
import { toggleProductInfoModal } from '../actions';

/**
 * ProductModal Container:
 * Handles ProductInfoModal Component
 */

const mapStateToProps = state => {
  return {
    productInfoModalOpen: state.toggles.productInfoModalOpen,
    product: state.selectedProduct
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleProductInfoModal(product) {
      dispatch(toggleProductInfoModal(product));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoModal);
