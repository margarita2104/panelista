import {useEffect, useState} from "react";
import {AxiosPanelista} from "../axios/Axios.jsx";

const useAutoFetch = (accessToken) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleTokenVerify = async () => {
            setLoading(true);
            try {
                const response = await AxiosPanelista.post("/auth/token/verify/", {
                    token: accessToken,
                });
                // For testing:
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(error);
                setLoading(false);
            }
        };

        if (accessToken) {
            handleTokenVerify();
        }
    }, []);

    return {error, loading};
};

export default useAutoFetch;
