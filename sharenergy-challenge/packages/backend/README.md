# Backend da aplicação

Uma API simples com duas principais rotas:

- `/api/cats`: Uma rota de proxy para a API HTTP Cats
  [https://http.cat/](https://http.cat/)
- `/api/clients`: Rotas para manipulação de dados de clientes (WIP)

# Tecnologias utilizadas:

- Nestjs
- Mongoose
- Class validator
- Class transform
- Axios

# Rodando o backend

Para rodar o backend dessa aplicação em modo *standalone*:

- vá para a raiz do projeto;
- Inicie o container docker do banco de dados em modo 'detached': `docker compose up -d`
- Execute `nx serve backend`. Isso ira rodar o projeto em modo de desenvolvimento.
- Os recursos estarão disponíveis no endereço `http://localhost:3333/api/`

# Recursos

Como o prefixo `/api/` se repete em toda as rotas, vamos ocultá-lo nas proximas
mençoes a rotas.

## Cats

Esse recurso é na verdade um proxy para a API HTTP Cats. Como as requisições
`GET` às rotas dessa API não retornam Cabeçalhos CORS na requisição, realizar
as requisições no frontend para checar se o recurso existe não é viável sem
realizar requisições 'opacas'. Isso não permite checar o status da requisição.
Dessa forma, as requisições são feitas no backend e se o recurso existe, os
dados da requisição são redirecioados para o frontend.

O endereço base da requisição é `http://localhost:3333/api/cats/`

### Rotas 

`GET /cats/[codigo-http: int]`: 

Retorna um recurso com a url para a imagem original do HTTP Cats
e um status de requisição:

**Payload de resposta**:
```{json}
{
  "url": string | null
  "status": "ok" | "error"
}
```

Retorna status:
  - 200: se o recurso existe na API HTTP Cats;
  - 404: caso contrário

Exemplo:


`GET /cats/200`
```{json}
{
  "url": "https://http.cat/200"
  "status": "ok" 
}
```

## Clients

Rota principal para ações CRUD em clientes. O payload retornado refere-se aos
dados de clientes armazenados em um banco de dados mongo em um container docker
(para desenvolvimento).


### Rotas 

`GET /clients`

Retorna uma lista de clientes disponíveis no banco

**Payload de resposta**

```{json}
[
  {
    "id": "string"
    "name": "string"
    "cpf": "string"
    "email": "string"
    "phone": "string"
    "address": {
      "city": "string"
      "state": "string"
      "cep": "string"
      "number": "string"
      "street": "string"
    }
  }
]

```

**Exemplo (dados fictícios)**

```{json}
[
  {
    "id": "63baf82de08b3ec0eced1182",
    "name": "Roberto Carlos da Silva",
    "cpf": "33344455512",
    "email": "rs@mail.com",
    "phone": "86977772222",
    "address": {
      "city": "São Paulo",
      "state": "São Paulo",
      "cep": "011773233",
      "number": "224a",
      "street": "Avenida Simeão"
    }
  },
  {
    "id": "63baf90de08b3ec0eced1184",
    "name": "Maria Antônia",
    "cpf": "33344355512",
    "email": "mantonia@gmail.com",
    "phone": "86977773222",
    "address": {
      "city": "Salvador",
      "state": "Bahia",
      "cep": "40020-901",
      "number": "22",
      "street": "Rua dois"
    }
  }
]
```

Retorna status:
- 200, sempre. Se nenhum cliente for encontrado na base, retorna uma lista vazia

`GET /clients/[cid: string]`

Retorna dados de um cliente com id igual a `cid`. O `cid` é uma string 
correspondente a um ObjectId do mongodb.

**Exemplo de payload de resposta**

```{json}
{
  "id": "63baf90de08b3ec0eced1184",
  "name": "Maria Antônia",
  "cpf": "33344355512",
  "email": "mantonia@gmail.com",
  "phone": "86977773222",
  "address": {
    "city": "Salvador",
    "state": "Bahia",
    "cep": "40020-901",
    "number": "22",
    "street": "Rua dois"
  }
}
```

Retorna status:
- 200, Se o cliente for encontrado;
- 404, caso contrário

`/POST /clients`

Cria um novo cliente na base de dados e retorna os dados do cliente criado.
Deve incluir no corpo da requisição um payload do seguinte formato, em JSON.

**Corpo da requisição**

```{json}
  {
    "name": "string"
    "cpf": "string" (deve possuir 11 caracteres)
    "email": "string" (deve ser email válido)
    "phone": "string" (formato: "dddddddddd[d]" |deve possuir pelo menos 10 caracteres)
    "address": {
      "city": "string" 
      "state": "string"
      "cep": "string" (deve possuir pelo 8 dígitos)
      "number": "string"
      "street": "string"
    } }
```

**OBS:** Todos os campos devem ser preenchidos para a criação

**Payload de resposta**

```{json}
{
  "id": <id aleatório gerado>,
  "name": "Maria Antônia",
  "cpf": "33344355512",
  "email": "mantonia@gmail.com",
  "phone": "86977773222",
  "address": {
    "city": "Salvador",
    "state": "Bahia",
    "cep": "40020-901",
    "number": "22",
    "street": "Rua dois"
  }
}
```

Retorna status:
- 201: Quando a operação é realizada com sucesso
- 400: Quando um ou mais dados enviados no corpo não são enviados
  ou não são válidos (Ex: CPF com menos de onze caracteres)

`PATCH /clients/[cid]`

Atualiza dados do cliente com id igual a `cid`. A requisição deve ter o mesmo
corpo da requisição POST porém todos os dados são opcionais, isto é uma requisição
com corpo: 

```{json}
  {
    "name": "string"
  }
```

É válida.
 

**Payload de resposta**

```{json}
{
  "id": <cid fornecido>,
  "name": "Maria Antônia",
  "cpf": "33344355512",
  "email": "mantonia@gmail.com",
  "phone": "86977773222",
  "address": {
    "city": "Salvador",
    "state": "Bahia",
    "cep": "40020-901",
    "number": "22",
    "street": "Rua dois"
  }
}
```

Retorna status:
- 200: Quando a operação é realizada com sucesso
- 400: Quando um ou mais dados enviados no corpo não são válidos (Ex: CPF com mais ou menos de onze caracteres)
- 404: Quando o cliente não é encontrado

`DELETE /clients/[cid]`

Apaga o registro de um usuário com id igual a `cid`. Não retorna nenhum corpo 

Retorna status:
- 204: Quando a operação é realizada com sucesso
- 404: Quando o cliente não é encontrado
