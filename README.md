# Nome do Projeto
Backend foodExplorer

## Descrição do projeto
Backend utilizado no projeto foodExplorer utilizando nodeJs para controlar as requisições feitas pelo frontEnd

## Status do projeto
Finalizado

### Features
- [x] Cadastro de usuário
- [x] Autenticação de usuário
- [x] Autorização de usuário
- [x] Cadastro de refeição
- [x] Edição de refeição
- [x] exclusão de refeição
- [x] Cadastro de favorito
- [x] Funcionamento de Pedidos 
- [x] Pagamento (Simulação)
- [x] Status dos pedidos

### Pré-requisitos
### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone <https://github.com/tgmarinho/nlw1>

# Acesse a pasta do projeto no terminal/cmd
$ cd nlw1

# Vá para a pasta server
$ cd server

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)
```

### 🛠 Tecnologias
- [Node.js](https://nodejs.org/en/)
- [Express] (https://expressjs.com/pt-br/)
- [Cors] (https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)
- [Multer] (https://www.npmjs.com/package/multer)
- [SQLite] (https://www.sqlite.org/)
- [Knex] (https://knexjs.org/)
- [JWT] (https://jwt.io/)

### Organização
O sistema é organizado de forma componentizada em Controllers, cada um controlando suas respectivas funções. Os Controllers são:

- FavoritesController: Lógica de adição e deleção de favoritos
- MealsAvatarController: Lógica de atualização do avatar das refeições
- OrderController: Lógica das ordens de pedidos de cada usuário
- OrderDetailsController: Lógica dos detalhes de cada ordem e os pedidos
- PaymentController: Lógica de pagamento
- SessionController: Lógica de autorização de criação da sessão utilizando cookies
- TagsController: Lógica de criação e deleção das tags
- UserController: Lógica de criação de usuários
- UserValidatedController: Lógica de validação da autenticação dos usuários

Nosso banco de dados foi dividido nas seguintes tabelas:

- users: Contém os dados dos usuários como id, nome, senha criptografada, role, data de criação e data de update
- meals: Contém os dados de cada refeição como nome, descrição, avatar (Local que a imagem está contida), categoria (3 categorias: Refeição, prato principal e sobremesa), preço, data de criação e data de update
- Tags: Contém as tags de cada meal, é ligada a meal contendo um id, meal_id e um título
- Orders: Contém as orders de pedido geral, ou seja, um pedido completo que deve ser pago. Nele temos uma associação ao user_id daquele pedido, o valor total da ordem, o status (open, pending, delivered) e a data de criação da ordem
- orders-details: Contém os detalhes das ordem e une um order a diversas Meals. Nela temos um order_id, um meal_id, uma quantidade (quantidade pedida daquele prato) e um subtotal (valor do prato * quantidade)
- favorites: Nele temos os dados das meals favoritadas e une um user_id a um meal_id

Temos dois middlewares:

- EnsureAuthenticated: Verifica que o token está contido nos cookies da resposta e garante a autenticação do usuário com a validação do token JWT. Em seguida, passa o user_id para a request para ser usado na função
- verifyUserAuthorization: Realiza a validação da autenticação de um usuário para realizar certas funções, que podem ser realizadas apenas por um ADMIN

### variaveis de ambiente
as variaveis de ambiente definidas foram nossa palavra secreta para o token de autorização, nossa porta de utilização e nossa configuração do cors para permitir injeção dos cookies apenas do site permitido

### Autor
---
Feito por Gustavo Molino 👋🏽 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-GustavoMolino-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/gustavo-molino/)](https://www.linkedin.com/in/gustavo-molino/)

[![Gmail Badge](https://img.shields.io/badge/-tgmarinho@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:g247144@dac.unicamp.br)](mailto:g247144@dac.unicamp.br)

