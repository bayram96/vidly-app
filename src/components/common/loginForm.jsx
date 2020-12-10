import React from "react";
import Joi from "joi-browser";
import Form from "./form";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
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
          
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
