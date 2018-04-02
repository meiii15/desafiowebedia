import React, { Component } from 'react';
import ApiClient from './api-client';

import New from './new-component';

export default class NewsGrid extends Component {
    constructor(props) {
        super();
        
        this.MAX_PAGES = 5;
        this.PAGE_SIZE = 7;
        this.ALL = "all";

        this.apiClient = new ApiClient();

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

            this.setState({
                news: news,
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
                currentCountry: "all",
                news: []
            }
            );

            this.apiClient.getTopHeadLines(countries, this.PAGE_SIZE, page)
                .then(response => response.json())
                .then(this.updateNews);
        }

        this.showNewsFrom = (country, page) => {

            if (country == this.ALL) {
                this.showTopHeadLines();
                return;
            }

            this.setState({
                currentPage: 0,
                currentCountry: country,
                news: []
            });

            this.apiClient.getNewsFrom(country, this.PAGE_SIZE, page)
                .then(response => response.json())
                .then(this.updateNews);
        }

        var currentCountry = props.match.params.country;
        var currentPage = props.match.params.page;

        this.state = {
            currentPage:0,
            currentCountry: "all",
            news:[]
        };

        if(!currentCountry){
            this.showNewsFrom(this.ALL, 0);
            return;
        }

        this.showNewsFrom(currentCountry, currentPage)
    }

    render() {
        return (
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
        );
    }
}