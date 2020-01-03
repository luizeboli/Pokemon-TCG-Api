# PokeCardéx
> **Note**: *This README is written in PT-BR to help non-English speakers*

Aplicação desenvolvida em ReactJS consumindo a API https://pokemontcg.io/

# Instalação e Execução

1. Faça um clone desse repositório: `git clone https://github.com/luizeboli/Pokemon-TCG-Api.git`;
2. Execute o comando `yarn` para instalar as dependências;
3. Execute o comando `yarn start` para iniciar a aplicação.


# Tabela de conteúdo
- [PokeCardéx](#pokecard%c3%a9x)
- [Instalação e Execução](#instala%c3%a7%c3%a3o-e-execu%c3%a7%c3%a3o)
- [Tabela de conteúdo](#tabela-de-conte%c3%bado)
- [Introdução](#introdu%c3%a7%c3%a3o)
- [Arquitetura Flux](#arquitetura-flux)
  - [Elementos do Flux](#elementos-do-flux)
    - [View](#view)
    - [Action](#action)
    - [Store](#store)
    - [Dispatcher](#dispatcher)
  - [Fluxo de dados](#fluxo-de-dados)
- [Duck Pattern](#duck-pattern)
- [Bibliotecas utilizadas](#bibliotecas-utilizadas)
  - [Immutable](#immutable)
  - [Redux](#redux)
  - [React Redux](#react-redux)
  - [Redux Actions](#redux-actions)
  - [Redux Thunk](#redux-thunk)
  - [Redux Saga](#redux-saga)

# Introdução

Essa aplicação foi desenvolvida com o intuito de explicar algumas bibliotecas utilizadas juntamente com o Framework ReactJS, baseando-se na arquitetura flux.

> **Nota**: Existem diferentes maneiras de implementação para as bibliotecas deste projeto, e com a constante atualização do core do React, eventualmente algumas podem se tornar (*ou já são*) desnecessárias. Porém, a escolha foi baseada em um cenário específico, e, convenhamos, conhecimento nunca é demais :smiley: :v:

# Arquitetura Flux

Antes de conhecermos as bibliotecas, precisamos entender do que foram derivadas.

Flux é um padrão/arquitetura de código trazido pelo Facebook para desenvolvimento de aplicações front-end em JS, com o objetivo de facilitar a maneira em que os dados são gerenciados. O conceito mais relevante desta arquitetura é que há um fluxo único de dados (*one-way data binding*) e apenas o **store** (veremos à frente) fica responsável por manipular o estado da aplicação e prover para os componentes.

## Elementos do Flux

### **View**

É a camada da interface, que pode ser qualquer framework, inclusive JS Vanilla. As views disparam as actions e se conectam ao store para (re-)renderizar as alterações no estado.

### **Action**

Uma action é nada mais que um objeto, que por convenção contém duas propriedades: **type** e **payload**.

A propriedade type descreve a action disparada, enquanto o payload armazena os dados que serão usados para manipular o estado.

Exemplo:

1. Quando o usuário clica para marcar um "TODO" como completado, uma action "MARK_TODO" é disparada e o payload é o ID do "TODO":
```JavaScript
{
  type: "MARK_TODO",
  payload: "15324"
}
```

### **Store**

É o store que armazena os dados da aplicação e é o único responsável por alterar seu estado através da action recebida. Quando ocorre uma mudança no estado, todos os componentes conectados ao store são notificados e atualizados.

Exemplo:

1. O store recebe a action "MARK_TODO";
2. O store altera o estado marcando o TODO como completado.
3. Todos os componentes conectados ao store são atualizados.

### **Dispatcher**

O dispatcher é usado para transmitir payloads para os callbacks registrados.

Exemplo:

1. O usuário digita o título do TODO e clica para adicionar;
2. A view captura este evento e usa o dispatcher para disparar uma action "ADD_TODO" contendo o título do TODO;
3. O store vai receber essa action e manipular o estado.

## Fluxo de dados

Podemos exemplificar os elementos descritos acima em um diagrama descrevendo o fluxo dos dados:

1. A view dispara uma action usando o dispatcher;
2. O dispatcher envia a action para o store;
3. O store atualiza as views (ou as views acessam os dados do store)

![flux-simple-diagram](https://user-images.githubusercontent.com/13091635/71678108-1c6ae080-2d63-11ea-9265-eaf453ef489a.png)

(*Uma action não necessariamente deve ser originada de uma view*)

# Duck Pattern

A estrutura convencional das aplicações com redux consiste em separar em arquivos individuais o reducer, as actions e o types. Se pensarmos em pequenas aplicações não há problemas, porém se precisarmos escalar vários módulos, teremos dificuldades em lidar com a quantidade de arquivos e pastas.

Então surgiu o padrão Duck, que se resume a unir reducers, actions e types em um único arquivo, claro que por módulos.

De acordo com a proposta dos Ducks, um módulo DEVE:

1. Exportar de modo default o reducer;
2. Exportar as actions creators como funções;
3. Os types devem estar no formato `npm-module-or-app/reducer/ACTION_TYPE` (exemplo: 'app/auth/LOGOUT_USER').
4. Exportar os types com a convenção `UPPER_SNAKE_CASE`.

# Bibliotecas utilizadas

A partir deste ponto, começaremos a estudar as bibliotecas utilizadas. É importante ressaltar que não nos aprofundaremos a ponto de entendermos todas as minúcias e particularidades de cada uma, entretanto, será o suficiente para termos um ponto de partida. Podemos usar como continuação dos estudos, as referências ou a própria documentação.

As bibliotecas são:

- [ImmutableJS](https://github.com/immutable-js/immutable-js "GitHub")
- [Redux](https://github.com/reduxjs/redux "GitHub") ([React-Redux](https://github.com/reduxjs/react-redux "GitHub"))
- [Redux-Actions](https://github.com/redux-utilities/redux-actions "GitHub")
- [Redux-Thunk](https://github.com/reduxjs/redux-thunk "GitHub")
- [Redux-Saga](https://github.com/redux-saga/redux-saga/ "GitHub")
- [Reselect](https://github.com/reduxjs/reselect "GitHub")

Existem outras bibliotecas no projeto, como a styled-components, porém como o foco é explicar a arquitetura flux, estas serão deixadas de fora.

## Immutable

Esta é outra biblioteca criada pela equipe do Facebook, com objetivo de trabalhar com estruturas imutáveis. Sabemos que no JavaScript, arrays, objetos e funções são passados por referência, e não por valor (de maneira simplificada), o que pode gerar problemas e efeitos colaterais indesejados na aplicação.

O Gif abaixo demonstra a diferença entre passar parâmetros por valor e referência.

![gif_reference_value](https://user-images.githubusercontent.com/13091635/71738437-5e645700-2e35-11ea-97bb-dfacbaa597e4.gif)

Vamos usar o Immutable para garantir que nosso estado seja imutável.

## Redux

Resumidamente, o Redux é uma biblioteca que gerencia o estado da aplicação de uma forma global. Ao invés de compartilharmos estado entre os componentes e gerar problemas como prop-drilling (repassar propriedades muitos níveis abaixo na árvore de componentes), o Redux nos permite ter um único estado, centralizado através do [store](#store), e então todos os componentes que necessitarem, podem acessá-lo.

Além do store, [actions](#action) e reducers fazem parte do conceito do Redux.

O reducer é uma função pura que baseado na action recebida, cria um novo objeto concatenando o estado anterior com a alteração, retornando um novo estado (para preservar o conceito da imutabilidade).

O Redux tem três princípios fundamentais:

1. O estado da aplicação deve estar armazenado em um único store (*single source of truth*)
2. O estado é read-only. A única maneira de alterar o estado é disparando uma action que é tratada pelo reducer.
3. O reducer deve ser uma função pura.

A biblioteca é considerada uma evolução do padrão Flux e apesar de ter sido baseada nele, existem duas diferenças principais:

1. O Redux não suporta multiplos stores;
2. Não existe um dispatcher.

> Nota: o dispatch do redux é apenas uma função que repassa a action para o reducer.

## React Redux

O conceito do react-redux é simples, essa biblioteca nos ajuda a conectar os componentes ao store. É o react-redux que verifica se há mudanças no estado e atualiza o componente.

## Redux Actions

Essa biblioteca foi desenvolvida com o intuito de diminuir a quantidade de boilerplates e a verbosidade das actions e reducers, eliminando também a necessidade das constantes para referenciar o tipo das actions (os types). 

Veremos mais a frente quando entrarmos na implementação, o benefício de se usar essa biblioteca e a diferença entre o modo convencional.

## Redux Thunk

Todo o fluxo do redux (*one way data binding*) é síncrono, ele foi pensado para ser previsível, ou seja, a view gera um evento que dispara uma action, o reducer recebe a action e então retorna um novo estado com as alterações, por fim, o componente é renderizado.

Se precisarmos trabalhar com requisições assíncronas, como por exemplo um request http, que é o nosso caso, precisaremos usar um middleware.

O middleware vai agir entre o disparo da action e o momento em que ela chega no reducer.

O redux-thunk foi o primeiro middleware do redux e fazia parte da sua proposta até ser separado em um novo pacote. Um thunk é uma função que recebe (ou não) parâmetros, e retorna outra função. Essa última, é o dispatch, que irá acionar o reducer.

Resumindo, quando a view executar uma action, ela irá passar pelo thunk antes de seguir para o reducer, é nesse momento que a requisição assíncrona é efetuada.

## Redux Saga

Assim como o redux-thunk, essa biblioteca também é um middleware usado para tratar requisições assíncronas. Diferente dos thunks, as sagas são como threads separadas da aplicação, que podem ser pausadas e canceladas graças a uma feature da ES6 chamada *generators*.

Podemos usar sagas e os *saga-effects* quando precisamos controlar os efeitos colaterais de uma forma mais minuciosa, como por exemplo uma task que precisa rodar em background independente de ações do usuário, tasks que dependem uma da outra, fluxos extensos e que precisam aguardar condições específicas para seguirem ou até mesmo cancelar requisições que não são mais necessárias