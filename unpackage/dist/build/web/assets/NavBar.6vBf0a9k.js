import{z as a,r as e,A as s,a as t,o as r,c as l,b as n,d as u,B as c,u as o,s as i,g as p,C as h,D as d,E as f,h as m,i as y,I as _}from"./index-vCkMVs31.js";import{_ as v}from"./uni-icons.Da4HOIOP.js";import{r as g}from"./uni-app.es.CgFsQHgy.js";import{_ as x}from"./_plugin-vue_export-helper.BCo6x5W8.js";const b=x({__name:"NavBar",props:["isSearch","serchValue"],emits:["updateValue","sendSearchData"],setup(x,{emit:b}){const k=x,{isSearch:V,serchValue:B}=a(k);let S=b,j=e(20),C=e(0);function D(){S("sendSearchData",z)}const z=s({get:()=>B.value,set(a){S("updateValue",a),a||S("sendSearchData",a)}});function H(){h({url:"../../pages/index/index"}),d()}function I(){V.value||m({url:"/pages/serch/serch"})}return f().then((a=>{0!=a.statusBarHeight?j.value=2*a.statusBarHeight:j.value=20})),(a,e)=>{const s=g(t("uni-icons"),v),h=y,d=_;return r(),l(h,{class:"navBar"},{default:n((()=>[u(h,{class:"nav-bar-top"},{default:n((()=>[u(h,{style:c({height:o(j)+"rpx"})},{default:n((()=>[o(V)?(r(),l(h,{key:0,onClick:H,class:"return-icon",style:c({top:o(j)+"rpx"})},{default:n((()=>[u(s,{type:"back",size:"30",color:"#fff"})])),_:1},8,["style"])):i("",!0)])),_:1},8,["style"]),u(h,{onClick:I,class:"nav-bar-back",style:c({marginRight:o(C)+"rpx",marginLeft:o(V)?"20rpx":""})},{default:n((()=>[u(s,{type:"search",color:"$999",size:"30"}),o(V)?(r(),l(d,{key:1,type:"text",modelValue:z.value,"onUpdate:modelValue":e[0]||(e[0]=a=>z.value=a),class:"serch-input",placeholder:"输入文章标题进行搜索","confirm-type":"search",onConfirm:D},null,8,["modelValue"])):(r(),l(h,{key:0,class:"nav-bar-text"},{default:n((()=>[p(" 输入文章标题进行搜索 ")])),_:1}))])),_:1},8,["style"])])),_:1}),u(h,{style:c({height:o(j)+80+"rpx"})},null,8,["style"])])),_:1})}}},[["__scopeId","data-v-c8abf2aa"]]);export{b as N};