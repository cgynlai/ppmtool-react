import Axios from "axios";
import axios from "axios";
import { GET_ERRORS, GET_PROJECT, GET_PROJECTS, DELETE_PROJECT } from "./types";
import jwt_decode from "jwt-decode";
import store from "../store";
import { logout } from "./securityActions";
//
const testJwt = () => {
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


//

export const createProject = (project, history) => async (dispatch) => {
  testJwt();
  try {
    const res = await axios.post("http://localhost:8080/api/project", project);
    history.push("/dashboard");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getProjects = () => async (dispatch) => {
  testJwt();
  const res = await axios.get("http://localhost:8080/api/project/findAll");
  dispatch({
    type: GET_PROJECTS,
    payload: res.data,
  });
};

export const getProject = (id, history) => async (dispatch) => {
  testJwt();
  try {
    const res = await axios.get(`http://localhost:8080/api/project/${id}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteProject = (id) => async (dispatch) => {
  if (window.confirm("Are u sure you want to delete this?")) {
    await axios.delete(`http://localhost:8080/api/project/${id}`);
    dispatch({
      action: DELETE_PROJECT,
      payload: id,
    });
  }
};
