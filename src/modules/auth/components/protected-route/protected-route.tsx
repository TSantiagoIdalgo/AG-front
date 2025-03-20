import * as libs from '../../libs/auth-libs';
import { Navigate, Outlet } from "react-router-dom";
import { IState } from '#src/state/store.ts';
import React from "react";

interface ProtectedRouteProps {
  roles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles }) => {
  const { data } = libs.useSelector((state: IState) => state.user);
  if (!data) return <Navigate to="/login" />;
  if (roles && !data.roles.some((userRoles) => roles.some((role) => userRoles.name.includes(role)))) return <Navigate to="/unauthorized" />;
  
  return <Outlet />;
};
