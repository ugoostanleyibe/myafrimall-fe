'use client';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { cls } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PulseLoader } from 'react-spinners';
import { z } from 'zod';

const LoginSchema = z.object({
  password: z.string().min(1, 'Password is required'),
  email: z.email('Please enter a valid email')
});

type LoginFormData = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [serverError, setServerError] = useState('');

  const { user, login } = useAuth();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema)
  });

  if (user) {
    router.replace('/dashboard');
    return null;
  }

  const onSubmit = async (data: LoginFormData) => {
    setServerError('');

    const result = await api.login(data);

    if (result.error) {
      setServerError(result.error);
      return;
    }

    if (result.data) {
      login(result.data.token, result.data.user);
      router.push('/dashboard');
    }
  };

  return (
    <AuthLayout
      heading="Effortlessly Track Your Shipments from Nigeria!"
      subheading="Monitor your shipments from Nigeria! Enjoy swift delivery and seamless customs processing"
    >
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-matte-black mb-2 text-[32px] font-bold">
          Sign in to your account
        </h1>
        <p className="text-manhattan-gray mb-8 text-sm leading-relaxed">
          Log in to MyAfriMall to enjoy seamless shipping to over 300 countries
          right from Nigeria.. Don&apos;t have an account yet?{' '}
          <Link href="/register" className="text-primary font-bold underline">
            Sign Up
          </Link>
        </p>
        {serverError && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {serverError}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-matte-black">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="user@example.com"
              className={cls(
                'text-manhattan-gray rounded-lg border border-gray-200 px-4 py-3',
                'focus:border-primary placeholder:text-new-gray',
                'placeholder:font-light focus:outline-none',
                errors.email && 'border-red-400'
              )}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-matte-black">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                {...register('password')}
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Enter Password"
                className={cls(
                  'text-manhattan-gray w-full rounded-lg border border-gray-200',
                  'focus:border-primary placeholder:text-new-gray px-4 py-3 pr-12',
                  'placeholder:font-light focus:outline-none',
                  errors.password && 'border-red-400'
                )}
              />
              <button
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                type="button"
              >
                <Image
                  src={
                    isPasswordVisible
                      ? '/graphics/eye-closed.svg'
                      : '/graphics/eye-open.svg'
                  }
                  alt={isPasswordVisible ? 'Hide password' : 'Show password'}
                  height={20}
                  width={20}
                />
              </button>
            </div>
            <Link
              href="/forgot-password"
              className="text-primary mt-4 w-fit text-sm font-bold underline"
            >
              Forgot Password?
            </Link>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>
          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary-hover mt-2 flex h-12 w-fit items-center justify-center rounded-lg px-10 font-medium text-white transition-colors disabled:opacity-60"
          >
            {isSubmitting ? (
              <PulseLoader color="white" size={9} margin={2} />
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
