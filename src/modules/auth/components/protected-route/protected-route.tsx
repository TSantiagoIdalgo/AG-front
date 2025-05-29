import {IState} from '#src/state/store.ts';
import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import * as libs from '../../libs/auth-libs';

interface ProtectedRouteProps {
  roles?: string[];
  loading: boolean;
  firstPageLoaded: boolean
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({roles, loading, firstPageLoaded}) => {
  const {data} = libs.useSelector((state: IState) => state.user);

  if (firstPageLoaded) return null;
  if (loading && !firstPageLoaded) return null;
  if (!data) return <Navigate to="/login"/>;
  if (roles && !data.roles.some((userRoles) => roles.some((role) => userRoles.name === role))) return <Navigate to="/unauthorized"/>;

  return <Outlet/>;
};
