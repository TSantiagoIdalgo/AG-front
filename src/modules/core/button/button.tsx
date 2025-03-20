import React from "react";
import Style from './button.module.css';

export interface IButton {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type: 'button' | 'submit' | 'reset'
  text: string
  style?: React.CSSProperties
}

const PrimaryButton = (props: IButton) => {
  const {text, onClick, style, type} = props;
  return (
    <button className={Style.button} onClick={onClick} style={style} type={type}>
      {text}
    </button>
  );
};

export default PrimaryButton;