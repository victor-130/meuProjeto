const express = require('express') 
const router = express.Router()

router.get('/',(req,res) => {
    res.send('pagina princiapal do painel admin')
})

router.get('/cadastro', (req,res) => {
    res.send('pagina de cadastro')
})

router.get('/categorias',(req,res) => {
    res.send('pagina de categorias')
})

module.exports = router