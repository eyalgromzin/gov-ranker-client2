// LoginForm.tsx
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { login, testToken, testTokenGet } from '../apis/loginApi';
import { useDispatch } from 'react-redux';
import {
  setIsLoggedIn
} from "../redux/dataSlice";

interface LoginFormProps {
//   onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  


  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (username: string, password: string) => {
    console.log('sending... username: ', username, 'password: ', password)

    const loginRes = await login(dispatch, username, password)
    if(loginRes.data.success){
      console.log('logged in successfully, jwt token: ', loginRes.data.token)
      document.cookie = `token=${loginRes.data.token}`;
      dispatch(setIsLoggedIn(true))
    }
  }

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(username, password);
  };

  const onTestToken = () => {
    // send to server a test request to see if its validated
    // testToken()
    testTokenGet()
  }

  return (
    <form onSubmit={handleFormSubmit}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={handleUsernameChange}
        margin="normal"
        style={{marginRight: '20px'}}
        // fullWidth
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        margin="normal"
        style={{marginRight: '20px'}}
        // fullWidth
      />
      <Button type="submit" variant="contained" color="primary" style={{marginRight: '20px'}}>
        Submit
      </Button>

      <Button variant="contained" color="primary" style={{marginRight: '10px'}} onClick={() => onTestToken()} >
        test token
      </Button>
      </div>
    </form>
  );
};

export default LoginForm;