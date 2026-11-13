# API Loja de Doces

API REST simples desenvolvida para gerenciar o catálogo de produtos da loja.

## Imagem Docker

A imagem da aplicação está hospedada no [DockerHub](https://hub.docker.com/r/pedropera/projeto-gc-loja).
Para baixá-la, execute:

```bash
docker pull pedropera/projeto-gc-loja:latest
```

# Pré-requisitos

- **Node.js**: Versão 18 ou superior
- **npm**: Gerenciador de pacotes integrado ao Node

# Instalação.

Na raiz do projeto, instale as dependências executando:

```bash
npm install
```

## Como iniciar o servidor:

Inicie a aplicação com o comando:

```bash
node index.js
```

O servidor estará disponível em: `http://localhost:3000//`

## Rotas da API

1. Listar Produtos (GET)

Retorna todos os doces cadastrados no catálogo.

- Endpoint: `GET /api/doces`

- Exemplo de URL: `http://localhost:3000/api/doces`

2. Cadastrar Novo Produto (POST)

Adiciona um novo doce ao catálogo em memória.

- Endpoint: `POST /api/doces`

- Headers: `Content-Type: application/json`

- Corpo da Requisição (`Body`):

```js
{
  "nome": "Beijinho de Coco",
  "preco": 4.00,
  "categoria": ["Coco", "Docinhos", "Entrada"]
}
```

## Workflow do Projeto

Optamos pela utilização do **GitHub Flow** como fluxo de trabalho neste projeto devido à sua simplicidade de uso e ao escopo reduzido da aplicação, permitindo entregas rápidas e sem burocracia.

## Infraestrutura com Vagrant

### Pré-requisitos

- Vagrant instalado
- Oracle VirtualBox instalado

### Iniciar as máquinas virtuais

Na raiz do projeto, valide o `Vagrantfile` e inicie as duas máquinas usando o VirtualBox:

```bash
vagrant validate
vagrant up --provider=virtualbox
```

A VM1 usa o endereço privado `192.168.56.10`. A VM2 executa a API no endereço `192.168.56.11`, porta `3000`.

### Testar a API a partir da VM1

Entre na VM1:

```bash
vagrant ssh vm1
```

Dentro da VM1, consulte a rota GET:

```bash
curl http://192.168.56.11:3000/api/doces
```

Para sair da VM1, execute `exit`. Para desligar as máquinas sem removê-las, volte à raiz do projeto e execute:

```bash
vagrant halt
```

## Configuração e Automação com Ansible

Para automatizar a configuração do servidor da API (VM2), utilizamos o **Ansible**. A máquina VM1 atua como nó de controle, enquanto a VM2 atua como nó gerenciado. O Ansible clona este repositório na VM2, instala o Node.js e suas dependências e configura a aplicação como um serviço `systemd`.

### Como executar o Playbook do Ansible

Após iniciar as máquinas com `vagrant up`, siga os passos:

Acesse a máquina de controle (VM1):

```bash
vagrant ssh vm1
```

Navegue até o diretório mapeado que contém os arquivos de configuração:

```bash
cd /vagrant
```

Execute o playbook do Asinble. O comando irá ler o arquivo e conectar na VM2 via SSH

```bash
ansible-playbook configura-node.yaml
```

### Testando infraestrutura

Você pode testar se a infraestrutura foi criada com sucesso na VM1, fazendo uma requisição com curl:

```bash
  curl -X GET http://192.168.56.11:3000/api/doces
```
