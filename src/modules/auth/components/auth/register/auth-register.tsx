import Button from "#modules/core/button/button.tsx";
import Input from "#modules/core/input/input.tsx";
import {User} from "#src/common/interfaces/review.interface.ts";
import {registerSchema, TRegisterSchema} from "#src/common/interfaces/user.interface.ts";
import {USER_ENDPOINT} from "#src/config/endpoints.ts";
import {useMutation} from "#src/hooks/use-mutation-data.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import React from 'react';
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import Style from './auth-register.module.css';

export default function AuthRegister(): React.JSX.Element {
  const {callMutation} = useMutation<User>(USER_ENDPOINT.POST.register(), {method: "POST"});
  const {register, handleSubmit, formState: {errors}, setError} = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema)
  });
  
  const onSubmit = async (data: TRegisterSchema) => {
    try {
      const payload = {email: data.email, password: data.password, username: data.userName};
      const {body} = await callMutation({body: payload});
      if (body.error) return setError('repeatPassword', {message: body.error.message});
      else if (body.data) window.location.href = "/";
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "INTERNAL_ERROR";
      setError("repeatPassword", {message: errorMessage});
    }

    return null;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={Style.register}>
      <div className={Style.register_fields}>
        <Input
          name='Email Adress'
          type='email'
          info={register('email')}
          error={errors.email?.message}
          style={{width: '340px'}}/>
        <Input
          name='Tu contraseña'
          type='password'
          info={register('password')}
          error={errors.password?.message}
          style={{width: '340px'}}/>
      </div>
      <div className={Style.register_fields}>
        <Input
          name='Repetir contraseña'
          type='password'
          info={register('repeatPassword')}
          error={errors.repeatPassword?.message}
          style={{width: '340px'}}/>
        <Input
          name='Nombre'
          type='text'
          info={register('userName')}
          error={errors.userName?.message}
          style={{width: '340px'}}/>
      </div>
      <div className={Style.register_buttons}>
        <Button type="submit" text="Aceptar"/>
        <Link to={"/login"}><span>{'<< Atras'}</span></Link>
      </div>
    </form>
  );
}