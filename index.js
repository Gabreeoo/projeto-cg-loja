const express = require("express");
const app = express();
const port = 3000;

const doces = [
  { id: 1, nome: "Brigadeiro ", preco: 3.5, categoria: "Chocolate" },
  { id: 2, nome: "Bolo", preco: 12.0, categoria: "Bolo" },
  { id: 3, nome: "Beijinho", preco: 3.0, categoria: "Docinhos" },
];

app.get("/api/doces", (req, res) => {
  res.json(doces);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
