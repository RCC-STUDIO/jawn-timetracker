'use client'
import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <h1 className='text-2xl'>Welcome to SDS!</h1>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center text-center p-7">
        <div className='flex flex-col rounded-md shadow-inner bg-blue-950 w-full p-4'>
          <div>
            <label htmlFor="email" className="text-lg font-semibold">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              className="mt-1 p-2 w-full rounded-md text-black"
              onChange={(event) => setEmail(event.target.value)}
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
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="mt-5 py-2 rounded-md bg-blue-700 text-white font-semibold hover:bg-blue-800">Log In</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
};

export default LoginPage;
