<h1 align="center">
      <a href="#" alt="Food explorer API"> food Explorer API</a>
</h1>
<h3 align="center">
    Backedn de site de compra venda de refeições online feito por uma empresa fictícia chamda Food explorer
</h3>
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/GustavoMolino59/API-FoodExplorer?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/GustavoMolino59/API-FoodExplorer">
  
  <a href="https://github.com/GustavoMolino59/API-FoodExplorer/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/GustavoMolino59/API-FoodExplorer">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
   <a href="https://github.com/GustavoMolino59/Web-foodExplorer/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/starsGustavoMolino59/API-FoodExplorer?style=social">
   </a>
   
 <h4 align="center">
	🚧   Concluído 🚀 🚧
</h4>

Tabela de conteúdos
=================
<!--ts-->

* [Sobre o projeto](#-sobre-o-projeto)
   * [Funcionalidades](#Features)
   * [Como executar o projeto](#Como-executar-o-projeto)
     * [Pré-requisitos](#pré-requisitos)
     * [Rodando a aplicação web (Servidor)](#user-content---rodando-o-back-end-servidor)
   * [Tecnologias](#-tecnologias)
   * [Organização](#-organização)
   * [Autor](#-autor)
<!--te-->



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
$ git clone <https://github.com/GustavoMolino59/API-FoodExplorer>

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
<p align="center">
  <a href="" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### [](https://github.com/tgmarinho/Ecoleta#server-nodejs--typescript)**Server**  ([NodeJS](https://nodejs.org/en/) 

-   **[Express](https://expressjs.com/)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[KnexJS](http://knexjs.org/)**
-   **[SQLite](https://github.com/mapbox/node-sqlite3)**
-   **[ts-node](https://github.com/TypeStrong/ts-node)**
-   **[dotENV](https://github.com/motdotla/dotenv)**
-   **[Multer](https://github.com/expressjs/multer)**
-   **[JWT] (https://jwt.io/)**
> Veja o arquivo  [package.json](https://github.com/GustavoMolino59/API-FoodExplorer/blob/main/package.json)
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

### Autor
---
Feito por Gustavo Molino 👋🏽 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-GustavoMolino-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/gustavo-molino/)](https://www.linkedin.com/in/gustavo-molino/)

[![Gmail Badge](https://img.shields.io/badge/-g247144@dac.unicamp.br-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:g247144@dac.unicamp.br)](mailto:g247144@dac.unicamp.br)

