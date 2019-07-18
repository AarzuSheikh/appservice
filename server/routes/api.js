var express= require('express');
var router = express.Router();
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
/** Working code for Mongoose Db for mlab but not working for localhost */

var schema = mongoose.Schema;
var mycolschema =  new schema({ 
//   fname : {type: String},
//   lname : {type: String}
name:{type: String},
email:{type:String},
phone:{type:Number},
password:{type: String},
});
var authschema = new schema({
  name:String,
  password:String
});
// mongoose.connect("mongodb://localhost:27017/StudentDatabase",
  mongoose.connect("mongodb://aarzu:rehana786@ds137550.mlab.com:37550/blockchain",
  { useNewUrlParser : true }, 
  (err)=>{
     if(err) {
       throw err;
     }
     else {  
       console.log("Connected to mlab");  
     }
    }
  );

router.get('/', function(req, res, next){
   var dbdata = mongoose.model('employees', mycolschema);
      dbdata.find((err, data)=>{
     if(err){
       console.log("Error " + err);
     }
     else{
       res.json(data);
       console.log(data);
      //  res.send("Api works :=> " + data.fname);
      //  console.log("Data from db = " + JSON.stringify(data));
     }
    });
});

router.post('/', function(req, res, next){
  // console.log("Post called "+ req.body + " " +req.body.fname + req.body.lname);
  var todo = req.body;
  var objlength=Object.keys(todo).length;
  // var dbdata = mongoose.model('employees', mycolschema);
  // var data = new dbdata(todo);
  // data.save((err)=>{
  //   if(err) throw err;
  // }
  console.log("post call");
  
  if(objlength>2){
    console.log("Matched "+todo.name);
    var dbdata = mongoose.model('employees', mycolschema);
    var data = new dbdata(todo);
    data.save(function(err){
      if(err){
        console.log(err);
        return;
      }
      else{
        console.log("Inserted");
        return true;
      }
    });


  }

  if(objlength==2){
    console.log("Authentication : " + todo.name + " " + todo.password);

    var authdata = mongoose.model('employees', mycolschema);
    authdata.findOne({$and:[{name :todo.name}, {password :todo.password}]}, 
      (err, dt) =>{
      if(err){
        throw err;
      }
      else if(dt==null){
        console.log(JSON.stringify(dt));
        res.json(null);
      }
      else if(JSON.stringify(dt).length > 0){
        console.log("You are authenticated..." + dt );
        res.json(dt);
      }
      });
    }
  }

  );

  // dbdata.find((err, data)=>{
  //   if(err){
  //     console.log("Error " + err);
  //   }
  //   else{
  //     res.json(data);
  //     console.log(data);
  //   }
  //  });
//   }

// );
router.delete('/:id', function(req, res, next){ 
  console.log("Delete api called..." + req.params.id);
  var dbdata = mongoose.model('employees', mycolschema);
  dbdata.deleteOne({ _id : req.params.id}, (err)=>{
    if(err){
      throw err;
    }
    else{
      console.log("Deleted succesfully...." );
    }
  });
});

router.put('/:id', (req, res)=>{
  console.log("Put called ... "+ req.params.id);
});

// This is just to verify purpose use the previous get function
router.get('/local', function(req, res, next){

  /* Mongo Db Working for localhost but not working for mlab */
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://aarzu:rehana786@ds137550.mlab.com:37550/blockchain";
  // var url = "mongodb://localhost:27017";
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    console.log("Entered connect");
    if (err){
      console.log("Error connecting ");
      throw err;
    }
    else{
      var dbo = db.db("studentdb");
      dbo.collection("employees").findOne({}, function(err, result) {
        if (err) {     
          console.log("Error " + err);
          throw err; 
        }
        console.log("Connected to mlab");
        console.log(result.fname);
        res.send("Local called ");
        db.close();
      }) ;
    }
    
  
  });
});



module.exports = router;