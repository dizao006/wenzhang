import{r as a,m as s,c as e,b as t,i as l,o as i,d as r,g as o,u as c,e as n,f as u,F as d,y as h,t as m}from"./index-DwdDHTgs.js";import{N as f}from"./NavBar.g0XsGZiw.js";import{L as v}from"./ListItem.v-rBIgr1.js";import{a as _,_ as y}from"./uni-app.es.DtYEfKEf.js";import"./uni-icons.DL8JbnSX.js";import"./listCard.D60NJvx5.js";import"./love.DrTljd9n.js";import"./isLogin.D9YIoZAy.js";import"./uni-load-more.CK7k2JIr.js";const p=y({__name:"serch",setup(y){const p=a(!0),k=a(""),L=a([]),j=a(!1),g=a(!0),S=s();function C(){console.log(k.value,"asdasd"),S.commit("setHistoryList",k.value)}function V(a){k.value=a}async function x(){if(g.value=!1,!k.value)return g.value=!0,void(L.value=[]);const{articleList:a}=await(s={searchVal:k.value},_({name:"get_search_data",data:s}));var s;L.value=a}return(a,s)=>{const _=h,y=l;return i(),e(y,{class:"search-container"},{default:t((()=>[r(f,{isSearch:p.value,onSendSearchData:x,onUpdateValue:V,serchValue:k.value},null,8,["isSearch","serchValue"]),g.value?(i(),e(y,{key:0,class:"serch-history"},{default:t((()=>[r(y,{class:"serch-container"},{default:t((()=>[r(y,{class:"serach-header"},{default:t((()=>[r(_,{class:"history-text"},{default:t((()=>[o("搜索历史")])),_:1}),r(_,{class:"clear",onClick:s[0]||(s[0]=a=>c(S).commit("clearData"))},{default:t((()=>[o("清空")])),_:1})])),_:1})])),_:1}),c(S).state.historyList.length>0?(i(),e(y,{key:0,class:"serch-list"},{default:t((()=>[(i(!0),n(d,null,u(c(S).state.historyList,((a,s)=>(i(),e(y,{onClick:s=>(V(a),void x()),class:"history-content-item",key:a},{default:t((()=>[o(m(a),1)])),_:2},1032,["onClick"])))),128))])),_:1})):(i(),e(y,{key:1,class:"no-data"},{default:t((()=>[o(" 当前没有搜索历史 ")])),_:1}))])),_:1})):(i(),e(y,{key:1,class:"serach-list-container"},{default:t((()=>[L.value.length>=0?(i(),e(v,{key:0,articleList:L.value,saveSearchHistory:C,isLoadMore:j.value},null,8,["articleList","isLoadMore"])):(i(),e(y,{key:1,class:"no-data"},{default:t((()=>[o(" 没有搜索到数据 ")])),_:1}))])),_:1}))])),_:1})}}},[["__scopeId","data-v-39e2c910"]]);export{p as default};