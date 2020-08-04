import React from 'react';
import Disclaimer from '../containers/PricingScratchpadDisclaimer';
import DiscountMatrix from '../containers/DiscountMatrix';

/**
 * PricingModal Component:
 * Pricing Scratchpad root component containing the Disclaimer
 * and Discount Matrix component
 */

export default function PricingModal({
  pricingModalOpened,
  disclaimerAccepted
}) {
  if (pricingModalOpened) {
    return disclaimerAccepted ? <DiscountMatrix /> : <Disclaimer />;
  } else {
    return null;
  }
}
