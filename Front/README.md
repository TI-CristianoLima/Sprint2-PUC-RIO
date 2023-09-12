# Cadastro de Clientes

Este pequeno projeto faz parte do material diático da Disciplina **Desenvolvimento Back end Avançado** 

O objetivo aqui é consumir uma API externa e a API interna.

---
## Como executar

Basta fazer o download do projeto e abrir o arquivo index.html no seu browser.

## COMO EXECUTAR ATRAVÉS DO DOCKER

Certifique-se de ter o Docker instalado e em execução em sua máquina.

Navegue até o diretorio que contém o Dockerfile no terminal. Execute como administrador o seguinte comando para construir a imagem Docker:

```
$ docker build -t front .
```

Uma vez criada a imagem, para executar o container basta executar, como administrador, o seguinte comando:

```
$ docker run --rm -p 8080:80 front
```

Uma vez executando, para acessar a pagina index.html, basta abrir [http://localhost:8080/#/](http://localhost:8080/#/) no navegador.