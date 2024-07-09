
function listarProdutos() {
    setTimeout(() => {
        criaItem(produtos);
    }, 1000)
}
document.addEventListener('DOMContentLoaded', function () {
    icons();
});
document.addEventListener('DOMContentLoaded',() => {
    const abrirJanela = document.getElementById('addPeca');

    addPeça.addEventListener('click',() => {
        window.open('./cadastro.html','blank','width=500,height=500,left=500,top=100,resizable=yes,scrollbars=yes');
    });
});
function criaItem(produtos){
    
    const lista = document.getElementById('lista')
    lista.innerHTML = ''

    produtos.forEach(produto => {
        const li = document.createElement('li')
        li.classList.add(produto.codigo)
        li.id = 'opçoes'
        li.classList.add('base')
        const codDiv = document.createElement('div')
        codDiv.classList.add('codigo', 'op')
        codDiv.textContent = produto.codigo

        const descriçaoDiv = document.createElement('div')
        descriçaoDiv.classList.add('descriçao','op')

        const prodDiv = document.createElement('div')
        prodDiv.textContent = produto.descriçao.prod.toUpperCase()

        const modeloDiv = document.createElement('div')
        modeloDiv.id = 'modelo'
        modeloDiv.textContent = `Modelo: ${produto.descriçao.modelo}`

        const marcaDiv = document.createElement('div')
        marcaDiv.id = 'marca'
        marcaDiv.textContent = `Marca: ${produto.descriçao.marca}`  
        
        descriçaoDiv.appendChild(prodDiv)
        descriçaoDiv.appendChild(modeloDiv)
        descriçaoDiv.appendChild(marcaDiv)

        const quantidadeDiv = document.createElement('div')
        quantidadeDiv.classList.add('qantidade','op')
        quantidadeDiv.textContent = produto.quantidade

        const valor = document.createElement('div')
        valor.classList.add('valor', 'op')
        valor.textContent = produto.valor.toFixed(2)

        li.appendChild(codDiv)
        li.appendChild(descriçaoDiv)
        li.appendChild(quantidadeDiv)
        li.appendChild(valor)

        lista.appendChild(li)
    })
}
const produtos = [{
    codigo: 'R10000',
    descriçao: {
        prod: 'cabo de embreagem',
        modelo: 'titan 150 2014',
        marca: 'allen'
    },
    quantidade: 2,
    valor: 20.00
},
{
    codigo: 'R10001',
    descriçao: {
        prod: 'cabo de acelerador',
        modelo: 'titan 160 2018',
        marca: 'allen'
    },
    quantidade: 3,
    valor: 25.00
}];
function icons(){
    const divBtn = document.getElementById('btnLat')
    const ul = document.getElementById('ul')

    const imagens = [{
        id: 'addPeça',
        img: './icones/soma.svg'
    },
    {
        id: 'edit',
        img: './icones/editar.svg'
    },{
        id: '',
        img: './icones/apagar.svg'
    }]

    imagens.forEach(imagem => {
        const li = document.createElement('li')

        const a = document.createElement('a')
        a.id = imagem.id
        
        
        const img = document.createElement("img")
        img.src = imagem.img
        img.classList.add('icon')

        a.appendChild(img)
        li.appendChild(a)
        ul.appendChild(li)
        divBtn.appendChild(ul)

    })

   

}


