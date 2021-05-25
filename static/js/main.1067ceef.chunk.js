(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{100:function(e,t){},106:function(e,t,n){},107:function(e,t,n){},112:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n(0),i=n.n(a),c=n(14),o=n.n(c),s=(n(79),n(7)),l=n.n(s),u=n(9),h=n(8),d=n(133),j=n(131),b=n(127),f=n(40),p=n(17),x=n(26),v=n(58),g=["F","F\u266f","G","G\u266f","A","A\u266f","B","C","C\u266f","D","D\u266f","E"];function O(e,t){return Math.floor(1200*Math.log(e/function(e){return 440*Math.pow(2,(e-69)/12)}(t))/Math.log(2))}var m=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:15e3;Object(p.a)(this,e),this.frequencies=[],this.melodyNotes=[],this.introStateListeners=[],this.background="#efefef",this.highlight="#888888",this.container=t,this.container.style.position="relative";var r="position: absolute; width: 100%; height: 100%;";this.bgCanvas=document.createElement("canvas"),this.bgCanvas.setAttribute("style",r),this.bgContext=this.bgCanvas.getContext("2d"),this.melodyCanvas=document.createElement("canvas"),this.melodyCanvas.setAttribute("style",r),this.melodyContext=this.melodyCanvas.getContext("2d"),this.noteCanvas=document.createElement("canvas"),this.noteCanvas.setAttribute("style",r),this.noteContext=this.noteCanvas.getContext("2d"),this.container.appendChild(this.bgCanvas),this.container.appendChild(this.melodyCanvas),this.container.appendChild(this.noteCanvas),this.timeSpan=n,this.lastSongPos=0,this.speedChanged=void 0,this.playingSpeed=0,this.melodyStart=0,this.inIntro=!1,this.resize()}return Object(x.a)(e,[{key:"subscribeToIntroState",value:function(e){var t=this;return this.introStateListeners.push(e),function(){for(var n=0;n<t.introStateListeners.length;n++)if(t.introStateListeners[n]===e)return void t.introStateListeners.splice(n,1)}}},{key:"resize",value:function(){var e=this.container.clientWidth,t=this.container.clientHeight,n=window.devicePixelRatio,r=Math.floor(n*e),a=Math.floor(n*t);this.bgCanvas.width=r,this.bgCanvas.height=a,this.bgContext.scale(n,n),this.melodyCanvas.width=r,this.melodyCanvas.height=a,this.melodyContext.scale(n,n),this.noteCanvas.width=r,this.noteCanvas.height=a,this.noteContext.scale(n,n),this.scaleX=Object(v.a)().domain([-this.timeSpan/2,this.timeSpan/2]).range([0,e]);var i=t/(g.length+4);this.scaleY=Object(v.a)().domain([0,2*g.length-1]).range([t-i,i]),this.render()}},{key:"getNearestMelodyNote",value:function(e){if(this.melodyNotes.length)for(var t=this.calculateSongPos(e),n=0;n<this.melodyNotes.length;n++){var r=this.melodyNotes[n],a=0;if(n>0){var i=this.melodyNotes[n-1];a=(i.start+i.duration+r.start)/2}var c=1/0;if(n<this.melodyNotes.length-1){var o=this.melodyNotes[n+1];c=(r.start+r.duration+o.start)/2}if(t>=a&&t<c)return r}}},{key:"pushFrequency",value:function(e){var t,n=e.frequency,r=function(e){var t=Math.log(e/440)/Math.log(2)*12;return Math.round(t)+69}(n),a=r+O(n,r)/100,i=this.getNearestMelodyNote(e.time);if(i){var c=(a-i.pitch)%12;c>6?c-=12:c<-6&&(c+=12),t=i.pitch+c}this.frequencies.push(Object.assign(Object.assign({},e),{pitch:a,melodyPitch:t}))}},{key:"cleanupFrequencies",value:function(){var e=this;this.frequencies=this.frequencies.filter((function(t){return e.now-t.time<e.timeSpan/2}))}},{key:"setMelodyNotes",value:function(e){this.melodyNotes=e,this.melodyStart=e.length?e[0].start:0}},{key:"playSong",value:function(){this.changePlayingSpeed(1)}},{key:"fastForwardSong",value:function(){this.changePlayingSpeed(3)}},{key:"pauseSong",value:function(){this.changePlayingSpeed(0)}},{key:"calculateSongPos",value:function(e){return this.lastSongPos+this.playingSpeed*(e-this.speedChanged)}},{key:"changePlayingSpeed",value:function(e){var t=(new Date).getTime();void 0===this.speedChanged&&(this.speedChanged=t),this.lastSongPos=this.calculateSongPos(t),this.playingSpeed=e,this.speedChanged=t}},{key:"seekToFirstNote",value:function(){this.changePlayingSpeed(0),this.lastSongPos=this.melodyStart}},{key:"render",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.now=(new Date).getTime();var t=this.calculateSongPos(this.now);this.cleanupFrequencies(),e&&this.drawBackground(),this.drawMelody(t),this.drawNotes(),this.melodyNotes.length&&this.drawTimeMarkers(t),this.checkIntroState(t)}},{key:"checkIntroState",value:function(e){var t=e<this.melodyStart;if(t!==this.inIntro){this.inIntro=t;for(var n=0;n<this.introStateListeners.length;n++)this.introStateListeners[n](t)}}},{key:"setBackgroundColor",value:function(e){this.background=e,this.drawBackground()}},{key:"setHighlightColor",value:function(e){this.highlight=e,this.drawBackground()}},{key:"drawBackground",value:function(){var e=this.container.clientWidth,t=this.container.clientHeight;this.bgContext.fillStyle=this.background,this.bgContext.clearRect(0,0,e,t),this.bgContext.fillRect(0,0,e,t);for(var n=0;n<2*g.length;++n){var r=this.scaleY(n);this.bgContext.fillStyle=this.highlight+"55",this.bgContext.fillRect(0,r,e,1),this.bgContext.fillStyle=this.highlight,this.bgContext.font="14px Fira Sans",this.bgContext.fillText(g[n%g.length],this.scaleX(0)+20,r-2)}this.bgContext.fillStyle=this.highlight+"55",this.bgContext.fillRect(this.scaleX(0),0,1,t)}},{key:"drawNotes",value:function(){var e=this.container.clientWidth,t=this.container.clientHeight;this.noteContext.clearRect(0,0,e,t),this.noteContext.beginPath(),this.noteContext.strokeStyle="rgba(0, 0, 0, 0.1)";var n,r=[],a=Object(f.a)(this.frequencies);try{for(a.s();!(n=a.n()).done;){var i=n.value,c=i.time,o=i.clarity,s=this.scaleX(c-this.now),l=i.melodyPitch?i.melodyPitch:i.pitch,u=this.scaleY((l+7)%24);r.push({time:c,x:s,y:u,clarity:o,color:[254,74,73]})}}catch(g){a.e(g)}finally{a.f()}for(var h=0,d=r;h<d.length;h++){var j=d[h],b=j.x,p=j.y,x=j.clarity,v=j.color;this.noteContext.fillStyle="rgba(".concat(v[0],", ").concat(v[1],", ").concat(v[2],", ").concat(.5*x,")"),this.noteContext.beginPath(),this.noteContext.arc(b,p,5,0,2*Math.PI),this.noteContext.fill()}}},{key:"drawTimeMarkers",value:function(e){for(var t=this.container.clientHeight,n=[],r=-this.timeSpan/2;r<=this.timeSpan/2;r+=1e3)n.push({x:this.scaleX(r-e%1e3),y:t-20});this.noteContext.fillStyle=this.highlight;for(var a=0,i=n;a<i.length;a++){var c=i[a];this.noteContext.beginPath(),this.noteContext.arc(c.x,c.y,2,0,2*Math.PI),this.noteContext.fill()}}},{key:"drawMelody",value:function(e){var t=this.container.clientWidth,n=this.container.clientHeight,r=this.melodyContext;r.clearRect(0,0,t,n),r.strokeStyle="rgba(32, 164, 243, 0.8)",r.lineWidth=n/36,r.lineCap="round";var a,i=Object(f.a)(this.melodyNotes);try{for(i.s();!(a=i.n()).done;){var c=a.value,o=c.start,s=c.duration,l=c.pitch,u=this.scaleX(o-e),h=this.scaleX(o-e+s),d=this.scaleY((l+7)%24);r.beginPath(),r.moveTo(u+r.lineWidth/2,d),r.lineTo(h-r.lineWidth/2,d),r.stroke()}}catch(j){i.e(j)}finally{i.f()}}}]),e}(),y=n(28),w=n(118),k=n(119),C=n(120),S=n(121),T=n(122);n(81);function N(e){var t=e.color,n=e.colorPressed,i=e.className,c=e.Icon,o=e.onCancel,s=e.onPress,l=e.onRelease,u=e.size,d=Object(a.useState)(!1),j=Object(h.a)(d,2),b=j[0],f=j[1],p=function(){f(!0),s&&s()},x=function(){f(!1),l&&l()},v=function(){f(!1),o&&o()};return Object(r.jsx)("div",{className:"ctrl-btn ".concat(b?"ctrl-btn-pressed":""," ").concat(i),onMouseDown:p,onMouseUp:x,onMouseLeave:v,onTouchStart:p,onTouchEnd:x,onTouchCancel:v,children:Object(r.jsx)(c,{color:b?n:t,size:u})})}var I=function(e){return Object(r.jsx)(N,Object(y.a)({Icon:w.a},e))},E=function(e){return Object(r.jsx)(N,Object(y.a)({Icon:k.a},e))},P=function(e){return Object(r.jsx)(N,Object(y.a)({Icon:C.a},e))},F=function(e){var t=Object(a.useState)(!1),n=Object(h.a)(t,2),i=n[0],c=n[1],o=e.inIntro||i?S.a:T.a;return Object(r.jsx)(N,Object(y.a)(Object(y.a)({Icon:o},e),{},{onPress:function(){e.inIntro&&c(!0),e.onPress()},onRelease:function(){i&&c(!1),e.onRelease()},onCancel:function(){i&&c(!1),e.onCancel()}}))},L="#e8eaec",M=n(11),R=n(59),A=Object(M.createStore)({windowSize:2048,detectorName:"mcleod",clarityThreshold:.7,enabled:!1,loading:!1,loaded:!1,stream:null,audioOptions:{audio:{echoCancellation:!0,autoGainControl:!0}},workerConnection:null,melody:{},error:null,setWindowSize:Object(M.action)((function(e,t){e.windowSize=t})),setDetectorName:Object(M.action)((function(e,t){e.detectorName=t})),setClarityThreshold:Object(M.action)((function(e,t){e.clarityThreshold=t})),setEnabled:Object(M.action)((function(e,t){e.enabled=t})),setStream:Object(M.action)((function(e,t){e.stream=t})),setLoading:Object(M.action)((function(e,t){e.loading=t})),setLoaded:Object(M.action)((function(e,t){e.loaded=t})),setWorkerConnection:Object(M.action)((function(e,t){e.workerConnection=t})),setError:Object(M.action)((function(e,t){e.error=t})),checkAudioContextSupport:Object(M.thunk)((function(e,t,n){n.getState;void 0===(window.AudioContext||window.webkitAudioContext)&&(e.setError("audio-context"),console.error("Browser does not have window.AudioContext support"))})),initializeStream:Object(M.thunk)(function(){var e=Object(u.a)(l.a.mark((function e(t,n,r){var a,i,c,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.getState,i=a(),c=i.audioOptions,t.setLoading(!0),e.prev=4,e.next=7,navigator.mediaDevices.getUserMedia(c);case 7:o=e.sent,t.setStream(o),t.setLoading(!1),t.setLoaded(!0),e.next=20;break;case 13:e.prev=13,e.t0=e.catch(4),t.setError("mic-stream"),console.error(e.t0),t.setStream(null),t.setLoading(!1),t.setLoaded(!1);case 20:case"end":return e.stop()}}),e,null,[[4,13]])})));return function(t,n,r){return e.apply(this,arguments)}}()),stopStream:Object(M.thunk)(function(){var e=Object(u.a)(l.a.mark((function e(t,n,r){var a,i,c,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=r.getState,i=a().stream){c=Object(f.a)(i.getTracks());try{for(c.s();!(o=c.n()).done;)o.value.stop()}catch(n){c.e(n)}finally{c.f()}}t.setStream(null),t.setLoading(!1),t.setLoaded(!1);case 6:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}()),initializeWorker:Object(M.thunk)(function(){var e=Object(u.a)(l.a.mark((function e(t){var n,r,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new Worker("".concat("/app","/pitch-detection/worker.js")),r=new R.b({worker:n}),e.prev=2,e.next=5,Object(R.a)(r,{},5,1e3);case 5:a=e.sent,t.setWorkerConnection(a),e.next=14;break;case 9:e.prev=9,e.t0=e.catch(2),t.setError("worker"),console.error("Failed to connect to worker",e.t0),t.setWorkerConnection(null);case 14:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()),setMelodyNotes:Object(M.action)((function(e,t){e.melody.notes=t}))}),B=Object(M.createTypedHooks)(),z=B.useStoreActions,W=(B.useStoreDispatch,B.useStoreState);var D=function(e){var t=e.freq,n=e.clarity,c=Object(a.useRef)(),o=Object(a.useState)(!1),s=Object(h.a)(o,2),f=s[0],p=s[1],x=Object(a.useCallback)((function(){if(c.current){if(t&&t>0){var e=(new Date).getTime();c.current.pushFrequency({frequency:t,clarity:n||0,time:e})}c.current.render(!1)}}),[n,t]);t&&t>0&&requestAnimationFrame((function(e){return x(e)})),function(e){var t=Object(a.useRef)();Object(a.useEffect)((function(){return t.current=requestAnimationFrame((function n(r){e(r),t.current=requestAnimationFrame(n)})),function(){cancelAnimationFrame(t.current)}}),[])}(x),Object(a.useEffect)((function(){var e=function(){c.current&&c.current.resize()};return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]);var v=W((function(e){return e.melody.notes})),g=v&&v.notes&&v.notes.length;Object(a.useEffect)((function(){c.current&&v&&v.notes&&c.current.setMelodyNotes(v.notes)}),[v]);var O=z((function(e){return e})),y=O.stopStream,w=O.setEnabled,k=L,C="#a6a8aa",S=Object(a.useCallback)((function(e){e&&!c.current&&(c.current=new m(e,6e3),c.current.setBackgroundColor(L),v&&c.current.setMelodyNotes(v),c.current.playSong())}),[v]);Object(a.useEffect)((function(){if(c.current)return c.current.subscribeToIntroState((function(e){return p(e)}))}),[]);var T=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return w(!1),e.next=3,y();case 3:console.log("Stream Stopped");case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),N=Object(r.jsxs)(d.a,{id:"popover-skip-intro",className:"unselectable",children:[Object(r.jsx)(d.a.Title,{as:"h3",children:"Skip intro"}),Object(r.jsx)(d.a.Content,{children:"Press and hold until you start singing."})]});return Object(r.jsxs)(i.a.Fragment,{children:[Object(r.jsx)("div",{className:"full unselectable",ref:S}),Object(r.jsx)("div",{className:"navbar-space unselectable"}),Object(r.jsxs)(j.a,{fixed:"bottom",bg:"dark",className:"justify-content-center unselectable",children:[g&&Object(r.jsx)(b.a,{show:f,placement:"top",overlay:N,children:Object(r.jsx)(F,{onPress:function(){return c.current.seekToFirstNote()},onRelease:function(){return c.current.playSong()},onCancel:function(){return c.current.playSong()},className:"btn-skip-start",size:50,color:k,colorPressed:C,inIntro:f})}),g&&Object(r.jsx)(E,{onPress:function(){return c.current.pauseSong()},onRelease:function(){return c.current.playSong()},onCancel:function(){return c.current.playSong()},className:"btn-pause",size:50,color:k,colorPressed:C}),Object(r.jsx)(P,{onRelease:T,className:"btn-stop",size:50,color:k,colorPressed:C}),g&&Object(r.jsx)(I,{onPress:function(){return c.current.fastForwardSong()},onRelease:function(){return c.current.playSong()},className:"btn-forward",size:50,color:k,colorPressed:C})]})]})},U=function(e,t){for(var n=0;n<e.length;n++)t[n]=e[n]/128-1};function q(e){var t=e.stream,n=e.detectorName,a=e.workerConnection,c=e.windowSize,o=e.powerThreshold,s=e.clarityThreshold,d=e.enabled,j=e.pitchRenderer,b=i.a.useState(null),f=Object(h.a)(b,2),p=f[0],x=f[1],v=i.a.useState(null),g=Object(h.a)(v,2),O=g[0],m=g[1],y=i.a.useRef(!1),w=i.a.useRef({}),k=i.a.useCallback(Object(u.a)(l.a.mark((function e(){var r,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.remoteHandle().call("createDetector",n,c,c/2);case 2:(r=w.current).buffer=new Float32Array(c),r.audioContext=new(window.AudioContext||window.webkitAudioContext),i=r.audioContext.createMediaStreamSource(t),r.analyser=r.audioContext.createAnalyser(),void 0===r.analyser.getFloatTimeDomainData&&(r.byteBuffer=new Uint8Array(c)),r.analyser.fftSize=c,i.connect(r.analyser);case 10:case"end":return e.stop()}}),e)}))),[w,c,n,t,a]),C=i.a.useCallback(Object(u.a)(l.a.mark((function e(){var t,n,r,i,c,u,h,d;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(y.current){e.next=15;break}if(y.current=!0,t=w.current,n=t.analyser,r=t.buffer,i=t.byteBuffer,c=t.audioContext,n&&r&&c){e.next=7;break}return console.warn("Trying to update the pitch, but missing an analyser/buffer/audioContext"),e.abrupt("return");case 7:return void 0!==n.getFloatTimeDomainData?n.getFloatTimeDomainData(r):(n.getByteTimeDomainData(i),U(i,r)),e.next=10,a.remoteHandle().call("getPitch",r,c.sampleRate,o,s);case 10:u=e.sent,h=u[0],d=u[1],h>0?(x(h),m(d)):(x(null),m(null)),y.current=!1;case 15:case"end":return e.stop()}}),e)}))),[y,w,x,m,o,s,a]);i.a.useEffect((function(){if(d){console.log("Starting audio monitoring.");var e={cancelRender:!1};return Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k();case 2:t();case 3:case"end":return e.stop()}}),e)})))(),function(){console.log("Stopping audio monitoring."),e.cancelRender=!0}}function t(){e.cancelRender||(requestAnimationFrame(t),C())}}),[k,C,d]);var S=j;return Object(r.jsx)(S,{freq:p,clarity:O})}var G=n(35),H=n.n(G),X=n(50);function K(e){var t=e.children,n=z((function(e){return e})).setMelodyNotes;return Object(a.useEffect)((function(){var e=function(){var e=H.a.parse(window.location.search.substr(1));if(e.s1)try{return Object(X.a)(e.s1)}catch(t){alert(t.toString())}}();e&&n(e)}),[n]),Object(r.jsx)(i.a.Fragment,{children:Object(r.jsx)("div",{className:"main-container",children:t})})}var Y=n(132),_=n(130),V=n(123),J=n(124),Q=n(68);n(106);function Z(){return Object(r.jsx)(V.a,{children:Object(r.jsx)(J.a,{children:Object(r.jsxs)(Q.a,{children:[Object(r.jsx)("h3",{children:"FAQ"}),Object(r.jsx)("h5",{children:"How does this app work?"}),Object(r.jsx)("p",{children:"If you opened this by a link that contains a melody, you can see the information about it. By pressing start you can practice singing the melody using your microphone."}),Object(r.jsx)("p",{children:"If you can't see any song information, you can practice singing without notes by pressing start."}),Object(r.jsx)("h5",{children:"Why doesn't this app work?"}),Object(r.jsx)("p",{children:"Make sure that your microphone is working and you have allowed this site to use it. It's also possible that your browser does not support the technology that this app uses. Try the newest Google Chrome browser."}),Object(r.jsx)("h5",{children:"How does this app handle my voice?"}),Object(r.jsx)("p",{children:"The app respects your privacy. Your voice is not stored and is not sent out from your browser. The app uses your mic only to detect the pitch from your singing."}),Object(r.jsx)("h5",{children:"Where is the music?"}),Object(r.jsx)("p",{children:"This service does not contain any music for copyright reasons. Links can be provided to play the music and to read the lyrics from other services."}),Object(r.jsx)("h5",{children:"Will this app be always free?"}),Object(r.jsx)("p",{children:"Yes. This is an open source project."}),Object(r.jsx)("h3",{children:"Source"}),Object(r.jsx)("p",{children:Object(r.jsx)("a",{href:"https://github.com/vocalous/app",target:"_blank",rel:"noreferrer",children:"https://github.com/vocalous/app"})})]})})})}var $=n(129),ee=n(125),te=n(134),ne="https://tinyurl.com/api-create.php?url=";function re(e){return ae.apply(this,arguments)}function ae(){return(ae=Object(u.a)(l.a.mark((function e(t){var n,r,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(ne).concat(encodeURIComponent(t)),e.next=3,fetch(n);case 3:if(!(r=e.sent).ok){e.next=11;break}return e.next=7,r.text();case 7:return a=e.sent,e.abrupt("return",a);case 11:return console.error("Error response from Tiny URL",r),e.abrupt("return",void 0);case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ie(e){var t,n,r=0,a=[],i=e.split("\n");function c(e){t=e,n=6e4/e/4}function o(e){var t=e.substr(1).split(":"),n=t[0].toLowerCase(),a=t[1];if("bpm"===n)c(parseFloat(a.replace(",","."),10));else if("gap"===n)r=parseFloat(a.replace(",","."),10);else if("relative"===n)throw new Error("Relative notes not supported!")}function s(e){var t=e.substr(2).split(" ");if(t.length>3){var i=r+parseInt(t[0],10)*n,c=parseInt(t[1],10)*n,o=parseInt(t[2],10),s=Math.floor(i);if(a.length>0){var l=a[a.length-1];l.start+l.duration>=s&&(l.duration=s-l.start)}a.push({start:s,duration:Math.floor(c),pitch:o})}}c(180);for(var l="header",u=0;u<i.length;u++){var h=i[u];"header"===l&&(h.startsWith(": ")?l="notes":h.startsWith("#")&&o(h)),"notes"===l&&(h.startsWith(": ")||h.startsWith("G ")||h.startsWith("F "))&&s(h)}return{bpm:t,gap:r,notes:a}}n(107);function ce(e){var t=e.onComplete,n=Object(a.useState)(""),i=Object(h.a)(n,2),c=i[0],o=i[1],s=Object(a.useState)(""),d=Object(h.a)(s,2),j=d[0],b=d[1],f=Object(a.useState)(""),p=Object(h.a)(f,2),x=p[0],v=p[1],g=Object(a.useState)(""),O=Object(h.a)(g,2),m=O[0],w=O[1],k=Object(a.useState)(),C=Object(h.a)(k,2),S=C[0],T=C[1],N=Object(a.useState)(),I=Object(h.a)(N,2),E=I[0],P=I[1],F=Object(a.useState)(!0),L=Object(h.a)(F,2),M=L[0],R=L[1],A=Object(a.useState)(!1),B=Object(h.a)(A,2),z=B[0],W=B[1],D=Object(a.useState)(),U=Object(h.a)(D,2),q=U[0],G=U[1],K=function(){var e=Object(u.a)(l.a.mark((function e(n){var r,a,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=window.location.href.split("?")[0],a=H.a.stringify(Object(y.a)({title:c||void 0,author:j||void 0,music:x||void 0,lyrics:m||void 0},n)),i="".concat(r,"?").concat(a),!t){e.next=9;break}if(!M){e.next=8;break}return e.next=7,re(i);case 7:i=e.sent;case 8:t(i);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Y=function(){var e=Object(u.a)(l.a.mark((function e(t,n){var r,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!(r=ie(t))||!r.notes.length){e.next=10;break}if(!n.checkValidity()){e.next=7;break}return a=Object(X.b)(r),e.next=7,K({s1:a});case 7:P(!0),e.next=11;break;case 10:G("invalid");case 11:e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.error(e.t0);case 16:W(!1);case 17:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(t,n){return e.apply(this,arguments)}}();return Object(r.jsxs)($.a,{noValidate:!0,validated:E,onSubmit:function(e){e.preventDefault(),e.stopPropagation();var t=e.currentTarget;S?function(e){W(!0);var t=new FileReader;t.addEventListener("load",(function(n){Y(t.result,e)})),t.readAsText(S)}(t):G("no-file")},children:[Object(r.jsxs)($.a.Group,{children:[Object(r.jsx)($.a.Label,{children:"Song title"}),Object(r.jsx)($.a.Control,{required:!0,type:"text",placeholder:"Song title",value:c,maxLength:"64",onChange:function(e){return o(e.target.value)}})]}),Object(r.jsxs)($.a.Group,{controlId:"import-file-group",children:[Object(r.jsxs)($.a.File,{id:"import-file",custom:!0,children:[Object(r.jsx)($.a.File.Input,{accept:".txt",isInvalid:!!q,onChange:function(e){e.target.files.length>0?T(e.target.files[0]):T(void 0),G(),P(!1)},required:!0}),Object(r.jsx)($.a.File.Label,{children:"UltraStar TXT file"}),Object(r.jsx)($.a.Control.Feedback,{type:"invalid",children:"Make sure the file is in UltraStar TXT format and it contains at least one note."})]}),Object(r.jsx)($.a.Text,{className:"text-muted",children:"The notes file. The lyrics are ignored."}),q&&Object(r.jsx)("div",{className:"invalid-feedback",children:"Foo Something wrong with the file. Make sure it is UltraStar TXT file or it contains at least one note."})]}),Object(r.jsxs)($.a.Group,{children:[Object(r.jsx)($.a.Label,{children:"Link to song"}),Object(r.jsx)($.a.Control,{type:"text",placeholder:"https://songs.com/my-song",value:x,onChange:function(e){return v(e.target.value)}}),Object(r.jsx)($.a.Text,{className:"text-muted",children:"Optional link to the song where it can be played."})]}),Object(r.jsxs)($.a.Group,{children:[Object(r.jsx)($.a.Label,{children:"Link to lyrics"}),Object(r.jsx)($.a.Control,{type:"text",placeholder:"https://lyrics.com/my-lyrics",value:m,onChange:function(e){return w(e.target.value)}}),Object(r.jsx)($.a.Text,{className:"text-muted",children:"Optional link to the song lyrics."})]}),Object(r.jsxs)($.a.Group,{children:[Object(r.jsx)($.a.Label,{children:"Link author"}),Object(r.jsx)($.a.Control,{type:"text",placeholder:"John Doe <john@doe.com>",value:j,maxLength:"64",onChange:function(e){return b(e.target.value)}}),Object(r.jsx)($.a.Text,{className:"text-muted",children:"Optional information about who generated this link. Name, email, etc."})]}),Object(r.jsx)($.a.Group,{controlId:"use-tinyurl",children:Object(r.jsx)($.a.Check,{type:"switch",id:"use-tinyurl-switch",label:"Shorten link with TinyURL",checked:M,onChange:function(){return R(!M)}})}),Object(r.jsx)($.a.Group,{children:Object(r.jsx)(ee.a,{type:"submit",variant:"secondary",disabled:z,children:z?"CREATING...":"CREATE LINK"})})]})}function oe(e){var t=e.url,n=Object(a.useState)(!1),i=Object(h.a)(n,2),c=i[0],o=i[1],s=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.clipboard.writeText(t);case 2:o(!0);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),d=c?"Copied!":"Copy";return Object(r.jsx)(ee.a,{onClick:s,variant:"secondary",children:d})}function se(e){var t=e.url;return t?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(J.a,{className:"mt-4 mb-3",children:Object(r.jsx)(Q.a,{children:Object(r.jsx)("div",{className:"circled-nbr text-center",children:"3"})})}),Object(r.jsx)(J.a,{children:Object(r.jsx)(Q.a,{children:Object(r.jsxs)(te.a,{body:!0,children:[Object(r.jsx)("h4",{children:"The link is ready!"}),"Anyone can practice the song using this link:",Object(r.jsx)("br",{}),Object(r.jsx)("span",{className:"created-link",children:t}),Object(r.jsx)("div",{className:"float-right",children:Object(r.jsx)(oe,{url:t})})]})})})]}):null}function le(){var e=Object(a.useState)(),t=Object(h.a)(e,2),n=t[0],i=t[1];return Object(r.jsxs)(V.a,{children:[Object(r.jsx)(J.a,{className:"mb-4",children:Object(r.jsxs)(Q.a,{children:[Object(r.jsx)("div",{className:"circled-nbr text-center",children:"1"}),"First you need ",Object(r.jsx)("strong",{children:"the notes file in UltraStar TXT format"}),". If you can't find the notes file, you can create one by using an editor like these:",Object(r.jsxs)("ul",{className:"mt-3",children:[Object(r.jsx)("li",{children:"Yass - Karaoke Editor"}),Object(r.jsx)("li",{children:"Performous Composer"}),Object(r.jsx)("li",{children:"UltraStar Creator"})]}),"Note that lyrics will be ignored."]})}),Object(r.jsx)(J.a,{children:Object(r.jsx)(Q.a,{children:Object(r.jsx)("div",{className:"circled-nbr text-center",children:"2"})})}),Object(r.jsx)(ce,{onComplete:function(e){return i(e)}}),Object(r.jsx)(se,{url:n})]})}var ue=n(126),he=n(69),de=n.n(he),je=n(128);function be(e){var t=e.error,n=e.show,a=e.onClose,i="Oh no! Some error happened. Try using Google Chrome browser.";return"mic-stream"===t?i=Object(r.jsxs)("div",{children:["Oh no! This app cannot use your mic. Try to:",Object(r.jsxs)("ul",{children:[Object(r.jsx)("li",{children:"make sure you have the microphone connected"}),Object(r.jsx)("li",{children:"make sure you allowed this site to use your mic"}),Object(r.jsx)("li",{children:"use Google Chrome"})]})]}):"audio-context"===t&&(i=Object(r.jsx)("div",{children:"Yikes! It seems that this app does not work on this device and/or browser. Try Google Chrome."})),Object(r.jsxs)(je.a,{show:n,onHide:a,backdrop:"static",keyboard:!1,children:[Object(r.jsx)(je.a.Header,{closeButton:!0,children:Object(r.jsx)(je.a.Title,{children:"Error \ud83d\ude30"})}),Object(r.jsx)(je.a.Body,{children:i}),Object(r.jsx)(je.a.Footer,{children:Object(r.jsx)(ee.a,{variant:"secondary",onClick:a,children:"OK"})})]})}function fe(){var e=Object(a.useState)(!1),t=Object(h.a)(e,2),n=t[0],i=t[1],c=z((function(e){return e})),o=c.initializeStream,s=c.setEnabled;Object(a.useEffect)((function(){var e=setTimeout((function(){return i(!0)}),500);return function(){return clearTimeout(e)}}),[]);var d=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o();case 2:s(!0),console.log("Stream Initialized");case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.jsx)(ee.a,{className:"btn-start",variant:"primary",onClick:d,disabled:!n,children:Object(r.jsxs)("div",{className:"btn-start-content",children:[Object(r.jsx)("div",{className:"btn-start-text",children:"START"}),Object(r.jsx)(ue.a,{size:40,color:"white"})]})})}function pe(e){var t=e.link,n=e.target;return Object(r.jsx)("a",{href:t,target:n||"_blank",rel:"noreferrer",children:t})}function xe(){var e=H.a.parse(window.location.search.substr(1)),t=e.author,n=e.lyrics,a=e.music,i=e.title;if(!W((function(e){return e.melody.notes})))return null;var c=i?"".concat(i," \u2013 Vocalous"):void 0;return Object(r.jsxs)("div",{className:"song-info",children:[c&&Object(r.jsxs)(de.a,{id:i.replace(/[\W_]+/g,"x"),children:[Object(r.jsx)("title",{children:c}),Object(r.jsx)("meta",{property:"og:title",content:c})]}),Object(r.jsxs)(V.a,{children:[Object(r.jsx)(J.a,{children:Object(r.jsx)(Q.a,{children:Object(r.jsx)("h3",{children:"This link contains notes"})})}),Object(r.jsxs)(J.a,{children:[Object(r.jsx)(Q.a,{md:6,children:Object(r.jsxs)("div",{className:"song-info-details",children:[Object(r.jsx)("div",{children:Object(r.jsx)("strong",{children:i||"Untitled"})}),t&&Object(r.jsx)("div",{children:t}),a&&Object(r.jsxs)("div",{children:["Music: ",Object(r.jsx)(pe,{link:a,target:"music--page"})]}),n&&Object(r.jsxs)("div",{children:["Lyrics: ",Object(r.jsx)(pe,{link:n,target:"lyrics--page"})]})]})}),Object(r.jsxs)(Q.a,{md:6,children:[Object(r.jsx)("h5",{children:"Sing it!"}),Object(r.jsxs)("ol",{children:[Object(r.jsx)("li",{children:"Grab your headphones"}),a&&Object(r.jsx)("li",{children:"Start playing the music from the link"}),Object(r.jsxs)("li",{children:["Press the ",Object(r.jsx)("strong",{children:"start"})," button and allow using your mic"]})]})]})]})]})]})}function ve(){var e=W((function(e){return e.error})),t=z((function(e){return e})).setError;return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(xe,{}),Object(r.jsx)(V.a,{children:Object(r.jsx)(J.a,{children:Object(r.jsx)(Q.a,{className:"text-center",children:Object(r.jsx)(fe,{})})})}),Object(r.jsx)(be,{show:!!e,onClose:function(){return t(null)},error:e})]})}function ge(){return Object(r.jsxs)("div",{className:"heading",children:[Object(r.jsx)("h1",{children:"VOCALOUS"}),Object(r.jsx)("div",{children:"Practice singing for free"})]})}function Oe(){return Object(r.jsxs)(Y.a.Container,{id:"tab-container",defaultActiveKey:"sing",children:[Object(r.jsxs)(_.a,{variant:"pills",children:[Object(r.jsx)(_.a.Item,{children:Object(r.jsx)(_.a.Link,{eventKey:"sing",children:"SING"})}),Object(r.jsx)(_.a.Item,{children:Object(r.jsx)(_.a.Link,{eventKey:"create",children:"CREATE"})}),Object(r.jsx)(_.a.Item,{children:Object(r.jsx)(_.a.Link,{eventKey:"help",children:Object(r.jsx)("strong",{children:"?"})})})]}),Object(r.jsxs)(Y.a.Content,{children:[Object(r.jsx)(Y.a.Pane,{eventKey:"sing",children:Object(r.jsx)(ve,{})}),Object(r.jsx)(Y.a.Pane,{eventKey:"create",children:Object(r.jsx)(le,{})}),Object(r.jsx)(Y.a.Pane,{eventKey:"help",children:Object(r.jsx)(Z,{})})]})]})}function me(){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(ge,{}),Object(r.jsx)(Oe,{})]})}var ye=function(){var e=W((function(e){return e.detectorName})),t=W((function(e){return e.windowSize})),n=W((function(e){return e.clarityThreshold})),a=W((function(e){return e.enabled})),c=W((function(e){return{loaded:e.loaded,loading:e.loading,stream:e.stream,workerConnection:e.workerConnection}})),o=c.loaded,s=c.stream,h=c.workerConnection,d=z((function(e){return e})),j=d.checkAudioContextSupport,b=d.initializeWorker;i.a.useEffect((function(){Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b();case 2:return console.log("Worker initialized"),e.next=5,j();case 5:case"end":return e.stop()}}),e)})))()}),[j,b]);var f=Object(r.jsx)(me,{});if(o&&s&&h){var p=D;f=Object(r.jsx)(q,{stream:s,detectorName:e,workerConnection:h,windowSize:t,powerThreshold:.15,clarityThreshold:n,enabled:a,pitchRenderer:p})}return Object(r.jsx)(K,{children:f})},we=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,135)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),r(e),a(e),i(e),c(e)}))};n(111);o.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(M.StoreProvider,{store:A,children:Object(r.jsx)(ye,{})})}),document.getElementById("root")),we()},50:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return h})),n.d(t,"b",(function(){return d}));var r=100,a=5,i=4,c=6,o=11,s=6,l=6;function u(e,t){return e<1<<a&&t<1<<i}function h(t){var n=[],u=function(e){return e.replace(/_/g,"+").replace(/\./g,"/").replace(/-/g,"=")}(t),h=e.from(u,"base64");if(h.length<2)throw new Error("No content");var d=0,j=0,b=h.readUInt16BE(d);d+=2;var f=h.readUInt16BE(d);d+=2,j+=f;for(var p=new Date(864e5*f),x=0;d<h.length;){var v=void 0,g=void 0,O=void 0,m=void 0;if(128&h.readUIntBE(d,1)){v=3;var y=h.readUIntBE(d,v);g=y>>s+l&(1<<o)-1,O=y>>l&(1<<s)-1,m=y&(1<<l)-1&(1<<l)-1,j+=y}else{v=2;var w=h.readUIntBE(d,v);g=w>>i+c&(1<<a)-1,O=w>>c&(1<<i)-1,m=w&(1<<c)-1&(1<<c)-1,j+=w}var k={start:x+g*r,duration:O*r,pitch:m};n.push(k),x=k.start+k.duration,d+=v}if((65535&j)!==b)throw new Error("Corrupted data: invalid checksum");return{created:p,notes:n}}function d(t){var n=[],h=0,d=0;function j(e,t,n){if(e>(1<<t)-1)throw new Error("".concat(t," bits not enough for value ").concat(e,", use another encoding"));return e<<n}!function(){var t=Math.floor((new Date).getTime()/864e5),r=e.alloc(2);r.writeUInt16BE(t),n.push(r),d+=t}();for(var b=0;b<t.notes.length;b++){var f=t.notes[b],p=Math.floor((f.start-h*r)/r),x=Math.floor(f.duration/r);h+=p+x;var v=f.pitch;if(u(p,x)){var g=j(p,a,i+c);g+=j(x,i,c),g+=j(v,c,0);var O=e.alloc(2);O.writeUInt16BE(g),n.push(O),d+=g}else{var m=1<<23;m+=j(p,o,s+l),m+=j(x,s,l),m+=j(v,l,0);var y=e.alloc(3);y.writeUIntBE(m,0,3),n.push(y),d+=m}}var w=e.alloc(2);return w.writeUInt16BE(65535&d),n.unshift(w),function(e){return e.replace(/\+/g,"_").replace(/\//g,".").replace(/=/g,"-")}(e.concat(n).toString("base64"))}}).call(this,n(102).Buffer)},79:function(e,t,n){},81:function(e,t,n){}},[[112,1,2]]]);
//# sourceMappingURL=main.1067ceef.chunk.js.map