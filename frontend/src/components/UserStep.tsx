/** @jsxRuntime classic */
/** @jsx jsx */

import { Global, css, jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { hospitelStore } from 'store/hospitelStore';
import { EmailButton, LoginButton } from './Button';
import { LoginModal } from './LoginModal';

export const UserStep = () => {
    const { userLogin } = hospitelStore;
    const [onLoginClick, setOnLoginClick] = useState(true);
    
    const handleClick = (e: any) => {
    e.preventDefault();
    setOnLoginClick(true);
  };
  const closeModal = (e: any) => {
    e?.preventDefault();
    setOnLoginClick(false);
  };

    if (!localStorage.getItem('password') && !localStorage.getItem('username')) {
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
                    localStorage.removeItem('username');
                    localStorage.removeItem('password');
                    window.location.reload();
                }}
            >
                ออกจากระบบ
            </LoginButton>);

    }
}