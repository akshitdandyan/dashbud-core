import { Route, Routes } from "react-router-dom";
import Invitation from "./Invitation";
import Login from "./Login";

const Auth: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/invitation/:verificationToken"
                    element={<Invitation />}
                />
            </Routes>
        </div>
    );
};

export default Auth;
