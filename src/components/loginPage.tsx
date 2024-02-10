// FullscreenImage.tsx
import React from 'react';
import Login from './loginForm';

interface FullscreenImageProps {
}

const LoginPage: React.FC<FullscreenImageProps> = ({  }) => {
  return (
    <div className="fullscreen-image" style={{direction: 'ltr'}}>
        Login
      <Login />
    </div>
  );
};

export default LoginPage;