'use client'
import React, { useState } from 'react';
// Assuming you will use a similar approach for registration as signIn
// This might involve an API call to your backend instead

const RegistrationPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send a request to your API endpoint for registration
    // For example:
    // await registerUser({ name, email, password });
    console.log('Registration details:', name, email, password);
    
    // Handle the response
    // For example, redirect the user to the login page or show a success message
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center text-center p-7">
        <div className='flex flex-col rounded-md shadow-inner bg-blue-950 w-full p-4'>
          <div>
            <label htmlFor="name" className="text-lg font-semibold">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              className="mt-1 p-2 w-full rounded-md text-black"
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="mt-4">
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
          <button type="submit" className="mt-5 py-2 rounded-md bg-blue-700 text-white font-semibold hover:bg-blue-800">Register</button>
        </div>
      </form>
    </main>
  );
};

export default RegistrationPage;
