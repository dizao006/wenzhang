import{a as t,o as s,c as l,b as e,u as a,d as i,g as c,t as o,s as d,e as r,F as u,f as n,h as _,q as m,i as f,y as p}from"./index-vCkMVs31.js";import{_ as y}from"./love.BWBFgmRW.js";import{r as g}from"./uni-app.es.CgFsQHgy.js";import{_ as b}from"./_plugin-vue_export-helper.BCo6x5W8.js";const v=b({__name:"listCard",props:["list"],emits:["saveSearchHistory"],setup(b,{emit:v}){let h=b;const k=v;async function I(){const{_id:t,title:s,author:l,create_time:e,thumbs_up_count:a,browse_count:i}=h.list,c={_id:t,title:s,author:l,create_time:e,thumbs_up_count:a,browse_count:i};k("saveSearchHistory"),_({url:`/pages/articleDetail/articleDetail?options=${JSON.stringify(c)}`})}return(_,b)=>{const v=m,k=f,j=p,w=g(t("love"),y);return s(),l(k,null,{default:e((()=>["base"===a(h).list.mode?(s(),l(k,{key:0,class:"list-card",onClick:I},{default:e((()=>[i(k,{class:"list-card-img"},{default:e((()=>[i(v,{src:a(h).list.cover[0]?a(h).list.cover[0]:"/static/img/logo.jpeg",mode:"aspectFill"},null,8,["src"])])),_:1}),i(k,{class:"list-card-content"},{default:e((()=>[i(k,{class:"list-card-content-title"},{default:e((()=>[i(j,null,{default:e((()=>[c(o(a(h).list.title),1)])),_:1}),i(w,{itemId:a(h).list._id},null,8,["itemId"])])),_:1}),i(k,{class:"list-card-content-desc"},{default:e((()=>[i(k,{class:"article-type"},{default:e((()=>[c(o(a(h).list.classify),1)])),_:1}),i(k,{class:"count"},{default:e((()=>[c(" 浏览量："+o(a(h).list.browse_count),1)])),_:1})])),_:1})])),_:1})])),_:1})):d("",!0),"column"===a(h).list.mode?(s(),l(k,{key:1,onClick:I,class:"list-card model-column"},{default:e((()=>[i(k,{class:"list-card-top"},{default:e((()=>[i(j,null,{default:e((()=>[c(o(a(h).list.title),1)])),_:1}),i(w,{itemId:a(h).list._id},null,8,["itemId"])])),_:1}),i(k,{class:"list-card-middle"},{default:e((()=>[(s(!0),r(u,null,n(a(h).list.cover.slice(0,3),((t,a)=>(s(),l(k,{class:"image-container",key:a},{default:e((()=>[i(v,{src:t,mode:"aspectFill"},null,8,["src"])])),_:2},1024)))),128))])),_:1}),i(k,{class:"list-card-content-desc list-card-bottom"},{default:e((()=>[i(k,{class:"article-type"},{default:e((()=>[c(o(a(h).list.classify),1)])),_:1}),i(k,{class:"count"},{default:e((()=>[c(" 浏览量："+o(a(h).list.browse_count),1)])),_:1})])),_:1})])),_:1})):d("",!0),"image"===a(h).list.mode?(s(),l(k,{key:2,onClick:I,class:"list-card model-image"},{default:e((()=>[i(k,{class:"list-card-top"},{default:e((()=>[i(k,{class:"image-container"},{default:e((()=>[i(v,{src:a(h).list.cover[0],mode:"aspectFill"},null,8,["src"])])),_:1})])),_:1}),i(k,{class:"list-card-middle"},{default:e((()=>[i(j,null,{default:e((()=>[c(o(a(h).list.title),1)])),_:1}),i(w,{itemId:a(h).list._id},null,8,["itemId"])])),_:1}),i(k,{class:"list-card-content-desc list-card-bottom"},{default:e((()=>[i(k,{class:"article-type"},{default:e((()=>[c(o(a(h).list.classify),1)])),_:1}),i(k,{class:"count"},{default:e((()=>[c(" 浏览量："+o(a(h).list.browse_count),1)])),_:1})])),_:1})])),_:1})):d("",!0)])),_:1})}}},[["__scopeId","data-v-552cdcef"]]);export{v as l};