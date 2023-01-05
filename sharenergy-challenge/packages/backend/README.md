# Backend da aplicação

Uma API simples com duas principais rotas:

- `/api/cats`: Uma rota de proxy para a API HTTP Cats
  [https://http.cat/](https://http.cat/)
- `/api/clients`: Rotas para manipulação de dados de clientes (WIP)

Como o prefixo `/api/` se repete em toda as rotas, vamos ocultá-lo nas proximas
mençoes a rotas.

## Cats

Esse recurso é na verdade um proxy para a API HTTP Cats. Como as requisições
`GET` às rotas dessa API não retornam Cabeçalhos CORS na requisição, realizar
as requisições no frontend para checar se o recurso existe não é viável sem
realizar requisições 'opacas'.Isso não permite checar o status da requisição.
Dessa forma, as requisições são feitas no backend e se o recurso existe, os
dados da requisição são redirecioados para o frontend.

### Rotas 

`/cats/[codigo-http]`: Retorna um recurso com a url para a imagem original do HTTP Cats
e um status de requisição:

**Payload de resposta**:
```{json}
{
  "url": string | null
  "status": "ok" | "error"
}
```

Retorna status:
  - 200: se o recurso existe na API HTTP Cats
  - 404: caso contrário
