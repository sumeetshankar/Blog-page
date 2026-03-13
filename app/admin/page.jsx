"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminLoginPage = () => {
  const [adminData, setAdminData] = useState({ username: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/login', adminData);
      if (response.data.success) {
        toast.success("Admin logged in!");
        setIsLoggedIn(true);
        setShowLogin(false);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      toast.error("Login failed");
      setAdminData({ username: "", password: "" });
    }
  };
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white">
        {showLogin && (
          <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="bg-white p-8 rounded shadow-lg min-w-[300px]">
              <h2 className="text-xl mb-4 font-bold text-center">Admin Login</h2>
              <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={adminData.username}
                  onChange={e => setAdminData({ ...adminData, username: e.target.value })}
                  className="border px-3 py-2"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={adminData.password}
                  onChange={e => setAdminData({ ...adminData, password: e.target.value })}
                  className="border px-3 py-2"
                  required
                />
                <button type="submit" className="bg-black text-white px-4 py-2 rounded">Login</button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render admin content after login
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg min-w-[300px]">
        <h2 className="text-xl mb-4 font-bold text-center">Welcome, Sumeet!</h2>
        {/* Place your admin page content here */}
        <p>You now have access to the admin page.</p>
      </div>
    </div>
  );
};

export default AdminLoginPage;