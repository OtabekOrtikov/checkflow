"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import User from "@/assets/icons/user-bounded.svg";
import PasswordIcon from "@/assets/icons/Password.svg";
import LoginIcon from "@/assets/icons/login.svg";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import logo from "@/assets/images/logo-centered.svg";
import xeondLogo from "@/assets/images/xeond.svg"; // Assuming you have a logo image

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!captchaToken) {
      setError("Пожалуйста, подтвердите что вы не робот");
      return;
    }

    setIsLoading(true);

    try {
      await login(username, password);
      router.push("/");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Ошибка входа. Проверьте учетные данные."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen login-bg flex items-center justify-center p-4`}
    >
      <div className="w-[230px] absolute top-11 left-1/2 transform -translate-x-1/2">
        <Image src={logo} alt={"Logo"} className="w-full" />
      </div>
      <div className="w-full max-w-md flex flex-col">
        {/* Login Form */}
        <div className="bg-white rounded-3xl p-4 flex flex-col items-start w-full gap-y-5">
          <h2 className="font-[Bounded] font-[566] text-3xl">Вход</h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-4 w-full"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Image
                  src={User}
                  className="w-[24px] h-[24px] opacity-50"
                  alt={"user Icon"}
                />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Логин"
                className="flex max-w-full min-w-full w-full min-h-[60px] 
                py-0 pr-2.5 pl-14 rounded-2xl border border-[var(--black-10)]
                placeholder:text-xl placeholder:text-[var(--black)] placeholder:opacity-50 
                placeholder:font-semibold font-(--font-family)
                text-xl text-[var(--black)] font-semibold outline-none focus:outline-none"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Image
                  src={PasswordIcon}
                  className="w-[24px] h-[24px] opacity-50"
                  alt={"password Icon"}
                />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                className="flex max-w-full min-w-full w-full min-h-[60px] 
                py-0 pr-2.5 pl-14 rounded-2xl border border-[var(--black-10)]
                placeholder:text-xl placeholder:text-[var(--black)] placeholder:opacity-50 
                placeholder:font-semibold font-(--font-family)
                text-xl text-[var(--black)] font-semibold outline-none focus:outline-none"
                required
              />
            </div>

            <div className="flex justify-center w-full">
              <ReCAPTCHA
                sitekey={
                  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
                  "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                }
                onChange={setCaptchaToken}
                size="compact"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center mt-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--primary)] text-white py-4 px-4 rounded-xl 
              font-semibold hover:bg-blue-700 focus:outline-none 
              focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
              transition-all duration-200 disabled:opacity-50 
              disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Image
                src={LoginIcon}
                className="w-[24px] h-[24px]"
                alt={"login Icon"}
              />
              <span>{isLoading ? "Вход..." : "Войти в аккаунт"}</span>
            </button>
          </form>
        </div>

        {/* Footer */}
      </div>
      <div className="text-center absolute bottom-11 left-1/2 transform -translate-x-1/2">
        <p className="text-black text-sm opacity-20 mb-2">
          designed & developed by
        </p>
        <p>
          <Image src={xeondLogo} alt={"Xeond Logo"} className="opacity-20" />
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
