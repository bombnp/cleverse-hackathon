/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@emotion/react';
import React, { useState } from 'react';
import { LoginButton } from './Button';
import { LoginModal } from './LoginModal';

export const UserStep = () => {
    const [onLoginClick, setOnLoginClick] = useState(true);
    
    const handleClick = (e: any) => {
    e.preventDefault();
    setOnLoginClick(true);
  };
  const closeModal = (e: any) => {
    e?.preventDefault();
    setOnLoginClick(false);
  };

    if (!localStorage.getItem('password') && !localStorage.getItem('email')) {
        return (
            <div>
            <LoginButton onClick={handleClick}>เข้าสู่ระบบ</LoginButton>
      <div>
        {onLoginClick && (
          <LoginModal isShow={onLoginClick} onClose={closeModal} />
        )}
      </div>
                
            </div>            
        )
    } else {     
        return (
            <LoginButton
                onClick={() => {
                    localStorage.removeItem('email');
                    localStorage.removeItem('password');
                    window.location.reload();
                }}
            >
                ออกจากระบบ
            </LoginButton>);

    }
}