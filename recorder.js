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
    this.mediaRecorder = null;

  }

  init() {
    return navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.addListeners();
        return this.mediaRecorder;
      })
      .catch(err => {
        console.log(err.message);
      });
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
  }

  start() {
    this.audioChunks = [];
    this.mediaRecorder.start();
  }

  state() {
    return this.mediaRecorder.state;
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
    return new Promise((resolve, reject) => {
      this.mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(this.audioChunks);
          const audioUrl = window.URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const result = { audioBlob, audioUrl, audio };
          resolve(result);
      });
      this.mediaRecorder.stop();
    });
  }
}
export default Recorder