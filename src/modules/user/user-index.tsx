import React from 'react';
import * as UserComponents from './components/user-components.ts';
import Style from './user-index.module.css';
import { Navigate, useLocation } from 'react-router-dom';
import { TUserPaths } from './components/tabs/tabs.tsx';

export default function UserIndex(): React.JSX.Element {
  const { pathname } = useLocation();
  const renderView = () => {
    const atProperty = 1;
    const url = pathname.split('/user/').at(atProperty) as TUserPaths;
    switch (url) {
    case 'my-orders': return <UserComponents.MyOrders/>;
    default: return <Navigate to={'/'}/>;
    }

  };
  return (
    <main className={Style.main_content}>
      <section className={Style.profile_container}>
        <div className={Style.user_profile_layout}>
          <UserComponents.UserPanel/>
          <UserComponents.UserTabs/>
          {renderView()}
        </div>
      </section>
    </main>
  );
}