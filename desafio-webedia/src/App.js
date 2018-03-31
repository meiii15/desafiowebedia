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

    this.MAX_PAGES = 5;
    this.PAGE_SIZE = 7;
    this.ALL = "all";
    this.countries = [
      {initials:"all", label: "NOTÍCIAS EM DESTAQUE"},
      {initials:"br", label:"NOTÍCIAS DO BRASIL"},
      {initials:"us", label:"NOTÍCIAS DOS ESTADOS UNIDOS"},
      {initials:"ar", label:"NOTÍCIAS DA ARGENTINA"},
      {initials:"fr", label:"NOTÍCIAS DA FRANÇA"}
    ]
    
    this.state = { 
      currentCountry: "all",
      currentPage: 0,
      paginationButtons: [],
      countryButtons: [],
      news: [] 
    };

    this.updateNews = (newsResponse) => {
      if (newsResponse.status == "error") {
        return;
      }

      var news = [];

      var largerCount = 0;
      var isLarger = true;

      for (var currentNewData of newsResponse.articles) {
        let cardClass = "normal";

        if (isLarger && (!(largerCount % 2 == 0) || largerCount == 0)) {
          cardClass = "larger";
        } else if (largerCount % 3 == 0) {
          largerCount = 0;
          isLarger = true;
          cardClass = "larger";
        } else if (isLarger) {
          largerCount = 0;
          isLarger = false;
        }

        largerCount++;

        currentNewData.cardClass = cardClass;

        news.push(currentNewData);
      }

      var paginationButtons = this.updatePaginationButtons();
      var countryButtons = this.updateCountryButtons();
      this.setState({ 
        news: news,
        countryButtons: countryButtons,
        paginationButtons: paginationButtons
      });
    }

    this.showTopHeadLines = (page) => {
      var countries = [
        { 'country': 'us' },
        { 'country': 'fr' },
        { 'country': 'br' },
        { 'country': 'ar' }
      ];
      
      this.setState({
        currentCountry:"all",
        news : []}
      );

      this.apiClient.getTopHeadLines(countries, this.PAGE_SIZE, page)
        .then(response => response.json())
        .then(this.updateNews);
    }

    this.showNewsFrom = (country) => {
      
      if(country == this.ALL){
        this.showTopHeadLines();
        return;
      }
      
      this.setState({
        currentPage: 0,
        currentCountry: country,
        news:[]
      });

      this.apiClient.getNewsFrom(country, this.PAGE_SIZE, this.currentPage)
        .then(response => response.json())
        .then(this.updateNews);
    }

    this.goToPage = (page) => {
      this.setState({currentPage:page})

      //A PAGINAÇÃO DA API NÃO COMEÇA A PARTIR DO ZERO
      let selectedPage = page + 1;
      
      if (this.state.currentCountry == this.ALL) {
        this.showTopHeadLines(selectedPage);
        return;
      }


      this.apiClient.getNewsFrom(this.state.currentCountry, this.PAGE_SIZE, selectedPage)
        .then(response => response.json())
        .then(this.updateNews);
    }

    this.updatePaginationButtons = () => {
      var paginationButtons = [];

      for (var currentButtonIndex = 0; currentButtonIndex < this.MAX_PAGES; currentButtonIndex++) {
        let isSelected = currentButtonIndex == this.state.currentPage;
        
        let buttonClassName = "page " + (isSelected ? "active" : "");
        let pageIndex = currentButtonIndex;

        paginationButtons.push({
          buttonClassName:buttonClassName,
          pageIndex:pageIndex
        });
      }

      return paginationButtons;
    }

    this.updateCountryButtons = () => {
      var countryButtons = [];

      for (var currentCountry of this.countries)
      {
        var isSelected = this.state.currentCountry === currentCountry.initials ? "active":"";

        countryButtons.push({
          initials: currentCountry.initials,
          label: currentCountry.label,
          isSelected: isSelected
        });
      }

      return countryButtons;
    }

    this.showTopHeadLines();
  }

  render() {

    for (var buttonIndex = 0; buttonIndex < 5;)

      return (
        <div className="App">
          {/*HEADER*/}

          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />


            {/* SEARCH-INPUT */}

            <div className="App-Search">
              <div className="App-Input">
                <input type="text" placeholder="Search.." />
                <button className="Search-Button" type="submit"><img src={search} className="Logo-Search" alt="search" /></button>
              </div>
            </div>

          </header>

          <div className="navbar">
            {
              this.state.countryButtons.map((currentCountry) =>
                <a 
                  href="#noticiasemdestaque" 
                  className={currentCountry.isSelected} 
                  onClick={() => this.showNewsFrom(currentCountry.initials)}>
                    {currentCountry.label}
                </a>
              )
            }
          </div>

          {/* GRID */}

          <div className="grid-center">
            <div className="grid-container">
              {this.state
                .news
                .map((currentNew) =>
                  <New
                    urlToImage={currentNew.urlToImage}
                    title={currentNew.title}
                    publishedAt={currentNew.publishedAt}
                    description={currentNew.description}
                    author={currentNew.author}
                    url={currentNew.url}
                    cardClass={currentNew.cardClass}>
                  </New>)
              }
            </div>
          </div>

          {/* PAGINATION */}

          <nav className="pages">
            <ul>
              {this.state.paginationButtons.map((currentButton) => 
                <li>
                  <a  className={currentButton.buttonClassName} 
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
