import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  let [userLogin, setUserLogin] = useState(null);

  let onSuccess = (response) => {
    localStorage.setItem("auth_token2", response.credential); //can be like token= response.cred..
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Login Successful!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => window.location.assign("/bookings"));
  };

  let onError = () => {
    alert("Login Failed");
  };

  useEffect(() => {
    let token = localStorage.getItem("auth_token2");
    if (token) {
      let decoded = jwt_decode(token);
      setUserLogin(decoded);
    } else {
      setUserLogin(null);
    }
  }, []);
  return (
    <>
      <div className="bg-slate-300 mt-24 h-full flex justify-center flex-col">
        <div className="flex justify-center align-center mt-5 Poppins font-bold ">
          <h1 className="text-xl mt-5  text-[#e7aa40]">
            Login with Google to continue
          </h1>
        </div>
        <div className="flex justify-center shadow mt-5 ">
          <GoogleOAuthProvider clientId="263148022359-f2gtatcn7s3afukeqjf877ooee8rmgjg.apps.googleusercontent.com">
            <div className=" flex flex-col align-center py-3">
              {
                <GoogleLogin
                  width={400}
                  logo_alignment={"center"}
                  shape={"circle"}
                  onSuccess={(credentialResponse) => {
                    onSuccess(credentialResponse);
                  }}
                  onError={() => {
                    onError();
                  }}
                />
              }
            </div>
          </GoogleOAuthProvider>
        </div>
      </div>
    </>
  );
}
