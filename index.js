const express = require("express");
const app = express();
const port = 3000;

const doces = [
  {
    id: 1,
    nome: "Brigadeiro ",
    preco: 3.5,
    categoria: ["Chocolate", "Docinhos", "Entrada"],
  },
  {
    id: 2,
    nome: "Bolo de doce de leite",
    preco: 12.0,
    categoria: ["Bolo", "Doce de leite"],
  },
  {
    id: 3,
    nome: "Beijinho",
    preco: 3.0,
    categoria: ["Coco", "Docinho", "Entrada"],
  },
];

app.get("/api/doces", (req, res) => {
  res.json(doces);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
