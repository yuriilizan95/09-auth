"use client";

import { AuthProps, login } from "@/lib/api/clientApi";
import css from "./SignInPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";

export type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

const SignInPage = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (formData: FormData) => {
    setError(null);
    const user = Object.fromEntries(formData) as unknown as AuthProps;
    try {
      const data = await login(user);
      setUser(data);
      router.push("/profile");
    } catch (error) {
      const err = error as ApiError;
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };
  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignInPage;
