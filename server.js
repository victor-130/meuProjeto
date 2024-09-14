const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const {engine} =  require('express-handlebars')

const path = require('path')

const database = require('./src/config/database');
const Produto = require('./src/models/Produto');

// config
    //Template Engine
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    //handlebars
    app.engine('handlebars', engine({defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true}
    }))
    app.set('view engine', 'handlebars')
    app.use(express.static(path.join(__dirname,'public')))
//Rotas
app.get('/addpeca/novapeca', (req,res) => {
    res.render('addpeca/novapeca')
})
app.post('/addpeca/nova',  (req,res) => {
    try{
 
        const novoProduto =  Produto.create({
            codigo: req.body.codigo,
            produto: req.body.produto,
            modelo: req.body.modelo,
            marca: req.body.marca,
            quantidade: req.body.quantidade,
            valorc: req.body.valorc,
            valorv: req.body.valorv
        })
              
        Produto.sync({ alter: true }).then(() => {
        console.log('Tabela "produto" sincronizada');      
        });     
        res.redirect('/')
    }catch(err){
        res.status(500).json({err: 'erro ao criar produto'})
        console.log(err)
    }
})

app.get('/',(req,res) => {
    Produto.findAll().then(produto => {
        res.render('admin/home',{produto: produto})
    }).catch((err) => {
        console.error(err)
    })
    
})
//Outros
const PORT = 8082
app.listen(PORT, () =>{
console.log('servidor rodando...http://localhost:8082')
})