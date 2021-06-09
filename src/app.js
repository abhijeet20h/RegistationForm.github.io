const express = require('express');
const path = require('path')
const hbs = require('hbs')
const app = express();

require("./db/conn");
const Register = require("./models/user-regesters")

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public")
// const templates_path = path.join(__dirname, "../templates/view")
const particls_path = path.join(__dirname, "../templates/partials")

app.use(express.static(static_path));

// app.set("view engine", "hbs");
// app.set("views ", templates_path );
hbs.registerPartials(particls_path );
const templetePath =path.join(__dirname, "../templates/views");


app.use(express.json());
app.use(express.urlencoded({extended : false}));


app.set('view engine', 'hbs');
app.set("views", templetePath);
app.get('/', (req , res)=> {
    res.render("index");
})
app.get('/register', (req , res)=> {
    res.render("register");
})
app.get('/login', (req , res)=> {
    res.render("register");
})


//create a new user in our database
app.post('/register',async (req , res)=> {
try{

 const password = req.body.password;
 const cpassword = req.body.confirmpassword;
if(password===cpassword){
    const registerEmployee=new Register({ 
firstname:req.body.firstname,
lastname:req.body.lastname,
email:req.body.email,
gender:req.body.gender,
phone:req.body.phone,
age:req.body.age,
password:password,
confirmpassword:cpassword
    })
    const registered =await registerEmployee.save();
    res.status(201).render("index");
}else{
    res.render("404error");
}


}catch(error){
    res.status(400).send(error);
}

})


app.listen(port,()=>{
    console.log(`server is running port no ${port}`)
})