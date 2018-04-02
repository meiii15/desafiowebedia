import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import New from './new-component';
import AppHeader from './app-header-component';
import NewsGrid from './news-grid-component';
import Pagination from './pagination-component';

import logo from './brand.png';
import search from './search.png';
import hamburguer from './imgs/Hamburger_icon.png';
import closeIcon from './imgs/close_icon.png'

import './App.css';


class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        
        <Router>
          <div>
            {/*HEADER*/}
            <Route path="/country/:country/*" component={AppHeader}/>
            
            {/* GRID */}
            <Route path="/country/:country/page/:page" component={NewsGrid}/>
            
            {/* PAGINATION */}
            <Route path="/country/:country/page/:page" component={Pagination}/>
          </div>
        </Router>


        {/* FOOTER */}
        <div className="footer">
          <a href="http://jobs.webedia.group/frontend">
            <img src={logo} alt="logo" className="logo-footer"/>
          </a>
        </div>

      </div>

    );
  }
}

export default App;
