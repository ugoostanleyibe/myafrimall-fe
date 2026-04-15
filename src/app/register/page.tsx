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

const RegisterSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  phone: z.string().min(7, 'Phone number is required'),
  email: z.email('Please enter a valid email')
});

type RegisterFormData = z.infer<typeof RegisterSchema>;

export default function RegisterPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [serverError, setServerError] = useState('');

  const { user, logIn } = useAuth();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema)
  });

  useEffect(() => {
    if (user) router.replace('/dashboard');
  }, [user, router]);

  if (user) return null;

  const onSubmit = async (data: RegisterFormData) => {
    setServerError('');

    const phone = data.phone.startsWith('+') ? data.phone : `+234${data.phone}`;
    const result = await api.register({ ...data, phone });

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
      heading="Seamlessly Delivering to Over 300 Countries from Nigeria!"
      subheading="Access global markets with our quick shipping from Nigeria! Fast delivery and easy customs to 300+ countries."
    >
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-matte-black mb-2 text-[32px] font-bold">
          Create an account
        </h1>
        <p className="text-manhattan-grey mb-8 text-sm leading-relaxed">
          Sign up for Myafrimall and gain unlimited access to shipping to over
          300 countries from Nigeria. Do you already have an account?{' '}
          <Link href="/login" className="text-primary font-bold underline">
            Log in
          </Link>
        </p>
        {serverError && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {serverError}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          {/* First name & Last name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="firstName" className="text-matte-black">
                First name
              </label>
              <input
                id="firstName"
                {...register('firstName')}
                placeholder="John"
                className={cls(
                  'text-manhattan-grey rounded-lg border border-gray-200 px-4 py-3',
                  'focus:border-primary placeholder:text-new-grey',
                  'placeholder:font-light focus:outline-none',
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
              <label htmlFor="lastName" className="text-matte-black">
                Last name
              </label>
              <input
                id="lastName"
                {...register('lastName')}
                placeholder="Doe"
                className={cls(
                  'text-manhattan-grey rounded-lg border border-gray-200 px-4 py-3',
                  'focus:border-primary placeholder:text-new-grey',
                  'placeholder:font-light focus:outline-none',
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
          {/* Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="text-matte-black">
              Phone Number
            </label>
            <div className="flex">
              <span className="text-manhattan-grey inline-flex items-center rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 px-3">
                +234
              </span>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                placeholder="8012345678"
                className={cls(
                  'text-manhattan-grey w-full rounded-r-lg border border-gray-200 px-4 py-3',
                  'focus:border-primary placeholder:text-new-grey',
                  'placeholder:font-light focus:outline-none',
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
            <label htmlFor="password" className="text-matte-black">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={isPasswordVisible ? 'text' : 'password'}
                {...register('password')}
                placeholder="Enter Password"
                className={cls(
                  'text-manhattan-grey w-full rounded-lg border border-gray-200',
                  'focus:border-primary placeholder:text-new-grey px-4 py-3 pr-12',
                  'placeholder:font-light focus:outline-none',
                  errors.password && 'border-red-400'
                )}
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="hover:text-manhattan-grey absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
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
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>
          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary outline-primary hover:bg-purple-navy mt-2 flex h-13 w-42.5 items-center justify-center rounded-lg bg-linear-to-b from-white/20 to-white/0 text-sm font-semibold text-white shadow-[0px_1px_3px_-0.5px_rgba(0,0,0,0.06)] outline-1 transition-colors disabled:opacity-60"
          >
            {isSubmitting ? (
              <PulseLoader color="white" size={12} margin={4} />
            ) : (
              'Create account'
            )}
          </button>
          <p className="text-manhattan-grey text-sm">
            By clicking on create account you agree to our{' '}
            <Link
              rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/Privacy_policy"
              className="text-primary font-bold underline"
              target="_blank"
            >
              privacy policy
            </Link>{' '}
            and{' '}
            <Link
              rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/Terms_of_service"
              className="text-primary font-bold underline"
              target="_blank"
            >
              terms of use
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
