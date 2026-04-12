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

const RegisterSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  phone: z.string().min(7, 'Phone number is required'),
  email: z.email('Please enter a valid email')
});

type RegisterFormData = z.infer<typeof RegisterSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const { user, login } = useAuth();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema)
  });

  if (user) {
    router.replace('/dashboard');
    return null;
  }

  const onSubmit = async (data: RegisterFormData) => {
    setServerError('');

    const phone = data.phone.startsWith('+') ? data.phone : `+234${data.phone}`;
    const result = await api.register({ ...data, phone });

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
      heading="Seamlessly Delivering to Over 300 Countries from Nigeria!"
      subheading="Access global markets with our quick shipping from Nigeria! Fast delivery and easy customs to 300+ countries."
    >
      <div className="mx-auto w-full max-w-md">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Create an account
        </h1>
        <p className="mb-8 text-gray-500">
          Sign up for MyAfriMall and gain unlimited access to shipping to over
          300 countries from Nigeria. Do you already have an account?{' '}
          <Link href="/login" className="text-primary font-medium underline">
            Login
          </Link>
        </p>

        {serverError && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* First name & Last name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <input
                id="firstName"
                {...register('firstName')}
                placeholder="John"
                className={cls(
                  'rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900',
                  'focus:border-primary placeholder:text-gray-400 focus:outline-none',
                  errors.firstName && 'border-red-400'
                )}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <input
                id="lastName"
                {...register('lastName')}
                placeholder="Doe"
                className={cls(
                  'rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900',
                  'focus:border-primary placeholder:text-gray-400 focus:outline-none',
                  errors.lastName && 'border-red-400'
                )}
              />
              {errors.lastName && (
                <p className="text-xs text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

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

          {/* Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <div className="flex">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 px-3 text-sm text-gray-500">
                +234
              </span>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                placeholder="8012345678"
                className={cls(
                  'w-full rounded-r-lg border border-gray-200 px-4 py-3 text-sm text-gray-900',
                  'focus:border-primary placeholder:text-gray-400 focus:outline-none',
                  errors.phone && 'border-red-400'
                )}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone.message}</p>
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
                  'focus:border-primary placeholder:text-gray-400 focus:outline-none',
                  errors.password && 'border-red-400'
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Image
                  src={
                    showPassword
                      ? '/graphics/eye-open.svg'
                      : '/graphics/eye-closed.svg'
                  }
                  alt={showPassword ? 'Hide password' : 'Show password'}
                  width={20}
                  height={20}
                />
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary-hover mt-2 flex h-12 items-center justify-center rounded-lg font-medium text-white transition-colors disabled:opacity-60"
          >
            {isSubmitting ? (
              <PulseLoader color="white" size={10} margin={4} />
            ) : (
              'Create account'
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
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
