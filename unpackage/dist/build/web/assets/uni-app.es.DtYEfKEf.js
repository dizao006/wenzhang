import{a6 as a,Y as s,a7 as t,x as n,a8 as e,a9 as o,aa as c,ab as r,ac as i}from"./index-DwdDHTgs.js";const m=({name:e,data:o={}})=>new Promise(((c,r)=>{a({title:"加载中..."}),s.callFunction({name:e,data:o,success({result:a}){t(),0===a.code?c(a.data):(n({icon:"none",title:a.msg||"未知错误"}),r(new Error(a.msg||"未知错误")))},fail(a){t(),n({icon:"none",title:a.message||"请求失败"}),r(a)}})})),l=(a,s)=>{const t=a.__vccOpts||a;for(const[n,e]of s)t[n]=e;return t};function f(a,s){return"string"==typeof a?s:a}const u=a=>(s,t=c())=>{!e&&o(a,s,t)},d=u(r),g=u(i);export{l as _,m as a,g as b,d as o,f as r};