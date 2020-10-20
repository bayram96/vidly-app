import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveMovie } from "../services/fakeMovieService";
// import { Route, Redirect, Switch } from "react-router-dom";

class NewMovie extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {},
  };

  schema = {
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).greater(0).required().label('Number in Stock'),
    dailyRentalRate: Joi.number().max(10).min(0).required().label('Daily Rental Rate')
  };

  
  doSubmit = () => {
    console.log("Submitted");
    // console.log(this.state.data);
    // console.log(saveMovie(this.state.data));
    saveMovie(this.state.data)
    this.props.history.push('/movies')


  }

  render() {
    
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Movie Form</h1>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genre', 'Genre')}
          {this.renderInput('numberInStock', 'Name in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default NewMovie;
