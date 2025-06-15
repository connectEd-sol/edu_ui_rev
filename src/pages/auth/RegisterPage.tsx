


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-2">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-4 md:p-6 relative">
        <div className="flex flex-col items-center mb-5">
          {/* Logo Placeholder */}
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-2 shadow-lg">
            <span className="text-white text-lg font-bold">Edu</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 mb-1">Create Account</h2>
          <p className="text-gray-500 text-xs">Sign up to get started</p>
        </div>
        {error && (
          <div className="mb-3 px-3 py-1.5 bg-red-100 text-red-700 rounded text-center text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleRegister} className="space-y-3">
          <div>
            <label className="block mb-1 font-semibold text-gray-700 text-sm">Name</label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700 text-sm">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700 text-sm">Password</label>
            <input
              type="password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700 text-sm">Confirm Password</label>
            <input
              type="password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700 text-sm">Role</label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg shadow transition text-sm"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;