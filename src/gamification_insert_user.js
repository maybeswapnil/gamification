const express = require('express');
var gamification_insert_user = express.Router()
const axios = require('axios');
const { MongoClient } = require('mongodb');

axios.defaults.headers.common['content-type'] = 'application/json; charset=UTF-8'
const url = "mongodb+srv://swapnil:swapnil@swapnil.wfwy9.mongodb.net/gamification?retryWrites=true&w=majority";

gamification_insert_user.post('*', (req, res) => {
    var body = req.body;
    var cache = []

    console.log(req.body.name)

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("gamification");
        var mmm = []
        mmm.push(new Date())
        try {
        dbo.collection("gamification_users").find({name : req.body.name}).toArray(function (err, result) {
            if (err) {
                res.send(err)
            } else {
                try {
                cache = result[0].check_in_logs
                mmm = cache
                var flag = true
                console.log(mmm.push(new Date()))
                // for(var i = 0;i<mmm.length && flag;i++) {
                //     if(mmm[i].length===0) {
                //         mmm[i] = new Date()
                //         flag = false;
                //         console.log('', mmm[i] )
                //     }
                // }
                res.send('checked in')
                } catch(e) {}
            }
            console.log(mmm)

        })
        } catch(e) {
            console.log(e)
        }
        setTimeout(() => {
            try {
                dbo.collection("gamification_users").updateOne({name : req.body.name},{ $set: { check_in_logs: mmm } },{upsert: true})
                res.send('checked in')

            }catch(e) {}
        }, 3000)
        
      });


})


module.exports = gamification_insert_user;