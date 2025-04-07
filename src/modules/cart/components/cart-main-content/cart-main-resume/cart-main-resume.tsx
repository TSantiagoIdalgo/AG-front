import BackIcon from "#assets/icons/icon-arrow.svg";
import Button from "#modules/core/components/button/button.tsx";
import { CART_ENDPOINT } from "#src/config/endpoints.ts";
import { useMutation } from "#src/hooks/use-mutation-data.ts";
import React from "react";
import Style from "./cart-main-resume.module.css";

interface ICartMainResumeProps {
  totalPrice: string;
  discount: string;
  subtotal: string;
  isCartEmpty: boolean;
}

const CartMainResume: React.FC<ICartMainResumeProps> = ({
  totalPrice,
  discount,
  subtotal,
  isCartEmpty,
}): React.JSX.Element => {
  const { callMutation, isPending } = useMutation<{ id: string }>(
    CART_ENDPOINT.POST.createCheckoutSession(),
    {
      method: "POST",
    }
  );

  const onCreateCheckout = async () => {
    const response = await callMutation({});
    const link = document.createElement("a");
    link.href = response?.body.data?.id as string;
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <article className={Style.cart_page_right}>
      <h2>Resumen</h2>
      <div className={Style.cart_summary}>
        <div className={Style.summary_row}>
          <span>Precio oficial</span>
          <span>${subtotal}</span>
        </div>
        <div className={Style.summary_row}>
          <span>Descuento</span>
          <span>$-{discount}</span>
        </div>
        <div className={Style.summary_row_total}>
          <span>Subtotal</span>
          <span>${totalPrice}</span>
        </div>
        <Button
          disabled={isCartEmpty || isPending}
          onClick={onCreateCheckout}
          text="Proceder con el pago"
          type="button"
          style={{ width: "100%" }}
        />
        <span className={Style.choice}>O</span>
        <a className={Style.back} href="/ancore">
          <img src={BackIcon} alt="back" />
          Continuar comprando
        </a>
      </div>
    </article>
  );
};

export default CartMainResume;
