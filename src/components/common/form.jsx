import React, { Component } from 'react';
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
    state = {
        data: {},
        errors: {}
      }
      validate = () => {
        const result = Joi.validate(this.state.data, this.schema, {
          abortEarly: false,
        });
        const errors = {};
        if (!result.error) return null;
        result.error.details.map((e) => {
          errors[e.path[0]] = e.message;
        });
        return errors;
      };
    
      validateProperty = ({name, value}) => {
       const obj = { [name]: value}
       const schema = {[name]: this.schema[name]}
       const errors = Joi.validate(obj, schema);
       return errors.error ? errors.error.details[0].message : null
      };
    
      handleChange = (e) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(e.currentTarget);
        if (errorMessage) errors[e.currentTarget.name] = errorMessage;
        else delete errors[e.currentTarget.name];
    
        const data = { ...this.state.data };
        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ data, errors });
      };
      handleSubmit = (e) => {
        e.preventDefault();
    
        const errors = this.validate();
    
        this.setState({ errors: errors || {} });
        if (errors) return;
        
        this.doSubmit();
      };
      
      handleChangeSelect = (e) => {
        const data = {...this.state.data}
        data.genre = e.currentTarget.value;
        this.setState({data});
    };
      renderButton(label) {
          return (
        <button disabled={this.validate()} type="submit" className="btn btn-primary">
            {label}
        </button>
          );
      }
      
      renderInput(name, label, type = "text") {
        const { errors } = this.state;
          return (
          <Input
            type={type}
            onChange={this.handleChange}
            value={this.state.data[name]}
            name={name}
            label={label}
            error={errors[name]}
          />);
      }
      renderSelect(name, label) {

        return(
            <div>
                <label htmlFor="inputGroupSelect01">{label}</label>
                <select value={this.state.data[name]} onChange={this.handleChangeSelect} className="custom-select" id="inputGroupSelect01">
                    <option defaultValue></option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Thriller">Thriller</option>
                </select>
            </div>
        )
      }
    
}
 
export default Form;