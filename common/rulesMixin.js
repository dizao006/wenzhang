export default {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					userRules: {
						loginName: {
							rules: [{
								require: true,
								'errorMessage': '账户名不能为空'
							}]
						}
					}
				}
			},
			methods: {
				testFn() {
					return 'test'
				}
			}
		})
	}
}