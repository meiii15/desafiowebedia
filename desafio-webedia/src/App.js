import React, { Component } from 'react';

import New from './new-component';
import ApiClient from './api-client';

import logo from './brand.png';
import search from './search.png';

import './App.css';


class App extends Component {
  constructor() {
    super();

    this.apiClient = new ApiClient();

    this.news = [];
    this.paginationButtons = [];
    this.currentPage = 0;
    this.currentCountry = "";
    
    this.MAX_PAGES = 5;
    this.PAGE_SIZE = 7;
    this.ALL = "all";

    this.updateNews = (newsResponse) => {
      if(newsResponse.status == "error"){
        return;
      }
      
      var news = [];
      
      for(var currentNewData  of newsResponse.articles)
      {
        var currentNew = new New(currentNewData);
        news.push(currentNew);
      }

      this.news = news;
      this.updatePaginationButtons();
      this.setState({});
    }

    this.showTopHeadLines = (page) => {
      var countries = [
        {'country': 'us'},
        {'country': 'fr'},
        {'country': 'br'},
        {'country': 'ar'}
      ];

      this.currentCountry = this.ALL;

      this.apiClient.getTopHeadLines(countries, this.PAGE_SIZE, page)
        .then(response => response.json())
        .then(this.updateNews)
    }

    this.showNewsFrom = (country) => {
      this.currentCountry = country;
      this.currentPage = 0;
      
      this.apiClient.getNewsFrom(country, this.PAGE_SIZE, this.currentPage)
      .then(response=> response.json())  
      .then(this.updateNews);
    }

    this.goToPage = (page) => {
      this.currentPage = page;
      
      //A PAGINAÇÃO DA API NÃO COMEÇA A PARTIR DO ZERO
      let selectedPage = this.currentPage + 1;

      if(this.currentCountry == this.ALL){
        this.showTopHeadLines(selectedPage);
        return;
      }
      
      
      this.apiClient.getNewsFrom(this.currentCountry, this.PAGE_SIZE, selectedPage)
      .then(response=> response.json())  
      .then(this.updateNews);
    }

    this.updatePaginationButtons = () => {
      this.paginationButtons = [];
      
      for(var currentButtonIndex = 0; currentButtonIndex < this.MAX_PAGES; currentButtonIndex++){
        let isSelected = false;
        
        if(currentButtonIndex == this.currentPage)
        {
          isSelected = true;
        }

        let buttonClassName = "page ";
        buttonClassName += isSelected ? "active" : "";

        let pageIndex = currentButtonIndex;

        this.paginationButtons.push({ 
          index: pageIndex,
          render: () => 
          <li>
            <a id="p1" className={buttonClassName} href="#" onClick={ () => this.goToPage(pageIndex) }>{pageIndex + 1}</a>
          </li>
        });
      }
    }

    this.showTopHeadLines();
  }

  render() {
    
    for(var buttonIndex = 0; buttonIndex < 5; )
    
    return (
      <div className="App">
        {/*HEADER*/}
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />


          {/* SEARCH-INPUT */}
          
          <div className="App-Search">
            <input className="App-Input" type="text" placeholder="Search.." />
            <button className="Search-Button" type="submit"><img src={search} className="Logo-Search" alt="search" /></button>
          </div>
          {/* <h1 className="App-title">Welcome to React</h1> */}

        </header>


        {/* MENU */}

        <div className="navbar">
          <a href="#noticiasemdestaque" className="active" onClick={() => this.showTopHeadLines(1) }>NOTÍCIAS EM DESTAQUE</a>
          <a href="#noticiasdobrasil" onClick={()=> this.showNewsFrom('br')}>NOTÍCIAS DO BRASIL</a>
          <a href="#noticiasdoeua" onClick={()=> this.showNewsFrom('us')}>NOTÍCIAS DO EUA</a>
          <a href="#noticiasdaargentina" onClick={()=> this.showNewsFrom('ar')}>NOTÍCIAS DA ARGENTINA</a>
          <a href="#noticiasdafrança" onClick={()=> this.showNewsFrom('fr')}>NOTÍCIAS DA FRANÇA</a>
        </div>
        
        {/* GRID */}
        
        <div className="grid-center">
          <div className="grid-container">
            { this.news.map((currentNew) => currentNew.render() ) }
          </div>
        </div>

        {/* PAGINATION */}

        <nav class="pages">
          <ul>
            {this.paginationButtons.map(pageButton => pageButton.render())}
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
