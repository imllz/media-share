const ffmpeg = require('fluent-ffmpeg')

var inputPath = 'rtmp://v3948069e.live.126.net/live/4fc49859693b4100900fea7a5df7782c'
var outPath = 'rtmp://127.0.0.1:1935/live/test'

ffmpeg(inputPath)
  .inputOptions('-re')
  .on('start', function (commandLine) {
      console.log('ffmpeg 命令: ', commandLine)
  })
  .on('error',function (err,stdout, stderr) {
      console.log('error: ' + err.message)
      console.log('stdout: ' + stdout)
      console.log('stderr: ' + stderr)
  })
  // .on('progress', function (progress) {
  //     console.log('progressing: ', progress.percent , ' % done')
  // })
  .on('stderr', function(stderrLine) {
  console.log('output: ' + stderrLine);
  })
  .on('end', function () {
      console.log('完成 ')
  })
  .addOptions([
      // '-vcodec h264',
      // '-f mp4',
      // '-an',
      '-vcodec copy',
      '-acodec copy',
      '-strict',
      '-2'
      // '-r 25',
      // '-s 1920*1080',
      // '-b:v 1024000'
      // '-vcodec libx264',
      // '-c:a aac',
      // '-bufsize 3000k',
      // '-max_muxing_queue_size 1024',
      // '-preset veryfast', // 牺牲视频质量，换取流畅性
      // '-ac 2', // 双声道输出
      // '-ar 44100' // 音频采样率
  ])
  // .noAudio()
  // .videoCodec('copy')
  .format('flv')
  // .format('h264')
  // .pipe(outPath, {end: true})
  .output(outPath)  // 使用 pipe 管道 ，output 和 run 不可用
  .run()