var t=function(t){void 0===t&&(t={}),this.start=this.start.bind(this),this.stop=this.stop.bind(this),this.addListeners=this.addListeners.bind(this),this.handleAudioChunks=this.handleAudioChunks.bind(this),this.dispose=this.dispose.bind(this),this.init=this.init.bind(this),this.state=this.state.bind(this),this.audioChunks=[],this.mediaRecorder=null};t.prototype.init=function(){var t=this;return navigator.mediaDevices.getUserMedia({audio:!0}).then(function(i){return t.mediaRecorder=new MediaRecorder(i),t.addListeners(),t.mediaRecorder}).catch(function(t){console.log(t.message)})},t.prototype.onStart=function(){},t.prototype.onStop=function(){},t.prototype.onPause=function(){},t.prototype.onResume=function(){},t.prototype.addListeners=function(){this.mediaRecorder.addEventListener("dataavailable",this.handleAudioChunks)},t.prototype.handleAudioChunks=function(t){this.audioChunks.push(t.data)},t.prototype.start=function(){this.audioChunks=[],this.mediaRecorder.start()},t.prototype.state=function(){return this.mediaRecorder.state},t.prototype.dispose=function(){this.audioBlob=null,this.audioUrl=null,this.audio=null,this.mediaRecorder=null,this.audioChunks=[],this.init=null},t.prototype.stop=function(){var t=this;return new Promise(function(i,e){t.mediaRecorder.addEventListener("stop",function(){var e=new Blob(t.audioChunks),o=window.URL.createObjectURL(e),n=new Audio(o);i({audioBlob:e,audioUrl:o,audio:n})}),t.mediaRecorder.stop()})};export default t;
//# sourceMappingURL=recorder.mjs.map
