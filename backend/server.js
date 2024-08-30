const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const {engine} =  require('express-handlebars')

// config
    //Template Engine
    app.engine('handlebars', engine({defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true}
    }))
app.set('view engine', 'handlebars')
//mongoose
//Rotas
app.use('/admin',admin)
//Outros
const PORT = 8081
app.listen(PORT, () =>{
console.log('servidor rodando...http://localhost:8082')
})