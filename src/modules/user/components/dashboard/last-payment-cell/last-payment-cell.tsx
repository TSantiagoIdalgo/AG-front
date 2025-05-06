import { Checkout } from '#src/common/interfaces/checkout.interface.ts';
import React from 'react';
import Style from './last-payment-cell.module.css';
import { parsePrice } from '#src/common/parse-price.ts';

interface LastPaymentProps {
  value: Checkout[]
}

const LastPayment = (props: LastPaymentProps): React.JSX.Element => {
  const firstCheckout = 1, lastCheckout = props.value.length - firstCheckout;
  const checkout = props.value[lastCheckout];
  return (
    <div className={Style.last_payment} id={Style[checkout.paymentStatus]}>
      {parsePrice(checkout.total)}
    </div>
  );
};

export default LastPayment;