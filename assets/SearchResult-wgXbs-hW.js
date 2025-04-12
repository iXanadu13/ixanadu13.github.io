import{u as W,h as se,i as te,j as O,k as le,l as ae,t as ie,m as re,n as A,p as x,q as oe,w as P,v as t,x as ue,R as _,y as ne,z as ce,A as me,B as pe,C as ve,D as he,E as ye,F as de,G as ge,H as E,I as fe,J as we,K as He,L as T,M as I,N as ke}from"./app-HVFzGXrj.js";const qe=["/","/intro.html","/posts/compiler_principle.html","/posts/ensp-win11.html","/posts/git.html","/posts/install-rabbitmq.html","/posts/linux-cmd.html","/posts/nodejs.html","/posts/tsconfig-json-error.html","/posts/vmware-macOS.html","/posts/yapi.html","/posts/algo/longestPalindrome.html","/posts/algo/sieve.html","/posts/algo/sort.html","/posts/database/mysql-devide.html","/posts/cpp/c-union.html","/posts/cpp/compile-time-obf.html","/posts/cpp/meta-program.html","/posts/cpp/priority_queue.html","/posts/hdoj/1010.html","/posts/hdoj/1028.html","/posts/hdoj/1213.html","/posts/java/log-in-java.html","/posts/rust/difficulties.html","/posts/rust/tricks.html","/posts/wsl/WSL-memo.html","/posts/wsl/docker-in-WSL.html","/posts/wsl/kali-linux-in-WSL.html","/posts/wsl/kali-wsl-autostart.html","/posts/wsl/ssh-in-WSL.html","/404.html","/posts/","/posts/algo/","/posts/database/","/posts/cpp/","/posts/hdoj/","/posts/java/","/posts/rust/","/posts/wsl/","/category/","/category/compiler-principle/","/category/ensp/","/category/git/","/category/rabbitmq/","/category/linux/","/category/nodejs/","/category/vscode/","/category/%E8%99%9A%E6%8B%9F%E6%9C%BA/","/category/yapi/","/category/luogu/","/category/mysql/","/category/c/","/category/c__/","/category/hdoj/","/category/java/","/category/rust/","/category/wsl/","/tag/","/tag/ensp/","/tag/win11/","/tag/virtualbox/","/tag/git/","/tag/wsl/","/tag/linux/","/tag/vmware/","/tag/algorithm/","/tag/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92/","/tag/cpp/","/tag/c/","/tag/c__/","/tag/metaprogramming/","/tag/string-obfuscation/","/tag/bfs/","/tag/dfs/","/tag/%E6%AF%8D%E5%87%BD%E6%95%B0/","/tag/%E5%B9%B6%E6%9F%A5%E9%9B%86/","/tag/log/","/tag/data-structure/","/tag/armoury-crate/","/article/","/star/","/timeline/"],xe="SLIMSEARCH_QUERY_HISTORY",d=W(xe,[]),Ee=()=>{const{queryHistoryCount:l}=E,a=l>0;return{enabled:a,queryHistories:d,addQueryHistory:i=>{a&&(d.value=Array.from(new Set([i,...d.value.slice(0,l-1)])))},removeQueryHistory:i=>{d.value=[...d.value.slice(0,i),...d.value.slice(i+1)]}}},D=l=>qe[l.id]+("anchor"in l?`#${l.anchor}`:""),Re="SLIMSEARCH_RESULT_HISTORY",{resultHistoryCount:M}=E,g=W(Re,[]),Se=()=>{const l=M>0;return{enabled:l,resultHistories:g,addResultHistory:a=>{if(l){const i={link:D(a),display:a.display};"header"in a&&(i.header=a.header),g.value=[i,...g.value.slice(0,M-1)]}},removeResultHistory:a=>{g.value=[...g.value.slice(0,a),...g.value.slice(a+1)]}}},be=l=>{const a=pe(),i=O(),R=ve(),o=A(0),w=x(()=>o.value>0),h=he([]);return ye(()=>{const{search:y,terminate:S}=de(),f=ge(n=>{const{resultsFilter:H=u=>u,querySplitter:$,suggestionsFilter:b,...L}=a.value;n?(o.value+=1,y(n,i.value,L).then(u=>H(u,n,i.value,R.value)).then(u=>{o.value-=1,h.value=u}).catch(u=>{console.warn(u),o.value-=1,o.value||(h.value=[])})):h.value=[]},E.searchDelay-E.suggestDelay,{maxWait:5e3});P([l,i],([n])=>{f(n.join(" "))},{immediate:!0}),fe(()=>{S()})}),{isSearching:w,results:h}};var Qe=se({name:"SearchResult",props:{queries:{type:Array,required:!0},isFocusing:Boolean},emits:["close","updateQuery"],setup(l,{emit:a}){const i=te(),R=O(),o=le(ae),{enabled:w,addQueryHistory:h,queryHistories:y,removeQueryHistory:S}=Ee(),{enabled:f,resultHistories:n,addResultHistory:H,removeResultHistory:$}=Se(),b=w||f,L=ie(l,"queries"),{results:u,isSearching:U}=be(L),r=re({isQuery:!0,index:0}),p=A(0),v=A(0),F=x(()=>b&&(y.value.length>0||n.value.length>0)),Q=x(()=>u.value.length>0),j=x(()=>u.value[p.value]||null),Y=()=>{const{isQuery:e,index:s}=r;s===0?(r.isQuery=!e,r.index=e?n.value.length-1:y.value.length-1):r.index=s-1},z=()=>{const{isQuery:e,index:s}=r;s===(e?y.value.length-1:n.value.length-1)?(r.isQuery=!e,r.index=0):r.index=s+1},G=()=>{p.value=p.value>0?p.value-1:u.value.length-1,v.value=j.value.contents.length-1},J=()=>{p.value=p.value<u.value.length-1?p.value+1:0,v.value=0},K=()=>{v.value<j.value.contents.length-1?v.value+=1:J()},N=()=>{v.value>0?v.value-=1:G()},C=e=>e.map(s=>ke(s)?s:t(s[0],s[1])),V=e=>{if(e.type==="customField"){const s=we[e.index]||"$content",[c,q=""]=He(s)?s[R.value].split("$content"):s.split("$content");return e.display.map(m=>t("div",C([c,...m,q])))}return e.display.map(s=>t("div",C(s)))},k=()=>{p.value=0,v.value=0,a("updateQuery",""),a("close")},X=()=>w?t("ul",{class:"slimsearch-result-list"},t("li",{class:"slimsearch-result-list-item"},[t("div",{class:"slimsearch-result-title"},o.value.queryHistory),y.value.map((e,s)=>t("div",{class:["slimsearch-result-item",{active:r.isQuery&&r.index===s}],onClick:()=>{a("updateQuery",e)}},[t(T,{class:"slimsearch-result-type"}),t("div",{class:"slimsearch-result-content"},e),t("button",{class:"slimsearch-remove-icon",innerHTML:I,onClick:c=>{c.preventDefault(),c.stopPropagation(),S(s)}})]))])):null,Z=()=>f?t("ul",{class:"slimsearch-result-list"},t("li",{class:"slimsearch-result-list-item"},[t("div",{class:"slimsearch-result-title"},o.value.resultHistory),n.value.map((e,s)=>t(_,{to:e.link,class:["slimsearch-result-item",{active:!r.isQuery&&r.index===s}],onClick:()=>{k()}},()=>[t(T,{class:"slimsearch-result-type"}),t("div",{class:"slimsearch-result-content"},[e.header?t("div",{class:"content-header"},e.header):null,t("div",e.display.map(c=>C(c)).flat())]),t("button",{class:"slimsearch-remove-icon",innerHTML:I,onClick:c=>{c.preventDefault(),c.stopPropagation(),$(s)}})]))])):null;return oe("keydown",e=>{if(l.isFocusing){if(Q.value){if(e.key==="ArrowUp")N();else if(e.key==="ArrowDown")K();else if(e.key==="Enter"){const s=j.value.contents[v.value];h(l.queries.join(" ")),H(s),i.push(D(s)),k()}}else if(f){if(e.key==="ArrowUp")Y();else if(e.key==="ArrowDown")z();else if(e.key==="Enter"){const{index:s}=r;r.isQuery?(a("updateQuery",y.value[s]),e.preventDefault()):(i.push(n.value[s].link),k())}}}}),P([p,v],()=>{var e;(e=document.querySelector(".slimsearch-result-list-item.active .slimsearch-result-item.active"))==null||e.scrollIntoView(!1)},{flush:"post"}),()=>t("div",{class:["slimsearch-result-wrapper",{empty:l.queries.length?!Q.value:!F.value}],id:"slimsearch-results"},l.queries.length?U.value?t(ue,{hint:o.value.searching}):Q.value?t("ul",{class:"slimsearch-result-list"},u.value.map(({title:e,contents:s},c)=>{const q=p.value===c;return t("li",{class:["slimsearch-result-list-item",{active:q}]},[t("div",{class:"slimsearch-result-title"},e||o.value.defaultTitle),s.map((m,ee)=>{const B=q&&v.value===ee;return t(_,{to:D(m),class:["slimsearch-result-item",{active:B,"aria-selected":B}],onClick:()=>{h(l.queries.join(" ")),H(m),k()}},()=>[m.type==="text"?null:t(m.type==="title"?ne:m.type==="heading"?ce:me,{class:"slimsearch-result-type"}),t("div",{class:"slimsearch-result-content"},[m.type==="text"&&m.header?t("div",{class:"content-header"},m.header):null,t("div",V(m))])])})])})):o.value.emptyResult:b?F.value?[X(),Z()]:o.value.emptyHistory:o.value.emptyResult)}});export{Qe as default};
