import React, { useState } from 'react';
import { RegisterStep } from './login';
import { RegisterConfirmModal } from './RegisterConfirmModal';
import { RegisterModal } from './RegisterModal';

export const RegisterFlow = () => {
    const [step, setStep] = useState<string>(RegisterStep.FIELD_DATA);
    switch (step) {
        case RegisterStep.FIELD_DATA:
            return <RegisterModal setStep={setStep}/>
        case RegisterStep.CONFIRM:
            return <RegisterConfirmModal />
        default:
            return <RegisterModal setStep={setStep}/>
    }
}