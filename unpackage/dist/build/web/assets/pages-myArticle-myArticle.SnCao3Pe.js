import{m as a,r as s,c as t,b as e,i as o,o as i,e as r,f as n,F as l,g as u,s as m}from"./index-vCkMVs31.js";import{l as p}from"./listCard.n-MBBEQ8.js";import{o as c}from"./uni-app.es.CgFsQHgy.js";import{u as d}from"./isLogin.NjHcPaSZ.js";import{a as f}from"./http.1boYmU1a.js";import{_}from"./_plugin-vue_export-helper.BCo6x5W8.js";import"./love.BWBFgmRW.js";import"./uni-icons.Da4HOIOP.js";const j=_({__name:"myArticle",setup(_){const{checkLogin:j}=d(),v=a(),g=s({}),y=s(!1);return c((async()=>{await j(),await async function(){const a=await(s={userId:v.state.userInfo._id},f({name:"getArticleMyList",data:s}));var s;g.value=a,a.length>0&&(y.value=!0)}()})),(a,s)=>{const c=o;return i(),t(c,null,{default:e((()=>[(i(!0),r(l,null,n(g.value,(a=>(i(),t(p,{list:a,key:a._id},null,8,["list"])))),128)),y.value?(i(),t(c,{key:0,class:"no-data"},{default:e((()=>[u("暂无发布的文章")])),_:1})):m("",!0)])),_:1})}}},[["__scopeId","data-v-cc11aba6"]]);export{j as default};