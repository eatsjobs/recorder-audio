class Recorder {
  constructor(options = {}) {
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    // this.onStop = this.onStop.bind(this);
    this.addListeners = this.addListeners.bind(this);
    this.handleAudioChunks = this.handleAudioChunks.bind(this);
    this.flush = this.flush.bind(this);
    this.audioChunks = [];
    this.mediaRecorder = null;
    return navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.addListeners();
        return this;
      })
      .catch(err => {
        console.log(err.message);
      });

  }

  // onStop(evt) {}

  addListeners() {
    this.mediaRecorder.addEventListener(
      'dataavailable',
      this.handleAudioChunks
    );
  }
  handleAudioChunks(event) {
    this.audioChunks.push(event.data);
  }

  start() {
    if (!this.mediaRecorder) {
        console.warn('No media recorder. call new Recorder');
        return false;
    }
    this.flush();
    this.mediaRecorder.start();
  }

  flush() {
    this.audioBlob = null;
    this.audioUrl = null;
    this.audio = null;
    this.mediaRecorder = null;
    this.audioChunks = [];
  }

  stop() {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) reject('No media recorder. call new Recorder');
      this.mediaRecorder.addEventListener('stop', () => {
        this.audioBlob = new Blob(this.audioChunks);
        this.audioUrl = URL.createObjectURL(this.audioBlob);
        this.audio = new Audio(this.audioUrl);
        resolve({ audioBlob: this.audioBlob, audioUrl: this.audioUrl, audio: this.audio });
      });

      this.mediaRecorder.stop();
    });
  }
}
export default Recorder