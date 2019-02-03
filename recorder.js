class Recorder {
  constructor(options = {}) {
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    
    this.onStop = this.onStop.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onResume = this.onResume.bind(this);
    this.addListeners = this.addListeners.bind(this);
    
    this.handleAudioChunks = this.handleAudioChunks.bind(this);
    this.init = this.init.bind(this);
    //this.state = this.state.bind(this);
    
    this.audioChunks = [];
    this.mediaRecorder = null;
    this.initPromise = null;
  }

  init() {
    this.initPromise = navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.addListeners();
        return this.mediaRecorder;
      })
      .catch(err => {
        console.log(err.message);
      });
    return this.initPromise;
  }

  onStart() {
    console.log('start')
  }

  onStop() {
    console.log('stop')
  }

  onPause() {
    console.log('pause')
  }

  onResume() {
    console.log('resume')
  }
  
  addListeners() {
    this.mediaRecorder.addEventListener('dataavailable', this.handleAudioChunks);
    this.mediaRecorder.addEventListener('start', this.onStart);
    this.mediaRecorder.addEventListener('stop', this.onStop);
    this.mediaRecorder.addEventListener('pause', this.onPause);
    this.mediaRecorder.addEventListener('resume', this.onResume);
  }

  handleAudioChunks(event) {
    this.audioChunks.push(event.data);
  }

  start() {
    this.audioChunks = [];
    if (!this.initPromise) {
      return this.init()
        .then(() => {
          this.mediaRecorder.start();
          return this.mediaRecorder;
        });
    } else {
      return this.initPromise.then(() => {
        this.mediaRecorder.start();
        return this.mediaRecorder;
      });
    }
  }

  get state() {
    return this.mediaRecorder ? this.mediaRecorder.state : 'inactive';
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