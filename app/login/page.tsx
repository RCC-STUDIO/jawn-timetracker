'use client'
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link'; // Corrected import for Next.js Link

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      console.log(result.error);
    } else {
      console.log("Successfully logged in!");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center text-center p-7">
        <div className='flex flex-col rounded-md shadow-inner bg-blue-950 w-full p-4'>
          <div>
            <label htmlFor="email" className="text-lg font-semibold">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              className="mt-1 p-2 w-full rounded-md text-black"
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="text-lg font-semibold">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              className="mt-1 p-2 w-full rounded-md text-black"
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="mt-5 py-2 rounded-md bg-blue-700 text-white font-semibold hover:bg-blue-800">Login</button>
          <div className="mt-4">
              <a href="/register" className="text-blue-500 hover:text-blue-600">No account? Register here</a>
          </div>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
