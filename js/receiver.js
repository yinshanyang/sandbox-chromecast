cast.framework.CastReceiverContext.getInstance().setLoggerLevel(
  cast.framework.LoggerLevel.DEBUG
)

const context = cast.framework.CastReceiverContext.getInstance()
const playbackConfig = new cast.framework.PlaybackConfig()
playbackConfig.licenseUrl = null
playbackConfig.protectionSystem = cast.framework.ContentProtection.WIDEVINE
playbackConfig.licenseRequestHandler = (requestInfo) => {
  requestInfo.withCredentials = true
}
context.start({ playbackConfig: playbackConfig })

context
  .getPlayerManager()
  .setMediaPlaybackInfoHandler((loadRequest, playbackConfig) => {
    console.log(loadRequest)
    if (
      loadRequest.media.customData &&
      loadRequest.media.customData.licenseUrl
    ) {
      playbackConfig.licenseUrl = loadRequest.media.customData.licenseUrl
    }
    return playbackConfig
  })
