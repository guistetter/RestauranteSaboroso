var express = require("express");
var users = require("./../includes/users");
var admin = require("./../includes/admin");
var menus = require("./../includes/menus");
var contacts = require("./../includes/contacts");
var emails = require("./../includes/emails");
var reservations = require("./../includes/reservations");


var moment = require("moment");
moment.locale("pt-BR");

var router = express.Router();

//controlando area restrita do site
router.use(function (req, res, next) {
  if (["/login"].indexOf(req.url) === -1 && !req.session.user) {
    res.redirect("/admin/login");
  } else {
    next();
  }
  //console.log("middleware: ", req.url);
});

//middleware passar var menus do header para as rotas
router.use(function (req, res, next) {
  req.menus = admin.getMenus(req);
  next();
});

router.get("/logout", function (req, res, next) {
  delete req.session.user;
  res.redirect("/admin/login");
});

router.get("/", function (req, res, next) {

  admin.dashboard().then(data => {
    res.render("admin/index", admin.getParams(req,{
      data
    }))

  }).catch(err =>{
    console.log(err)
  })

});

router.post("/login", function (req, res, next) {
  if (!req.body.email) {
    users.render(req, res, "Preencha o campo e-mail");
  } else if (!req.body.password) {
    users.render(req, res, "Preencha o campo senha");
  } else {
    users
      .login(req.body.email, req.body.password)
      .then((user) => {
        req.session.user = user;
        res.redirect("/admin");
      })
      .catch((err) => {
        users.render(req, res, err.message || err);
      });
  }
});

router.get("/login", function (req, res, next) {
  users.render(req, res, null);
});

router.get("/contacts", function (req, res, next) {
  contacts.getContacts().then( data => {
    res.render("admin/contacts", admin.getParams(req,{
      data
    }));
  });
});

//rota post do contacts vem da area publica
router.delete("/contacts/:id", function (req, res, next) {

  contacts.delete(req.params.id).then(results => {

    res.send(results);
  }).catch(err => {
    res.send(err)
  });
});

router.get("/emails", function (req, res, next) {

  emails.getEmails().then(data=>{
    res.render("admin/emails", admin.getParams(req,{
      data
    }));
  });

});

router.delete("/emails/:id", function(req,res,next){
  
  emails.delete(req.params.id).then(results => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });

});

router.get("/menus", function (req, res, next) {
  menus.getMenus().then(data => {
    res.render("admin/menus", admin.getParams(req,{
      data
    }));
  })
  
});

router.post("/menus", function(req, res, next){
  //res.send(req.files)//midlleware em app cria o fields, estamos usando formidable...
  menus.save(req.fields, req.files).then(results => {
    res.send(results)
  }).catch(err=>{
    res.send(err)
  })
})

router.delete("/menus/:id", function(req,res,next){
  menus.delete(req.params.id).then(results =>{
    res.send(results);
  }).catch(err => {
    res.send(err)
  });
})

router.get("/reservations", function (req, res, next) {

  reservations.getReservations(
    req.query.page,
    req.query.start,
    req.query.end
    ).then(data =>{

    res.render(
      "admin/reservations",
      admin.getParams(req, {
        date: {}, 
        data,
        moment
      })
    );
  });

});

router.post("/reservations", function(req, res, next){
  reservations.save(req.fields, req.files).then(results => {
    res.send(results)
  }).catch(err=>{
    res.send(err)
  })
})

router.delete("/reservations/:id", function(req,res,next){
  reservations.delete(req.params.id).then(results =>{
    res.send(results);
  }).catch(err => {
    res.send(err)
  });
})

router.get("/users", function (req, res, next) {
  users.getUsers().then(data => {
    res.render("admin/users", admin.getParams(req, {
      data
    }));
  });
});


router.post("/users", function (req, res, next) {
  users.save(req.fields).then(results => {
    res.send(results);
  }).catch(err =>{
    res.send(err);
  });
});

router.post("/users/password-change", function(req, res, next){
  users.changePassword(req).then(results => {
    res.send(results);
  }).catch(err =>{
    res.send({error: err});
  });
});

router.delete("/users/:id", function (req, res, next) {

  users.delete(req.params.id).then(results => {
    res.send(results);
  }).catch(err =>{
    res.send(err);
  });
});

module.exports = router;
