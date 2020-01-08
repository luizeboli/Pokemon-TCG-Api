# PokeCardéx
> **Note**: *This README is written in PT-BR to help non-English speakers*

Aplicação desenvolvida em ReactJS consumindo a API https://pokemontcg.io/

[Live preview](http://poke-tcg-api.herokuapp.com/)

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
  - [Redux](#redux)
  - [React Redux](#react-redux)
  - [Redux Actions](#redux-actions)
  - [Redux Thunk](#redux-thunk)
  - [Redux Saga](#redux-saga)
  - [Immutable](#immutable)
  - [Reselect](#reselect)
- [Implementando o projeto](#implementando-o-projeto)
  - [Redux Starter-kit](#redux-starter-kit)
  - [Requisições assíncronas com Redux-Thunk](#requisi%c3%a7%c3%b5es-ass%c3%adncronas-com-redux-thunk)
  - [Unindo actions, types e reducers (Duck Pattern)](#unindo-actions-types-e-reducers-duck-pattern)
  - [Simplificando as actions e reducers](#simplificando-as-actions-e-reducers)
  - [Outro exemplo de middleware (Redux Saga)](#outro-exemplo-de-middleware-redux-saga)
  - [Imutabilidade com ImmutableJS no Redux](#imutabilidade-com-immutablejs-no-redux)
  - [Adicionando selectors memoizados](#adicionando-selectors-memoizados)
- [Material para estudo e referências](#material-para-estudo-e-refer%c3%aancias)
- [Melhorias (TODO)](#melhorias-todo)

# Introdução

Essa aplicação foi desenvolvida com o intuito de explicar algumas bibliotecas utilizadas juntamente com o Framework ReactJS, baseando-se na arquitetura flux.

É recomendável acompanhar as explicações junto com o código/commits para melhor entendimento da correlação das partes do projeto, pois por motivos de otimização usaremos apenas os trechos pertinentes ao que for explicado.

> **Nota**: Existem diferentes maneiras de implementação para as bibliotecas deste projeto, e com a constante atualização do core do React, eventualmente algumas podem se tornar (*ou já são*) desnecessárias. Porém, a escolha foi baseada em um cenário específico, e, convenhamos, conhecimento nunca é demais :smiley: :v:

# Arquitetura Flux

Antes de conhecermos as bibliotecas, precisamos entender do quê foram derivadas.

Flux é um padrão/arquitetura de código trazido pelo Facebook para desenvolvimento de aplicações front-end em JS, com o objetivo de facilitar a maneira em que os dados são gerenciados. O conceito mais relevante desta arquitetura é que há um fluxo único de dados (*one-way data binding*) e apenas o **store** (veremos à frente) fica responsável por manipular e prover o estado da aplicação.

## Elementos do Flux

### **View**

É a camada da interface, que pode ser qualquer framework, inclusive JS Vanilla. As views disparam as actions e se conectam ao store para (re-)renderizar as alterações no estado.

### **Action**

Uma action é nada mais que um objeto, que por convenção contém duas propriedades: **type** e **payload**.

A propriedade type é única e distingue qual ação está sendo executada, enquanto o payload armazena os dados que serão usados para manipular o estado.

Exemplo:

1. Quando o usuário clica para marcar um "TODO" como completado, uma action "MARK_TODO" é disparada e o payload é o ID do "TODO":
```JavaScript
{
  type: "MARK_TODO",
  payload: {
    id: "15324"
  }
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

Então surgiu o padrão Duck, que se resume a unir reducers, actions e types em um único arquivo, claro que por módulos, chamados "ducks". 

> *Curiosidade: o nome "ducks" foi escolhido em referência a pronúncia da última silaba da palavra "redux".*

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

Existem outras bibliotecas no projeto, como a styled-components, porém como o foco é explicar a arquitetura flux, essas serão deixadas de fora.

## Redux

Resumidamente, o Redux é uma biblioteca que gerencia o estado da aplicação de uma forma global. Ao invés de compartilharmos estado entre os componentes e gerar problemas como prop-drilling (repassar propriedades muitos níveis abaixo na árvore de componentes), o Redux nos permite ter um único estado, centralizado através do [store](#store), e então todos os componentes que necessitarem, podem acessá-lo.

Além do store, types, [actions](#action) e reducers fazem parte do conceito do Redux.

Para não termos que escrever repetidas vezes as actions, o redux introduziu um conceito chamado action-creator, uma função que retorna (*cria*) a action:

````JavaScript
const addTodo = (payload) => ({
  type: 'ADD_TODO',
  payload
})
````

O reducer é uma função pura que baseado na action recebida, cria um novo objeto concatenando o estado anterior com a alteração, retornando um novo estado (para preservar o conceito da imutabilidade).

Os types são apenas constantes que descrevem a action de forma resumida.

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

Veremos mais à frente quando entrarmos na implementação, o benefício de se usar essa biblioteca e a diferença entre o modo convencional.

## Redux Thunk

Todo o fluxo do redux (*one way data binding*) é síncrono, ele foi pensado para ser previsível, ou seja, a view gera um evento que dispara uma action, o reducer recebe a action e então retorna um novo estado com as alterações, por fim, o componente é renderizado.

Se precisarmos trabalhar com requisições assíncronas, como por exemplo um request http (que é o nosso caso), precisaremos usar um middleware.

O middleware agirá entre o disparo da action e o momento em que ela chega no reducer.

O redux-thunk foi o primeiro middleware do redux e fazia parte da sua proposta até ser separado em um novo pacote. Um thunk nos permite chamar uma action creator que retorna uma função ao invés de um objeto, essa função recebe o dispatch do store para que a action chegue ao reducer.

Resumindo, quando a view executar uma action, ela irá passar pelo thunk antes de seguir para o reducer, é nesse momento que a requisição assíncrona é efetuada.

## Redux Saga

Assim como o redux-thunk, essa biblioteca também é um middleware usado para tratar requisições assíncronas. Diferente dos thunks, as sagas são como threads separadas da aplicação, que podem ser pausadas e canceladas graças a uma feature da ES6 chamada *generators*.

Podemos usar sagas e os *saga-effects* quando precisamos controlar os efeitos colaterais de uma forma mais minuciosa, como por exemplo uma task que precisa rodar em background independente de ações do usuário, tasks que dependem uma da outra, fluxos extensos e que precisam aguardar condições específicas para seguirem ou até mesmo cancelar requisições que não são mais necessárias.

## Immutable

Essa é outra biblioteca criada pela equipe do Facebook, com objetivo de trabalhar com estruturas imutáveis. Sabemos que no JavaScript, arrays, objetos e funções são passados por referência, e não por valor (de maneira simplificada), o que pode gerar problemas e efeitos colaterais indesejados na aplicação.

O Gif abaixo demonstra a diferença entre passar parâmetros por valor e referência.

![gif_reference_value](https://user-images.githubusercontent.com/13091635/71738437-5e645700-2e35-11ea-97bb-dfacbaa597e4.gif)

Usaremos o Immutable para garantir que nosso estado seja imutável.

## Reselect

Apesar de não fazer parte dos conceitos principais do redux, é sugerido como boa prática pela sua equipe o uso de selectors para obter apenas as partes necessárias do estado. O selector é uma função que recebe o estado e então retorna apenas um pedaço dele. É usado também para abstrair os cálculos da camada do componente (como por exemplo no método `mapStateToProps`). 

Dada a definição do selector, não precisamos de uma biblioteca para isso, exemplo de um selector simples para obter uma lista de usuários do store:

````JavaScript
const usersSelector = (state) => state.users;
````

O benefício de se utilizar o reselect está na possibilidade de criar selectors memoizados de forma simplificada.

Nos baseando no exemplo acima, sempre que nosso estado for alterado, independente se a propriedade users mudar ou não, o selector é executado novamente. Nesse caso não sofreremos por isso, mas aplicações maiores que envolvem grandes cálculos podem ter a performance afetada.

O selector memoizado armazena a entrada e a saída, se a função for chamada novamente com o mesmo input, o selector não efetua o cálculo e apenas retorna o resultado armazenado.

# Implementando o projeto

Partindo para a implementação do projeto, iremos desenvolver do início, sem as bibliotecas, e em seguida refatorando etapa por etapa.

## Redux Starter-kit

Como vimos [mais acima](#redux), para utilizar o redux, precisaremos de:

1. Configurar o store;
2. Implementar as actions;
3. Implementar o reducer;
4. Prover o store para a nossa aplicação;
5. Conectar os componentes interessados ao store.

Existem diversas formas de estruturar o projeto. No nosso caso, tudo o que for relacionado ao redux estará na pasta `src\store`.

Começaremos criando o arquivo `src\store\index.js`, responsável pela configuração do store e posterior implementação dos middlewares:

```JavaScript
import { createStore } from 'redux';
import cardsReducer from '../reducer/cards';

// O método "createStore" espera pelo menos um parâmetro, que é o reducer. Vamos implementar mais abaixo.
const store = createStore(cardsReducer);

export default store
```

Simples assim, em poucas linhas temos um store pronto para ser utilizado. Em seguida, criamos o arquivo `src\store\types\cards.js` e nele vamos exportar todos os actions types:

````JavaScript
export const FETCH_CARDS_PENDING = 'FETCH_CARDS_PENDING';
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const FETCH_CARDS_ERROR = 'FETCH_CARDS_ERROR';
````
> Nota: Esse formato de separar os types em outro arquivo não é obrigatório, na verdade nem precisamos defini-los, podemos usar strings diretamente nas actions. O benefício está em prevenir erros de digitação e repetição de código ao longo do desenvolvimento.

Agora, criaremos o nosso reducer no arquivo `src\store\reducer\cards.js`:

````JavaScript
// Fazemos o import dos actions types.
import { FETCH_CARDS_PENDING, FETCH_CARDS_SUCCESS, FETCH_CARDS_ERROR } from '../types/cards.js';

// Declaramos nosso estado inicial
const INITIAL_STATE = {
  cards: [],
  loading: false,
  error: false,
};

// O reducer recebe dois parâmetros, o primeiro é o estado anterior e o segundo é a action. Retomando o conceito, o reducer é uma função pura que baseado na action recebida, efetua alguma alteração no estado.
// Como vamos buscar dados em um API, usaremos três actions: uma para quando efetuarmos a requisição, ainda aguardando retorno; uma segunda caso o retorno seja bem sucedido e uma terceira caso ocorra algum erro. Chamamos esse padrão de "request pattern".
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CARDS_PENDING:
    return {
      ...state,
      loading: true,
      error: false,
    };
  case FETCH_CARDS_SUCCESS:
    return {
      ...state,
      cards: action.payload,
      loading: true,
      error: false,
    };

  case FETCH_CARDS_ERROR:
    return {
      ...state,
      loading: false,
      error: true,
    };

  default:
    return state;
  }
};

export default reducer;
````

O próximo passo é implementar as action creators, que posteriormente serão utilizadas nos componentes. Criamos o arquivo `src\store\action\cards.js`:

````JavaScript
import { FETCH_CARDS_PENDING, FETCH_CARDS_SUCCESS, FETCH_CARDS_ERROR } from '../types';

export const fetchCardsPending = () => ({
  type: FETCH_CARDS_PENDING,
});

export const fetchCardsSuccess = (payload) => ({
  type: FETCH_CARDS_SUCCESS,
  payload,
});

export const fetchCardsFailure = (payload) => ({
  type: FETCH_CARDS_ERROR,
  payload,
});
````

Agora temos quase tudo pronto, só nos resta disponibilizar o store para a aplicação e conectar os componentes que necessitam de acesso ao estado. É nesse momento que utilizaremos a biblioteca [react-redux](#react-redux).

No arquivo `src\index.js`, utilizaremos o "Provider" do react-redux para que a aplicação tenha acesso ao store:

````JavaScript
...
// Importamos o Provider e o nosso Store.
import { Provider } from 'react-redux';
import Store from './store';

import App from './App';

// Encapsulamos nossa aplicação com o Provider, para que o store seja disponibilizado.
ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
````

O segundo passo é conectar os componentes ao nosso store, utilizando o HOC "connect" do react-redux.

O "connect" recebe dois argumentos e não é obrigatório utilizarmos ambos, o primeiro é uma função que recebe o estado e retorna um objeto mapeando quais partes o nosso componente terá acesso, chamamos de `mapStateToProps`. O segundo é semelhante, porém ao invés do estado, mapearemos as actions, chamamos de `mapDispatchToProps`. Ambos possuem a nomenclatura "ToProps", o que significa que o estado e as actions serão injetados como propriedades no nosso componente. A implementação é simples, criamos o arquivo `src\app.js`:

````JavaScript
...
// Importamos o connect e o bindActionCreators.
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Precisamos importar as actions que o componentes utilizará.
import { fetchCardsPending } from './store/action/cards';

const App = ({ cards, loading, error, fetchCardsPending }) => (
  <button onClick={() => fetchCardsPending()}>Pesquisar</button>
);

const mapStateToProps = (state) => ({
  cards: state.cards,
  loading: state.loading,
  error: state.error
});

// O método bindActionCreators transforma qualquer objeto que seja uma action creator em um objeto encapsulado pelo dispatch para que possam ser chamados como um método qualquer.
// Passamos como primeiro parâmetro um objeto com as actions e o segundo é o próprio dispatch.
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchCardsPending }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
````

Se nossa aplicação fosse síncrona, estaria tudo pronto para funcionar: temos nosso store para armazenar o estado, as actions e o reducer para manipular o estado baseado nos action types, e por fim podemos mapear o estado e as actions para os componentes. Porém, como dependemos de dados vindos de uma API, precisamos tratar essas requisições usando um middleware do redux.

## Requisições assíncronas com Redux-Thunk

Para usar um middleware, precisamos configurar o store. Voltando ao arquivo `src\store\index.js`, efetuamos as alterações:

````JavaScript
// Além do createStore, importamos o applyMiddleware.
import { createStore, applyMiddleware } from 'redux';
import cardsReducer from '../reducer/cards';

import thunk from 'redux-thunk';

// O segundo parâmetro é o enhancer, uma função que encapsula o store e retorna uma nova versão do createStore, com os middlewares injetados.
const store = createStore(cardsReducer, applyMiddleware(thunk));

export default store
````

A partir daqui já podemos usar o thunk na nossa aplicação, mas para isso precisamos refatorar as nossas actions. No arquivo `src\store\action\cards.js`:

````JavaScript
import { FETCH_CARDS_PENDING, FETCH_CARDS_SUCCESS, FETCH_CARDS_ERROR } from '../types';

import axios from axios;

const fetchCardsPending = () => ({
  type: FETCH_CARDS_PENDING,
});

const fetchCardsSuccess = (payload) => ({
  type: FETCH_CARDS_SUCCESS,
  payload,
});

const fetchCardsFailure = (payload) => ({
  type: FETCH_CARDS_ERROR,
  payload,
});

export const fetchCards = () = (disptach) => {
  dispatch(fetchCardsPending());

  axios.get('api')
    .then((response) => dispatch(fetchCardsSuccess(response.data.data)))
    .catch((error)) => dispatch(fetchCardsFailure(error));/
}
````

Como podemos notar, agora nossa action creator é a função `fetchCards`, e essa utiliza o dispatch para se comunicar com o reducer. Precisamos alterar o componente para que essa nova action seja mapeada, voltamos no arquivo `src\app.js`:

````JavaScript
...

// Importamos o novo action creator, refatorado em forma de thunk:
import { fetchCards } from './store/action/cards';

const App = ({ cards, loading, error, fetchCards }) => (
  <button onClick={() => fetchCards()}>Pesquisar</button>
);

...

// Através do bindActionCreators, nosso thunk recebe o dispatch
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchCards }, dispatch);

...
````

Nossa aplicação está finalizada e funcional, com todo o fluxo coberto, inclusive utilizando thunk para efetuar requisições assíncronas.

O código completo até este passo, pode ser visualizado no commit https://github.com/luizeboli/Pokemon-TCG-Api/commit/f970b81fb5844c3859f568d7cd72bcf2e1e4bbdf .

As próximas bibliotecas resolvem problemas específicos e não são obrigatórias, principalmente para projetos pequenos como esse.

## Unindo actions, types e reducers (Duck Pattern)

Se pararmos para analisar a estrutura da nossa aplicação, vemos vários arquivos com pequenos trechos de código dentro de cada um. Temos uma pasta para actions, uma para os types e uma para os reducers. Se precisarmos escalar a aplicação teremos problemas para lidar com essa quantidade de arquivos.

Vamos criar o arquivo `src\store\ducks\cards.js` e unir tudo neste módulo:

````JavaScript
...

/** ********************************
 * TYPES
 ******************************** */
export const Types = {
  FETCH_CARDS_PENDING: 'FETCH_CARDS_PENDING',
  FETCH_CARDS_SUCCESS: 'FETCH_CARDS_SUCCESS',
  FETCH_CARDS_ERROR: 'FETCH_CARDS_ERROR',
};

/** ********************************
 * STATE
 ******************************** */
const INITIAL_STATE = {
  cards: [],
  loading: false,
  error: false,
};

// Uma outra abordagem para action creators.
/** ********************************
 * ACTIONS 
 ******************************** */
export const ActionCreators = {
  fetchCardsPending: () => ({
    type: Types.FETCH_CARDS_PENDING,
  }),

  fetchCardsSuccess: (payload) => ({
    type: Types.FETCH_CARDS_SUCCESS,
    payload,
  }),

  fetchCardsFailure: (payload) => ({
    type: Types.FETCH_CARDS_ERROR,
    payload,
  }),
};

/** ********************************
 * ACTIONS (THUNK)
 ******************************** */

export const fetchCards = () => (dispatch) => {
  dispatch(ActionCreators.fetchCardsPending());
  api.get('/cards')
    .then((response) => dispatch(ActionCreators.fetchCardsSuccess(response.data.cards)))
    .catch((error) => dispatch(ActionCreators.fetchCardsFailure(error)));
};

/** ********************************
 * REDUCER
 ******************************** */
export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Types.FETCH_CARDS_PENDING:
    return {
      ...state,
      loading: true,
      error: false,
    };
  case Types.FETCH_CARDS_SUCCESS:
    return {
      ...state,
      cards: action.payload,
      loading: false,
      error: false,
    };

  case Types.FETCH_CARDS_ERROR:
    return {
      ...state,
      loading: false,
      error: true,
    };

  default:
    return state;
  }
};
````

Percebe-se que na prática o código continua o mesmo, a diferença é que agora o módulo  cards está centralizado em um único arquivo, facilitando a manutenção. Claro que também é necessário corrigir o "import" dos componentes para referenciar o novo arquivo. 

O código completo desta etapa está no commit https://github.com/luizeboli/Pokemon-TCG-Api/commit/c1707b8506f80efb83318c4317b7ec2a13c75f7d .

## Simplificando as actions e reducers

Com a biblioteca redux-actions, diminuimos o uso de boilerplates, tornamos fácil a leitura das actions e reducers além de estar dentro do padrão FSA (*flux standard action*).

No duck `src\store\ducks\cards.js` vamos refatorar as actions e o reducer:

````JavaScript
import { createActions, handleActions } from 'redux-actions';

...

/** ********************************
 * ACTIONS
 ******************************** */

const requestPattern = { REQUEST: undefined, SUCCESS: undefined, FAILURE: undefined };

export const actions = createActions({
  cards: {
    FETCH_CARDS: requestPattern,
  },
});

export const { cards } = actions;

export const fetchCards = () => (dispatch) => {
  dispatch(cards.fetchCards.request());
  api.get('/cards')
    .then((response) => dispatch(cards.fetchCards.success(response.data.cards)))
    .catch((error) => dispatch(cards.fetchCards.failure(error)));
};

/** ********************************
 * REDUCER
 ******************************** */

export const reducer = handleActions({
  [cards.fetchCards.request](state) {
    return {
      ...state,
      loading: true,
      error: false,
    };
  },
  [cards.fetchCards.success](state, { payload }) {
    return {
      ...state,
      cards: payload,
      loading: false,
      error: false,
    };
  },
  [cards.fetchCards.failure]() {
    return {
      cards: [],
      loading: false,
      error: true,
    };
  },
}, INITIAL_STATE);

...
````

Não precisamos mais utilizar os action types nos creators, esse bind é feito pelo método `createActions`, que nos retorna um objeto onde a key é o type e o value é o action creator. Com isso, eliminamos a repetição de código e facilitamos a manutenção, pois no modelo antigo ao alterar os types, teriamos que mudar também as actions e o reducer. Outro detalhe é que não precisamos mais do `bindActionCreators` no `mapDispatchToProps`, basta importar a action e repassar como objeto:

````JavaScript
import { fetchCards } from './store/ducks/cards.js';

const mapDispatchToProps = {
  fetchCards
};
````

O método `createActions` nos permite manipular a forma que o payload é enviado ao reducer (*payload creator*), e é por esse motivo que estamos usando `undefined` para as propriedades no `requestPattern`, dessa forma os dados são repassados sem modificações (*identity function*).

Usamos o método `handleActions` para tratar as actions, o primeiro parâmetro é o reducer, onde cada função se refere a uma action específica, e o segundo é o estado inicial.

O código completo deste passo está no commit https://github.com/luizeboli/Pokemon-TCG-Api/commit/3547fff41032cd771953d5a878879c583a23504d .


## Outro exemplo de middleware (Redux Saga)

Vamos pensar em uma situação onde o usuário clica repetidas vezes no botão "Pesquisar". Na aplicação que temos até então, todas as vezes a requisição será efetuada, completada e o estado será alterado, o que pode gerar inconsistências.

Para prevenir esse comportamento vamos usar o redux-saga. É claro que existem diversas outras possibilidades e sua utilidade não se resume a apenas este cenário.

Primeiro, precisamos alterar o nosso duck `src\store\ducks\cards.js` substituindo o thunk por uma generator e exportando uma saga responsável por gerenciar os side-effects deste módulo:

````JavaScript
import api from axios;
import { call, put, takeLatest } from 'redux-saga/effects';

...

/** ********************************
 * ACTIONS
 ******************************** */

const requestPattern = { REQUEST: undefined, SUCCESS: undefined, FAILURE: undefined };

export const actions = createActions({
  cards: {
    FETCH_CARDS: requestPattern,
  },
});

export const { cards } = actions;

/** ********************************
 * REDUCER
 ******************************** */

...

/** ********************************
 * (SAGA)
 ******************************** */

function* fetchCards(action) {
  try {
    let response;
    if (action.payload) {
      response = yield call(api.get, `/cards?name=${action.payload}`);
    } else {
      response = yield call(api.get, '/cards');
    }
    yield put(cards.fetchCards.success(response.data.cards));
  } catch (error) {
    yield put(cards.fetchCards.failure(error));
  }
}

export function* saga() {
  yield takeLatest(cards.fetchCards.request, fetchCards);
}

...
````

Não vamos entrar a fundo no conceito de generator, mas de forma resumida, a instrução `yield` nos permite pausar a função e tornar o valor acessível até que a execução seja resumida.

Os métodos `call`, `put` e `takeLatest` são alguns dos effects do redux-saga:

1. `call`: este effect recebe uma função, seus argumentos, e então repassa ao middleware que posteriormente executa a chamada e resume o generator devolvendo o resultado.
2. `put`: é o dispatch da biblioteca, usado para enviar as actions ao reducer.
3. `takeLatest`: quando uma action específica é disparada mais de uma vez, se a anterior não estiver finalizada, é cancelada e então apenas a última é considerada.

Na nossa aplicação só temos uma saga, porém se tivessemos outras, poderiamos concentrar todas em um arquivo `src\store\sagas.js` usando o effect `fork`, que não bloqueia/pausa a execução:

````JavaScript
import { fork } from 'redux-saga/effects';
import { saga as cardSaga } from './ducks/cards';

export default function* rootSaga() {
  yield fork(cardSaga);
}
````

Agora precisamos configurar o novo middleware no store. Voltando ao arquivo `src\store\index.js`, importamos a root-saga: 

````JavaScript
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer as cardsReducer } from './ducks/cards';

import sagas from './sagas';

// Cria o nosso saga middleware.
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  cardsReducer,
  applyMiddleware(sagaMiddleware),
);

// Inicia a execução das sagas
sagaMiddleware.run(sagas);

export default store;
````

Não precisamos alterar nosso componente que deve continuar funcionando.

O commit https://github.com/luizeboli/Pokemon-TCG-Api/commit/3547fff41032cd771953d5a878879c583a23504d contém o código completo desta etapa.'

## Imutabilidade com ImmutableJS no Redux

A imutabilidade é um requisito do redux e a maioria dos problemas que podem ocorrer por termos objetos mutáveis se dá pelo shallow check que o react-redux executa para determinar se um componente deve ser renderizado.

Quando alteramos o estado, o shallow check usado pelo connect do react-redux verifica se o estado anterior e o novo apontam para a mesma referência, se forem o mesmo objeto a renderização não acontece.

Um outro detalhe é que o plugin Redux DevTools, que nos possibilita debugar a aplicação em uma ordem cronológica, espera que navegar entre as actions não altere nada mais além do estado. Efeitos colaterais como objetos mutáveis podem causar comportamentos distintos ao repetir as actions.

O ImmutableJS possui várias estruturas de objetos imutáveis para encapsular o estado (List, Map, Set, etc...), além de diversos métodos para manipulação, incluindo ordenação, filtros e agrupamento dos dados.

Para utilizar a biblioteca precisamos alterar o objeto do estado inicial, o reducer e o `mapStateToProps` do componente.

No arquivo `src\store\ducks\cards.js`:

````JavaScript
import { fromJS } from 'immutable';

/** ********************************
 * STATE
 ******************************** */
const INITIAL_STATE = fromJS({
  cards: [],
  loading: false,
  error: false,
});

...

/** ********************************
 * REDUCER
 ******************************** */

export const reducer = handleActions({
  [cards.fetchCards.request](state) {
    return state
      .set('loading', true)
      .set('error', false);
  },
  [cards.fetchCards.success](state, { payload }) {
    return state
      .set('cards', payload)
      .set('loading', false)
      .set('error', false);
  },
  [cards.fetchCards.failure](state) {
    return state
      .set('cards', [])
      .set('loading', false)
      .set('error', true);
  },
}, INITIAL_STATE);
````

O método `fromJS` converte objetos para a estrutura Map e arrays para List, em seguida devemos alterar o reducer para usar o método `set`, pois para manipular o estado agora precisamos usar os métodos do immutable. O primeiro parâmetro é a key do objeto que queremos alterar e o segundo é o valor.

Precisamos alterar também o `mapStateToProps` no componente. Devemos usar o método `get` para obter o valor baseado na key do objeto.

````JavaScript
const mapStateToProps = (state) => ({
  loading: state.get('loading'),
  error: state.get('error'),
  cards: state.get('cards'),
});

...
````

Com essas alterações temos a garantia da imutabilidade para o estado, prevenindo erros e garantindo performance.

O código completo deste passo está no commit https://github.com/luizeboli/Pokemon-TCG-Api/commit/279a3c5e40c49b9223e9af3fb5389ccdb2626669 

## Adicionando selectors memoizados

Vamos alterar o nosso duck `src\store\ducks\cards.js` para incluir os selectors:

````JavaScript
import { createSelector } from 'reselect';

/** ********************************
 * SELECTORS
 ******************************** */

export const makeSelectCards = createSelector((state) => state.get('cards'), (substate) => substate.toJS());
export const makeSelectLoading = createSelector((state) => state.get('loading'), (bool) => bool);
export const makeSelectError = createSelector((state) => state.get('error'), (bool) => bool);

````

O método `createSelector` recebe como primeiro argumento o selector e o segundo é o resultado da expressão.

Devemos alterar também o `mapStateToProps` do componente para usar o novo selector:

````JavaScript
... 

// Precisamos importar os selectors criados
import { makeSelectLoading, makeSelectCards, makeSelectError } from './store/ducks/cards';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading,
  error: makeSelectError,
  cards: makeSelectCards,
});	});

...
````

A função `createStructuredSelector` agrupa os selectors em um objeto único para ser repassado ao `connect` do react-redux.

# Material para estudo e referências

Nem todos os termos foram explicados, pois o objetivo era tornar compreensível o funcionamento e o fluxo de uma aplicação construída com ReactJS + Redux (e helpers), então, alguns detalhes e minúcias de algumas bibliotecas foram deixados de fora.

Abaixo estão todas as referências utilizadas para a construção deste documento:

- [Documentação ReactJS](https://reactjs.org/)
- [Documentação Arquitetura Flux](https://github.com/facebook/flux/tree/master/examples)
- [Documentação Redux](https://redux.js.org/)
- [Documentação React-Redux](https://react-redux.js.org/)
- [Documentação Redux-Thunk](https://github.com/reduxjs/redux-thunk)
- [Documentação Redux-Saga](https://redux-saga.js.org/docs/api/)
- [Documentação Redux-Actions](https://github.com/redux-utilities/redux-actions)
- [Documentação ImmutableJS](https://github.com/immutable-js/immutable-js)
- [Documentação Reselect](https://github.com/reduxjs/reselect)
- [FSA (Flux Standard Action)](https://github.com/redux-utilities/flux-standard-action)
- [Ducks Proposal](https://github.com/erikras/ducks-modular-redux)
- [Understanding Generators in ES6 Javascript with Examples](
https://codeburst.io/understanding-generators-in-es6-javascript-with-examples-6728834016d5)
- [Pros and Cons of Using Immutability with ReactJS](https://reactkungfu.com/2015/08/pros-and-cons-of-using-immutability-with-react-js/)
- [What's a Redux Selector](https://medium.com/@matthew.holman/what-is-a-redux-selector-a517acee1fe8)

Algumas sugestões de conteúdo nacional:

- Rocketseat: [blog](https://blog.rocketseat.com.br/) ou [youtube](https://www.youtube.com/channel/UCSfwM5u0Kce6Cce8_S72olg)
- Front-end Brasil: [github](https://github.com/frontendbr)
- Fernando Daciuk: [twitter](https://twitter.com/fdaciuk) ou [site](https://blog.da2k.com.br/)
- Felipe Fialho: [blog](https://www.felipefialho.com/)

# Melhorias (TODO)

O foco da aplicação era demonstrar as bibliotecas do ecossistema flux/redux, logo algumas features não foram implementadas. Existem melhorias e correções que podem ser desenvolvidas para aprimorar a experiência de uso.

- [ ] Paginação;
- [ ] Ajustar interpretação de request direto pela url;
- [ ] Implementar página 404;
- [ ] Layout responsivo
