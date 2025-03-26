import {IState} from '#src/state/store.ts';
import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import * as libs from '../../libs/auth-libs';

interface ProtectedRouteProps {
  roles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({roles}) => {
  const {data, loading} = libs.useSelector((state: IState) => state.user);
  if (loading) return null;
  if (!data) return <Navigate to="/login"/>;
  if (roles && !data.roles.some((userRoles) => roles.some((role) => userRoles.name.includes(role)))) return <Navigate
    to="/unauthorized"/>;

  return <Outlet/>;
};
