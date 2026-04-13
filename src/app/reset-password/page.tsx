'use client';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { cls } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PulseLoader } from 'react-spinners';
import { z } from 'zod';

const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;

function ResetPasswordForm() {
  const [isPasswordCopyVisible, setIsPasswordCopyVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const token = useSearchParams().get('token');

  const { user } = useAuth();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema)
  });

  useEffect(() => {
    if (user) router.replace('/dashboard');
  }, [user, router]);

  if (user) return null;

  if (!token) {
    return (
      <div className="mx-auto w-full max-w-md">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Invalid Link</h1>
        <p className="mb-6 text-sm text-gray-500">
          This password reset link is invalid or has expired.
        </p>
        <Link
          href="/forgot-password"
          className="text-primary text-sm font-medium hover:underline"
        >
          Request a new reset link
        </Link>
      </div>
    );
  }

  const onSubmit = async (data: ResetPasswordFormData) => {
    setServerError('');
    const result = await api.resetPassword(token, data.password);

    if (result.error) {
      setServerError(result.error);
      return;
    }

    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="mx-auto w-full max-w-md">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Password Reset!
        </h1>
        <div className="mb-6 rounded-lg bg-green-50 p-4 text-sm text-green-700">
          Your password has been reset successfully. You can now log in with
          your new password.
        </div>
        <Link
          href="/login"
          className="bg-primary hover:bg-purple-navy inline-flex h-12 items-center justify-center rounded-lg px-10 font-medium text-white transition-colors"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">Reset Password</h1>
      <p className="mb-8 text-sm leading-relaxed text-gray-500">
        Enter your new password below.
      </p>
      {serverError && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {serverError}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* New Password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={isPasswordVisible ? 'text' : 'password'}
              {...register('password')}
              placeholder="Enter new password"
              className={cls(
                'w-full rounded-lg border border-gray-200 px-4 py-3 pr-12 text-sm text-gray-900',
                'focus:border-primary placeholder:text-gray-400 focus:outline-none',
                errors.password && 'border-red-400'
              )}
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Image
                src={
                  isPasswordVisible
                    ? '/graphics/eye-closed.svg'
                    : '/graphics/eye-open.svg'
                }
                alt={isPasswordVisible ? 'Hide password' : 'Show password'}
                width={20}
                height={20}
              />
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>
        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={isPasswordCopyVisible ? 'text' : 'password'}
              {...register('confirmPassword')}
              placeholder="Confirm new password"
              className={cls(
                'w-full rounded-lg border border-gray-200 px-4 py-3 pr-12 text-sm text-gray-900',
                'focus:border-primary placeholder:text-gray-400 focus:outline-none',
                errors.confirmPassword && 'border-red-400'
              )}
            />
            <button
              type="button"
              onClick={() => setIsPasswordCopyVisible(!isPasswordCopyVisible)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Image
                src={
                  isPasswordCopyVisible
                    ? '/graphics/eye-open.svg'
                    : '/graphics/eye-closed.svg'
                }
                alt={isPasswordCopyVisible ? 'Hide password' : 'Show password'}
                height={20}
                width={20}
              />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary hover:bg-purple-navy mt-2 flex h-12 items-center justify-center rounded-lg font-medium text-white transition-colors disabled:opacity-60"
        >
          {isSubmitting ? (
            <PulseLoader color="white" size={10} margin={4} />
          ) : (
            'Reset Password'
          )}
        </button>
        <Link
          href="/login"
          className="text-primary text-center text-sm font-medium hover:underline"
        >
          Back to Login
        </Link>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      heading="Effortlessly Track Your Shipments from Nigeria!"
      subheading="Monitor your shipments from Nigeria! Enjoy swift delivery and seamless customs processing"
    >
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <PulseLoader color="#5A65AB" size={10} margin={4} />
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
