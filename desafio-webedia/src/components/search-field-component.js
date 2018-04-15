import React, { Component } from 'react';

import UrlUtils from '../utils/url-utils';

import search from '../imgs/search.png';

export default class SearchField extends Component {

    static propTypes = {
        content: ""
    };

    constructor(props) {
        super();

        this.state = {
            content: ""
        };

        this.updateSearchContent = (e) => {
            var currentContent = e.target.value;
            this.setState({content:currentContent});
        };
        
        var currentLocation = window.location.href;
        
        this.search = () => {
            if(!this.state.content){
                return;
            }

            var currentCountry = UrlUtils.getParam("country", currentLocation);

            var currentRoot = window.location.protocol + "//" + window.location.host;

            var country = UrlUtils.getParam("country", currentLocation);
            var page = UrlUtils.getParam("page", currentLocation);

            var searchUrl = currentRoot + "/country/" + country + "/page/" + page + "/filter/" + this.state.content;

            window.location.href = searchUrl;
        };

        var currentFilter = UrlUtils.getParam("filter", currentLocation);

        this.state.content = currentFilter;
    }

    render() {
        return (
            <div className="App-Search">
                <div className="App-Input">
                    <input type="text" placeholder="Search.." onChange={this.updateSearchContent} value={this.state.content}/>
                    <button className="Search-Button" type="submit" onClick={() => this.search()}><img src={search} className="Logo-Search" alt="search" /></button>
                </div>
            </div>
        );
    }
}