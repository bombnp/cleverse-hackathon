import useAxios from 'axios-hooks';
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
        data: [],
        loading: false,
        // error,
        // execute: undefined
    };
};