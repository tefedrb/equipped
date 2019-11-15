import React from 'react';

function SignUpform(){
  return (
    <form className="signup" onSubmit={this.handleSubmit}>
      <label>
        Sign Up
      </label>
        <input name="title"
          type="text" value={this.state.email}
          placeholder="title..."
          onChange={this.handleChange}
        />
        <input name="username"
          type="text"
          value={this.state.username}
          placeholder="username..."
          onChange={this.handleChange}
        />
        <input name="password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          placeholder="password..."
        />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default SignUpForm;
