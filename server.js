const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const {engine} =  require('express-handlebars')

const path = require('path')

const database = require('./src/config/database');
const Produto = require('./src/models/Produto');
const { Sequelize } = require("sequelize")
const Op = Sequelize.Op

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
app.get('/:Search',(req,res) => {

    const buscaPeça = req.params.Search
    console.log('aqui ta minha ' +buscaPeça)
    
    
    try{


        /*if(!buscaPeça){
            return res.render('admin/home',{produto:[]})
        }*/
         Produto.findAll({
            where: {
                produto:{
                    [Op.like]: `%${buscaPeça}%`
                }
            }
        }).then(produto => {
            res.render('admin/home',{produto: produto})
        }).catch((err) => {
            console.error(err)
        })
        
    }catch (err) {
        console.error('Erro inesperado:', err);
        res.status(500).send('Erro inesperado');
    }
})
app.get('/',(req,res) => {
    res.render('admin/home')
})
//Outros
const PORT = 8082
app.listen(PORT, () =>{
console.log('servidor rodando...http://localhost:8082')
})