class Recorder {
  constructor(options = {}) {
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.addListeners = this.addListeners.bind(this);
    this.handleAudioChunks = this.handleAudioChunks.bind(this);
    this.dispose = this.dispose.bind(this);
    this.init = this.init.bind(this);
    this.state = this.state.bind(this);

    this.audioChunks = [];
    this.audioBlob = null;
    this.audioUrl = null;
    // audio element
    this.audio = null;
    this.mediaRecorder = null;
  }

  _checkInit() {
    if (!this.init) { console.warn('Call init first'); }
    return false;
  }

  init() {
    this.init = navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.addListeners();
        return this.mediaRecorder;
      })
      .catch(err => {
        console.log(err.message);
      });
    return this.init;
  }

  onStart() {

  }

  onStop() {

  }

  onPause() {

  }

  onResume() {

  }
  
  addListeners() {
    this.mediaRecorder.addEventListener('dataavailable', this.handleAudioChunks);
    /*this.mediaRecorder.addEventListener('start', this.onStart);
    this.mediaRecorder.addEventListener('stop', this.onStop);
    this.mediaRecorder.addEventListener('pause', this.onPause);
    this.mediaRecorder.addEventListener('resume', this.onResume);*/
  }

  handleAudioChunks(event) {
    
    this.audioChunks.push(event.data);
    console.log(this.audioChunks);
  }

  start() {
    this._checkInit();
    return this.init.then(() => this.mediaRecorder.start());
  }

  state() {
    if (this.init) {
      return this.mediaRecorder.state;
    }
    return 'indeterminate';
  }

  dispose() {
    this.audioBlob = null;
    // URL.revokeObjectURL(this.audioUrl);
    this.audioUrl = null;
    this.audio = null;
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.init = null;
  }

  stop() {
    this._checkInit();
    return new Promise((resolve, reject) => {
      this.mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(this.audioChunks);
          const audioUrl = window.URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const result = { audioBlob, audioUrl, audio };
          console.log(result);
          debugger
          resolve(result);
      });
      this.mediaRecorder.stop();
    });

  }
}

// singleton
export default new Recorder