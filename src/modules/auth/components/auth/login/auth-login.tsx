import Button from "#modules/core/button/button.tsx";
import Input from "#modules/core/input/input.tsx";
import {User} from "#src/common/interfaces/review.interface.ts";
import {loginSchema, signInSchema} from "#src/common/interfaces/user.interface.ts";
import {USER_ENDPOINT} from "#src/config/endpoints.ts";
import {useMutation} from "#src/hooks/use-mutation-data.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import React from 'react';
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import Style from './auth-login.module.css';


export default function AuthLogin(): React.JSX.Element {
  const {callMutation} = useMutation<User>(USER_ENDPOINT.POST.login(), {method: "POST"});
  const {register, handleSubmit, formState: {errors}, setError} = useForm<signInSchema>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: signInSchema) => {
    try {
      const responseBody = await callMutation({body: data});
      if (responseBody.body.error) return setError('password', {message: responseBody.body.error.message});
      else if (responseBody.body.data) window.location.href = "/";
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "INTERNAL_ERROR";
      setError('password', {message: errorMessage});
    }

    return null;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={Style.loginForm}>
      <div>
        <h1>Inicia Sesion</h1>
        <Input
          name='Email Adress'
          type='email'
          info={register('email')}
          error={errors.email?.message}
          style={{width: '430px'}}/>
        <Input
          name='Password'
          type='password'
          info={register('password')}
          error={errors.password?.message}
          style={{width: '430px'}}/>
        <Button type='submit' text='Login' style={{width: '100%'}}/>
        <div className={Style.buttons}>
          <Link to={"/register"}>
            <span>¿No tienes una cuenta?</span>
          </Link>
          <Link to={"/forgot-password"}>
            <span>¿Has olvidado la contraseña?</span>
          </Link>
        </div>
      </div>
    </form>
  );
}