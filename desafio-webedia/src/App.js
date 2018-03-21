import React, { Component } from 'react';
import logo from './brand.png';
import search from './search.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />


{/* SEARCH-INPUT */}
<div className="App-Search">
          <input className="App-Input" type="text" placeholder="Search.."/>
      <button className="Search-Button" type="submit"><img src={search} className="Logo-Search" alt="search"/></button>
</div>
          {/* <h1 className="App-title">Welcome to React</h1> */}
          
        </header>
        
        
        {/* MENU */}
  
  <div className="navbar">
    <a href="#noticiasemdestaque" className="active">NOTÍCIAS EM DESTAQUE</a>
    <a href="#noticiasdobrasil">NOTÍCIAS DO BRASIL</a>
    <a href="#noticiasdoeua">NOTÍCIAS DO EUA</a>
    <a href="#noticiasdaargentina">NOTÍCIAS DA ARGENTINA</a>
    <a href="#noticiasdafrança">NOTÍCIAS DA FRANÇA</a>
  </div>
<div className="grid-center">
  <div className="grid-container">
    <div className="item1">1</div>
    <div className="item2">2</div>
    <div className="item3">3</div>  
    <div className="item4">4</div>
    <div className="item5">5</div>
    <div className="item6">6</div>
    <div className="item7">7</div>
</div>
  </div>

<div>
      <div className="pagination active"><a href="1">1</a></div>
      <div className="pagination"><a href="2">2</a></div>
      <div className="pagination"><a href="3">3</a></div>
      <div className="pagination"><a href="4">4</a></div>
      <div className="pagination"><a href="5">5</a></div>


</div>


  {/* <div className="grid-container">
  <div>1</div>
  <div>2</div>
  </div>

  <div className="grid-container2">
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
  <div>7</div>
  </div> */}




        {/* <nav class="pages">
            <ul>
                <li><a id="p1" class="page active" href="#">1</a></li>
                <li><a id="p2" class="page" href="#">2</a></li>
                <li><a id="p3" class="page" href="#">3</a></li>
                <li><a id="p4" class="page" href="#">4</a></li>
                <li><a id="p5" class="page" href="#">5</a></li>
            </ul>
        </nav> */}
   



      {/* FOOTER */}
      <div className="footer">
  
      <img src={logo} className="logo-footer" alt="logo" />
</div>


        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
      
    );
  }
}

export default App;
