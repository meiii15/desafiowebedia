export default class ApiClient{
    constructor(){
        
        this.API_KEY = '6f1fe183b964432cb4b664cb3f0f6cb9';

        this.getNewsFrom = function(country, pageSize, page)
        {
            let url = 'https://newsapi.org/v2/top-headlines?country=' + country + '&pageSize=' + pageSize + '&page=' + page + '&apiKey=' + this.API_KEY;
            
            let request = new Request(url);

            return fetch(request);
        }

        this.getTopHeadLines = function(countries, pageSize, page)
        {
            var countriesParams = countries.map(function(param) {
                    return ['country', param.country].map(encodeURIComponent).join("=");
                }).join("&");
                
            
            let url = 'https://newsapi.org/v2/top-headlines?' + countriesParams + '&pageSize=' + pageSize + '&page=' + page + '&apiKey=' + this.API_KEY;
            
            let request = new Request(url);

            return fetch(request);
        }
    }
    
}