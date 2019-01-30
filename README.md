# Simple RecorderAudio

```
yarn add recorder-audio
```

or

```
npm i recorder-audio
```

## Example
```
<script type='module'>
    import RecorderAudio from './dist/recorder.mjs';
    const delay = (time) => new Promise((resolve) => { setTimeout(resolve, time) });
    ;(async function init() {
        const recorder = new RecorderAudio();
        await recorder.init();
        recorder.start();
        await delay(4000)
        const { audio, audioBlob, audioUrl } = await recorder.stop();
        audio.play();
    })()
</script>
```