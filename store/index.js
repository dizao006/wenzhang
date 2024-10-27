import {
	createStore
} from 'vuex';
import mutations from './mutations.js';
import actions from './actions.js';
import state from './state.js';

export default createStore({
	state,
	mutations,
	actions
});