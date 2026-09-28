const request = require("supertest");
const app = require("./index");

describe("Testes da API de Doces (Unidade e Integração)", () => {
  it("GET /api/doces -listar todos os doces", async () => {
    const res = await request(app).get("/api/doces");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("POST /api/doces - cadastrar um doce valido com sucesso", async () => {
    const res = await request(app)
      .post("/api/doces")
      .send({
        nome: "Doce de Leite",
        preco: 5.0,
        categoria: ["Sobremesa"],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.nome).toEqual("Doce de Leite");
  });

  it("POST /api/doces - barrar cadastro com campos faltando", async () => {
    const res = await request(app).post("/api/doces").send({ nome: "Doce" });
    expect(res.statusCode).toEqual(400);
    expect(res.body.mensagem).toContain(
      "Todos os campos precisam estar devidamente preenchidos",
    );
  });

  it("POST /api/doces - barrar produto com preço <= 0.05", async () => {
    const res = await request(app)
      .post("/api/doces")
      .send({
        nome: "Bala",
        preco: 0.01,
        categoria: ["Bala"],
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.mensagem).toContain(
      "O produto precisa ter um valor de no mínimo R$ 0.05",
    );
  });

  it("POST /api/doces - barrar categoria fora do formato Array", async () => {
    const res = await request(app).post("/api/doces").send({
      nome: "Bala",
      preco: 1.0,
      categoria: "Doce",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.mensagem).toContain(
      'O campo "categoria" deve ser uma lista válida',
    );
  });

  it("POST /api/doces -barrar categoria como Array vazio", async () => {
    const res = await request(app).post("/api/doces").send({
      nome: "Bala",
      preco: 1.0,
      categoria: [],
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.mensagem).toContain("Envie ao menos uma categoria");
  });

  it("DELETE /api/doces/:id - deve retornar 404 ao deletar doce inexistente", async () => {
    const res = await request(app).delete("/api/doces/999");
    expect(res.statusCode).toEqual(404);
  });

  it("DELETE /api/doces/:id - deve deletar doce existente com sucesso", async () => {
    const res = await request(app).delete("/api/doces/1");
    expect(res.statusCode).toEqual(204);
  });
});
