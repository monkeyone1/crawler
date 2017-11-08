var http = require('http')
var url = 'http://www.imooc.com/learn/637'
var cheerio =require('cheerio')
// 爬所有代码
http.get(url, function (res) {
    var html = ''
    res.on('data', function (data) {
        html += data
    })
    res.on('end', function () {
        //分析 自己需要的
        var courseData = filterChapters(html)
        // console.log(html);
        console.log(courseData);
        courseData.forEach((item) => {
            console.log(item);
        })
        
    })

}).on('error', function () {
    console.log('错误');
})


function filterChapters(html) {
    var $ = cheerio.load(html)
    var chapters =$('.mod-chapters')

    var courseData = []
    chapters.each(function (item) {
        var chapters =$(this)
        chapterTitle = chapters.find('strong').text()
        var videos = chapters.find('.video').children('li')
        var chapterData =  {
            chapterTitle: chapterTitle,
            videos: []
        }
        videos.each(function (item) {
            var video = $(this).find('.J-media-item')
            var videoTitle = video.text()
            var id = video.attr('href').split('video/')[1]
            chapterData.videos.push({
                title: videoTitle,
                id: id
            })
        })
        courseData.push(chapterData)
      })
      return courseData
}