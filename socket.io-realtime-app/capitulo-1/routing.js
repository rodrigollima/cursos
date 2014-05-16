var http = require("http");
var url  = require("url");

function onRequest(request, response) {
    console.log(request.url);
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received");

    if (pathname === "/start") {
        response.writeHead(200,{"Content-Type":"text/plain"});
	response.write("Start");
	response.end();
    } else if (pathname === "/finish") {
        response.writeHead(200,{"Content-Type":"text/plain"});
	response.write("Finish");
	response.end();
    } else {
	response.writeHead(400,{"Content-Type":"text/plain"});
	response.end("404 Not Found");
    }
}

http.createServer(onRequest).listen(9999);
console.log("Server has started.");
