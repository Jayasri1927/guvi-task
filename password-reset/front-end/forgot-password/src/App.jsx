import { useState } from "react";
import { createContext } from "react";
import Login from "./components/login";
import OTPInput from "./components/OTP";
import Recovered from "./components/recovered";
import Reset from "./components/reset";

export const RecoveryContext = createContext();
function App() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();

  function NavigateComponents() {
    if (page === "login") return <Login />;
    if (page === "otp") return <OTPInput />;
    if (page === "reset") return <Reset />;

    return <Recovered />;
  }

  return (
    <RecoveryContext.Provider
      value={{ page, setPage, otp, setOTP, setEmail, email }}
    >
      <div className="flex justify-center items-center">
        <NavigateComponents />
      </div>
    </RecoveryContext.Provider>
  );
}

export default App
