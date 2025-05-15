"use client"

import { useState } from "react";
import {Link, useNavigate} from "react-router";
import { Eye, EyeOff, User, Lock, Mail, Phone, MapPin, UserCircle } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    setLoading(true);
    
    try {
      // Using fetch instead of api.post
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: userData.fullname,
          email: userData.email,
          username: userData.username,
          password: userData.password,
          phone: userData.phone,
          address: userData.address
        }),
      });
      
      if (response.ok) {
        alert("Registration successful! Redirecting to login page...");
        navigate("/login");
      } else {
        const data = await response.json();
        alert(`Registration failed: ${data.message || "Please try again"}`);
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 shadow-2xl rounded-3xl space-y-5"
        >
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
            Create Account
          </h1>

          {/* Full Name */}
          <div className="flex items-center p-3 bg-gray-100 rounded-xl">
            <UserCircle size={24} className="text-gray-500 mr-2" />
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              className="w-full bg-transparent outline-none text-gray-700"
              value={userData.fullname}
              onChange={handleChange}
              required
            />
          </div>

          {/* Username */}
          <div className="flex items-center p-3 bg-gray-100 rounded-xl">
            <User size={24} className="text-gray-500 mr-2" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full bg-transparent outline-none text-gray-700"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center p-3 bg-gray-100 rounded-xl">
            <Mail size={24} className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full bg-transparent outline-none text-gray-700"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="flex items-center p-3 bg-gray-100 rounded-xl">
            <Phone size={24} className="text-gray-500 mr-2" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full bg-transparent outline-none text-gray-700"
              value={userData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address */}
          <div className="flex items-center p-3 bg-gray-100 rounded-xl">
            <MapPin size={24} className="text-gray-500 mr-2" />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full bg-transparent outline-none text-gray-700"
              value={userData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center p-3 bg-gray-100 rounded-xl">
            <Lock size={24} className="text-gray-500 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full bg-transparent outline-none text-gray-700"
              value={userData.password}
              onChange={handleChange}
              required
            />
            {showPassword ? (
              <Eye
                size={24}
                className="text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeOff
                size={24}
                className="text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex items-center p-3 bg-gray-100 rounded-xl">
            <Lock size={24} className="text-gray-500 mr-2" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full bg-transparent outline-none text-gray-700"
              value={userData.confirmPassword}
              onChange={handleChange}
              required
            />
            {showConfirmPassword ? (
              <Eye
                size={24}
                className="text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword(false)}
              />
            ) : (
              <EyeOff
                size={24}
                className="text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword(true)}
              />
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition duration-300 disabled:opacity-70"
          >
            {loading ? "Processing..." : "Register"}
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
