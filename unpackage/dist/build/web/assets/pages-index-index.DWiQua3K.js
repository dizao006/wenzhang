import{N as a}from"./NavBar.6vBf0a9k.js";import{r as e,w as t,a as i,o as s,c as n,b as l,d as c,u as o,e as r,F as u,f as d,n as v,g as m,t as p,h as x,i as I,S as f,j as g,k as _,l as L,m as h,p as b}from"./index-vCkMVs31.js";import{r as j,o as w}from"./uni-app.es.CgFsQHgy.js";import{_ as y}from"./uni-icons.Da4HOIOP.js";import{u as k}from"./isLogin.NjHcPaSZ.js";import{_ as C}from"./_plugin-vue_export-helper.BCo6x5W8.js";import{L as B}from"./ListItem.CCoqZfW1.js";import{g as N,a as S}from"./home.B72pI0rK.js";import"./listCard.n-MBBEQ8.js";import"./love.BWBFgmRW.js";import"./http.1boYmU1a.js";import"./uni-load-more.BY3nG2Si.js";const A=C({__name:"TabBar",props:["activeIndex","labeList"],emits:["changeIndex"],setup(a,{emit:g}){let _=a,L=g,h=e("item0");const{checkLogin:b}=k();async function w(){await b(),x({url:"/pages/abelAdmin/abelAdmin"})}return t((()=>_.activeIndex),(a=>{h.value=`item${a}`})),(e,t)=>{const x=I,g=f,_=j(i("uni-icons"),y);return s(),n(x,{class:"tabBar"},{default:l((()=>[c(g,{"scroll-x":"true",class:"tabScroll","show-scrollbar":!1,"scroll-with-animation":!0,"scroll-into-view":o(h)},{default:l((()=>[c(x,{class:"box"},{default:l((()=>[(s(!0),r(u,null,d(a.labeList,((e,t)=>(s(),n(x,{onClick:a=>function(a){L("changeIndex",a)}(t),class:v([{active:a.activeIndex==t},"tab-item"]),key:e._id,id:`item${t}`},{default:l((()=>[m(p(e.name),1)])),_:2},1032,["onClick","class","id"])))),128))])),_:1})])),_:1},8,["scroll-into-view"]),c(x,{class:"icons"},{default:l((()=>[c(_,{type:"gear",size:"26",color:"#666",onClick:w})])),_:1})])),_:1})}}},[["__scopeId","data-v-772c18be"]]),M=C({__name:"ArticleList",props:["artList","activeIndex"],emits:["changeIndex"],setup(a,{emit:v}){let m=a,p=v,x=e({}),I=e({}),f=e();e(1);let h=e(6);function b(a){const e=a.detail.current;p("changeIndex",e)}async function w(a){I.value[m.activeIndex]||(I.value[m.activeIndex]={page:1,loading:"loading,",total:0});let{articleList:e,total:t}=await N({classify:a.name,page:I.value[m.activeIndex].page,pageSize:h.value}),i=x.value[m.activeIndex]||[];JSON.stringify(e)!==JSON.stringify(i)&&i.push(...e),x.value[m.activeIndex]=i,I.value[m.activeIndex].total=t}function y(){if(I.value[m.activeIndex].total===x.value[m.activeIndex].length)return I.value[m.activeIndex]={...I.value[m.activeIndex],loading:"noMore"},void g();I.value[m.activeIndex].page++,w(f.value)}return t([()=>m.artList,()=>m.activeIndex],(a=>{f.value=a[0][a[1]],w(f.value)}),{immediate:!0}),(a,e)=>{const t=j(i("ListItem"),B),v=_,p=L;return s(),n(p,{class:"swiper-container",current:o(m).activeIndex,onChange:b},{default:l((()=>[(s(!0),r(u,null,d(o(m).artList,(a=>(s(),n(v,{class:"swiper-item",key:a._id},{default:l((()=>[c(t,{loadData:o(I)[o(m).activeIndex],onLoadMore:y,articleList:o(x)[o(m).activeIndex],isLoadMore:!1},null,8,["loadData","articleList"])])),_:2},1024)))),128))])),_:1},8,["current"])}}},[["__scopeId","data-v-36cd0cdc"]]),z=C({__name:"index",setup(r){let u=e(0);const d=h(),v=e();function m(a){u.value=a}const p=e(),{checkLogin:x}=k();return w((async()=>{await x()})),b((async()=>{p.value=await S(),p.value=[{name:"全部"},...p.value],d.commit("setlabelList",p.value)})),t((()=>d.state.labelListItem),((a,e)=>{v.value=[{name:"全部"},...a]}),{immediate:!0,deep:!0}),(e,t)=>{const r=j(i("NavBar"),a),d=j(i("TabBar"),A),x=j(i("ArticleList"),M),f=I;return s(),n(f,{class:"container"},{default:l((()=>[c(r),c(d,{labeList:v.value.length>1?v.value:p.value,activeIndex:o(u),onChangeIndex:m},null,8,["labeList","activeIndex"]),c(x,{artList:v.value.length>1?v.value:p.value,activeIndex:o(u),class:"list-container",onChangeIndex:m},null,8,["artList","activeIndex"])])),_:1})}}},[["__scopeId","data-v-0b00c12e"]]);export{z as default};