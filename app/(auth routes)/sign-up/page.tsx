"use client";

import { AuthProps, register } from "@/lib/api/clientApi";
import css from "./SignUpPage.module.css";
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

const SignUpPage = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (formData: FormData) => {
    setError(null);
    const user = Object.fromEntries(formData) as unknown as AuthProps;
    try {
      const data = await register(user);
      setUser(data);
      router.push("/profile");
    } catch (error) {
      const err = error as ApiError;
      setError(
        err.response?.data?.message || "Registration failed. Try again.",
      );
    }
  };
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>

      <form action={handleSubmit} className={css.form}>
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
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUpPage;
