import { connect } from 'react-redux';
import PricingDisclaimerComp from '../components/PricingDisclaimerComp';
import { togglePricingModal, acceptDMDisclaimer } from '../actions';

/**
 * PricingScratchpadDisclaimer Container:
 * Handles PricingDisclaimerComp Component
 */

const mapDispatchToProps = dispatch => {
  return {
    togglePricingModal() {
      dispatch(togglePricingModal());
    },
    acceptDMDisclaimer() {
      dispatch(acceptDMDisclaimer());
    }
  };
};

export default connect(null, mapDispatchToProps)(PricingDisclaimerComp);
