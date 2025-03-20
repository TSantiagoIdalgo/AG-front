import {InputProps} from '#modules/core/interfaces/input.interface.ts';
import React from 'react';
import Style from './input.module.css';

export default function Input(props: InputProps): React.JSX.Element {
  const {info, name, type, error, style} = props;

  return (
    <div className={Style.group}>
      <input
        {...info}
        id={name}
        className={Style.input}
        placeholder=" "
        type={type}
        style={style}
      />
      <label htmlFor={name} className={Style.label}>
        {name}
      </label>
      {error && typeof error === 'string' ? <span className={Style.error}>{error}</span> : null}
    </div>
  );
}