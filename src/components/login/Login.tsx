import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useInput } from '../../hooks';

const Login: FC = () => {
  const [passwordError, setPasswordError] = useState<string>('');

  const [loginEmail, onChangeLoginEmail] = useInput('');
  const [loginPassword, onChangeLoginPassword] = useInput('');
  const [signupEmail, onChangeSignupEmail] = useInput('');
  const [signupNickname, onChangeSignupNickname] = useInput('');
  const [signupPassword, onChangeSignupPassword] = useInput('');
  const [signupPasswordCheck, onChangeSignupPasswordCheck] = useInput('');

  const onSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!loginEmail || !loginPassword) {
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/users/login`,
        { email: loginEmail, password: loginPassword },
      );

      if (response.statusText === 'Created') {
        localStorage.setItem('token', response.data.token);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitSignup = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (passwordError || !signupEmail || !signupNickname || !signupPassword) {
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/users`,
        {
          email: signupEmail,
          nickname: signupNickname,
          password: signupPassword,
        },
      );

      if (response.statusText === 'Created') {
        localStorage.setItem('token', response.data.token);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (signupPassword === signupPasswordCheck) {
      setPasswordError('');
    } else {
      setPasswordError('패스워드가 일치하지 않습니다.');
    }
  }, [signupPassword, signupPasswordCheck]);

  return (
    <div className="min-h-screen flex">
      <div className="flex-auto bg-green-500 flex justify-center items-center">
        <FontAwesomeIcon className="text-white text-20-rem" icon={faTwitter} />
      </div>
      <div className="flex-auto max-w-screen-sm m-8">
        <div className="mb-8">
          <FontAwesomeIcon
            className="text-green-500 text-4xl"
            icon={faTwitter}
          />
        </div>
        <div className="font-black text-6xl mb-4">Happening now</div>
        <div className="mb-8">
          <div className="font-bold text-4xl mb-2">Sign up</div>
          <form onSubmit={onSubmitSignup}>
            <input
              className="input mb-2 w-96 text-2xl"
              maxLength={40}
              placeholder="Email"
              value={signupEmail}
              onChange={onChangeSignupEmail}
            />
            <br />
            <input
              className="input mb-2 w-96 text-2xl"
              type="text"
              maxLength={10}
              placeholder="Nickname"
              value={signupNickname}
              onChange={onChangeSignupNickname}
            />
            <br />
            <input
              className="input mb-2 w-96 text-2xl"
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={onChangeSignupPassword}
            />
            <br />
            <input
              className="input mb-2 w-96 text-2xl"
              type="password"
              placeholder="Password check"
              value={signupPasswordCheck}
              onChange={onChangeSignupPasswordCheck}
            />
            <br />
            <input
              className="input w-96 bg-white text-2xl"
              type="submit"
              value="Sign up"
            />
            {passwordError && (
              <div className="text-red-500 error-message">{passwordError}</div>
            )}
          </form>
        </div>
        <div>
          <div className="text-xl mb-2">
            Already have an account?{' '}
            <span className="font-bold text-2xl">Log in</span>
          </div>
          <form onSubmit={onSubmitLogin}>
            <input
              className="input mb-2 w-96 text-2xl"
              type="email"
              maxLength={40}
              placeholder="Email"
              value={loginEmail}
              onChange={onChangeLoginEmail}
            />
            <br />
            <input
              className="input mb-2 w-96 text-2xl"
              type="password"
              maxLength={40}
              placeholder="Password"
              value={loginPassword}
              onChange={onChangeLoginPassword}
            />
            <br />
            <input
              className="input w-96 bg-white text-2xl"
              type="submit"
              value="Log in"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
