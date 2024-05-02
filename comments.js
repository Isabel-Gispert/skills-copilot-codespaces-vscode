// Create web server
// 1. Import modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
// 2. Create web server
http.createServer(function(request, response) {
    // 2.1 Get URL
    var pathname = url.parse(request.url).pathname;
    // 2.2 Routing
    if (pathname === '/') {
        fs.readFile('comment.html', function(error, data) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        });
    } else if (pathname === '/comment') {
        var body = '';
        // 2.2.1 Event handling
        request.on('data', function(data) {
            body += data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            console.log(post);
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end('Name: ' + post.name + '<br>Comment: ' + post.comment);
        });
    } else {
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end('404 Not Found');
    }
}).listen(52273, function() {
    console.log('Server running at http://