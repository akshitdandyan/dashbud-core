import { useEffect, useState } from "react";
import decode from "jwt-decode";
import { Navigate } from "react-router-dom";

const Protected = ({ children }: { children: any }) => {
    const token = localStorage.getItem("userToken");
    const [checked, setChecked] = useState(false);
    const [tokenExpired, setTokenExpired] = useState(false);
    useEffect(() => {
        if (token) {
            const decoded: any = decode(token);
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                localStorage.removeItem("userToken");
                setTokenExpired(true);
            }
        } else {
            setTokenExpired(true);
        }
        setChecked(true);
    }, [token]);
    console.log("checked", checked);
    console.log("tokenExpired", tokenExpired);

    if (checked) {
        if (tokenExpired) {
            return <Navigate to={"/auth/login"} replace />;
        }
        return children;
    }
    return null;
};

export default Protected;
