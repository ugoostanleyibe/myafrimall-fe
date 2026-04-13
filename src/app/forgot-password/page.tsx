'use client';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { cls } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PulseLoader } from 'react-spinners';
import { z } from 'zod';

const ForgotPasswordSchema = z.object({
  email: z.email('Please enter a valid email')
});

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [serverError, setServerError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema)
  });

  useEffect(() => {
    if (user) router.replace('/dashboard');
  }, [user, router]);

  if (user) return null;

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setServerError('');

    const result = await api.forgotPassword(data.email);

    if (result.error) {
      setServerError(result.error);
      return;
    }

    setIsSuccess(true);
  };

  return (
    <AuthLayout
      heading="Effortlessly Track Your Shipments from Nigeria!"
      subheading="Monitor your shipments from Nigeria! Enjoy swift delivery and seamless customs processing"
    >
      <div className="mx-auto w-full max-w-md">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Forgot Password?
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-gray-500">
          Enter the email address associated with your account and we&apos;ll
          send you a link to reset your password.
        </p>
        {serverError && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {serverError}
          </div>
        )}
        {isSuccess ? (
          <div className="flex flex-col gap-4">
            <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
              If an account with that email exists, a password reset link has
              been sent. Please check your email.
            </div>
            <Link
              href="/login"
              className="text-primary text-sm font-medium hover:underline"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
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
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-purple-navy mt-2 flex h-12 items-center justify-center rounded-lg font-medium text-white transition-colors disabled:opacity-60"
            >
              {isSubmitting ? (
                <PulseLoader color="white" size={10} margin={4} />
              ) : (
                'Send Reset Link'
              )}
            </button>
            <Link
              href="/login"
              className="text-primary text-center text-sm font-medium hover:underline"
            >
              Back to Login
            </Link>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
