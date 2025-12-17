import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";
import "../App.css";
const axios = require('axios');


class SignUp extends Component { 


      
constructor(props){
    super(props)
    this.state = { 
        password : "",
        email : "",
        name : "",
    }
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.signUp = this.signUp.bind(this);
}

    signUp(e) {
        e.preventDefault();
        console.log(e);
        axios.get("http://localhost:3005/signup", {
            params: {
            email: this.state.email,
            password : this.state.password,
            name : this.state.name,
            }
        }).then((res) => {alert("Sign Up successful! Please log in.")
                this.setState({password : "", email : "", name : ""});
                // redirect to sign in page
                window.location.href = "/signin";
            }
                ).catch((err) => {alert("Error: " + err.response.data)
                console.log(err.response)})
    }

    handlePasswordChange(event){
        this.setState({password : event.target.value}) 
    }

    handleNameChange(event){
        this.setState({name : event.target.value}) 
    }

    handleEmailChange(event){
        this.setState({email : event.target.value}) 
    }

    render () {       

        return (
          <div>
               <div id='signupContainer'>
                    <form id='form'>       
                        <input className='input' type="text"  
                         placeholder="Username" value={this.state.name} onChange={this.handleNameChange}/>          
                        <input className='input' type="text"  
                         placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}/>          
                        <input className='input' type="password" 
                         placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
                        <button className="button" onClick={(e) => this.signUp(e)}>
                            Sign Up
                        </button>
                    </form>
               </div>
          </div>
        )
     }
  }

  class SignIn extends Component { 
    
    constructor(props){
        super(props)
        this.state = { 
            password : "",
            email : "",
            name : "",
            loggedIn : false,
            token : '',
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.signIn = this.signIn.bind(this);
    }
    
    signIn(event) {
        event.preventDefault();
        axios.get("http://localhost:3005/signin", {
            params: {
            password : this.state.password,
            name : this.state.name,
            }
        }).then((res) => {
            localStorage.setItem('user', this.state.name);
            localStorage.setItem('token', res.data.token);
            this.setState(
                {token : res.data.token, loggedIn : true}, );
            }).catch((err) => {      alert("Error: " + err.response.data)
                                        console.log(err.response.data)})
    }

    handlePasswordChange(event){
        this.setState({password : event.target.value}) 
    }

    handleNameChange(event){
        this.setState({name : event.target.value}) 
    }

    storeSession(){
        localStorage.setItem('user', this.state.name);
        localStorage.setItem('token', this.state.token);
      };

    render () {  
        if (this.state.loggedIn === true) {
            return <Redirect to='/stank' />
          }
                                       
        return (
          <div>
               <div id='signinContainer'>
                    <form onSubmit={this.signIn}>                
                        <input className='input' type="text"  
                         placeholder="Username" value={this.state.name} onChange={this.handleNameChange}/>                 
                        <input className='input' type="password" 
                         placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
                        <input className='button' type="submit" value="Sign In"/>
                    </form>
               </div>
          </div>
        )
     }
  }

function Base(){
    return (
        <ul className="App-link">
        <li>
            <Link to="signin" className="App-link"> Sign In</Link>
        </li>
        <li>
            <Link to="signup" className="App-link">Sign Up</Link>
        </li>
    </ul>
    );
}

class Welcome extends Component {
    state = {
        user: "Stranger"
    }

    componentDidMount() {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            this.setState({ user: storedUser });
        }
    }

    handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    render() {
        return (
            <div>
                {localStorage.getItem('token') && <button onClick={this.handleLogout} className="logout-button">
                    Logout
                </button>}
                <h2>Welcome, {this.state.user}!</h2>
            </div>
        )
    }
}

export default class Home extends Component {
    state = { 
        user : "Stranger",
    }

    componentDidMount() {
        // Update user from localStorage when component mounts
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            this.setState({ user: storedUser });
        }
    }

    render () {                                   
       return (
        <Router>
        <div  id='container'>
            
            <Switch>
                <Route path="/signin">
                    <Base/>
                    <SignIn />
                </Route>
                <Route path="/signup">
                    <Base/>
                    <SignUp />
                </Route>
                <Route path="/stank">
                    <Welcome />
                </Route>
                <Route path="/">
                    <h2>Welcome!</h2>
                    <Base/>
                </Route>
            </Switch>
        </div>
    </Router>

            
       )
    }
 }

// export {
//    Base,
//   SignIn,
//   SignUp,
// }