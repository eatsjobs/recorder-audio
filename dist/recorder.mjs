var t=function(t){void 0===t&&(t={}),this.start=this.start.bind(this),this.stop=this.stop.bind(this),this.onStop=this.onStop.bind(this),this.onPause=this.onPause.bind(this),this.onResume=this.onResume.bind(this),this.addListeners=this.addListeners.bind(this),this.handleAudioChunks=this.handleAudioChunks.bind(this),this.init=this.init.bind(this),this.audioChunks=[],this.mediaRecorder=null,this.initPromise=null},e={state:{configurable:!0}};t.prototype.init=function(){var t=this;return this.initPromise=navigator.mediaDevices.getUserMedia({audio:!0}).then(function(e){return t.mediaRecorder=new MediaRecorder(e),t.addListeners(),t.mediaRecorder}).catch(function(t){console.log(t.message)}),this.initPromise},t.prototype.onStart=function(){console.log("start")},t.prototype.onStop=function(){console.log("stop")},t.prototype.onPause=function(){console.log("pause")},t.prototype.onResume=function(){console.log("resume")},t.prototype.addListeners=function(){this.mediaRecorder.addEventListener("dataavailable",this.handleAudioChunks),this.mediaRecorder.addEventListener("start",this.onStart),this.mediaRecorder.addEventListener("stop",this.onStop),this.mediaRecorder.addEventListener("pause",this.onPause),this.mediaRecorder.addEventListener("resume",this.onResume)},t.prototype.handleAudioChunks=function(t){this.audioChunks.push(t.data)},t.prototype.start=function(){var t=this;return this.audioChunks=[],this.initPromise?this.initPromise.then(function(){return t.mediaRecorder.start(),t.mediaRecorder}):this.init().then(function(){return t.mediaRecorder.start(),t.mediaRecorder})},e.state.get=function(){return this.mediaRecorder?this.mediaRecorder.state:"inactive"},t.prototype.stop=function(){var t=this;return new Promise(function(e,i){t.mediaRecorder.addEventListener("stop",function(){var i=new Blob(t.audioChunks),o=window.URL.createObjectURL(i),n=new Audio(o);e({audioBlob:i,audioUrl:o,audio:n})}),t.mediaRecorder.stop()})},Object.defineProperties(t.prototype,e);export default t;
//# sourceMappingURL=recorder.mjs.map
