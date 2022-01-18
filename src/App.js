import "./App.css";
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import Home from "./home/home";
import Register from "./auth/register/register";
import Login from "./auth/login/login";
import { useState, useEffect } from "react";
import axios from "axios";
import MealPlanInfo from "./mealPlanInfo/mealPlanInfo.js"
import { AuthContext } from "./helpers/AuthContext";
import Navigation from "./navigation/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav,Link, Container } from 'react-bootstrap';
import MealPlan from "./mealPlan/mealPlan";


function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: res.data.username,
            id: res.data.id,
            status: true,
          });
        }
      });
  },[]);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navigation authState={authState} setAuthState={setAuthState}/>
          <Route exact path="/"><Home authState={authState} setAuthState={authState}/></Route>
          <Route path="/register"><Register/></Route>
          <Route path="/login"><Login/></Route>
          <Route path="/getPlan"><MealPlanInfo/></Route>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;