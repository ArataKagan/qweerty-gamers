const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.newsAPIKey);

module.exports = {
    index(req, res, next){
       
       newsapi.v2.everything({
           q: 'lgbt',
           language: 'en',
           sortBy: 'publishedAt'
       }).then( response => {
        console.log(response);
        res.render("static/index", {response});
        }
       ) 
    }
}