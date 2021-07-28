import { HospitelDocument } from 'components/hospitel';
import { action, makeObservable, observable } from 'mobx';

class HospitelStore {
    selectedHospitel?: HospitelDocument = undefined;
    registerHospitel?: HospitelDocument = undefined;
    loginHospitel?: HospitelDocument = undefined;
    userLogin: boolean = false;


    constructor() {
        makeObservable(this, {
            selectedHospitel: observable,
            loginHospitel: observable,
            registerHospitel: observable,
            userLogin: observable,
            setLoginHospitel: action,
            setSelectedHospitel: action,
            setRegisterHospitel: action,
            setUserLogin: action
        });
    }

    resetFilterData = () => {
        this.selectedHospitel = undefined;
        this.loginHospitel = undefined;
        this.registerHospitel = undefined;
        this.userLogin = false;
    };

    setSelectedHospitel = (hospitel: HospitelDocument) => {
        this.selectedHospitel = hospitel;
    };

    setLoginHospitel = (hospitel: HospitelDocument) => {
        this.loginHospitel = hospitel;
    }

    setRegisterHospitel = (hospitel: HospitelDocument) => {
        this.registerHospitel = hospitel;
    }

    setUserLogin = (login: boolean) => {
        this.userLogin = login;
    }
}

export const hospitelStore = new HospitelStore();
