"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { login } from "@/lib/actions";
import { useRouter } from 'next/navigation'
import * as Yup from "yup";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const user = await login(values.email, values.password);
      if (user.isAuth) {
        router.push("/dashboard");
      }
      if (!user.isAuth) {
        setError(true);
      }
      setLoading(false);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <form
          className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl"
          onSubmit={formik.handleSubmit}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Please login to your account
            </p>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="example@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs sm:text-sm mt-2 flex items-center gap-1">
                <span>{formik.errors.email}</span>
              </div>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-xs sm:text-sm mt-2 flex items-center gap-1">
                <span>{formik.errors.password}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-6 text-xs sm:text-sm">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <p className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
              Forgot Password?
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 font-semibold shadow-lg hover:shadow-xl transform disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading ? (
              <div className="size-6 border-b rounded-full animate-spin mx-auto"></div>
            ) : (
              "Sign In"
            )}
          </button>
            {error && (
              <div className="text-red-500 text-xs sm:text-sm mt-2 flex items-center gap-1">

                <span>Invalid email or password</span>
              </div>
            )}
          <div className="text-center mt-6 text-xs sm:text-sm">
            <span className="text-gray-600">Don&apos;t have an account? </span>
            <p className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer">
              Sign Up
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
