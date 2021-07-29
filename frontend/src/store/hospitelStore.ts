import { HospitelDocument, HospitelsDocument } from 'components/hospitel';
import { action, makeObservable, observable } from 'mobx';

class HospitelStore {
    hospitelList: HospitelsDocument[] = [];
    selectedHospitel?: HospitelsDocument = undefined;
    registerHospitel?: HospitelDocument = undefined;
    loginHospitel?: HospitelsDocument = undefined;
    userLogin: boolean = false;
    loading: boolean = false;


    constructor() {
        makeObservable(this, {
            hospitelList: observable,
            selectedHospitel: observable,
            loginHospitel: observable,
            registerHospitel: observable,
            userLogin: observable,
            setHospitelList: action,
            setLoginHospitel: action,
            setSelectedHospitel: action,
            setRegisterHospitel: action,
            setUserLogin: action
        });
    }

    resetFilterData = () => {
        this.hospitelList = [];
        this.selectedHospitel = undefined;
        this.loginHospitel = undefined;
        this.registerHospitel = undefined;
        this.userLogin = false;
        this.loading = false;
    };
    
    setHospitelList = (hospitel: HospitelsDocument[]) => {
        this.hospitelList = hospitel;
    }

    setSelectedHospitel = (hospitel: HospitelsDocument) => {
        console.log(hospitel);
        this.selectedHospitel = hospitel;
    };

    setLoginHospitel = (hospitel: HospitelsDocument | undefined) => {
        this.loginHospitel = hospitel;
    }

    setRegisterHospitel = (hospitel: HospitelDocument | undefined) => {
        this.registerHospitel = hospitel;
    }

    setUserLogin = (login: boolean) => {
        this.userLogin = login;
    }

    setLoading = (loading2: boolean) => {
        this.loading = loading2
    }
}

export const hospitelStore = new HospitelStore();
