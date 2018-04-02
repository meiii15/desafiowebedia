import React, { Component } from 'react';

export default class Pagination extends Component {
    constructor(props) {
        super();

        this.MAX_PAGES = 5;

        this.updatePaginationButtons = (currentPage, country) => {
            var paginationButtons = [];

            for (var currentButtonIndex = 0; currentButtonIndex < this.MAX_PAGES; currentButtonIndex++) {
                let isSelected = currentButtonIndex == currentPage;

                let buttonClassName = "page " + (isSelected ? "active" : "");
                let pageIndex = currentButtonIndex;

                paginationButtons.push({
                    buttonClassName: buttonClassName,
                    url: "/country/" + country + "/page/" + pageIndex,
                    pageIndex: pageIndex
                });
            }

            return paginationButtons;
        }
        
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
                                {currentButton.pageIndex + 1}
                            </a>
                        </li>)}
                </ul>
            </nav>
        );
    }

}