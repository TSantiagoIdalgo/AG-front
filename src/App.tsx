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
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { User } from './common/interfaces/review.interface';
import { USER_ENDPOINT } from './config/endpoints';
import { useFetchData } from './hooks/use-fetch-data';
import LandingIndex from './modules/landing/landing-index';
import CreateProduct from './state/create-product';
import { getUser } from './state/reducers/user-slice';

export default function App(): React.JSX.Element {
  const { loading, data } = useFetchData<User>(USER_ENDPOINT.GET.findById());
  const { data: user } = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  React.useEffect(() => {
    dispatch(getUser(data?.body.data));
  }, [data]);

  if (loading) return <p></p>;
  
  return (
    <div>
      {(!location.pathname.includes('cart') &&
        !location.pathname.includes('activation')) && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingIndex />} />
        <Route path="/:id" element={<ProductDetailIndex />} />
        <Route path="/catalogue" element={<CatalogueIndex />} />
        <Route element={<ProtectedRoute roles={['ROLE_ADMIN']} />}>
          <Route path="/create/product" element={<CreateProduct />} />
        </Route>
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
        {user ? (
          <Route path="/user">
            <Route path="cart" element={<CartIndex />} />
            <Route path="activation" element={<CartActivationIndex />} />
            <Route path="*" element={<UserIndex />} />
          </Route>
        ) : null}
      </Routes>
      {!location.pathname.includes('user') && <PreFooter />}
      <Footer />
    </div>
  );
}
