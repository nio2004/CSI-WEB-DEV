import React, { useState } from 'react';

const RegisterForm = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();


    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({username, password})
    })

    if (response.ok) {
      console.log('User registered successfully');
    } else {
      console.error('Registration failed');
    }catch (error) {
    console.error('Error during registration:', error);
  }
  }
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" 
        value={username}
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}></input>
        <input type="password" 
        value={password}
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)}></input>
        <button type="submit">register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
