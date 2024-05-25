var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');
var toast =require('react-toastify')


/* GET users listing. */
router.post('/',async function(req, res, next) {

  try{
    const dataObj=req.body.data;
    
    const url='mongodb+srv://test:test@cluster0.zehugvz.mongodb.net/';
    const mongoClient=mongodb.MongoClient;
    const server=await mongoClient.connect(url);
    const db=server.db('student');
    const collection=db.collection('registration');
    
    //checking username exists
    const existUsername = await collection.findOne({ uname: dataObj.uname});
    
    if (existUsername) {
      res.errored('Duplicate Username');
      return
    }else{      
      const result = await collection.insertOne(dataObj)
      res.send(result)
    }

    
  }
  catch(e){
    console.log(e);
    res.send(e)
  }

    
  
});

module.exports = router;
