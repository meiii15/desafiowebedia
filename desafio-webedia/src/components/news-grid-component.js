import React, { Component } from 'react';
import ApiClient from '../api-client';

import New from './new-component';

/*
 * COMPONENTE PARA LISTAGEM DE NOTÍCIAS
 */
export default class NewsGrid extends Component {
    constructor(props) {
        super();
        
        /**
         * MÁXIMO DE NOTÍCIAS POR PÁGINA
         */
        this.PAGE_SIZE = 7;
        
        /**
         * FLAG PARA LISTAR NOTÍCIAS DE TODOS OS PAÍSES
         * PARA NOTÍCIAS EM DESTAQUE
         */
        this.ALL = "all";

        this.apiClient = new ApiClient();
        this.state = {
            news:[]
        };

        /**
         * ATUALIZA NOTÍCIAS NA VIEW, ATUALIZA A LISTAGEM
         * 
         * @param {*} newsResponse 
         */
        this.updateNews = (newsResponse) => {
            if (newsResponse.status == "error") {
                return;
            }

            /*
             * AJUSTA LARGURA DAS COLUNAS
             * ALTERNANDO ENTRE DUAS MAIS LARGAS E TRÊS MAIS FINAS
             * A CADA LINHA
             */ 
            
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

            /*
             * ATUALIZA NOTÍCIAS NA VIEW
             */
            this.setState({
                news: news,
            });
        }

        /*
         * OBTEM NOTÍCIAS EM DESTAQUE
         */
        this.showTopHeadLines = (page) => {
            var countries = [
                { 'country': 'us' },
                { 'country': 'fr' },
                { 'country': 'br' },
                { 'country': 'ar' }
            ];

            this.apiClient.getTopHeadLines(countries, this.PAGE_SIZE, page)
                .then(response => response.json())
                .then(this.updateNews);
        }

        /*
         * OBTEM NOTÍCIAS DE UM PAÍS
         */
        this.showNewsFrom = (country, page) => {

            if (country == this.ALL) {
                this.showTopHeadLines(page);
                return;
            }

            this.apiClient.getNewsFrom(country, this.PAGE_SIZE, page)
                .then(response => response.json())
                .then(this.updateNews);
        }

        /*
         * OBTENDO PAÍS E PAǴINA A SEREM LISTADOS  
         * A PARTIR DE PARÂMETROS DA URL
         */
        var currentCountry = props.match.params.country;
        var currentPage = props.match.params.page;

        /*
         * CASO NÃO SEJA INFORMADO UM PAÍS, 
         * SERÁ FEITA A LISTAGEM DE NOTÍCIAS EM DESTAQUE
         * NA PRIMEIRA PÁGINA
         */ 
        if(!currentCountry){
            this.showTopHeadLines(1);
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