const express = require('express');
const router = express.router();
const mySqlDb = require('../connection/mySqlConnection');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/products';

router.route("/products").get((req, res) => {
  mySqlDb.query("select * from product", (err, result) => {
    if (err) {
      res.status(400).json();
    } else {
      MongoClient.connect(url, (err, client) => {
        if (err) {
          res.status(400).json();
        } else {
          let db = client.db("products");
          // 取當前 mongodb 中, 所有產品的照片資料
          db.collection("image")
            .find()
            .toArray((err, imageList) => {
              if (err) {
                res.status(400).json();
              } else {
                for (let j = 0; j < imageList.length; j += 1) {
                  for (let i = 0; i < result.length; i += 1) {
                    let prodId = result[i].id;
                    if (prodId === imageList[j].id) {
                      result[i].img = imageList[j].image;
                    }
                  }
                }
                res.status(200).json({ productList: result });
              }
            });
        }
      });
    }
  });
});

//login
router.router('/login').post((req,res) =>{
    let data = req.body;
    mySqlDb.query('select * from custaccount where accout=? and password =?',[data.accout,data.password],(err, result){
        if(err){
            res.status(400).json({'message':'bad request'})
        }else{
            if(result != null && result[0] != undefined && result[0].id != null){
                let custAccount = JSON.parse(JSON.stringify(result[0]))
                custAccount.password = null;
                res.status(200).json({custAccount:custAccount});
            }
        }
    })
})

//register
router.route('./register')
.post((req,res) =>{
        let data = req.body;
        mySqlDb.query("INSERT INTO custaccount (account, password, type, name, cellphone, email, birthday)"
        + "VALUES (?, ?, ?, ?, ?, ?, ?);",
            [data.account, data.password, 1, data.name, data.phone, data.email, data.birthday],  
            (err, result) => {
                if (err) {
                    console.log(err)
                    res.status(400).json()
                } else {
                    if (result != null && result.insertId != null) {
                        res.status(200).json()
                    } else {
                        res.status(400).json()
                    }
                }
            }
        );
});

//get customer shopping history 
router.router('/login').post((req,res) =>{
    let data = req.body;
    mySqlDb.query('select * from custaccount where accout=? and password =?',[data.accout,data.password],(err, result){
        if(err){
            res.status(400).json({'message':'bad request'})
        }else{
            if(result != null && result[0] != undefined && result[0].id != null){
                let custAccount = JSON.parse(JSON.stringify(result[0]))
                custAccount.password = null;
                res.status(200).json({custAccount:custAccount});
            }
        }
    })
})
