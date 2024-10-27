// useIsLoggedIn.js
import {
	useStore
} from 'vuex';

export function useIsLoggedIn() {
	const store = useStore();
	const checkLogin = () => {
		return new Promise((resolve, reject) => {
			const userInfo = store.state.userInfo;
			if (userInfo) {
				store.commit('updateUserInfo', userInfo)
				resolve(userInfo);
			} else {
				uni.navigateTo({
					url: "/pages/userinfo/login/login"
				}).catch(error => {
					reject(error);
				});
			}
		});
	};

	return {
		checkLogin
	};
}