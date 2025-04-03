import React from 'react';
import * as UserComponents from './components/user-components.ts';
import Style from './user-index.module.css';

export default function UserIndex(): React.JSX.Element {
  return (
    <main className={Style.main_content}>
      <section className={Style.profile_container}>
        <div className={Style.user_profile_layout}>
          <UserComponents.UserPanel/>
          <UserComponents.UserTabs/>
        </div>
      </section>
    </main>
  );
}