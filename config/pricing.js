// Centralized pricing configuration
module.exports = {
  CLEANING_FEE: 1500,
  SERVICE_FEE: 2000,
  TAX_RATE: 0.12, // 12% tax
  
  calculateBookingTotal: function(pricePerNight, nights) {
    const basePrice = pricePerNight * nights;
    const cleaningFee = this.CLEANING_FEE;
    const serviceFee = this.SERVICE_FEE;
    const subtotal = basePrice + cleaningFee + serviceFee;
    const taxes = Math.round(subtotal * this.TAX_RATE);
    const total = subtotal + taxes;
    
    return {
      basePrice,
      cleaningFee,
      serviceFee,
      subtotal,
      taxes,
      total,
      nights
    };
  }
};
