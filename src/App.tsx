import { Footer, Navbar, PreFooter } from '#modules/core/components/core-index.ts';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CatalogueIndex from '#modules/catalogue/catalogue-index.tsx';
import CreateProduct from './state/create-product';
import { IUserState } from './state/store';
import LandingIndex from './modules/landing/landing-index';
import ProductDetailIndex from '#modules/product-detail/product-detail-index.tsx';
import { ProtectedRoute } from '#modules/auth/components/protected-route.tsx';
import React from 'react';
import { USER_ENDPOINT } from './config/endpoints';
import { User } from './common/interfaces/review.interface';
import { getUser } from './state/reducers/user-slice';
import { useFetchData } from './hooks/use-fetch-data';

export default function App(): React.JSX.Element {
  const { loading, data } = useFetchData<User>(USER_ENDPOINT.GET.findById());
  const { data: user } = useSelector((state: IUserState) => state.user);
  const dispatch = useDispatch();
  React.useEffect(() => { dispatch(getUser(data?.body.data)); }, [data]);

  if (loading) return <p></p>;

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='*'  element={<Navigate to="/"/>}/>
        <Route path='/' element={<LandingIndex/>}/>
        <Route path='/:id' element={<ProductDetailIndex/>}/>
        <Route path='/catalogue' element={<CatalogueIndex/>}/>
        {!user && (
          <Route element={<ProtectedRoute roles={["ROLE_ADMIN"]}/>}>
            <Route path='/create/product' element={<CreateProduct/>}/>
          </Route>
        )}
      </Routes>
      <PreFooter/>
      <Footer/>
    </div>
  );
}
