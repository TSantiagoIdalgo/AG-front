import { useOutClickExec } from '#modules/catalogue/hooks/use-out-click.ts';
import {User} from '#src/common/interfaces/review.interface.ts';
import React, { useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import Style from './navbar-modal.module.css';
import { useMutation } from '#src/hooks/use-mutation-data.ts';
import { USER_ENDPOINT } from '#src/config/endpoints.ts';
import { IState } from '#src/state/store.ts';
import { useSelector } from 'react-redux';

interface INavbarModalProps {
  handleModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: User
}

const navbarModal: React.FC<INavbarModalProps> = ({handleModal}): React.JSX.Element => {
  const { callMutation } = useMutation(USER_ENDPOINT.POST.logout());
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: user } = useSelector((state: IState) => state.user);
  const navigate = useNavigate();
  useOutClickExec(containerRef, () => {
    handleModal(false);
  }, 'mousemove');

  const onLogout = async () => {
    await callMutation();
    window.location.href = '/';
  };

  const onNavigate = (url: string) => {
    const closeModalTime = 100;
    navigate(`/user/${url}`);
    setTimeout(() => {
      handleModal(false);
    }, closeModalTime);
  };

  return (
    <div className={Style.navbar_modal}>
      <div ref={containerRef} className={Style.navbar_modal_content}>
        <div className={Style.navbar_modal_content_data}>
          <div className={Style.navbar_modal_info}>
            {user.roles.some(role => role.name === 'ROLE_ADMIN') && <span className={Style.text} onClick={() => onNavigate('dashboard')}>Panel de control</span>}
            <span className={Style.text} onClick={() => onNavigate('my-orders')}>Mis pedidos</span>
            <span className={Style.text} onClick={() => onNavigate('wishlist')}>Wishlist</span>
            <span className={Style.text} onClick={() => onNavigate('my-reviews')}>Mis reviews</span>
            <span className={Style.text}>Configuracion</span>
            <span className={Style.spacer}></span>
            <span className={Style.text} onClick={onLogout}>Desconectarse</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default navbarModal;