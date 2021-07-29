import React, { useState } from 'react';
import { RegisterStep } from './login';
import { RegisterConfirmModal } from './RegisterConfirmModal';
import { RegisterModal } from './RegisterModal';

export const RegisterFlow = ( {
  isShow,
  onClose,
}: {
  isShow?: boolean;
  onClose?: any;
}) => {
    const [step, setStep] = useState<string>(RegisterStep.FIELD_DATA);
    switch (step) {
        case RegisterStep.FIELD_DATA:
            return <RegisterModal setStep={setStep} isShow={isShow} onClose={onClose}/>
        case RegisterStep.CONFIRM:
            return <RegisterConfirmModal setStep={setStep} isShow={isShow} onClose={onClose}/>
        default:
            return <RegisterModal setStep={setStep} isShow={isShow} onClose={onClose}/>
    }
}