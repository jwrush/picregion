// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

console.log("here")
var imagePath = require('electron').remote.process.argv[2]

function showImage(path)
{
  var imageElement = document.getElementById("IMAGE")
  imageElement.src = path
}

showImage(imagePath)
