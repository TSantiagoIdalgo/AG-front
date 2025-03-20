import {Link} from 'react-router-dom';
import Logo from '#assets/icons/logo-horizontal.svg';
import React from 'react';
import Style from './auth-template.module.css';

interface IAuthTemplate {
  children: React.ReactNode;
}

const AuthTemplate: React.FC<IAuthTemplate> = ({children}) => (
  <main className={Style.container}>
    <section className={Style.container_sections}>
      <a href="/ancore">
        <img src={Logo} alt="logo-horizontal" className={Style.navbar_header_logo}/>
      </a>
      {children}
    </section>
    <section className={Style.container_sections}>
      <Link to={"/"}>
        <div className={Style.close}>X</div>
      </Link>
      <div className={Style.wallpaper}></div>
    </section>
  </main>
);

export default AuthTemplate;