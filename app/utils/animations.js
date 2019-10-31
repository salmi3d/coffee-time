import * as enums from 'ui/enums'

const Heartbeat = {
  methods: {
    playHeartbeatAnimation(element) {
      return element.nativeView
        .animate({
          scale: { x: 1.8, y: 1.8 },
          duration: 100,
          curve: enums.AnimationCurve.easeIn
        })
        .then(() => {
          element.nativeView.animate({
            scale: { x: 1, y: 1 },
            duration: 100,
            curve: enums.AnimationCurve.easeOut
          })
        })
    },
  }
}

export default {
  Heartbeat,
}
