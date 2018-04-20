import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    //show the app name and how many clients are connected
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="navbar-client">{this.props.value} users online</div>
      </nav>
    )
  }
}

export default Navbar;