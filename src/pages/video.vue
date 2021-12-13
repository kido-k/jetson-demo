<template>
  <div>
    <video-player :options="videoOptions" />
    <!-- <video
      class="video-js vjs-default-skin"
      id="video-container"
      controls
      muted
      autoplay
    >
      <source
        src="rtsp://vMvHuAtA:V9mZXzfX445KXmPb@192.168.11.15:554/live/ch0"
        type="rtsp/mp4"
      />
    </video> -->
  </div>
</template>

<script>
import VideoPlayer from '@/components/common/VideoPlayer.vue'
import 'video.js/dist/video-js.css'

export default {
  name: 'VideoExample',
  components: {
    VideoPlayer,
  },
  data() {
    return {
      videoOptions: {
        autoplay: false,
        controls: true,
        techOrder: ['flash', 'html5'],
        sourceOrder: true,
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        sources: [
          {
            type: 'rtsp/mp4',
            src: 'rtsp://vMvHuAtA:V9mZXzfX445KXmPb@192.168.11.15:554/live/ch0',
          },
        ],
      },
    }
  },
}
</script>
