import React from 'react';

const LoginForm = () => {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="username"></input>
        <input type="password"></input>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
