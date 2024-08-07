import { useState } from 'react'
import './SignIn.css'
import { signIn } from '../../services/users'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../../components'


const SignIn = (props) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    isError: false,
    errorMsg: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const onSignIn = async (event) => {
    event.preventDefault();
    const { setUser } = props;
    try {
      const user = await signIn(form);
      setUser(user);
      navigate("/calendar");
    } catch (error) {
      console.error(error);
      setForm({
        isError: true,
        errorMsg: "Invalid Credentials",
        email: "",
        password: "",
      });
    }
  };

  const renderError = () => {
    const toggleForm = form.isError ? "danger" : "";
    if (form.isError) {
      return (
        <button type="submit" className={toggleForm}>
          {form.errorMsg}
        </button>
      );
    } else {
      return <button type="submit">Sign In</button>;
    }
  };

  const { email, password } = form;

  return (

    <>
    <div className="sign-in-body">
      <div className='form-container'>

        <h3>Sign In</h3>
        <form onSubmit={onSignIn}>
          <label htmlFor="email">Email</label>
          <input
            required
            type='text'
            name='email'
            value={email}
            placeholder='Enter Email'
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            required
            name='password'
            value={password}
            type='password'
            placeholder='Password'
            onChange={handleChange}
          />
          {renderError()}
        </form>
      </div>
    </div>
    </>
  );
};

export default SignIn;
