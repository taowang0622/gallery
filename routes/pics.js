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

    let reqTo500px = https.request(options,response =>{
        let data = '';
        let pics = null;
        response.on('data', d => {
            //Transfer-encoding: chunked
            data += d;
        });

        response.on('end', ()=>{
            try{
                pics = JSON.parse(data);
                res.setHeader('Transfer-encoding', 'chunked');
                res.status(200).json(pics);
            }catch(e){
                console.log(e.message);//TODO
                res.status(500).json({
                    err: e.message
                });
            }
        })
    });

    reqTo500px.on('error', err => {
        console.log(err.message);
        res.status(500).json({
            err: 'An error occurred while sending a request to 500px',
            message: err.message
        });
    });

    reqTo500px.end();
});

module.exports = router;