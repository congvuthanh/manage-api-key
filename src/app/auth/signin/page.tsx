"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign in to your account</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to manage your API keys
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            type="button"
            aria-label="Sign in with Google"
            tabIndex={0}
          >
            <Image
              src="/google-logo.svg"
              width={20}
              height={20}
              alt="Google Logo"
            />
            <span>Sign in with Google</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            tabIndex={0}
            aria-label="Return to home page"
          >
            Return to home
          </Link>
        </div>
      </div>
    </div>
  );
} 