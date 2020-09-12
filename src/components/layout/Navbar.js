import React, { Component } from 'react';

export class Navbar extends Component {
    static defaultProps = {
        title: 'Github Finder',
        icon: 'fab fa-github'
    }


  render() {
    return(
        <nav className='navbar bg-primary'>
            <h1>
                <Navbar/>
            </h1>
        </nav>
      )
  }
}

export default Navbar;
