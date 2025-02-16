## set-userinfo 设置列表组件
> **组件名：set-userinfo**
> 
> 
> 
> 调用代码块： `<set-userinfo></set-userinfo>`

使用步骤：  
1、导入插件  
2、在需要调用的地方输入`<set-userinfo></set-userinfo>`  


```
<template>
	<view class="body">
		<set-userinfo></set-userinfo>

	</view>
</template>

<script>
	import setUserinfo from "../../components/set-userinfo/set-userinfo.vue"
	export default {
		components:{
			setUserinfo
		}
	}

</script>

<style lang="scss" scoped>
	
</style>
```