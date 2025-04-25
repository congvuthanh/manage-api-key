"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export const AuthButton = () => {
  const { data: session, status } = useSession();

  const handleAuth = () => {
    if (status === "authenticated") {
      signOut();
    } else {
      signIn("google");
    }
  };

  if (status === "authenticated" && session?.user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {session.user.image ? (
            <Image
              src={session.user.image}
              width={32}
              height={32}
              alt="User avatar"
              className="rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">
                {session.user.name?.charAt(0) || "U"}
              </span>
            </div>
          )}
          <span className="text-sm font-medium hidden md:inline">{session.user.name}</span>
        </div>
        <button
          onClick={handleAuth}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
          aria-label="Sign out"
          tabIndex={0}
        >
          <span>Sign out</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleAuth}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
      aria-label="Sign in with Google"
      tabIndex={0}
    >
      <Image
        src="/google-logo.svg"
        width={16}
        height={16}
        alt="Google Logo"
      />
      <span>Sign in with Google</span>
    </button>
  );
}; 