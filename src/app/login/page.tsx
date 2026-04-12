'use client';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { cls } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
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
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const { login } = useAuth();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema)
  });

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
        <p className="mb-8 text-gray-500">
          Log in to MyAfriMall to enjoy seamless shipping to over 300 countries
          right from Nigeria.. Don&apos;t have an account yet?{' '}
          <Link
            href="/register"
            className="font-medium text-[#5B5EA6] underline"
          >
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
                'placeholder:text-gray-400 focus:border-[#5B5EA6] focus:outline-none',
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
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Enter Password"
                className={cls(
                  'w-full rounded-lg border border-gray-200 px-4 py-3 pr-12 text-sm text-gray-900',
                  'placeholder:text-gray-400 focus:border-[#5B5EA6] focus:outline-none',
                  errors.password && 'border-red-400'
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </div>
            <Link
              href="#"
              className="mt-1 w-fit text-sm text-[#5B5EA6] hover:underline"
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
            className="mt-2 flex h-12 w-fit items-center justify-center rounded-lg bg-[#5B5EA6] px-10 font-medium text-white transition-colors hover:bg-[#4a4d8a] disabled:opacity-60"
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
