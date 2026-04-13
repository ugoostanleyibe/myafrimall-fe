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
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Sign in to your account
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-gray-500">
          Log in to MyAfriMall to enjoy seamless shipping to over 300 countries
          right from Nigeria.. Don&apos;t have an account yet?{' '}
          <Link href="/register" className="text-primary font-medium underline">
            Sign Up
          </Link>
        </p>

        {serverError && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="user@example.com"
              className={cls(
                'rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900',
                'focus:border-primary placeholder:text-gray-400 focus:outline-none',
                errors.email && 'border-red-400'
              )}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={isPasswordVisible ? 'text' : 'password'}
                {...register('password')}
                placeholder="Enter Password"
                className={cls(
                  'w-full rounded-lg border border-gray-200 px-4 py-3 pr-12 text-sm text-gray-900',
                  'focus:border-primary placeholder:text-gray-400 focus:outline-none',
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
                      ? '/graphics/eye-open.svg'
                      : '/graphics/eye-closed.svg'
                  }
                  alt={isPasswordVisible ? 'Hide password' : 'Show password'}
                  height={20}
                  width={20}
                />
              </button>
            </div>
            <Link
              href="#"
              className="text-primary mt-1 w-fit text-sm hover:underline"
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
              <PulseLoader color="white" size={10} margin={4} />
            ) : (
              'Login'
            )}
          </button>

          <p className="text-xs text-gray-400">
            By clicking on create account you agree to our{' '}
            <Link href="/privacy" className="text-gray-600 underline">
              privacy policy
            </Link>{' '}
            and{' '}
            <Link href="/terms" className="text-gray-600 underline">
              terms of use
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
