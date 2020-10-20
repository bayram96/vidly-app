import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class Register extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label('Name')
  };

  
  doSubmit = () => {
    console.log("Submitted");
  }

  render() {
    
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default Register;
