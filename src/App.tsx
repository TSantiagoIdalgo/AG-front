import AuthTemplate from '#modules/auth/components/auth/auth-template.tsx';
import AuthLogin from '#modules/auth/components/auth/login/auth-login.tsx';
import AuthRegister from '#modules/auth/components/auth/register/auth-register.tsx';
import { ProtectedRoute } from '#modules/auth/components/protected-route/protected-route.tsx';
import CartIndex, { CartActivationIndex } from '#modules/cart/cart-index.tsx';
import CatalogueIndex from '#modules/catalogue/catalogue-index.tsx';
import {
  Footer,
  Navbar,
  PreFooter,
} from '#modules/core/components/core-index.ts';
import ProductDetailIndex from '#modules/product-detail/product-detail-index.tsx';
import UserIndex from '#modules/user/user-index.tsx';
import Verify from '#modules/verify/verify.tsx';
import { IState } from '#src/state/store.ts';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { USER_ENDPOINT } from './config/endpoints';
import LandingIndex from './modules/landing/landing-index';
import { getUser } from './state/reducers/user-slice';
import { EventReceived, EventTypes } from './common/interfaces/event-types';
import { ProductCheckout } from './common/interfaces/checkout.interface';
import { Cart } from '#modules/cart/interfaces/cart.interface.ts';
import { setNewPayment, setNewPaymentReceived } from './state/reducers/websocket-slice';

export default function App(): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [firstPageLoaded, setFirstPageLoaded] = useState(true);
  const { data: user } = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  React.useLayoutEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        const response = await globalThis.fetch(`${import.meta.env.VITE_API_URL}/${USER_ENDPOINT.GET.findById()}`, {
          credentials: 'include',
          method: 'GET',
        });
        const userData = await response.json();
        dispatch(getUser(userData.body?.data));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      } finally {
        setLoading(false);
        setFirstPageLoaded(false);
      }
    };
    getUserData();
    // 
  }, []);
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/ws');

    const handlers: Record<string, (message: unknown) => void> = {
      [EventTypes.NEW_PAYMENT_RECEIVED]: (message) => {
        const newPayment = message as ProductCheckout;
        dispatch(setNewPaymentReceived(newPayment));
      },
      [EventTypes.PAYMENT]: (message) => {
        const payment = message as Cart;
        dispatch(setNewPayment(payment));
      }
    };

    socket.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data) as EventReceived<unknown>;
      const handler = handlers[message.type];
      handler?.(message.data);
    };
  }, []);
  if (loading) return <p></p>;
  
  return (
    <div>
      {(!location.pathname.includes('cart') &&
        !location.pathname.includes('activation')) && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingIndex />} />
        <Route path="/:id" element={<ProductDetailIndex />} />
        <Route path="/catalogue" element={<CatalogueIndex />} />
        {!user && (
          <>
            <Route path="/verify" element={<Verify />} />
            <Route
              path="/login"
              element={
                <AuthTemplate>
                  <AuthLogin />
                </AuthTemplate>
              }
            />
            <Route
              path="/register"
              element={
                <AuthTemplate>
                  <AuthRegister />
                </AuthTemplate>
              }
            />
          </>
        )}
        <Route path="/user" element={<ProtectedRoute firstPageLoaded={firstPageLoaded} loading={loading} roles={['ROLE_USER', 'ROLE_ADMIN']}/>}>
          <Route path="cart" element={<CartIndex />} />
          <Route path="activation" element={<CartActivationIndex />} />
          <Route path="*" element={<UserIndex />} />
        </Route>
        ) 
      </Routes>
      {!location.pathname.includes('user') && <PreFooter />}
      <Footer />
    </div>
  );
}
