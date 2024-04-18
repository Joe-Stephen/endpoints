import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function GoogleAuth() {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        var credentialResponseDecoded = jwtDecode(
          credentialResponse.credential
        );
        console.log(credentialResponseDecoded);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}

export default GoogleAuth;
