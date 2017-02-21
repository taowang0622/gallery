let express = require('express');
let router = express.Router();
let https = require('https');
let config = require('../config');

//GET /pics/popular
router.get('/popular', function (req, res) {
    let options = {
        hostname: 'api.500px.com',
        path: '/v1/photos?feature=popular&consumer_key=' + config._500px.consumerKey,
        method: 'GET'
    };

    let reqTo500px = https.request(options, response =>{
        let data = '';
        let pics = null;
        ////because of 'Transfer-encoding: chunked', use NodeJS stream
        response.on('data', chunk => {
            data += chunk;
        });

        response.on('end', ()=>{
            // try-catch only for synchronous code
            //in case that data is not formatted into JSON string appropriately
            try{
                pics = JSON.parse(data);
                res.setHeader('Transfer-encoding', 'chunked');
                res.status(200).json(pics);
            }catch(e){
                next(e);
            }
        })
    });

    //in case that an error comes up while sending the request
    reqTo500px.on('error', err => {
        next(err);
    });

    reqTo500px.end();
});

module.exports = router;