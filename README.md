<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Task Management REST API With Nest.js
![image](https://github.com/user-attachments/assets/1db63f2a-2dda-4d9d-9602-484f59a99ae8)


## Description

Desafio sugerido na disciplina de Engenharia de Software no curso de Sistemas de Informação - UFPE. Seu objetivo é aprendermos a desenvolver uma API RESTful que permita a criação, leitura, atualização e exclusão de tarefas, bem como filtragem de tarefas com base no seu status. A aplicação deve ser construída com boas práticas de desenvolvimento, modularização de código, validação de dados e interação com um banco de dados.


## Run Project

1. Instale as dependências:
```bash
$ npm install
```

2. Altere as variáveis de ambiente em ```.env```
   
Obs.: O sistema está aceitando apenas o MongoDB. Siga esse <a href='https://www.mongodb.com/pt-br/resources/products/fundamentals/create-database'>tutorial</a>, caso não saiba como iniciar o banco de dados.

3. Inicie o servidor no modo desenvolvimento:
```bash
  npm run start:dev
```

## Run tests

Testes unitários:
```bash
$ npm run test
```

## Technologies Used

- Nest.js
- Typescript
- Swagger
- MongoDB
- Mongoose
- Jest
- Supertest