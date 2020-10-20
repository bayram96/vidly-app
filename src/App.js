import React from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import NavBar from "./components/common/navBar";
import LoginForm from "./components/common/loginForm";
import Register from "./components/register";
import NewMovie from "./components/newMovie"

function App() {
  return (
    <div>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/customers" component={Customers} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/register" component={Register} />
          <Route path="/movies/new" component={NewMovie} />
          <Route path="/movies" component={Movies} />

          {/* <Movies /> */}
          <Route path="/" exact component={Movies} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
