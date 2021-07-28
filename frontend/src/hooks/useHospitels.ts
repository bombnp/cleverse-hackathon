import useAxios from 'axios-hooks';
import { MOCK_HOSPITELS_DATA } from 'components/const';
export const useHospitels = () => {
    // const [
    //     { data: response, loading, error },
    //     fire
    // ] = useAxios<HospitelDocumentResponse>({}, { manual: true });

    // const execute = () => {
    //     return fire({
    //         url: `/hospitels`,
    //     });
    // };

    return {
        data: MOCK_HOSPITELS_DATA|| [],
        loading: false,
        // error,
        // execute: undefined
    };
};