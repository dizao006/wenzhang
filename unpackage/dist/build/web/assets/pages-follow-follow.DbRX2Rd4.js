import{o as a,c as s,b as t,d as l,e,F as o,f as u,g as r,t as i,q as c,i as n,S as d,m as f,r as _,$ as m,a as v,n as p,s as h,k as w,l as g}from"./index-DwdDHTgs.js";import{L}from"./ListItem.v-rBIgr1.js";import{a as b,_ as j,o as k,r as y}from"./uni-app.es.DtYEfKEf.js";import{u as I}from"./isLogin.D9YIoZAy.js";import"./listCard.D60NJvx5.js";import"./love.DrTljd9n.js";import"./uni-icons.DL8JbnSX.js";import"./uni-load-more.CK7k2JIr.js";const A=j({__name:"AuthorList",props:{authorList:Array},setup(f){const _=f;return(f,m)=>{const v=c,p=n,h=d;return a(),s(p,{class:"list-scroll-container"},{default:t((()=>[l(h,{"scroll-y":"true",class:"list-scroll"},{default:t((()=>[(a(!0),e(o,null,u(_.authorList,((e,o)=>(a(),s(p,{class:"author-card",key:e._id},{default:t((()=>[l(p,{class:"author-image-container"},{default:t((()=>[l(v,{src:e.avatar?e.avatar:"../../static/img/info.jpg",alt:""},null,8,["src"])])),_:2},1024),l(p,{class:"author-desc-container"},{default:t((()=>[l(p,{class:"author-info"},{default:t((()=>[r(i(e.author_name),1)])),_:2},1024),l(p,{class:"author-info-bottom"},{default:t((()=>[l(p,{class:"info-left"},{default:t((()=>[r(i(e.professional),1)])),_:2},1024),l(p,{class:"info-right"},{default:t((()=>[l(p,{class:"desc"},{default:t((()=>[r(" 发帖:"+i(e.article_ids.length),1)])),_:2},1024),l(p,{class:"desc"},{default:t((()=>[r(" 粉丝："+i(e.fans_count),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1})])),_:1})}}},[["__scopeId","data-v-b9b8639c"]]),C=j({__name:"follow",setup(e){const{checkLogin:o}=I(),u=f(),i=_([]),c=_(!0),d=_(!1),j=_(!1),C=_(0),x=_([]);async function F(){const a=await(s={userId:u.state.userInfo._id},b({name:"getArticFloow",data:s}));var s;0==a.length&&(d.value=!0),c.value=!1,i.value=a}async function M(){const a=await(s={userId:u.state.userInfo._id},b({name:"getAuthorLists",data:s}));var s;0==a.length&&(j.value=!0),x.value=a}return m("updateArticle",(()=>{F()})),m("updatefellow",(()=>{M()})),k((async()=>{await o(),await F(),await M()})),(e,o)=>{const u=n,f=y(v("ListItem"),L),_=w,m=g;return a(),s(u,{class:"follow-container"},{default:t((()=>[l(u,{class:"follow-tab"},{default:t((()=>[l(u,{class:"follow-tab-box"},{default:t((()=>[l(u,{class:p(["follow-tab-item",{active:0===C.value}]),onClick:o[0]||(o[0]=a=>C.value=0)},{default:t((()=>[r("文章")])),_:1},8,["class"]),l(u,{class:p(["follow-tab-item",{active:1===C.value}]),onClick:o[1]||(o[1]=a=>C.value=1)},{default:t((()=>[r("作者")])),_:1},8,["class"])])),_:1})])),_:1}),l(u,{class:"follow-list-container"},{default:t((()=>[l(m,{class:"follow-list-swiper",current:C.value,onChange:o[2]||(o[2]=a=>C.value=a.detail.current)},{default:t((()=>[l(_,null,{default:t((()=>[i.value.length?(a(),s(f,{key:0,isLoadMore:c.value,articleList:i.value},null,8,["isLoadMore","articleList"])):h("",!0),d.value?(a(),s(u,{key:1,class:"no-data"},{default:t((()=>[r("暂无收藏的文章")])),_:1})):h("",!0)])),_:1}),l(_,null,{default:t((()=>[l(A,{authorList:x.value},null,8,["authorList"]),j.value?(a(),s(u,{key:0,class:"no-data"},{default:t((()=>[r("暂无收藏的文章")])),_:1})):h("",!0)])),_:1})])),_:1},8,["current"])])),_:1})])),_:1})}}},[["__scopeId","data-v-c77b60d3"]]);export{C as default};