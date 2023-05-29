'use client'

import axios from "axios";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = 'LOGIN' | 'REGISTER';  //a variável do tipo Variant só pode ter um desses dois valores especificados

const AuthForm = () => {
  
    const session = useSession();
    const router = useRouter();
    const [ variant, setVariant ] = useState<Variant>('LOGIN');
    const [ isLoading, setIsLoading ] = useState(false);


    //session verify
    useEffect(() => {
        if(session?.status === 'authenticated') {
            router.push('/users');
        }
    }, [session?.status, router]);

    // muda de login para registrar
    const toggleVariant = useCallback(() => {
        if(variant === 'LOGIN'){
            setVariant('REGISTER');
        }else {
            setVariant('LOGIN');
        }
    }, [variant]);

    // react hook form
    const {
        register, 
        handleSubmit, 
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    // quando o formulario é submetido pelo metodo handleSubmit, essa função onSubmit é chamada com o data q contem os valores dos campos
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        
        if (variant === 'REGISTER') {
            // Axios register
            axios.post('/api/register', data)
            .then(() => {
                signIn('credentials', data);
            })
            .catch(() => {
                toast.error('Alguma coisa está errada!')
            }).finally(() => setIsLoading(false));
        }

        if (variant === 'LOGIN') {
            // funcção de login, NextAuth Sign In 
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then((callback) => {
                if(callback?.error) {
                    toast.error('Credenciais erradas!')
                }else {
                    toast.success('Logado')
                    router.push('/users');
                }
            }).finally(() => setIsLoading(false));
        }

    }   

    const socialAction = (action: string) => {
        setIsLoading(true);

        // NextAuth Social Sign In
        // resposta é o callback da funcao
        signIn(action, { redirect: false})
        .then((callback) => {
            if(callback?.error) {
                toast.error('Erro ao fazer o login!');
            }
            if(callback?.ok && !callback?.error) {
                toast.success('Logged in!');
            }
        }).finally(() => setIsLoading(false));
    }

    return ( 
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                    {variant === 'REGISTER' && (
                        <Input 
                            id="name" 
                            label="Name" 
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                    )}
                    <Input 
                        id="email" 
                        label="Email address"  
                        type="email"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <Input 
                        id="password" 
                        label="Password"  
                        type="password"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />

                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >
                            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>


                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300">
                                
                            </div>
                        </div>
                        <div className="relative flex justify-center text">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                         <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                    </div>

                    <div className="
                        flex
                        gap-2
                        justify-center
                        text-sm
                        mt-6
                        px-2
                        text-gray-500
                    ">
                        <div>
                            {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
                        </div>
                        <div onClick={toggleVariant} className="underline cursor-pointer">
                            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default AuthForm;