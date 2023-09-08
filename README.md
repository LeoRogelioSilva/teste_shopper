# teste_shopper

## Instalação

## Banco de dados
### 1. Instale o <a href="https://dev.mysql.com/downloads/mysql/">MySQL Server</a>
#### a. Siga as instruções padrões do Sql Server, e quando estiver em 'Configuração do servidor MySQL', lembre-se de definir a porta como padrão 3306 e guarde bem a senha do usuário root.
#### b. Continue a instalação normalmente e clique em finish no final.
### 2. Instale um SGBD
#### a. Recomendo o uso do <a href="https://dbeaver.io/download/">DBeaever</a> ou <a href="https://dev.mysql.com/downloads/workbench/">WorkBench</a>
#### b. Siga a instalação sugerida
### 3. Crie a conexão e o banco de dados
#### a. Finalizada a instalação, crie uma nova conexão usando host 'localhost', porta 3306, usuário 'root' e use a senha definida na instalação do MySQL
#### b. Entre na conexão criada e abra um novo Script SQL
#### c. Copie o <a href="https://github.com/LeoRogelioSilva/teste_shopper/blob/main/server/db/database.sql"> script de iniciação do banco de dados disponível neste repositório em server/db/database.sql</a>
#### d. Cole na página de Script sql do seu SGBD e execute o script

#### Pronto! Banco de dados instalado e operante!

## Clone do repositório
#### Os arquivos de Back End e Front End estão neste repositório, em ./server e ./client respectivamente
### - Faça o clone do projeto em qualquer diretório da sua máquina com o comando: 
``` bash
git clone https://github.com/LeoRogelioSilva/teste_shopper
```

### - Edite o arquivo ./server/src/connection.js e altere APENAS o campo password com a senha do seu SQL Server

## Instalação do Back End
### 1. Abra um terminal na pasta ./server
### 2. Instale as dependências do projeto:
```bash
npm install
```
### 3. Inicie o servidor Back End:
```bash
npm run start
```

## Instalação do Front End
### 1. Abra um terminal na pasta ./client
### 2. Instale as dependências do projeto:
```bash
npm install
```
### 3. Inicie o servidor Front End:
```bash
npm run start
```

## Pronto! Todo o projeto está instalado e configurado!
