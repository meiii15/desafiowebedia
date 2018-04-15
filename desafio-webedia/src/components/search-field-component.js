import React, { Component } from 'react';

import UrlUtils from '../utils/url-utils';

import search from '../imgs/search.png';
import closeIcon from '../imgs/close_icon.png';

export default class SearchField extends Component {

    static propTypes = {
        content: ""
    };

    constructor(props) {
        super();

        this.state = {
            content: "",
            isMobile: props.isMobile,
            isHidden: true,
        };

        this.updateSearchContent = (e) => {
            var currentContent = e.target.value;
            this.setState({ content: currentContent });
        };

        var currentLocation = window.location.href;

        this.search = () => {
            if (!this.state.content) {
                return;
            }

            var currentCountry = UrlUtils.getParam("country", currentLocation);

            var currentRoot = window.location.protocol + "//" + window.location.host;

            var country = UrlUtils.getParam("country", currentLocation);
            var page = UrlUtils.getParam("page", currentLocation);

            var searchUrl = currentRoot + "/country/" + country + "/page/" + page + "/filter/" + this.state.content;

            window.location.href = searchUrl;
        };

        this.toggleSearchField = () =>{
            var isHiddenState = this.state.isHidden;
            
            this.setState({isHidden : !isHiddenState});
        }

        var currentFilter = UrlUtils.getParam("filter", currentLocation);

        this.state.content = currentFilter;
    }

    render() {

        if (!this.state.isMobile)
            return (
                <div className="App-Search">
                    <div className="App-Input">
                        <input type="text" placeholder="Search.." onChange={this.updateSearchContent} value={this.state.content} />
                        <button className="Search-Button" type="submit" onClick={() => this.search()}><img src={search} className="Logo-Search" alt="search" /></button>
                    </div>
                </div>
            );
        else
            return (
                <div className="App-Search-Container">
                    {!this.state.isHidden &&
                        <div className="App-Search">
                            <div className="App-Input">
                                <button className="Search-Button" type="submit" onClick={() => this.search()}><img src={search} className="Logo-Search" alt="search" /></button>
                                <input type="text" placeholder="Search.." onChange={this.updateSearchContent} value={this.state.content} />
                            </div>
                        </div>
                    }

                    {this.state.isHidden &&
                        <button className="Search-Button" type="submit" onClick={() => { this.toggleSearchField(); }}><img src={search} className="Logo-Search" alt="search" /></button>
                    }

                    {!this.state.isHidden &&
                       <img
                         src={closeIcon}
                         className="close-navbar-button"
                         onClick={() => { this.toggleSearchField(); }} />
                    }
                </div>
            );
    }
}