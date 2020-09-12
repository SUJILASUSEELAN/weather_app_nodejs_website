const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 2000
//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setip handlers engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup statis directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'Sujila'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About',
       starring : 'Thassapak Hsu and Wang Peng' ,
        series  : 'Chinese',
        name : 'Sujila'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help page',
        helpmessage : 'Free feel to ask queries',
        name : "Sujila"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error :"Provide a address"})
    }
   
    geoCode(req.query.address,(error,{latitude,longitude}={})=>{
        if(error){
            res.send({error:error})
        }
        else{
            forecast(latitude,longitude ,(error,response)=>{
                if(error){
                    res.send({error:error})
                }
                else{
                    res.send({
                        forecast : response,
                        location : req.query.address
                    })
                }
            })
            
        }    
     })

    
})

app.get('/help/*',(req,res)=>{
    res.render('error_message',{
        title : '404 error',
        name : 'Sujila',
        errorMessage : 'Help page not found'
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.userid){
       return  res.send({
            error : 'Provide userid'
        })
    }
    res.send({products :[]})
       
})
app.get('*',(req,res)=>{
   res.render('error_message',{
        title : '404 error',
        name : 'Sujila',
        errorMessage : 'Page not found'
   })
})
app.listen(port,()=>{
    console.log("Server listening to the port" +port)
})