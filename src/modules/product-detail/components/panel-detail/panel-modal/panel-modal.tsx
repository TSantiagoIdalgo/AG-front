import React, { useRef } from 'react';
import Style from './panel-modal.module.css';
import { useOutClickExec } from '#modules/catalogue/hooks/use-out-click.ts';
import { Cart } from '#modules/cart/interfaces/cart.interface.ts';
import { useDispatch } from 'react-redux';
import { handleNewItemSetted } from '#src/state/reducers/cart-slice.ts';
import { MdClose } from 'react-icons/md';
import CartMainContentCard from '#modules/cart/components/cart-main-content/cart-main-content-card/cart-main-content-card.tsx';
import PrimaryButton from '#modules/core/components/button/button.tsx';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '#src/hooks/use-mutation-data.ts';
import { CHECKOUT_ENDPOINT } from '#src/config/endpoints.ts';

interface PanelModalProps {
  cart?: Cart;
  getUserCart: () => Promise<void>
}

const PanelModal: React.FC<PanelModalProps> = ({ cart, getUserCart }): React.JSX.Element => {
  const { callMutation, isPending } = useMutation<{ id: string }>(
    CHECKOUT_ENDPOINT.POST.createCheckoutSession(),
    {
      method: 'POST',
    }
  );

  const onCreateCheckout = async () => {
    const response = await callMutation({});
    const link = document.createElement('a');
    link.href = response?.body.data?.id as string;
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onCloseModal = () => dispatch(handleNewItemSetted(false));
  useOutClickExec(containerRef, onCloseModal);
  
  if (!cart) return <p></p>;
  return (
    <div  className={Style.panel_modal}>
      <div ref={containerRef} className={Style.panel_content}>
        <div className={Style.content}>
          <div className={Style.header}>
            <p>Cesta <span>{cart?.items.length > 1 ? `(${cart?.items.length} articulos)` : `(${cart?.items.length} articulo)`}</span></p>
            <MdClose onClick={onCloseModal} id={Style.close_modal} color='#fff' fontSize={35}/>
          </div>
          <div className={Style.items}>
            {cart.items.map(item => <CartMainContentCard
              productMainImage={item.product.mainImage}
              itemId={item.id}
              productName={item.product.name}
              productPlatforms={item.product.platforms}
              productId={item.product.id}
              key={item.id}
              refetch={getUserCart}
              notRenderWishlist
              style={{ marginLeft: '10px', marginRight: '10px' }}
              productPrice={item.product.price}
              productDiscount={item.product.discount}
              quantity={item.quantity}
              productStock={item.product.stock}/>)}
          </div>
          <div className={Style.bottom_panel}>
            <div className={Style.total}>
              <span>Cesta total:</span>
              <span>{cart.total}$</span>
            </div>
            <div className={Style.buttons}>
              <PrimaryButton onClick={() => navigate('/user/cart')} type='button' text={`Ir a la cesta (${cart.items.length})`} style={{background: 'transparent'}}/>
              <PrimaryButton disabled={isPending} onClick={onCreateCheckout} type='button' text={'Pagar >'}/>
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default PanelModal;