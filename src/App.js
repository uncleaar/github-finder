import React, {Fragment, Component} from 'react';
import Navbar from "./components/layout/Navbar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css'
import Users from "./components/users/Users";
import Alert from "./components/layout/Alert";
import axios from 'axios'
import Search from "./components/users/Search";
import About from "./components/pages/About";


class App extends Component{
    state = {
        users: [],
        loading: false,
        alert: null
    }
    // Search users
    searchUsers = async (text) => {
        this.setState({loading: true})

        const res = await axios.get
        (`https://api.github.com/search/users?q=${text}&clien_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)


        this.setState({users: res.data.items, loading: false})
    }

    //Get single Github User
    getUser = async (username) => {
        this.setState({loading: true})

        const res = await axios.get
        (`https://api.github.com/users&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

        this.setState({users: res.data.items, loading: false})
    }

    //Clear Users from state

    clearUsers = () => {
        this.setState({users: [], loading:false})
    }

    //Set Alert
    setAlert = (msg, type) => {
        this.setState({alert: {msg,type} })

        setTimeout(() => this.setState({alert: null}), 5000)
    }

    render() {
        const {users, loading} = this.state

        return(
            <Router>
          <div className='App'>
            <Navbar/>
            <div className='container'>
                <Alert alert={this.state.alert}/>
                <Switch>
                    <Route exact path='/' render={props => (
                        <Fragment>
                            <Search
                                searchUsers={this.searchUsers}
                                clearUsers={this.clearUsers}
                                showClear={users.length > 0 ? true : false}
                                setAlert={this.setAlert}
                            />
                        </Fragment>
                    )}/>
                   <Route exact path='/about' component={About}/>
                </Switch>
                <Users
                    loading={loading}
                    users={users}
                />
            </div>
          </div>
            </Router>
    )
  }
}

export default App;