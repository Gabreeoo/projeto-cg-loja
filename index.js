const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

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

app.post("/api/doces", (req, res) => {
  const { nome, preco, categoria } = req.body;

  if (!nome || !preco || !categoria) {
    return res.status(400).json({
      mensagem: "Todos os campos precisam estar devidamente preenchidos",
    });
  } else if (preco <= 0.05) {
    return res.status(400).json({
      mensagem: "O produto precisa ter um valor de no mínimo R$ 0.05.",
    });
  }

  const novoDoce = {
    id: doces.length + 1,
    nome,
    preco,
    categoria,
  };

  doces.push(novoDoce);
  return res.status(201).json(novoDoce);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
