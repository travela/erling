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
        }).then((res) => {console.log(res); return(res);}
            ).then((res) => this.setState({email: res.data})
                ).catch((err) => {alert("Error: " + err.response.data)
                console.log(err.response)})
        console.log("signUp pressed.");
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
                        <button onClick={(e) => this.signUp(e)}>
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
            console.log(res)
            console.log(res.data);
            this.setState(
                {token : res.data.token, loggedIn : true}, );
            this.storeSession();
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

export default class Home extends Component {
    state = { 
        user : "Stranger",
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
                    <h2>Welcome, 
                        {localStorage.getItem('user') ? localStorage.getItem('user') : this.state.user}!
                    </h2>
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