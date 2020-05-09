(this["webpackJsonpspotify-queue"]=this["webpackJsonpspotify-queue"]||[]).push([[0],[,function(e,t,n){"use strict";var r=n(12);n.d(t,"ROUTES",(function(){return r}));var a=n(20);n.d(t,"useAuth",(function(){return a.c})),n.d(t,"Auth",(function(){return a.a})),n.d(t,"AuthContext",(function(){return a.b}));var c=n(21);n.d(t,"useAPI",(function(){return c.c})),n.d(t,"APIContext",(function(){return c.b})),n.d(t,"API",(function(){return c.a}));var o=n(14);n.d(t,"validateRoomID",(function(){return o.f})),n.d(t,"Fetch",(function(){return o.a})),n.d(t,"tokenHasExpired",(function(){return o.e})),n.d(t,"getVotes",(function(){return o.b})),n.d(t,"setVote",(function(){return o.d})),n.d(t,"millisToMinutesAndSeconds",(function(){return o.c}));var u=n(16);n.d(t,"useDebouncedInput",(function(){return u.a})),n.d(t,"useSearch",(function(){return u.b})),n.d(t,"useWebSocket",(function(){return u.c}));var l=n(3);n.d(t,"AUTHORIZE_URL",(function(){return l.b})),n.d(t,"GET_QUEUE_URL",(function(){return l.c})),n.d(t,"HOST_URL",(function(){return l.d})),n.d(t,"VALIDATE_ROOM_URL",(function(){return l.u})),n.d(t,"SOCKET_URL",(function(){return l.j})),n.d(t,"SEARCH_URL",(function(){return l.i})),n.d(t,"REFRESH_TOKEN_URL",(function(){return l.f})),n.d(t,"REQUEST_TOKEN_URL",(function(){return l.h})),n.d(t,"SPOTIFY_USER_TOKEN",(function(){return l.t})),n.d(t,"ADD_TRACK_TO_QUEUE_URL",(function(){return l.a})),n.d(t,"REMOVE_TRACK_FROM_QUEUE_URL",(function(){return l.g})),n.d(t,"SPOTIFY_PLAYER_BASE_URL",(function(){return l.k})),n.d(t,"SPOTIFY_PLAYER_PLAY_URL",(function(){return l.o})),n.d(t,"SPOTIFY_PLAYER_NEXT_TRACK_URL",(function(){return l.m})),n.d(t,"SPOTIFY_PLAYER_PREVIOUS_TRACK_URL",(function(){return l.p})),n.d(t,"SPOTIFY_PLAYER_PAUSE_URL",(function(){return l.n})),n.d(t,"SPOTIFY_PLAYER_SEEK_URL",(function(){return l.r})),n.d(t,"SPOTIFY_PLAYER_RECOMMENDATION_URL",(function(){return l.q})),n.d(t,"LAST_PLAYED_TRACK",(function(){return l.e})),n.d(t,"SPOTIFY_PLAYER_GET_DEVICES_URL",(function(){return l.l})),n.d(t,"SPOTIFY_PLAYER_SET_DEVICE_URL",(function(){return l.s}));n(28)},,function(e,t,n){"use strict";n.d(t,"j",(function(){return a})),n.d(t,"d",(function(){return c})),n.d(t,"i",(function(){return o})),n.d(t,"u",(function(){return u})),n.d(t,"b",(function(){return l})),n.d(t,"h",(function(){return i})),n.d(t,"f",(function(){return s})),n.d(t,"c",(function(){return d})),n.d(t,"a",(function(){return m})),n.d(t,"g",(function(){return f})),n.d(t,"q",(function(){return E})),n.d(t,"k",(function(){return h})),n.d(t,"o",(function(){return v})),n.d(t,"n",(function(){return p})),n.d(t,"m",(function(){return b})),n.d(t,"p",(function(){return g})),n.d(t,"r",(function(){return k})),n.d(t,"l",(function(){return O})),n.d(t,"s",(function(){return S})),n.d(t,"t",(function(){return _})),n.d(t,"v",(function(){return T})),n.d(t,"e",(function(){return y})),console.log(Object({NODE_ENV:"production",PUBLIC_URL:"",REACT_APP_BASE_URL:"https://queue-rocks.herokuapp.com/",REACT_APP_WS_URL:"ws://queue-rocks.herokuapp.com"}));var r="https://queue-rocks.herokuapp.com/",a="ws://queue-rocks.herokuapp.com",c=r+"host",o=r+"search",u=r+"validate",l=r+"authorize",i=r+"token",s=r+"refresh",d=r+"get-queue",m=r+"add-to-queue",f=r+"remove-from-queue",E="https://api.spotify.com/v1/recommendations",h="https://api.spotify.com/v1/me/player",v=h+"/play",p=h+"/pause",b=h+"/next",g=h+"/previous",k=h+"/seek",O=h+"/devices",S=h,_="spotify_user_token",T="votes",y="last_played_track"},,,,,,,,,function(e,t,n){"use strict";n.r(t),n.d(t,"START",(function(){return r})),n.d(t,"ROOM",(function(){return a})),n.d(t,"LOGIN",(function(){return c})),n.d(t,"HOST",(function(){return o})),n.d(t,"REDIRECT",(function(){return u}));var r="/",a="/room/:id",c="/login",o="/host/:id",u="/redirect"},,function(e,t,n){"use strict";n.d(t,"f",(function(){return o})),n.d(t,"e",(function(){return u})),n.d(t,"a",(function(){return l})),n.d(t,"d",(function(){return s})),n.d(t,"b",(function(){return d})),n.d(t,"c",(function(){return f}));var r=n(4),a=n.n(r),c=n(3),o=function(e){return 6===e.length&&!e.includes(" ")},u=function(e){return e.expires_on<Date.now()},l=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",n=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0;return fetch(e,{signal:r,method:t,credentials:"include",headers:{"Content-Type":"application/json"},body:n?JSON.stringify(n):void 0}).then(i).catch(console.error)};function i(e){return a.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if(200===e.status){t.next=2;break}throw new Error("Bad status = "+e.status);case 2:return t.next=4,a.a.awrap(e.json());case 4:return t.abrupt("return",t.sent);case 5:case"end":return t.stop()}}))}var s=function(e,t){var n=d();t?n.push(e):n=n.filter((function(t){return t!==e})),localStorage.setItem(c.v,JSON.stringify(n))},d=function(){var e=localStorage.getItem(c.v);return e?JSON.parse(e):(m(),[])},m=function(){localStorage.setItem(c.v,JSON.stringify([]))};function f(e){var t=Math.floor(e/6e4),n=Math.floor(e%6e4/1e3);return 60===n?"".concat(t+1,":00"):"".concat(t,":").concat((n<10?"0":"")+n)}},,function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return m})),n.d(t,"c",(function(){return f}));var r=n(13),a=n(4),c=n.n(a),o=n(2),u=n(0),l=n(34),i=n(11),s=n(1);var d=function(e,t){var n=Object(u.useState)(""),r=Object(o.a)(n,2),a=r[0],c=r[1],l=function(e,t){var n=Object(u.useState)(e),r=Object(o.a)(n,2),a=r[0],c=r[1];return Object(u.useEffect)((function(){var n=setTimeout((function(){c(e)}),t);return function(){clearTimeout(n)}}),[e,t]),a}(a,500);return Object(u.useEffect)((function(){l&&e(l)}),[l]),{input:a,setInput:c,handleInputChange:function(n){""===a&&n.target.value.length>0?e(n.target.value):0===n.target.value.length&&t(),c(n.target.value)}}},m=function(){var e=Object(u.useState)(""),t=Object(o.a)(e,2),n=t[0],r=t[1],a=Object(u.useState)(!1),i=Object(o.a)(a,2),d=i[0],m=i[1],f=Object(s.useAPI)();Object(u.useEffect)((function(){var e=function(e){"Escape"===e.key&&d&&m(!1)};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[d]);var E=Object(l.useAsyncAbortable)((function(e,t){return c.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:if(0!==t.length){n.next=4;break}return n.abrupt("return",[]);case 4:return n.abrupt("return",f.doSearchTrack(t,e));case 5:case"end":return n.stop()}}))}),[n]);return{searching:d,cancelSearch:function(){m(!1),E.reset()},searchUpdate:function(e){r(e),d||m(!0)},search:E}},f=function(e){var t=Object(s.useAPI)(),n=E(),r=Object(i.f)(),a=Object(u.useState)(1),c=Object(o.a)(a,2),l=c[0],d=c[1];return Object(u.useEffect)((function(){return t.doValidateRoomID(e).then((function(e){e?t.doGetQueue().then(n.setTracks):r.push("/not-found")})),function(){return t.doLeaveRoom()}}),[]),Object(u.useEffect)((function(){var r={setSubscribers:function(e){return d(e)},addTrackToQueue:n.addedToQueue,removeTrackFromQueue:n.removedFromQueue,vote:n.voted};t.doJoinRoom(e,r)}),[n.addedToQueue,n.removedFromQueue]),{subscribers:l,queue:n}},E=function(){var e=Object(u.useState)([]),t=Object(o.a)(e,2),n=t[0],a=t[1],c=function(){var e=Object(u.useState)([]),t=Object(o.a)(e,2),n=t[0],a=t[1];Object(u.useEffect)((function(){a(Object(s.getVotes)())}),[]);return{votes:n,setVotes:function(e,t){a(t?[].concat(Object(r.a)(n),[e]):n.filter((function(t){return t!==e}))),Object(s.setVote)(e,t)}}}(),l=c.votes,i=c.setVotes,d=Object(s.useAPI)();return{tracks:n.sort((function(e,t){return t.votes-e.votes})),addToQueue:function(e){d.doAddTrackToQueue(e.id).then((function(t){e.queue_id=t,a([].concat(Object(r.a)(n),[e])),i(t,!0)}))},addedToQueue:function(e){a([].concat(Object(r.a)(n),[e]))},removeFromQueue:function(e){d.doRemoveTrackFromQueue(e),a(n.filter((function(t){return t.queue_id!==e}))),i(e,!1)},removedFromQueue:function(e){console.log("Removing from queue:",e),a(n.filter((function(t){return t.queue_id!==e})))},vote:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];d.doVoteForTrack(e,t);var c=Object(r.a)(n),o=c.findIndex((function(t){return t.queue_id===e}));c[o].votes=c[o].votes+(t?1:-1),a(c),i(e,t)},voted:function(e){var t=e.id,c=e.votes,o=Object(r.a)(n),u=o.findIndex((function(e){return e.queue_id===t}));o[u].votes=c,a(o)},votes:l,setTracks:a}}},,,,function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return u}));var r=n(17),a=n(0),c=function e(){Object(r.a)(this,e),this.auth=void 0,this.roomId=void 0,this.doLogin=function(){},this.doSignOut=function(){},this.auth=!1,this.roomId=""},o=n.n(a).a.createContext(new c),u=function(){return Object(a.useContext)(o)}},function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return d}));var r=n(4),a=n.n(r),c=n(17),o=n(0),u=n.n(o),l=n(1),i=function e(){var t=this;Object(c.a)(this,e),this.ws=void 0,this.host=void 0,this.window=void 0,this.roomID=void 0,this.inSession=void 0,this.connect=function(){t.ws=new WebSocket(l.SOCKET_URL),t.ws.onopen=function(){console.log("Open socket")},t.ws.onclose=function(e){console.log("Close socket",e),t.ws=null,setTimeout(t.check,1e3)},t.ws.onerror=function(e){console.error("Socket error",e),t.ws.close()}},this.check=function(){!t.inSession||t.ws&&t.ws.readyState!==WebSocket.CLOSED||t.connect()},this.doSendMessage=function(e,n){var r=function(e,t){return JSON.stringify({type:e,payload:t})}(e,n),a=setInterval((function(){t.ws&&t.ws.readyState===WebSocket.OPEN&&(t.ws.send(r),clearInterval(a))}),1e3)},this.doJoinRoom=function(e,n){t.ws||t.connect(),t.ws.onmessage=function(e){var t=JSON.parse(e.data);switch(t.type){case"spectator":break;case"numSubscribers":case"leave":n.setSubscribers(t.payload);break;case"trackAdded":n.addTrackToQueue(t.payload);break;case"trackRemoved":n.removeTrackFromQueue(t.payload);break;case"vote":n.vote(t.payload)}},t.roomID=e,t.inSession||(t.doSendMessage("join",e),t.inSession=!0)},this.doLeaveRoom=function(){t.inSession=!1,t.roomID="",t.ws.close()},this.doAuthorizeUser=function(){return new Promise((function(e,n){var r=JSON.parse(localStorage.getItem(l.SPOTIFY_USER_TOKEN));if(r&&!Object(l.tokenHasExpired)(r))return e();if(r&&Object(l.tokenHasExpired)(r))return t.doRefreshUserToken(r).then(e);var a=window.screen.width/2-225,c=window.screen.height/2-365,o=window.open("http://localhost:3000","Spotify","menubar=no,location=no,resizable=no,scrollbars=no,status=no,width="+"".concat(450,",height=").concat(730,",top=").concat(c,",left=").concat(a));return Object(l.Fetch)(l.AUTHORIZE_URL,"GET").then((function(t){o?(o.location.replace(t.data),window.tokenCallback=function(){return o.close(),e()}):alert("Hey, you! This app needs popups, sorry. Just allow them. Once.")}))}))},this.doFetchUserToken=function(e){return Object(l.Fetch)("".concat(l.REQUEST_TOKEN_URL,"?code=").concat(e)).then((function(e){return e.data})).then((function(e){e.expires_on=Date.now()+1e3*e.expires_in,localStorage.setItem(l.SPOTIFY_USER_TOKEN,JSON.stringify(e))}))},this.doRefreshUserToken=function(e){return Object(l.Fetch)("".concat(l.REFRESH_TOKEN_URL,"?refresh_token=").concat(e.refresh_token)).then((function(t){var n=t.data;return n.refresh_token=e.refresh_token,n.expires_on=Date.now()+1e3*n.expires_in,localStorage.setItem(l.SPOTIFY_USER_TOKEN,JSON.stringify(n)),n}))},this.doSetupRoom=function(){var e;return a.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a.a.awrap(Object(l.Fetch)(l.HOST_URL));case 2:return e=n.sent,t.host=!0,t.connect(),n.abrupt("return",e.data);case 6:case"end":return n.stop()}}))},this.doValidateRoomID=function(e){return a.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.t0=Object(l.validateRoomID)(e),!t.t0){t.next=5;break}return t.next=4,a.a.awrap(Object(l.Fetch)("".concat(l.VALIDATE_ROOM_URL,"?id=").concat(e)));case 4:t.t0=t.sent.data;case 5:return t.abrupt("return",t.t0);case 6:case"end":return t.stop()}}))},this.doSearchTrack=function(e,t){var n,r;return a.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return n=e.replace(" ","+"),c.next=3,a.a.awrap(Object(l.Fetch)("".concat(l.SEARCH_URL,"?query=").concat(n),"GET",null,t));case 3:return r=c.sent,c.abrupt("return",r.data);case 5:case"end":return c.stop()}}))},this.doGetQueue=function(){var e;return a.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a.a.awrap(Object(l.Fetch)("".concat(l.GET_QUEUE_URL,"?id=").concat(t.roomID)));case 2:return e=n.sent,n.abrupt("return",e.data.tracks);case 4:case"end":return n.stop()}}))},this.doAddTrackToQueue=function(e){var n;return a.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,a.a.awrap(Object(l.Fetch)("".concat(l.ADD_TRACK_TO_QUEUE_URL,"?trackID=").concat(e,"&sessionID=").concat(t.roomID),"PUT"));case 2:return n=r.sent,r.abrupt("return",n.data);case 4:case"end":return r.stop()}}))},this.doRemoveTrackFromQueue=function(e){return a.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:Object(l.Fetch)("".concat(l.REMOVE_TRACK_FROM_QUEUE_URL,"?trackID=").concat(e,"&sessionID=").concat(t.roomID),"DELETE");case 1:case"end":return n.stop()}}))},this.doVoteForTrack=function(e,n){return a.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:t.doSendMessage("vote",{id:e,vote:n,room:t.roomID});case 1:case"end":return r.stop()}}))},this.window=null,this.roomID="",this.inSession=!1,this.ws=null,this.host=!1},s=u.a.createContext({}),d=function(){return Object(o.useContext)(s)}},,,,,,,function(e,t){},function(e,t,n){e.exports=n.p+"static/media/placeholder.a1286edb.png"},,,,,,,,function(e,t,n){e.exports=n(91)},,,,,function(e,t,n){},function(e,t,n){},,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(31),o=n.n(c),u=(n(42),n(11)),l=(n(43),function(e){var t=e.size,n=e.color,r=e.numSubscribers,c=e.id,o=Object(u.f)();return a.a.createElement("div",{className:"header "+n+" "+t},a.a.createElement("h3",{className:"header-name",onClick:o.goBack},"Queue"),c&&a.a.createElement("h3",{className:"header-code"},"Go to ",a.a.createElement("b",null,"queue.rocks")," and use the code ",a.a.createElement("b",null,c)," "),r&&a.a.createElement("div",{className:"header-person-icon"},r," ",a.a.createElement(S,null)))}),i=(n(49),function(e){var t=e.onClick,n=e.type,r=void 0===n?"green":n,c=e.value,o=void 0===c?"":c,u=e.loading,l=void 0!==u&&u,i=e.className,s=void 0===i?"":i;return a.a.createElement("button",{onClick:t,className:"button button-"+r+" "+s},a.a.createElement("div",null,l?a.a.createElement(d,null):o))}),s=(n(50),function(){return a.a.createElement("div",{className:"404"},a.a.createElement(l,{color:"green",size:"s"}),a.a.createElement("h3",null,"404"))}),d=(n(51),function(){return a.a.createElement("div",{className:"lds-ellipsis"},a.a.createElement("div",null),a.a.createElement("div",null),a.a.createElement("div",null),a.a.createElement("div",null))}),m=function(){return a.a.createElement("svg",{viewBox:"0 0 512 512",className:"icon-fill"},a.a.createElement("path",{d:"M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"}))},f=function(){return a.a.createElement("svg",{viewBox:"0 0 170 174",className:"icon-fill"},a.a.createElement("path",{d:"M132.916 87L20 153.684L20 20.316L132.916 87Z"}),a.a.createElement("rect",{x:"132.916",y:"20",width:"16.6257",height:"134"}))},E=function(){return a.a.createElement("svg",{viewBox:"0 0 170 174",className:"icon-fill"},a.a.createElement("path",{d:"M36.6257 87L149.542 20.316L149.542 153.684L36.6257 87Z"}),a.a.createElement("rect",{x:"36.6257",y:"154",width:"16.6257",height:"134",transform:"rotate(-180 36.6257 154)"}))},h=function(){return a.a.createElement("svg",{x:"0px",y:"0px",viewBox:"0 0 512 512",className:"icon-fill"},a.a.createElement("g",null,a.a.createElement("g",null,a.a.createElement("g",null,a.a.createElement("path",{d:"M21.333,149.327H64c18.773,0,37.227,4.928,53.333,14.272c3.371,1.963,7.061,2.88,10.688,2.88 c7.36,0,14.528-3.819,18.475-10.624c5.931-10.197,2.432-23.253-7.744-29.163C116.117,113.594,90.283,106.66,64,106.66H21.333 C9.536,106.66,0,116.218,0,127.994S9.536,149.327,21.333,149.327z"}),a.a.createElement("path",{d:"M320,149.327h42.667v64c0,8.192,4.715,15.68,12.075,19.221c2.965,1.408,6.123,2.112,9.259,2.112 c4.757,0,9.472-1.6,13.333-4.672L504,144.655c5.056-4.053,8-10.176,8-16.661c0-6.485-2.944-12.608-8-16.661L397.333,25.999 c-6.421-5.12-15.232-6.101-22.592-2.56s-12.075,11.029-12.075,19.221v64H320c-82.325,0-149.333,66.987-149.333,149.333 c0,58.816-47.851,106.667-106.667,106.667H21.333C9.536,362.66,0,372.218,0,383.994s9.536,21.333,21.333,21.333H64 c82.325,0,149.333-66.987,149.333-149.333C213.333,197.178,261.184,149.327,320,149.327z"}),a.a.createElement("path",{d:"M504,367.336l-106.667-85.333c-6.421-5.141-15.232-6.123-22.592-2.581c-7.36,3.563-12.075,11.029-12.075,19.243v64H320 c-21.077,0-41.472-6.144-58.965-17.771c-9.856-6.485-23.061-3.861-29.568,5.973c-6.528,9.813-3.861,23.061,5.952,29.568 c24.512,16.277,53.056,24.896,82.581,24.896h42.667v64c0,8.192,4.715,15.68,12.075,19.221c2.965,1.408,6.123,2.112,9.259,2.112 c4.757,0,9.472-1.6,13.333-4.672L504,400.659c5.056-4.053,8-10.197,8-16.661C512,377.512,509.056,371.368,504,367.336z"})))),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null))},v=function(){return a.a.createElement("svg",{viewBox:"0 0 123 118",className:"icon-connect"},a.a.createElement("path",{d:"M50 10H14C11.7909 10 10 11.7909 10 14V80C10 82.2091 11.7909 84 14 84H50",strokeWidth:"8",strokeLinejoin:"round"}),a.a.createElement("rect",{x:"61",y:"10",width:"52",height:"98",rx:"6",strokeWidth:"8"}),a.a.createElement("path",{d:"M35 108H50",strokeWidth:"8"}),a.a.createElement("circle",{cx:"87",cy:"77",r:"14",strokeWidth:"8"}),a.a.createElement("circle",{cx:"87",cy:"35",r:"5",className:"icon-fill"}))},p=function(){return a.a.createElement("svg",{viewBox:"0 0 76 120"},a.a.createElement("rect",{x:"12",y:"11",width:"52",height:"98",rx:"4",strokeWidth:"6"}),a.a.createElement("circle",{cx:"38",cy:"78",r:"14",strokeWidth:"6"}),a.a.createElement("circle",{cx:"38",cy:"36",r:"5",className:"icon-fill"}))},b=function(){return a.a.createElement("svg",{viewBox:"0 0 76 120"},a.a.createElement("rect",{x:"12",y:"11",width:"52",height:"98",rx:"4",strokeWidth:"6"}),a.a.createElement("circle",{cx:"38",cy:"96",r:"5",className:"icon-fill"}))},g=function(){return a.a.createElement("svg",{viewBox:"0 0 228 180"},a.a.createElement("rect",{x:"35",y:"21",width:"157",height:"113",rx:"4",strokeWidth:"6"}),a.a.createElement("path",{d:"M15 158H213",strokeWidth:"6"}))},k=function(){return a.a.createElement("svg",{x:"0px",y:"0px",viewBox:"0 0 320.001 320.001",className:"icon-fill"},a.a.createElement("path",{d:"M295.84,146.049l-256-144c-4.96-2.784-11.008-2.72-15.904,0.128C19.008,5.057,16,10.305,16,16.001v288 c0,5.696,3.008,10.944,7.936,13.824c2.496,1.44,5.28,2.176,8.064,2.176c2.688,0,5.408-0.672,7.84-2.048l256-144 c5.024-2.848,8.16-8.16,8.16-13.952S300.864,148.897,295.84,146.049z"}),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null))},O=function(){return a.a.createElement("svg",{x:"0px",y:"0px",viewBox:"0 0 47.607 47.607",className:"icon-fill"},a.a.createElement("g",null,a.a.createElement("path",{d:"M17.991,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631C4.729,2.969,7.698,0,11.36,0 l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z"}),a.a.createElement("path",{d:"M42.877,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631 C29.616,2.969,32.585,0,36.246,0l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z"})),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null),a.a.createElement("g",null))},S=function(){return a.a.createElement("svg",{enableBackground:"new 0 0 512 512",viewBox:"0 0 512 512"},a.a.createElement("g",null,a.a.createElement("path",{d:"M348.574,145.901c0,53.522-43.377,96.914-96.901,96.914c-53.523,0-96.914-43.392-96.914-96.914    c0-53.51,43.391-96.901,96.914-96.901C305.197,49,348.574,92.391,348.574,145.901z",fill:"none",stroke:"#fff",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:"10",strokeWidth:"20"}),a.a.createElement("path",{d:"M275.38,274.46c95.561,9.706,170.154,90.401,170.154,188.54",fill:"none",stroke:"#fff",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:"10",strokeWidth:"20"}),a.a.createElement("path",{d:"M66.466,463c0-96.358,71.925-175.934,165.027-187.961",fill:"none",stroke:"#fff",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:"10",strokeWidth:"20"})))},_=function(){return a.a.createElement("svg",{viewBox:"0 0 512 512"},a.a.createElement("path",{d:"M340.8,83C307,83,276,98.8,256,124.8c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6  L245.1,418l10.9,11l10.9-11l148.3-149.8c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"}))},T=function(){return a.a.createElement("svg",{viewBox:"0 0 512 512"},a.a.createElement("path",{d:"M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"}))},y=n(4),R=n.n(y),j=n(2),L=n(1),w=(n(54),function(e){e.onSelect;var t=e.history,n=Object(L.useAPI)(),c=(Object(L.useAuth)(),Object(r.useState)("")),o=Object(j.a)(c,2),u=o[0],l=o[1],i=Object(r.useState)(!1),s=Object(j.a)(i,2),d=s[0],m=s[1];return a.a.createElement("div",{className:"start"},a.a.createElement("h3",{className:"xl green"},"Queue"),a.a.createElement("div",{className:"start-buttons"},a.a.createElement(C,{onSelect:function(){return R.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("Authorizing..."),n.doAuthorizeUser().then((function(){var e;return R.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return console.log("Authorized!"),r.next=3,R.a.awrap(n.doSetupRoom());case 3:e=r.sent,t.push(L.ROUTES.HOST.replace(":id",e));case 5:case"end":return r.stop()}}))})).catch((function(e){l("User could not be authenticated")}));case 2:case"end":return e.stop()}}))}}),a.a.createElement(I,{onSelect:function(e){return R.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return m(!0),r.next=3,R.a.awrap(n.doValidateRoomID(e));case 3:if(!r.sent){r.next=7;break}t.push(L.ROUTES.ROOM.replace(":id",e)),r.next=9;break;case 7:m(!1),l("The session could not be found");case 9:case"end":return r.stop()}}))},loading:d})),u&&a.a.createElement("div",{className:"start-error"},u))}),C=function(e){var t=e.onSelect,n=Object(r.useState)(!1),c=Object(j.a)(n,2),o=c[0],u=c[1];return a.a.createElement(i,{onClick:function(){u(!0),t()},value:"Host",type:"transparent",loading:o})},I=function(e){var t=e.onSelect,n=e.loading,c=Object(r.useState)(""),o=Object(j.a)(c,2),u=o[0],l=o[1],s=Object(r.useState)(!1),d=Object(j.a)(s,2),m=d[0],f=d[1],E=Object(r.useRef)(document.createElement("div")),h=Object(r.useCallback)((function(){m&&u.length>0?t(u):f(!0)}),[m,u,t]),v=Object(r.useCallback)((function(e){!E.current.contains(e.target)&&m&&f(!1)}),[m]),p=Object(r.useCallback)((function(e){"Enter"===e.key&&h()}),[h]);return Object(r.useEffect)((function(){return document.addEventListener("click",v),document.addEventListener("keydown",p),function(){document.removeEventListener("click",v),document.removeEventListener("keydown",p)}}),[p,v]),a.a.createElement("div",{ref:E,className:"join-button"+(m?" show":"")},a.a.createElement(i,{className:n?"loading":"",onClick:h,value:m?"\uff0b":"Join",type:"green"}),a.a.createElement(A,{onChange:l,placeholder:"Room code",value:u,visible:m}))},A=(n(55),function(e){var t=e.onChange,n=e.value,r=e.visible,c=void 0===r||r,o=e.placeholder,u=void 0===o?"":o;return a.a.createElement("input",{className:c?"text-input visible":"text-input",type:"text",value:n,onChange:function(e){t(e.target.value)},placeholder:u})}),x=function(e){var t=Object(L.useAPI)();return Object(r.useEffect)((function(){var n=new URLSearchParams(e.location.search).get("code");t.doFetchUserToken(n).then((function(){window.opener.tokenCallback(),window.close()}))}),[]),a.a.createElement("div",null)},P=(n(56),function(e){var t=e.onCancel,n=e.onSearchUpdate,c=e.searching,o=Object(r.useRef)(document.createElement("input")),u=Object(L.useDebouncedInput)(n,t),l=u.input,i=u.setInput,s=u.handleInputChange,d=Object(r.useState)(!1),m=Object(j.a)(d,2),f=m[0],E=m[1],h=Object(r.useCallback)((function(){o.current.blur(),i(""),t()}),[t,i]),v=Object(r.useCallback)((function(e){o.current.contains(e.target)||h()}),[h]),p=Object(r.useCallback)((function(e){"Escape"===e.key&&h()}),[h]);return Object(r.useEffect)((function(){!c&&l.length>0&&i("")})),Object(r.useEffect)((function(){return o.current.addEventListener("click",v),o.current.addEventListener("keydown",p),function(){o.current.removeEventListener("click",v),o.current.removeEventListener("keydown",p)}}),[v,p]),a.a.createElement("div",{className:"search-input"},a.a.createElement("input",{ref:o,tabIndex:1,onFocus:function(){return E(!0)},onBlur:function(){return E(!1)},onChange:s,value:l,type:"text",placeholder:"S\xf6k"}),(c||f)&&a.a.createElement("button",{onClick:h},"\u2573"))}),U=n(13),N=(n(57),function(e){var t=e.tracks,n=e.onAddTrack,c=e.onRemoveTrack,o=Object(r.useState)(t.map((function(e){return e.id}))),u=Object(j.a)(o,2),l=u[0],i=u[1];Object(r.useEffect)((function(){i(Array(t.length).fill(!1))}),[t]);return a.a.createElement("div",{className:"list-container"},a.a.createElement("ul",{className:"track-list search-results"},t.map((function(e,r){return a.a.createElement("li",{key:e.queue_id},a.a.createElement("img",{src:F(e.album_s),alt:""}),a.a.createElement("div",{className:"track-names"},a.a.createElement("div",null,a.a.createElement("h3",null,e.title)),a.a.createElement("div",null,e.artist)),a.a.createElement("button",{onClick:function(){return function(e){l[e]?c(t[e].queue_id):n(t[e]);var r=Object(U.a)(l);r[e]=!r[e],i(r)}(r)}},a.a.createElement("div",null,l[r]?a.a.createElement(_,null):a.a.createElement(T,null))))}))))});function F(e){return e.length>0?e:n(29)}var D=n(23),Y=(n(82),function(e){var t=e.children,n=e.queue,r=Object(L.useSearch)(),c=r.searching,o=r.searchUpdate,u=r.cancelSearch,l=r.search;return a.a.createElement("div",{className:"search"},a.a.createElement(P,{onSearchUpdate:o,onCancel:u,searching:c}),c?l.loading?a.a.createElement(D.PulseLoader,{css:"margin-top: 10vh;",size:10,color:"white"}):l.result&&l.result.length>0?a.a.createElement(N,{onAddTrack:n.addToQueue,onRemoveTrack:n.removeFromQueue,tracks:l.result}):a.a.createElement("p",null,"No results"):t)}),M=(n(83),function(e){var t=Object(L.useWebSocket)(e.match.params.id),n=t.subscribers,r=t.queue,c=ae(),o=c.playerState,u=c.controller,i=c.fetching;return a.a.createElement("div",{className:"host"},a.a.createElement(l,{color:"green",size:"s",numSubscribers:n,id:e.match.params.id}),a.a.createElement("div",{className:"host-content"},a.a.createElement(V,{tracks:r.tracks,playerState:o,controller:u,fetching:i}),a.a.createElement(Y,{queue:r},a.a.createElement(q,{tracks:r.tracks,onDelete:r.removeFromQueue,onPlay:u.playTrack}))))}),q=(n(84),function(e){var t=e.tracks,n=e.onDelete,r=e.onPlay;return a.a.createElement("ul",{className:"host-track-list"},a.a.createElement("li",null,a.a.createElement("div",null,"TITLE"),a.a.createElement("div",null,"ARTIST"),a.a.createElement("div",null,"VOTES")),t.length>0?t.map((function(e,t){return a.a.createElement("li",{key:e.id},a.a.createElement("div",null,e.title),a.a.createElement("div",null,e.artist),a.a.createElement("div",null,e.votes),a.a.createElement("button",{onClick:function(){return r(e.id,e.queue_id)}},a.a.createElement(k,null)),a.a.createElement("button",{onClick:function(){return n(e.queue_id)}},a.a.createElement(m,null)))})):a.a.createElement("li",null,a.a.createElement("h3",null,"The Queue is empty")))}),Q=(n(85),{src:n(29),artist:"Artist",track:"Track"}),V=function(e){var t=e.tracks,n=e.playerState,r=e.controller,c=e.fetching;return a.a.createElement(a.a.Fragment,null,a.a.createElement(H,{fetching:c}),function(){if(n&&"is_playing"in n){var e=n.item;return a.a.createElement("div",{className:"player"},a.a.createElement(ee,{src:e.album.images[0].url}),a.a.createElement("h3",null,e.artists[0].name),a.a.createElement("p",null,e.name),a.a.createElement(z,{tracks:t,state:n,controller:r}))}return a.a.createElement("div",{className:"player"},a.a.createElement(ee,{src:Q.src}),a.a.createElement("h3",null,Q.artist),a.a.createElement("p",null,Q.track),a.a.createElement(B,{controller:r}))}())},H=function(e){var t=e.fetching,n=Object(r.useState)(t),c=Object(j.a)(n,2),o=c[0],u=c[1];return Object(r.useEffect)((function(){setTimeout((function(){return u(!1)}),1e3)}),[t]),o?a.a.createElement("div",{className:"player-loading-overlay"+(t?"":" disabled")}):null},B=function(e){var t=e.controller;return a.a.createElement("div",{className:"player-controller"},a.a.createElement("div",{className:"player-controller-controlls"},a.a.createElement(J,{onClick:function(){},type:"shuffle"}),a.a.createElement(J,{onClick:function(){},type:"prev"}),a.a.createElement(J,{onClick:function(){},type:"play"}),a.a.createElement(J,{onClick:function(){},type:"next"}),a.a.createElement(W,{controller:t})),a.a.createElement(G,{isPlaying:!1,length:0,current:0,onSeek:function(e){},onEnd:function(){}}))},z=function(e){var t=e.state,n=e.controller,c=e.tracks,o=Object(r.useState)(t.is_playing),u=Object(j.a)(o,2),l=u[0],i=u[1];Object(r.useEffect)((function(){i(t.is_playing)}),[t.is_playing]);var s=function(){c.length>0?n.playTrack(c[0].id,c[0].queue_id):n.playSimilarTrack()};return a.a.createElement("div",{className:"player-controller"},a.a.createElement("div",{className:"player-controller-controlls"},a.a.createElement(J,{onClick:function(){return console.log(n)},type:"shuffle"}),a.a.createElement(J,{onClick:function(){return n.changeTrack(!1)},type:"prev"}),a.a.createElement(J,{onClick:function(){n.togglePlayback(l),i(!l)},type:l?"pause":"play"}),a.a.createElement(J,{onClick:s,type:"next"}),a.a.createElement(W,{controller:n})),a.a.createElement(G,{isPlaying:l,length:t.item.duration_ms,current:t.progress_ms,onSeek:n.seekInPlayingTrack,onEnd:s}))},K=function(e){var t=e.devices,n=e.onClick;return a.a.createElement("div",null,a.a.createElement("ul",null,t.length>0?t.map((function(e,t){return a.a.createElement("li",{key:e.id},a.a.createElement("button",{className:e.is_restricted?"device-restricted":e.is_active?"device-active":"",disabled:e.is_restricted,onClick:function(){return n(e.id)}},function(e){switch(e){case"Computer":return a.a.createElement(g,null);case"Speaker":return a.a.createElement(p,null);case"Smartphone":return a.a.createElement(b,null);default:return a.a.createElement(p,null)}}(e.type),a.a.createElement("p",null,e.name)))})):a.a.createElement("li",null,a.a.createElement(D.PulseLoader,{size:10,color:"white"}))))},W=function(e){var t=e.controller,n=Object(r.useState)(!1),c=Object(j.a)(n,2),o=c[0],u=c[1],l=Object(r.useState)([]),i=Object(j.a)(l,2),s=i[0],d=i[1];return Object(r.useEffect)((function(){var e=!0;return t.getDevices().then((function(t){e&&d(t)})),function(){return e=!1}}),[]),a.a.createElement("div",{className:"player-controll-connect"},o&&a.a.createElement(K,{devices:s,onClick:function(e){t.setDevice(e).then(t.getDevices).then(d)}}),a.a.createElement(J,{onClick:function(){o||t.getDevices().then(d),u(!o)},type:"connect"}))},J=function(e){var t=e.type,n=e.onClick,r="play"===t||"pause"===t;return a.a.createElement("button",{onClick:n,className:"player-controll-button "+t+(r?" circle":"")},function(){switch(t){case"next":return a.a.createElement(f,null);case"play":return a.a.createElement(k,null);case"prev":return a.a.createElement(E,null);case"pause":return a.a.createElement(O,null);case"shuffle":return a.a.createElement(h,null);case"connect":return a.a.createElement(v,null)}}())},G=function(e){var t=e.current,n=e.length,c=e.isPlaying,o=e.onSeek,u=e.onEnd,l=Object(r.useState)(t),i=Object(j.a)(l,2),s=i[0],d=i[1],m={width:"".concat(100*s/n,"%")},f=function(){var e=s+1500;Math.round(e)<n?d(e-500):(d(0),u())};Object(r.useEffect)((function(){if(c){var e=setInterval(f,1e3);return function(){return clearInterval(e)}}}),[f]),Object(r.useEffect)((function(){d(t)}),[t,n]),Object(r.useEffect)((function(){d(s)}),[c]);return a.a.createElement("div",{className:"progress-bar-container"},a.a.createElement("div",null,Object(L.millisToMinutesAndSeconds)(s)),a.a.createElement("div",{className:"progress-bar",onClick:function(e){var t=e.currentTarget,r=t.offsetWidth,a=(e.clientX-t.getBoundingClientRect().left)/r,c=Math.round(a*n);o(c),d(c)}},a.a.createElement("div",{style:m})),a.a.createElement("div",null,Object(L.millisToMinutesAndSeconds)(n)))},Z=n(35),X=n.n(Z),$=(n(86),{perspective:2e3,speed:500,max:5}),ee=function(e){var t=e.src,n=Object(r.useRef)(document.createElement("div"));return Object(r.useEffect)((function(){X.a.init(n.current,$)})),a.a.createElement("div",{ref:n,className:"album-tilt"},a.a.createElement("img",{src:t,alt:"Album artwork"}))},te=n(36),ne=n(17),re=function e(t){var n=this;Object(ne.a)(this,e),this.playerInterval=void 0,this.token=void 0,this.api=void 0,this.pollingCallback=void 0,this.abortController=void 0,this.pollPlayerState=function(e){n.pollingCallback=e,n.getPlayerState(e),n.playerInterval=window.setInterval((function(){return n.getPlayerState(e)}),1e4)},this.clearPolling=function(){n.playerInterval&&clearInterval(n.playerInterval)},this.getPlayerState=function(e){n.request(L.SPOTIFY_PLAYER_BASE_URL,{}).then(e)},this.getDevices=function(){return n.request(L.SPOTIFY_PLAYER_GET_DEVICES_URL,{method:"GET"}).then((function(e){return e.devices}))},this.setDevice=function(e){var t={method:"PUT",body:JSON.stringify({device_ids:[e]})};return n.request(L.SPOTIFY_PLAYER_SET_DEVICE_URL,t)},this.playTrack=function(e,t){var r={method:"PUT",body:JSON.stringify({uris:["spotify:track:".concat(e)]})};n.abortController.abort(),n.abortController=new AbortController,n.request(L.SPOTIFY_PLAYER_PLAY_URL,r).then((function(){n.getPlayerState(n.pollingCallback)})),t&&n.api.doRemoveTrackFromQueue(t)},this.playSimilarTrack=function(){var e=localStorage.getItem(L.LAST_PLAYED_TRACK),t="".concat(L.SPOTIFY_PLAYER_RECOMMENDATION_URL,"?seed_tracks=").concat(e,"&limit=1");n.request(t,{method:"GET"}).then((function(e){var t=e.tracks;t&&t.length>0&&n.playTrack(t[0].id)}))},this.changeTrack=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=e?L.SPOTIFY_PLAYER_NEXT_TRACK_URL:L.SPOTIFY_PLAYER_PREVIOUS_TRACK_URL,r={method:"POST"};n.request(t,r)},this.togglePlayback=function(e){var t=e?L.SPOTIFY_PLAYER_PAUSE_URL:L.SPOTIFY_PLAYER_PLAY_URL;n.request(t,{method:"PUT"})},this.seekInPlayingTrack=function(e){var t="".concat(L.SPOTIFY_PLAYER_SEEK_URL,"?position_ms=").concat(e);n.request(t,{method:"PUT"})},this.refreshToken=function(){return console.log("Token expired:",n.token),n.api.doRefreshUserToken(n.token).then((function(e){n.token=e}))},this.request=function(e,t){return n.token&&Object(L.tokenHasExpired)(n.token)?n.refreshToken().then((function(){return n.request(e,t)})):fetch(e,Object(te.a)({headers:{Authorization:"Bearer ".concat(n.token.access_token)}},t,{signal:n.abortController.signal})).then((function(e){return 400===e.status&&console.error(e.json()),204!==e.status?e.json():e})).catch((function(e){return console.error("Spotify API responded with error:",e)}))};var r=JSON.parse(localStorage.getItem(L.SPOTIFY_USER_TOKEN));this.token=r,this.playerInterval=null,this.pollingCallback=null,this.api=t,this.abortController=new AbortController},ae=function(){var e=Object(r.useState)(!0),t=Object(j.a)(e,2),n=t[0],a=t[1],c=Object(L.useAPI)(),o=Object(r.useState)(new re(c)),u=Object(j.a)(o,2),l=u[0],i=(u[1],Object(r.useState)({})),s=Object(j.a)(i,2),d=s[0],m=s[1];return Object(r.useEffect)((function(){return l.pollPlayerState((function(e){n&&a(!1),m(e),e.item&&localStorage.setItem(L.LAST_PLAYED_TRACK,e.item.id)})),l.clearPolling}),[]),{playerState:d,controller:l,fetching:n}},ce=(n(87),a.a.memo((function(e){var t=e.match,n=Object(L.useWebSocket)(t.params.id),r=n.subscribers,c=n.queue;return a.a.createElement("div",{className:"spectator"},a.a.createElement(l,{color:"green",size:"s",numSubscribers:r}),a.a.createElement(Y,{queue:c},a.a.createElement(oe,{onVote:c.vote,votes:c.votes,tracks:c.tracks})))}))),oe=(n(88),function(e){var t=e.tracks,n=e.votes,r=e.onVote;return a.a.createElement("div",{className:"list-container"},a.a.createElement("ul",{className:"track-list"},t.map((function(e,t){var c=n.includes(e.queue_id);return a.a.createElement("li",{key:e.queue_id},a.a.createElement("img",{src:e.album_s,alt:""}),a.a.createElement("div",{className:"track-names"},a.a.createElement("div",null,a.a.createElement("h3",null,e.title)),a.a.createElement("div",null,e.artist)),a.a.createElement("div",null,a.a.createElement("div",null,e.votes," vote",1!==e.votes&&"s"),a.a.createElement("button",{onClick:function(){return r(e.queue_id,!c)}},c?a.a.createElement(_,null):a.a.createElement(T,null))))}))))}),ue=(n(89),function(){return a.a.createElement("div",{className:"login"},a.a.createElement(l,{color:"green",size:"s"}),a.a.createElement("h3",null,"Login"))}),le=n(12),ie=n(22),se=(n(90),function(){return a.a.createElement("div",{className:"App"},a.a.createElement(ie.a,null,a.a.createElement(u.c,null,a.a.createElement(u.a,{path:le.START,exact:!0,component:w}),a.a.createElement(u.a,{path:le.LOGIN,exact:!0,component:ue}),a.a.createElement(u.a,{path:le.ROOM,exact:!0,component:ce}),a.a.createElement(u.a,{path:le.HOST,exact:!0,component:M}),a.a.createElement(u.a,{path:le.REDIRECT,exact:!0,component:x}),a.a.createElement(u.a,null,a.a.createElement(s,null)))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(L.APIContext.Provider,{value:new L.API},a.a.createElement(L.AuthContext.Provider,{value:new L.Auth},a.a.createElement(se,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[37,1,2]]]);
//# sourceMappingURL=main.a23854bf.chunk.js.map