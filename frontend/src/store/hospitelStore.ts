import { HospitelDocument } from 'components/hospitel';
import { action, makeObservable, observable } from 'mobx';

export enum LevelResetFilterData {
    SCHOOL_YEAR = 'school-year',
    GRADE_LEVEL = 'grade-level',
    CLASSROOM = 'classroom'
}

class HospitelStore {
    selectedHospitel?: HospitelDocument = undefined;
    loginHospitel?: HospitelDocument = undefined;

    constructor() {
        makeObservable(this, {
            selectedHospitel: observable,
            loginHospitel: observable,
            setLoginHospitel: action,
            setSelectedHospitel: action
        });
    }

    resetFilterData = () => {
        this.selectedHospitel = undefined;
        this.loginHospitel = undefined;
    };

    setSelectedHospitel = (hospitel: HospitelDocument) => {
        this.selectedHospitel = hospitel;
    };

    setLoginHospitel = (hospitel: HospitelDocument) => {
        this.loginHospitel = hospitel;
    }
}

export const hospitelStore = new HospitelStore();
