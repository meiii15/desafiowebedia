import React, { Component } from 'react';

export default class New extends Component{
    constructor(prop){
        super(prop);

        let newPulishTimestamp = Date.parse(prop.publishedAt);
        let newPublishDate = new Date(newPulishTimestamp);
        
        this.state = {
            image : prop.urlToImage,
            title : prop.title,
            date : newPublishDate.toLocaleDateString("pt-br"),
            content :prop.description,
            author : prop.author,
            url : prop.url,
            cardClass : prop.cardClass
        };
    }
    
    render(){
        return (
        <a href={this.state.url} className={this.state.cardClass} target="_blank">
            <div className="new-container">
                <div className="new-image">
                    <img src={this.state.image}/> 
                </div>
                <div className="new-info">
                    <span className="new-publish-date"> {this.state.date} </span>
                    <h3> {this.state.title} </h3>
                    <div className="new-description"> {this.state.content} </div>
                    <span className="new-author"> {this.state.author} </span>
                </div>
            </div>
        </a>)
    }
}