var fs = require('fs');
var express = require('express');
var app = express()
var axios = require('axios')
var XMLHttpRequest=require('xhr2')
var port = 3001

fs.readFile('example.txt', 'utf-8', (err, data) => {
    console.log(data);
})

app.post('/user', (req, res) => {
    console.log(req);
})

//---------------------with fetch with async await-----------------------------
app.get('/detailByFetch', async (req, res) => {
    try {
        await fetch('https://api.restful-api.dev/objects')
        // .then((product) => {

        //     var data = product.json()
        //     return data
            .then((data) => {
                return data.json()
            })
            .then((product) => {
                var data = product
                var filteredData = data?.filter((x) => x.name == 'Apple AirPods')
                console.log(filteredData);
                res.send(filteredData)
            })

    } catch (err) {
        console.log('err=> ', err);
    }
})

//---------------------with axios without async await-----------------------------
app.get('/idDetails', (req, res) => {
    var query = req.query.name
    var a = axios.get('https://api.restful-api.dev/objects')
        .then((data) => {
            var result = data.data
            var filteredData = result.filter((x) => x.id == query)
            res.send(filteredData);
        })
        .catch((err) => {
            console.log('err=> ', err);
        })
})

//---------------------with axios with async await-----------------------------
app.get('/detail', async (req, res) => {
    try {
        var product = await axios.get('https://api.restful-api.dev/objects')
        var data = product.data
        var filteredData = data.filter((x) => x.name == 'Apple AirPods')
        res.send(filteredData)
    } catch (err) {
        console.log('err=> ', err);
    }
})

//---------------------with XMLHttpRequest----------------------------------------------------
app.get('/xmlDetail', (req, res) => {
    const xmlObj = new XMLHttpRequest()
    xmlObj.open('get', 'https://api.restful-api.dev/objects')
    xmlObj.send()
    xmlObj.onload = () => {
        // console.log(JSON.parse(xmlObj.responseText));
        res.send(JSON.parse(xmlObj.responseText))
        // res.json(xmlObj.responseText)
    }
    xmlObj.onerror = () => {
        console.log(JSON.parse(xmlObj.responseText));
    }
})



app.listen(port, (err) => {
    console.log(`listening to port ${port}`);
})