import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./App.module.css";

import Wrapper from "./components/wrapper";
import Main from "./components/main";
import NavBar from "./pages/NavBar/NavBar";
import ProjectsContainer from "./pages/projects/ProjectContainer";
import ProjectCard from "./components/project/ProjectCard";
import Certificate from "./pages/Certificate/Certificate";
import NotFound from "./pages/NotFound";
import AboutContainer from "./pages/About/AboutContainer";

const App: React.FC = () => {
  return React.createElement(
    Router,
    null,
    React.createElement(
      Wrapper,
      null,
      React.createElement(NavBar, null),
      React.createElement(
        Main,
        null,
        React.createElement(
          Routes,
          null,
          React.createElement(Route, { path: "/", element: React.createElement(ProjectsContainer, null) }),
          React.createElement(Route, { path: "/projects/:id", element: React.createElement(ProjectCard, null) }),
          React.createElement(Route, { path: "/education", element: React.createElement(Certificate, null) }),
          React.createElement(Route, { path: "/about", element: React.createElement(AboutContainer, null) }),
          React.createElement(Route, { path: "*", element: React.createElement(NotFound, null) })
        )
      )
    )
  );
};

export default App;
