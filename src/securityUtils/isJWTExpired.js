import jwt_decode from "jwt-decode";
import store from "../store";
import { logout } from "../actions/securityActions";


const isJwtExpired = () => {
    const jwtToken = localStorage.jwtToken;
    if(jwtToken){
      
      const decoded_jwtToken = jwt_decode(jwtToken);
      const currentTime = Date.now()/1000;
      if(decoded_jwtToken.exp < currentTime){
        //handle logout
        console.log("token timeout!!")
        store.dispatch(logout());
        window.location.href = "/";
      }
    }
  }

  export default isJwtExpired;