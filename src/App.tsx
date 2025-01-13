import { Footer, Navbar, PreFooter } from '#modules/core/components/core-index.ts';
import { Navigate, Route, Routes } from 'react-router-dom';
import CreateProduct from './state/create-product';
import LandingIndex from './modules/landing/landing-index';
import ProductDetailIndex from '#modules/product-detail/product-detail-index.tsx';
import React from 'react';
import { USER_ENDPOINT } from './config/endpoints';
import { User } from './common/interfaces/review.interface';
import { getUser } from './state/reducers/user-slice';
import { useDispatch } from 'react-redux';
import { useFetchData } from './hooks/use-fetch-data';

export default function App(): React.JSX.Element {
  const { loading, data } = useFetchData<User>(USER_ENDPOINT.GET.findById());
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUser(data?.body.data));
  }, [data]);

  if (loading) return <p></p>;

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='*'  element={<Navigate to="/"/>}/>
        <Route path='/' element={<LandingIndex/>}/>
        <Route path='/:id' element={<ProductDetailIndex/>}/>
        <Route path='/create' element={<CreateProduct/>}/>
      </Routes>
      <PreFooter/>
      <Footer/>
    </div>
  );
}
