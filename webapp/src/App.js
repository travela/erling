import React from "react";
import Home from "./views/Home"
import './App.css';

function App() {

        return (
            <div style={{backgroundImage: 'url("forest.jpg")'}} className="App">
              <div className="App-header">
                <Home />
              </div>
            </div>

        );
}

export default App;