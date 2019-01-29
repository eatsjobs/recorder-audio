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

    ;(async function init() {
        const recorder = await new RecorderAudio();
        recorder.start();
        await new Promise(resolve => setTimeout(resolve, 3000));
        const { audio, audioBlob, audioUrl } = await recorder.stop();
        audio.play();
    })()
</script>
```