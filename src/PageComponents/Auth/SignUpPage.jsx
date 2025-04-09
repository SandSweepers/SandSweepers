import './SignUpPage.scss';

export const SignUpPage = () => {
  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      <form>
        <input type="text" placeholder="Name LastName" required />
        <input type="email" placeholder="name@email.com" required />
        <input type="password" placeholder="Password" required />
        <input type="date" placeholder="Date of Birth" required />
        <select>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
        </select>
        <input type="text" placeholder="Country" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
