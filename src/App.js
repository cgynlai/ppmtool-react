import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import setJWTToken from "./securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecureRoute";

//import ProjectBoard from "./components/ProjectBoard";

const jwtToken = localStorage.jwtToken;
// store again to localstorage to prevent losing jwt after refreshing page
if(jwtToken){
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now()/1000;
  if(decoded_jwtToken.exp < currentTime){
    //handle logout
    console.log("token timeout!!")
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          {
            //Public Routes
          }
          <Route exact path="/" component={Landing} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />

          {
            //Private Routes
          }
          { /* <Route exact path="/" component={Dashboard} /> */ }
          <Switch>
          <SecuredRoute path="/dashboard" component={Dashboard} />
          <SecuredRoute path="/addProject" component={AddProject} />
          <SecuredRoute path="/updateProject/:id" component={UpdateProject} />
          <SecuredRoute path="/projectBoard/:id" component={ProjectBoard} />
          <SecuredRoute path="/addProjectTask/:id" component={AddProjectTask} />
          <SecuredRoute
            path="/UpdateProjectTask/:backlog_id/:pt_id"
            component={UpdateProjectTask}
          />
          </Switch> 
        </div>
      </Router>
    </Provider>
  );
}

export default App;
