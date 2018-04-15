
export default class UrlUtils{
    
    static getParam(paramName, url)
    {
        var urlContents = url.split('/');

        var paramIndex = urlContents.indexOf(paramName);

        if(paramIndex === -1){
            return null;
        }

        var valueIndex = paramIndex + 1;

        return urlContents[valueIndex];
    }

    static buildUrl(root, paramToValueDict)
    {   
        var keys = Object.keys(paramToValueDict);
        
        var params = keys.map((currentKey) => {
            var currentValue = paramToValueDict[currentKey];

            if(currentValue instanceof Array){
                var innerParams = [];
                
                for(var innerValue of currentValue)
                {
                    innerParams.push(UrlUtils.buildUrl(root, {currentKey, innerValue}));
                }

                return innerParams.join("&");
            }
            
            return [currentKey, ].map(encodeURIComponent).join("=")
        }).join("&");

        return root + "?" + params;
    }
}