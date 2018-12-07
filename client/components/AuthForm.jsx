import React, { Component } from 'react'

class AuthForm extends Component {
  state = {
    email: '',
    password: '',
    inputList: ['email', 'password']
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;  
    this.props.onSubmit({ email, password });
  }

  render() {
    const errors = this.props.errors || [];
    return (
      <div className="row">
        <form className="col s6" onSubmit={this.onSubmit}>
          {this.state.inputList.map((field, i) => (
            <div className="input-field" key={i}>
              <input                
                type={field === 'email' ? 'text' : 'password'}
                placeholder={field.substr(0, 1).toUpperCase() + field.slice(1)}
                value={this.state[field]}
                onChange={e => this.setState({ [field]: e.target.value })}
              />
            </div>
          ))}
          <div className="errors">
            {errors.map(e => <div key={e}>{e}</div>)}
          </div>
          <button className="btn">
            Submit
          </button>
        </form>
      </div>
      
    )
  }
}

export default AuthForm;
