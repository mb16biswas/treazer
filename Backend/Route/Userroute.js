const router = require("express").Router();
let User = require("../Model/Usermodel.js");
const bcrypt = require("bcrypt");

router.route("/curr/:email").get((req, res) => {
  const email = req.params.email 
    User.findOne({email: email })
    .then((user) => { res.json(user)})
  
    .catch((err) => { console.log(err)
                     return(res.json("f"))});
;
});

router.route("/login/:email/:password").get((req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  

  /*
      if(bcrypt.compareSync('somePassword', hash)) {
    // Passwords match
    } else {
    // Passwords don't match
}


  */

  User.findOne({email:  email })
    .then((user) => {
     
      if (bcrypt.compareSync(password, user.password)) {
        console.log("password matched ");
        res.json("true");
      } else {
        res.json("false");
      }
    })
    // .catch(err => res.status(400).json("false"));
    .catch((err) => { console.log(err)
                     return(res.json("f"))});
});

router.route("/:name").get((req, res) => {
  const name = req.params.name;
  User.findOne({ username: name })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});



router.route("/add").post((req, res) => {
  const username = req.body.username;
  let password = req.body.password;
  const email = req.body.email;
  const address = req.body.address ; 
  const ph = req.body.ph 

  console.log( username ,  
     password ,
     email  ,
     address, ph
      )
    console.log(typeof(ph))  

  const hash = bcrypt.hashSync(password, 10);

  password = hash;

  const newUser = new User({ username, password, email , address , ph });

  newUser
    .save()
    .then(() => res.json("true"))
    .catch((err) => {
      console.log(err)
      return( res.json("false"))

    });
});



router.route('/update/:email').post((req, res) => {
  const email = req.params.email 
  console.log(email)
    User.findOne({email: email })
    .then((user) => {
      user.username = req.body.username 
      user.address = req.body.address 
      user.ph  = req.body.ph 

      user.save()
      .then(() => res.json("true"))
      .catch(() => res.json("false"))


       
       
    })
    // .catch(err => res.status(400).json("false"));
    .catch((err) => { console.log(err)
                     return(res.json("false"))});
  
});

module.exports = router;
