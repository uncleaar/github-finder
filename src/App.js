import React, {Component} from 'react';
import Navbar from "./components/layout/Navbar";
import './App.css'
import Users from "./components/users/Users";
import Alert from "./components/layout/Alert";
import axios from 'axios'
import Search from "./components/users/Search";


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
        (`https://api.github.com/users?q=${text}client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)


        this.setState({users: res.data.items, loading: false})
    }

    //clear users from state

    clearUsers = () => {
        this.setState({users: [], loading:false})
    }

    //set alert
    setAlert = (msg, type) => {
        this.setState({alert: {msg,type} })

        setTimeout(() => this.setState({alert: null}), 5000)
    }

    render() {
        const {users, loading} = this.state

        return(
          <div className='App'>
            <Navbar/>
            <div className='container'>
                <Alert alert={this.state.alert}/>
                <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                />
                <Users
                    loading={loading}
                    users={users}
                />
            </div>
          </div>
    )
  }
}

export default App;