export default class ApiClient{
    constructor(){
        
        /*
         * CHAVE DE ACESSO DA API
         */
        this.API_KEY = 'ca62f830997b4077b573fd8a2678a30e';

        /**
         * OBTEM NOTÍCIAS DE UM PAÍS
         * 
         * @param {string} country 
         * @param {number} pageSize 
         * @param {number} page 
         */
        this.getNewsFrom = function(country, pageSize, page)
        {
            let url = 'https://newsapi.org/v2/top-headlines?country=' + country + '&pageSize=' + pageSize + '&page=' + page + '&apiKey=' + this.API_KEY;
            
            let request = new Request(url);

            return fetch(request);
        }

        /**
         * OBTEM NOTÍCIAS EM DESTAQUE
         * DE VÁRIOS PAÍSES
         * PELA API
         * 
         * @param {*} countries 
         * @param {number} pageSize 
         * @param {number} page 
         */
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