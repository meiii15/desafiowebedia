import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import New from './new-component';
import AppHeader from './app-header-component';
import NewsGrid from './news-grid-component';

import logo from './brand.png';
import search from './search.png';
import hamburguer from './imgs/Hamburger_icon.png';
import closeIcon from './imgs/close_icon.png'

import './App.css';


class App extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: 0,
      paginationButtons: [],
    };

    
    this.updatePaginationButtons = () => {
      var paginationButtons = [];

      for (var currentButtonIndex = 0; currentButtonIndex < this.MAX_PAGES; currentButtonIndex++) {
        let isSelected = currentButtonIndex == this.state.currentPage;

        let buttonClassName = "page " + (isSelected ? "active" : "");
        let pageIndex = currentButtonIndex;

        paginationButtons.push({
          buttonClassName: buttonClassName,
          pageIndex: pageIndex
        });
      }

      return paginationButtons;
    }
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
          </div>
        </Router>

        {/* PAGINATION */}

        <nav className="pages">
          <ul>
            {this.state.paginationButtons.map((currentButton) =>
              <li>
                <a className={currentButton.buttonClassName}
                  href="#"
                  onClick={() => this.goToPage(currentButton.pageIndex)}>{currentButton.pageIndex + 1}</a>
              </li>)}
          </ul>
        </nav>

        {/* FOOTER */}
        <div className="footer">
          <img src={logo} className="logo-footer" alt="logo" />
        </div>

      </div>

    );
  }
}

export default App;
