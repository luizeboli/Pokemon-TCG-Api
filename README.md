# PokeCardéx
> **Note**: *This README is written in PT-BR to help non-English speakers*

Aplicação desenvolvida em ReactJS consumindo a API https://pokemontcg.io/

# Tabela de conteúdo
- [PokeCardéx](#pokecard%c3%a9x)
- [Tabela de conteúdo](#tabela-de-conte%c3%bado)
- [Introdução](#introdu%c3%a7%c3%a3o)
- [Arquitetura Flux](#arquitetura-flux)
- [Elementos do Flux](#elementos-do-flux)
  - [View](#view)
  - [Action](#action)
  - [Store](#store)
  - [Dispatcher](#dispatcher)
- [Fluxo de dados](#fluxo-de-dados)
- [Instalação e Execução](#instala%c3%a7%c3%a3o-e-execu%c3%a7%c3%a3o)

# Introdução

Essa aplicação foi desenvolvida com o intuito de explicar algumas libs utilizadas juntamente com o Framework ReactJS, baseando-se na arquitetura flux.

> **Nota**: Existem diferentes maneiras de implementação para as libs deste projeto, e com a constante atualização do core do React, eventualmente algumas podem se tornar (*ou já são*) desnecessárias. Porém, a escolha foi baseada em um cenário específico, e, convenhamos, conhecimento nunca é demais :smiley: :v:

# Arquitetura Flux

Antes de conhecermos as libs, precisamos entender do que foram derivadas.

Flux é um padrão/arquitetura de código trazido pelo Facebook para desenvolvimento de aplicações front-end em JS, com o objetivo de facilitar a maneira em que os dados são gerenciados. O conceito mais relevante desta arquitetura é que há um fluxo único de dados (*one-way data binding*) e apenas o ***store*** (veremos à frente) fica responsável por manipular o estado da aplicação e prover para os componentes.

# Elementos do Flux

## View

É a camada da interface, que pode ser qualquer framework, inclusive JS Vanilla. As views disparam as actions e se conectam ao store para (re-)renderizar as alterações no estado.

## Action

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

## Store

É o store que armazena os dados da aplicação e é o único responsável por alterar seu estado pela action recebida. Quando ocorre uma mudança no estado, todos os componentes conectados ao store são notificados e atualizados.

Exemplo:

1. O store recebe a action "MARK_TODO";
2. O store altera o estado marcando o TODO como completado.
3. Todos os componentes conectados ao store são atualizados.

## Dispatcher

É através do dispatcher que a action chega ao store.

Exemplo:

1. O usuário digita o título do TODO e clica para adicionar;
2. A view captura este evento e dispara uma action "ADD_TODO" contendo o título do TODO;
3. O store vai receber essa action e manipular o estado.

# Fluxo de dados

Podemos exemplificar os elementos descritos acima em um diagrama descrevendo o fluxo dos dados:

1. A view dispara uma action usando o dispatcher;
2. O dispatcher envia a action para o store;
3. O store atualiza as views (ou as views acessam os dados do store)

![flux-simple-diagram](https://user-images.githubusercontent.com/13091635/71678108-1c6ae080-2d63-11ea-9265-eaf453ef489a.png)

# Instalação e Execução

1. Faça um clone desse repositório: `git clone https://github.com/luizeboli/Pokemon-TCG-Api.git`;
2. Execute o comando `yarn` para instalar as dependências;
3. Execute o comando `yarn start` para iniciar a aplicação.
