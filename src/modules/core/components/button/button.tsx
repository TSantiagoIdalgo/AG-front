import React from "react";
import Style from './button.module.css';

export interface IButton {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type: 'button' | 'submit' | 'reset'
  text: string
  style?: React.CSSProperties;
  id?: string;
  disabled?: boolean;
}

const PrimaryButton = (props: IButton) => {
  const {text, onClick, style, type, id, disabled} = props;
  return (
    <button className={Style.button} disabled={disabled} id={id} onClick={onClick} style={style} type={type}>
      {text}
    </button>
  );
};

export default PrimaryButton;