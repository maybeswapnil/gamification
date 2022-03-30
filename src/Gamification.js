const express = require('express');
var gamification_user = express.Router()
const axios = require('axios');
const { MongoClient } = require('mongodb');

axios.defaults.headers.common['content-type'] = 'application/json; charset=UTF-8'
const url = "mongodb+srv://swapnil:swapnil@swapnil.wfwy9.mongodb.net/gamification?retryWrites=true&w=majority";

gamification_user.get('/search/:name', (req, res) => {
    console.log(req.params.id)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("gamification");
        var cache = []
        dbo.collection("gamification_users").find({}).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {
    
                cache = result;

                cache.forEach((r) => {if(r.name = req.params.name) {
                    var points = 0;
                    r.check_in_logs.forEach((resp)=>{
                        if(new Date(resp).getHours()< 10) {
                            points += 10;
                        } else {
                            points += 8
                        }
                    })
                    r['points'] = points
                    res.json(r)
                }})
            }
        })
        
      });
})

gamification_user.get('/points', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("gamification");
        var chache = []
        dbo.collection("gamification_users").find({}).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                var ary = []
                cache = result;
                var points = 0;
                cache.forEach((r) => {
                    points = 0;
                    try {
                    r.check_in_logs.forEach((r2) => {
                        if(new Date(r2).getHours()< 10) {
                            points += 10;
                        } else {
                            points += 8
                        }
                    })
                    } catch(e) {

                    }
                    console.log(r)
                    r['points'] = points;
                    r['check_in_logs'] = ""
                    ary.push(r)
                })
                res.json(ary);
            }
        })
        
      });
})

gamification_user.get('*', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("gamification");

        dbo.collection("gamification_users").find({}).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {
    
                res.send(JSON.stringify(result));
            }
        })
        
      });
})



module.exports = gamification_user;