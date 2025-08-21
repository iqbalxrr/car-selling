"use client";

import { signIn } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function AuthForm() {
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 async function handleSubmit(e) {
  e.preventDefault();

  if (isLogin) {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res.error) router.push("/");
    else alert("Invalid credentials");
  } else {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error);
    } else {
      alert("✅ Registration successful! Please login.");
      router.push("/login");
    }
  }
}


  return (
    <div className="flex items-center justify-center h-screen  px-4">
      <form
        onSubmit={handleSubmit}
        className=" p-8  w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isLogin ? "Welcome Back" : "Create  account"}
        </h2>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1 ml-4">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-4xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1 ml-4">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-4xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-4xl font-medium hover:bg-blue-700 transition"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-2 border py-2.5 rounded-4xl hover:bg-gray-50 transition"
        >
          <FcGoogle size={22} />
          <span className="font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        {/* Switch Link */}
        <p className="text-center mt-4 text-sm text-gray-600">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Register
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login
              </a>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
