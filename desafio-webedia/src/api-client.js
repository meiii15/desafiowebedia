export default class ApiClient{
    constructor(){
        
        this.API_KEY = 'ac1d68b586734bf2bc4d2e0bd3b34323';
        
        this.getNewsFrom = function(country)
        {
            let url = 'https://newsapi.org/v2/everything?country=' + country + '&apiKey=' + this.API_KEY;
            
            let request = new Request(url);

            return fetch(request);
        }

        this.getTopHeadLines = function(countries)
        {
            var countriesParams = countries.map(function(param) {
                    return ['country', param.country].map(encodeURIComponent).join("=");
                }).join("&");

                debugger;
            
            let url = 'https://newsapi.org/v2/top-headlines?' + countriesParams + '&apiKey=' + this.API_KEY;
            
            let request = new Request(url);

            return fetch(request);
        }
    }
    
}