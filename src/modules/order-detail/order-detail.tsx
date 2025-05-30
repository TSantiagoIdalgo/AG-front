import { CHECKOUT_ENDPOINT } from '#src/config/endpoints.ts';
import { useFetchData } from '#src/hooks/use-fetch-data.tsx';
import Style from './order-detail.module.css';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { Checkout } from '#src/common/interfaces/checkout.interface.ts';
import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import UUIDBase64 from '#src/common/uuid-base64.ts';
import PrimaryButton from '#modules/core/components/button/button.tsx';
import { generateGameKey } from '#src/hooks/generate-game-key.ts';

export default function OrderDetail(): React.JSX.Element {
  const id = useParams().id as string;
  const { data, loading } = useFetchData<Checkout>(CHECKOUT_ENDPOINT.GET.findById(id));
  const navigate = useNavigate();
  if (loading || !data?.body.data) return <p>Loading...</p>;
  const { checkoutItems, paymentStatus } = data.body.data;
  return (
    <main className={Style.main_content}>
      <section className={Style.order_detail_container}>
        <div className={Style.back}>
          <MdKeyboardArrowLeft className={Style.back_icon} onClick={() => navigate('/user/my-orders')}/>
          <span>Mis pedidos</span>
        </div>
        <div className={Style.payment_status}>
          {paymentStatus === 'paid' 
            ? (
              <>
                <FaCheck color='#82df4d' fontSize={35}/>
                <span>Compra completada</span>
              </>
            )
            : (
              <>
                <IoClose color='#ff005c' fontSize={35}/>
                <span>Compra incompleta</span>
              </>
            )}
        </div>
        {checkoutItems.map((item) => {
          const base64 = new UUIDBase64(item.cartItem.product.id);

          return (
            <figure key={item.id} className={Style.checkout_item}>
              <a href={`/ancore/${base64.uuidToBase64()}`}>
                <picture className={Style.picture}>
                  <img src={item.cartItem.product.mainImage} alt={item.cartItem.product.name} />
                </picture>
              </a>
              <span className={Style.platform}>{item.cartItem.product.platforms[0].name}</span>
              <span className={Style.title}>{item.cartItem.product.name}</span>
              <p className={Style.text}>está listo para ser activado en tu Steam cuenta</p>
              <div className={Style.display}>
                <div className={Style.code}>
                  {paymentStatus === 'paid' 
                    ? <span className={Style.text_box}>{generateGameKey()}</span> 
                    : <PrimaryButton text='Volver a comprar' type='button' onClick={() => navigate(`/${base64.uuidToBase64()}`)}/>}
                </div>
              </div>
              <div className={Style.actions}>
                <a href='https://store.steampowered.com/' target='_blank' className={Style.one_click} rel="noreferrer">
                  <img src='https://www.instant-gaming.com/themes/igv2/images/icons/icon-click.svg' alt="click" />
                  <span>Activacion one-click</span>
                </a>
                <p className={Style.text}>¿No sabes cómo activar el código? Mira el <a href='https://www.instant-gaming.com/es/tutorial-steam' rel="noreferrer" target='_blank'>tutorial de activación</a> o <a href='https://www.instant-gaming.com/es/soporte/?preselectOrderId=143537260' rel="noreferrer" target='_blank'>contacta con nosotros</a></p>
              </div>
            </figure>
          );
        })}
      </section>
    </main>
  );
}