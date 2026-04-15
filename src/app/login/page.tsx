'use client';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { cls } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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

  const { user, logIn } = useAuth();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema)
  });

  useEffect(() => {
    if (user) router.replace('/dashboard');
  }, [user, router]);

  if (user) return null;

  const onSubmit = async (data: LoginFormData) => {
    setServerError('');

    const result = await api.logIn(data);

    if (result.error) {
      setServerError(result.error);
      return;
    }

    if (result.data) {
      logIn(result.data.token, result.data.user);
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
        <p className="text-manhattan-grey mb-8 text-sm leading-relaxed">
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
                'text-manhattan-grey rounded-lg border border-gray-200 px-4 py-3',
                'focus:border-primary placeholder:text-new-grey',
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
                  'text-manhattan-grey w-full rounded-lg border border-gray-200',
                  'focus:border-primary placeholder:text-new-grey px-4 py-3 pr-12',
                  'placeholder:font-light focus:outline-none',
                  errors.password && 'border-red-400'
                )}
              />
              <button
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="hover:text-manhattan-grey absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
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
            className="bg-primary outline-primary hover:bg-purple-navy mt-2 flex h-13 w-25 items-center justify-center rounded-lg bg-linear-to-b from-white/20 to-white/0 text-sm font-semibold text-white shadow-[0px_1px_3px_-0.5px_rgba(0,0,0,0.06)] outline-1 transition-colors disabled:opacity-60"
          >
            {isSubmitting ? (
              <PulseLoader color="white" size={10} margin={2} />
            ) : (
              'Log in'
            )}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
