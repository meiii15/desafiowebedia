import React, { Component } from 'react';

/*
 * COMPONENTE DE PAGINAÇÃO DA LISTAGEM DE NOTÍCIAS
 */
export default class Pagination extends Component {
    constructor(props) {
        super();

        /*
         * MÁXIMO DE PÁGINAS
         */
        this.MAX_PAGES = 5;

        /**
         * MARCA PÁGINA ESCOLHIDA COMO SELECIONADO
         * 
         * @param {number} currentPage 
         * @param {string} country 
         */
        this.updatePaginationButtons = (currentPage, country) => {
            var paginationButtons = [];

            var filterValue = props.match.params.filterValue;
            var filterParam = ( filterValue ? "/filter/" + filterValue : "");

            for (var currentButtonIndex = 1; currentButtonIndex <= this.MAX_PAGES; currentButtonIndex++) {
                let isSelected = currentButtonIndex == currentPage;

                let buttonClassName = "page " + (isSelected ? "active" : "");
                let pageIndex = currentButtonIndex;

                paginationButtons.push({
                    buttonClassName: buttonClassName,
                    url: "/country/" + country + "/page/" + pageIndex + filterParam,
                    pageIndex: pageIndex
                });
            }

            return paginationButtons;
        }
        
        /*
         * OBTEM PÁGINA SELECIONADA A PARTIR DA URL
         */
        this.state = {
            paginationButtons: this.updatePaginationButtons(props.match.params.page, props.match.params.country)
        }
    }

    render() {
        return(
            <nav className="pages">
                <ul>
                    {this.state.paginationButtons.map((currentButton) =>
                        <li>
                            <a className={currentButton.buttonClassName}
                                href={currentButton.url}>
                                {currentButton.pageIndex}
                            </a>
                        </li>)}
                </ul>
            </nav>
        );
    }

}