const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs')

app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now}:${req.method} ${req.url}`;
	fs.appendFile('server.log',log+'\n',(err)=>{
		if(err){console.log('Unable to append server.log');}
		
	});
		next();	
});

/*
app.use((req,res,next)=>{

	res.render('maintainance.hbs',{
		main_title:"Madhu - Mantainance",
	    page_title:"Mainatinance Page",
	    bodyData:"We will get back to u soon",
	})
//	next();	
});
*/
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCutrrentYear',()=>{
	return new Date().getFullYear();
})


hbs.registerHelper('scremIt',(text)=>{
	return text.toUpperCase();
})

app.get('/',(req, res)=>{
	//res.send("<h1>Hello express!</h1>");
	res.render('home.hbs',{
		main_title:"Madhu - Home",
	    page_title:"Home Page",
	    bodyData:"Welcome to my site",
	})
}); 
app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		page_title:"About Page",
	})
});
app.get('/bad',(req,res)=>{
	res.send({
		errorMessage:"Unable to fetch data"	
	});
})
app.listen(port,()=>{
	console.log(`Server is up on ${port}`)
});