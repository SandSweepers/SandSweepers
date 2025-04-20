import { Logo } from '../../Components/ui/Logo';
import { AuthForm } from '../../Components/auth/AuthForm';
import { Button } from '../../Components/ui/Button';

const SignupPage = () => {
  const fields = [
    { name: 'name', label: 'Full Name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'dob', label: 'Date of Birth', type: 'date' },
    { name: 'country', label: 'Country', required: true },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'inscription
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Logo />
      <AuthForm fields={fields} onSubmit={handleSubmit} />
      <Button type="submit" onClick={handleSubmit}>Sign Up</Button>
    </div>
  );
};

export default SignupPage;