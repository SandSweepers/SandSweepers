import './LoginPage.scss';

export const LoginPage = () => {
  return (
    <div className="login-page">
      <h1>Log In</h1>
      <div className="social-login">
        <button>Google</button>
        <button>Apple</button>
        <button>Facebook</button>
      </div>
      <form>
        <input type="email" placeholder="name@email.com" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};