# Frontend do projeto

# Tecnologias utilizadas:

- React ([https://pt-br.reactjs.org](https://pt-br.reactjs.org))
- React Query V3 ([https://react-query-v3.tanstack.com](https://react-query-v3.tanstack.com))
- React Router ([https://www.reactrouter.com](https://www.reactrouter.com))
- Tailwind CSS ([https://www.tailwindcss.com](https://www.tailwindcss.com))
- Vite ([https://www.vitejs.dev](https://www.vitejs.dev))

# Rodando o backend

Para rodar o backend dessa aplicação em modo *standalone*:

- vá para a raiz do projeto;
- Inicie o container docker do banco de dados em modo 'detached': `docker compose up -d`
- Execute `nx serve frontend`. Isso ira rodar o projeto em modo de desenvolvimento.
- Os recursos estarão disponíveis no endereço `http://localhost:4200/`

# Features 

- Página de login;
- Listagem de usuários;
- HTTP Cats: Mostra fotos de gatos para um código HTTP fornecido;
- Random Dog: Mostra uma aleatória foto ou aleatório vídeo de um cachorro;
- Listagem de clientes

