document.addEventListener('DOMContentLoaded',() => {
    const abrirJanela = document.getElementById('addPeca');

    addPeça.addEventListener('click',() => {
        window.open('./cadastro.html','blank','width=500,height=500,left=500,top=100,resizable=yes,scrollbars=yes');
    });
});