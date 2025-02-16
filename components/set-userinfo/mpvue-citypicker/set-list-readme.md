## mpvue-city-picker 设置列表组件
> **组件名：mpvue-city-picker**
> 
> 图标已经集成到组件里面，不需要另外设置。
> 
> 调用代码块： `<mpvue-city-picker ></mpvue-city-picker>`

使用步骤：  
1、导入插件  
2、在需要调用的地方输入`<mpvue-city-picker theme-color="#007aff" ref="mpvueCityPicker" :picker-value-default="pickerValueDefault" @onConfirm="onConfirm"></mpvue-city-picker>`  
3、复制下面代码块到调用页面，pickerValueDefault默认地址。


```
<template>
	<view >
		<view >{{pickerText}}</view>
		<button type="default"@click="openPicker">点击选择地址</button>
		<mpvue-city-picker theme-color="#007aff" ref="mpvueCityPicker" :picker-value-default="pickerValueDefault" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from "../../components/mpvue-citypicker/mpvueCityPicker.vue"
	export default {
		components:{
			mpvueCityPicker
		},
		data(){
			return {
					pickerValueDefault:[0,2,1],
					pickerText:"北京市-市辖区-西城区",
			}
		},
		methods:{
			onConfirm(e){
				this.pickerText=JSON.stringify(e.label)
				console.log(this.pickerText);
			},
			openPicker(){
				this.$refs.mpvueCityPicker.show()
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>		
```