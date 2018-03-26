import React, { Component } from 'react';

export default class New extends Component{
    constructor(newData, cardClass){
        super();

        let newPulishTimestamp = Date.parse(newData.publishedAt);
        let newPublishDate = new Date(newPulishTimestamp);
        
        this.image = newData.urlToImage
        this.title = newData.title;
        this.date = newPublishDate.toLocaleDateString("pt-br");
        this.content = newData.description;
        this.author = newData.author;
        this.url = newData.url;
        this.cardClass = cardClass;
    }
    
    render(){
        return (
        <a href={this.url} className={this.cardClass} target="_blank">
            <div className="new-container">
                <div className="new-image">
                    <img src={this.image}/> 
                </div>
                <div className="new-info">
                    <span className="new-publish-date"> {this.date} </span>
                    <h3> {this.title} </h3>
                    <div className="new-description"> {this.content} </div>
                    <span className="new-author"> {this.author} </span>
                </div>
            </div>
        </a>)
    }
}