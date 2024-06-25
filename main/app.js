
//var nome = document.getElementById('codigo').value

import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function hello(codigo,descrição,quantidade,valor){

    const db = await open({
        filename: './banco.db',
        driver: sqlite3.Database,
    });
    db.run(
        'CREATE TABLE IF NOT EXISTS tabela(id INTEGER PRIMARY KEY, codigo TEXT, descrição TEXT,quantidade INT,valor FLOAT)'
    );
  
    
    //db.run('CREATE TRIGGER IF NOT EXISTS update_codigo AFTER INSERT ON peça_de_moto BEGIN UPDATE peça_de_moto SET codigo = "R" || printf("%05d", NEW.id) WHERE id = NEW.id;END')
    db.run('INSERT INTO tabela(codigo,descrição, quantidade, valor) VALUES (?,?,?,?)',[

        codigo,
        descrição, 
        quantidade, 
        valor]);

    //db.run('DROP TABLE tabela')
}

hello("nome","teste","teste","teste");

