import React, { Component } from 'react';
import logo from './brand.png';
import search from './search.png';
import hamburguer from './imgs/Hamburger_icon.png';
import closeIcon from './imgs/close_icon.png'

export default class AppHeader extends Component {
  constructor() {
    super();

    this.MOBILE_WIDTH = 1000;
    this.COUNTRIES = [
      { initials: "all", label: "NOTÍCIAS EM DESTAQUE", urlParam: "all" },
      { initials: "br", label: "NOTÍCIAS DO BRASIL", urlParam: "br" },
      { initials: "us", label: "NOTÍCIAS DOS ESTADOS UNIDOS", urlParam: "us" },
      { initials: "ar", label: "NOTÍCIAS DA ARGENTINA", urlParam: "ar" },
      { initials: "fr", label: "NOTÍCIAS DA FRANÇA", urlParam: "fr" }
    ];

    this.state = {
      currentCountry: "all",
      navBarVisible: true,
      countryButtons: [],
      isMobile: window.innerWidth < this.MOBILE_WIDTH
    }

    this.updateCountryButtons = () => {
      var countryButtons = [];

      for (var currentCountry of this.COUNTRIES) {
        var isSelected = this.state.currentCountry === currentCountry.initials ? "active" : "";

        countryButtons.push({
          initials: currentCountry.initials,
          label: currentCountry.label,
          isSelected: isSelected,
          url: "#?country=" + currentCountry.urlParam
        });
      }

      return countryButtons;
    }

    this.toggleNavBar = () => {
      var navBarVisibility = !this.state.navBarVisible;
      this.setState({ navBarVisible: navBarVisibility });
    }
  }

  onResize() {
    if (this.state.isMobile && window.innerWidth > this.MOBILE_WIDTH) {
      this.setState({ isMobile: false });
    } else if (!this.state.isMobile && window.innerWidth < this.MOBILE_WIDTH) {
      this.setState({ isMobile: true })
    }
  }

  componentDidMount() {
    this.onResize();
    window.addEventListener("resize", this.onResize.bind(this));
    
    var currentCountrButtons = this.updateCountryButtons();
    this.setState({countryButtons: currentCountrButtons});
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize.bind(this));
    
  }

  render() {
    
    return(
      <header className="App-header">
        <img src={hamburguer} className="menu-button" onClick={() => { this.toggleNavBar(); }} />

        <img src={logo} className="App-logo" alt="logo" />


        {/* SEARCH-INPUT */}

        {
          !this.state.isMobile &&
          <div className="App-Search">
            <div className="App-Input">
              <input type="text" placeholder="Search.." />
              <button className="Search-Button" type="submit"><img src={search} className="Logo-Search" alt="search" /></button>
            </div>
          </div>
        }

        {
          (this.state.navBarVisible || !this.state.isMobile) &&
          <div className="navbar">
            {
              this.state.countryButtons.map((currentCountry) =>
                <a
                  className={currentCountry.isSelected}
                  href={currentCountry.url}>
                  {currentCountry.label}
                </a>
              )
            }
          </div>
        }

        {
          (this.state.isMobile && this.state.navBarVisible) &&
          <div className="mobile-menu-backgroud">
            <img
              src={closeIcon}
              className="close-navbar-button"
              onClick={() => { this.toggleNavBar(); }} />
          </div>
        }

      </header>);
  }
}