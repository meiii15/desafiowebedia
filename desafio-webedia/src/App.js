import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

// import New from './new-component';
import AppHeader from './components/app-header-component';
import NewsGrid from './components/news-grid-component';
import Pagination from './components/pagination-component';

import logo from './imgs/brand.png';

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
            {/* 
              * AO ACESSAR O ROOT
              * É FEITO REDIRECIONAMENTO PARA 
              * PRIMEIRA PÁGINA DA LISTAGEM DE NOTÍCIAS
              * EM DESTQUE
              */}
            <Route exact path="/" render={() => (
                <Redirect to="/country/all/page/1"/>
            )}/>
            
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
