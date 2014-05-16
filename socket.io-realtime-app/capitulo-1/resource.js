var server = require("./server.js");
var path = require("path");
var fs  = require("fs");

root = __dirname;

server.forRoute("GET", "/start", function(request, response) {
    response.writeHead(200, {"Content-Type":"text/plain"});
    response.write("Start");
    response.end();
});

server.forRoute("GET", "/finish", function(request, response) {
    response.writeHead(200, {"Content-Type":"text/plain"});
    response.write("Finish");
    response.end();
});

server.forRoute("GET", "/echo", function(request, response) {
   serveStatic(response, "echo.html");
});

server.forRoute("POST", "/echo", function(request, response) {
    var incoming = "";
    
    request.on('data', function(chunk) {
        incoming += chunk.toString();
    });
 
    request.on('end', function(){
	response.writeHead(200, {"Content-Type":"text/plain"});
	response.write(incoming);
	response.end();
    });
    
});

var serveStatic = function(response, file) {
    console.log(path.join);
    console.log(root);
    console.log(file);
    var fileToServe = path.join(root, file);
    var stream = fs.createReadStream(fileToServe);

    stream.on('data', function(chunk) {
        response.write(chunk);
    });

    stream.on('end', function() {
        response.end();
    });
}


server.start();    	
