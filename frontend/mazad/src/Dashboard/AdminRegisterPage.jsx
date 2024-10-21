import React, { useState } from 'react';
import axios from 'axios';

const AdminRegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/admin/create-admin', {
        email,
        password,
      });
      setMessage('Admin registered successfully!');
      console.log(response.data.token);
    } catch (error) {
      console.error('Error:', error.response.data.message);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Create Admin Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register Admin</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminRegisterPage;
