import { connect } from 'react-redux';
import PricingModal from '../components/PricingModal';

/**
 * PricingScratchpad Container:
 * Handles PricingModal Component
 */

const mapStateToProps = state => {
  return {
    pricingModalOpened: state.discountMatrix.modalOpened,
    disclaimerAccepted: state.discountMatrix.disclaimerAccepted
  };
};

export default connect(mapStateToProps)(PricingModal);
