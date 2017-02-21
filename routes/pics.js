let express = require('express');
let router = express.Router();
let https = require('https');
let config = require('../config');

router.get('/popular', function (req, res) {
    let options = {
        hostname: 'api.500px.com',
        path: '/v1/photos?feature=popular&consumer_key=' + config._500px.consumerKey,
        method: 'GET'
    };

    let reqTo500px = https.request(options, response =>{
        let data = '';
        let pics = null;
        response.on('data', chunk => {
            //Transfer-encoding: chunked
            data += chunk;
        });

        response.on('end', ()=>{
            // try-catch only for synchronous code
            try{
                pics = JSON.parse(data);
                res.setHeader('Transfer-encoding', 'chunked');
                res.status(200).json(pics);
            }catch(e){
                next(e);
            }
        })
    });

    reqTo500px.on('error', err => {
        next(err);
    });

    reqTo500px.end();
});

module.exports = router;