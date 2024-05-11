# Como instalar o projeto e fluxo do projeto


## INSTALAÇÃO

### Clonar o projeto
```bash
$ git clone linkDoRepositorio
```

### Após clonar o projeto, rodar comando abaixo
```bash
$ npm install
```

### Caso ocorra algum erro no projeto
```bash
$ rm -rf node_modules/ package-lock.json
$ npm install
```

### Para rodar o projeto localmente
```bash
$ npx expo start
```

## FLUXO PROJETO

## Para realizar uma tarefa, siga esses passos


### Criar uma branch
```bash
// cria uma branch para suas atualizações do projeto
$ git checkout -b NomeDaBranch
```

### Após a finalização da tarefa
```bash
$ git add .
$ git commit -m "[FEAT]: texto explicando o que foi adicionado"
$ git push NomeDoRepositorio NomeDaBranchCriada
```