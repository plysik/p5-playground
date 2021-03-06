// HTTP Portion
var http = require("http");
// Path module
var path = require("path");
var url = require("url");

// Using the filesystem module
var fs = require("fs");

var server = http.createServer(handleRequest);
server.listen(3000);

console.log("Server started on port 3000");

function handleRequest(req, res) {
  var parsedUrl = url.parse(req.url, true);

  var { pathname, search } = parsedUrl;

  // If blank let's ask for index.html
  if (pathname == "/") {
    pathname = "/index.html";
  }

  // Ok what's our file extension
  var ext = path.extname(pathname);

  // Map extension to file type
  var typeExt = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css"
  };
  // What is it?  Default to plain text

  var contentType = typeExt[ext] || "text/plain";

  // User file system module
  fs.readFile(
    __dirname + pathname,
    // Callback function for reading
    function(err, data) {
      // if there is an error
      if (err) {
        res.writeHead(500);
        return res.end("Error loading " + pathname);
      }
      // Otherwise, send the data, the contents of the file
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  );
}
