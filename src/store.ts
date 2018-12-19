import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

export interface State {
  accounts: Account[];
  sessionActive: Session;
}

export interface Account {
  id: number;
  name: string;
  username: string;
  password: string;
  picture: string;
}

export interface Session {
  id: number;
  date: Date;
}

Vue.use(Vuex);

export default new Vuex.Store<State>({
  state: {
    accounts: [
      {
        id: 1,
        name: 'Hamlet León',
        username: 'hamletleon',
        password: '1234',
        picture: 'https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/28168789_10204392445248682_9116415413895313881_n.jpg?_nc_cat=102&_nc_ht=scontent-mia3-2.xx&oh=ae9ffab7df8255205cb77e7829b647e6&oe=5CD74F2D',
      },
    ],
    sessionActive: { id: 0, date: new Date() },
  },
  getters: {
    getUserAccount: (state) => (username: string, password: string) => {
      return state.accounts.find((u) => u.username === username && u.password === password);
    },
    getUserLogged: (state) => {
      const id = state.sessionActive.id;
      return state.accounts.find((u) => u.id === id);
    },
  },
  mutations: {
    saveSession(state, id: number) {
      state.sessionActive = { id, date: new Date() };
    },
    logoutSession(state) {
      state.sessionActive = { id: 0, date: new Date() };
    },
  },
  actions: {

  },
  plugins: [(new VuexPersistence()).plugin],
});
