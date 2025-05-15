"use client"

import { useState } from "react"
import {Link, useNavigate} from "react-router"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import Cookies from "js-cookie"

export default function Login() {
  const navigate = useNavigate();
  const [email, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Function to set cookies
  const setCookieToken = (token, refreshToken) => {
    // Set cookies with expiration (7 days for access token, 30 days for refresh token)
    Cookies.set("token", token, { expires: 7, secure: true, sameSite: "strict" })
    Cookies.set("refresh", refreshToken, { expires: 30, secure: true, sameSite: "strict" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Please fill in all fields!")
      return
    }

    try {
      setLoading(true)

      // Using fetch instead of axios
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const data = await response.json()
      console.log("Login successful:", data)

      // Store tokens in cookies instead of localStorage
      setCookieToken(data.data.access_token, data.data.refresh_token)

      setError("")
      if(data.data.user.role === "admin"){
        navigate("/")
      }else{
        navigate("/shop")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Invalid email or password!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="w-full max-w-md px-4">
        <form onSubmit={handleSubmit} className="w-full bg-white p-8 shadow-2xl rounded-3xl">
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Login</h1>

          {/* Error message - displayed inline */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-center">
              {error}
              <button className="ml-2 text-red-500 font-bold" onClick={() => setError("")}>
                ×
              </button>
            </div>
          )}

          {/* Username */}
          <div className="flex items-center mb-4 p-3 bg-gray-100 rounded-xl">
            <Mail size={24} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Email"
              className="w-full bg-transparent outline-none text-gray-700"
              value={email}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex items-center mb-6 p-3 bg-gray-100 rounded-xl">
            <Lock size={24} className="text-gray-500 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-transparent outline-none text-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <Eye size={24} className="text-gray-500 cursor-pointer" onClick={() => setShowPassword(false)} />
            ) : (
              <EyeOff size={24} className="text-gray-500 cursor-pointer" onClick={() => setShowPassword(true)} />
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition duration-300 disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}