import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';

class LoginForm extends Component {
  state = {
    errors: []
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard')
    }
  }

  onSubmit = ({ email, password }) => {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }]
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map(e => e.message);
        this.setState({ errors });
      })
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm 
          onSubmit={this.onSubmit}
          errors={this.state.errors}
        />
      </div>
    )
  }
}

export default graphql(query)(
  graphql(mutation)(LoginForm)
);
