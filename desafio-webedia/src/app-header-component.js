import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import logo from './brand.png';
import search from './search.png';
import hamburguer from './imgs/Hamburger_icon.png';
import closeIcon from './imgs/close_icon.png'

/*
 * HEADER E BARRA DE NAVEGAÇÃO RESPONSIVOS
 */
export default class AppHeader extends Component {
  constructor(props) {
    super();
    
    this.state = {
      currentCountry: props.match.params.country,
      navBarVisible: false,
      searchInputVisible: false,
      countryButtons: [],
      isMobile: window.innerWidth < this.MOBILE_WIDTH
    }
    
    /* 
     * LARGURA MÍNIMA PARA LAYOUT DESKTOP E MÁXIMA PARA MOBILE 
     */
    this.MOBILE_WIDTH = 1000;
    
    
    /* 
     * PAÍSES QUE PODEM SER LISTADOS 
     * initials: parâmetro para chamada da API
     * label: texto mostrado nos botões da barra de navegação 
     */
    this.COUNTRIES = [
      { initials: "all", label: "NOTÍCIAS EM DESTAQUE", urlParam: "all" },
      { initials: "br", label: "NOTÍCIAS DO BRASIL", urlParam: "br" },
      { initials: "us", label: "NOTÍCIAS DOS ESTADOS UNIDOS", urlParam: "us" },
      { initials: "ar", label: "NOTÍCIAS DA ARGENTINA", urlParam: "ar" },
      { initials: "fr", label: "NOTÍCIAS DA FRANÇA", urlParam: "fr" }
    ];

    
    /**
     * MARCA O BOTÃO DO PAÍS ESCOLHIDO COMO SELECIONADO 
     */
    this.updateCountryButtons = () => {
      var countryButtons = [];

      for (var currentCountry of this.COUNTRIES) {
        var isSelected = this.state.currentCountry === currentCountry.initials ? "active" : "";

        countryButtons.push({
          initials: currentCountry.initials,
          label: currentCountry.label,
          isSelected: isSelected,
          url: "/country/" + currentCountry.urlParam + "/page/1"
        });
      }

      return countryButtons;
    }

    
    /**
     * ESCONDE E MOSTRA A BARRA DE NAVEGAÇÃO 
     */
    this.toggleNavBar = () => {
      var navBarVisibility = !this.state.navBarVisible;
      this.setState({ navBarVisible: navBarVisibility });
    }

    
    /**
     * ESCONDE E MOSTRA A CAIXA DE TEXTO PARA PESQUISA 
     */
    this.toggleSearchInput = () => {
      var searchInputVisibility = !this.state.searchInputVisible;
      this.setState({searchInputVisible : searchInputVisibility});
    }
  }

  
  /** 
   * IDENTIFICA MUDANÇAS NAS DIMENSÕES DA TELA 
   * E ATRIBUI ESTADO MOBILE OU DESKTOP QUANDO NECESSÁRIO
   */
  onResize() {
    if (this.state.isMobile && window.innerWidth > this.MOBILE_WIDTH) {
      this.setState({ isMobile: false });
    } else if (!this.state.isMobile && window.innerWidth < this.MOBILE_WIDTH) {
      this.setState({ isMobile: true })
    }
  }

  /**
   * EFETUA E RESPONSIVIDADE AO INICIAR
   * E ADICIONA EVENTO PARA ALTERAÇÕES DE DIMENSÕES DA TELA
   */
  componentDidMount() {
    this.onResize();
    window.addEventListener("resize", this.onResize.bind(this));

    var currentCountrButtons = this.updateCountryButtons();
    this.setState({ countryButtons: currentCountrButtons });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize.bind(this));

  }

  render() {

    if (this.state.isMobile) {
      return (<header className="App-header">

        {!this.state.searchInputVisible &&
          <img src={hamburguer} className="menu-button" onClick={() => { this.toggleNavBar(); }} />
        }

        {!this.state.searchInputVisible &&
          <a href="/country/all/page/1" className="App-logo">
            <img src={logo} alt="logo" />
          </a>
        }

        {this.state.navBarVisible &&
          <div className="navbar">
            {
              this.state.countryButtons.map((currentCountry) =>
                <a href={currentCountry.url}
                  className={currentCountry.isSelected}>
                  {currentCountry.label}
                </a>)
            }
          </div>
        }

        {this.state.navBarVisible &&
          <div className="mobile-menu-backgroud">
            <img
              src={closeIcon}
              className="close-navbar-button"
              onClick={() => { this.toggleNavBar(); }} />
          </div>
        }

        {!this.searchInputVisible && 
           <div className="App-Search">
              <div className="App-Input">
                <input type="text" placeholder="Search.." />
                <button className="Search-Button" type="submit"><img src={search} className="Logo-Search" alt="search" /></button>
              </div>
            </div>
        }

        {!this.searchInputVisible &&
          <img src={search} className="close-navbar-button" onClick={() => {this.toggleSearchInput()}}/>
        }

        {this.searchInputVisible &&
          <img src={closeIcon} className="close-navbar-button" onClick={() => {this.toggleSearchInput()}}/>
        }

      </header>)
    }

    return (
      <header className="App-header">
        <img src={hamburguer} className="menu-button" onClick={() => { this.toggleNavBar(); }} />

        <a href="/country/all/page/1" className="App-logo">
          <img src={logo} alt="logo" />
        </a>

        <div className="navbar">
            {
              this.state.countryButtons.map((currentCountry) =>
                <a href={currentCountry.url}
                  className={currentCountry.isSelected}>
                  {currentCountry.label}
                </a>)
            }
        </div>

        {/* SEARCH-INPUT */}

        <div className="App-Search">
          <div className="App-Input">
            <input type="text" placeholder="Search.." />
            <button className="Search-Button" type="submit"><img src={search} className="Logo-Search" alt="search" /></button>
          </div>
        </div>
      
      </header>);
  }
}