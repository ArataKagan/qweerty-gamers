const NewsAPI = require("newsapi");
const newsapi = new NewsAPI('e89e81f136f343719303e1f4d0fdf9c6');

module.exports = {
    index(req, res, next){
       
       newsapi.v2.everything({
           q: 'lgbt',
           language: 'en',
           page: 2
       }).then( response => {
        res.render("static/index", {response});
        }
       ) 
    }
}