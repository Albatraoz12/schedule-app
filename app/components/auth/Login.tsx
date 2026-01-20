"use client";
import { login } from "@/app/actions/actions";
import { useActionState } from "react";

const Login = () => {
  const [state, action, isLoading] = useActionState(login, {
    error: "",
    success: false,
  });

  return (
    <form
      action={action}
      className="flex flex-col gap-4 mx-auto w-full md:w-[80%] lg:w-[60%]"
    >
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          className="w-full p-2 border rounded"
          type="email"
          name="email"
          id="email"
          placeholder="John@doe.com"
          autoComplete="email"
        />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          className="w-full p-2 border rounded"
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          placeholder="*************"
        />
      </div>
      <button className="bg-green-600 text-white p-2 rounded cursor-pointer">
        Login
      </button>
    </form>
  );
};

export default Login;
