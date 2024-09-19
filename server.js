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
            allowProtoMethodsByDefault: true},
}))
    app.set('view engine', 'handlebars')
    app.use(express.static(path.join(__dirname,'public')))
//Rotas
app.get('/addpeca/novapeca', (req,res) => {
    res.render('addpeca/novapeca')
})
app.post('/addpeca/nova', async (req,res) => {
    try{           
        /*Produto.sync({ alter: true }).then(() => {
        console.log('Tabela "produto" sincronizada');      
        }); */ 
        const novoProduto = await  Produto.create({
            codigo: req.body.codigo,
            produto: req.body.produto,
            modelo: req.body.modelo,
            marca: req.body.marca,
            quantidade: req.body.quantidade,
            valorc: req.body.valorc,
            valorv: req.body.valorv
        })

        res.redirect('/')
    }catch(err){
        res.status(500).json({err: 'erro ao criar produto'})
        console.log(err)
    }
})

app.get('/:Search',(req,res) => {

    const buscaPeça = req.params.Search
    try{
        if(buscaPeça === 'imagem.ico'){
            return res.render('admin/home')
        }
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

/*app.get('/addpeca/estoque',(req,res) => {
    res.render('addpeca/estoque')
})*/
app.get('/addpeca/estoque', (req,res) => {
    
    const buscaCodigo = req.query.buscaCodigo
    
    try{
        Produto.findOne({
            where:{
                codigo:{
                    [Op.eq]: buscaCodigo
                }
            }
        }).then((produto) => {
            res.render('addpeca/estoque',{produto: produto} )
        }).catch((err) => {
            console.log(err)
        })

    }catch(err) {
    console.log(err)
    }
})
app.post('/addpeca/estoque/u', (req,res) => {
    const buscaCodigo = req.body.cod
    const updateQuantidade = parseInt(req.body.addQuantidade)
    const updateValorC = parseFloat(req.body.addValorC)
    const updateValorV = parseFloat(req.body.addValorV)

    try{
        Produto.findOne({
            whre: {
                codigo: {
                    [Op.eq]: buscaCodigo
                }
            }
        }).then((produto) => {
            if(produto){

                const novaquantidade = updateQuantidade + produto.quantidade;
                let novoValoC
                if(produto.quantidade > 0){
                    const mult = (produto.quantidade*produto.valorc)+(updateQuantidade*updateValorC)
                     novoValoC = mult/novaquantidade
                }

                produto.update({
                    quantidade: novaquantidade,
                    valorc: novoValoC,
                    valorv: updateValorV
                })
                .then(() => {
                    res.render('addpeca/estoque')
                }).catch((err) => {
                    console.log('Erro ao atualizar o produto:', err);
                    res.status(500).send('Erro ao atualizar o produto.');
                });
            }
        })
    }catch (err) {
        console.log('Erro no servidor:', err);
        res.status(500).send('Erro no servidor.');
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