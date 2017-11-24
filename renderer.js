// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const util = require('util')
var argv = require('electron').remote.process.argv.slice(2)
var imagePath = argv[0]
var userPrompt = argv[1] ? argv[1] : "Select a region."
var stdout = require('electron').remote.process.stdout
var myWindow = require('electron').remote.getCurrentWindow()

let model = {
               prompt: userPrompt,
               selectionMade: false,
               x1: -1,
               x2: -1,
               y1: -1,
               y2: -1,
               canAccept: function(){ return this.selectionMade }
            }

function handleCoordChange(c)
{
  if (c.x != c.x2 && c.y != c.y2) //this is how jcrop indicates a "thrown away" selection
  {
    model.selectionMade = true
    model.x1 = c.x
    model.x2 = c.x2
    model.y1 = c.y
    model.y2 = c.y2
  }
  else
  {
    model.selectionMade = false
    model.x1 = -1
    model.x2 = -1
    model.y1 = -1
    model.y2 = -1
  }

  updateView()
}

function updateView()
{
  if (model.selectionMade)
  {
    $('#RECT_MIN_X').text(model.x1)
    $('#RECT_MIN_Y').text(model.y1)
    $('#RECT_MAX_X').text(model.x2)
    $('#RECT_MAX_Y').text(model.y2)
  }
  else
  {
    $('#RECT_MIN_X').text("")
    $('#RECT_MIN_Y').text("")
    $('#RECT_MAX_X').text("")
    $('#RECT_MAX_Y').text("")
  }

  $('#DONE_BUTTON').prop("disabled", !model.canAccept())
  $('#PROMPT').text(model.prompt)
}

function showImage(path)
{
  var imageElement = document.getElementById("IMAGE")
  imageElement.src = path

  $('#IMAGE').Jcrop({trackDocument: true,
                     onSelect: handleCoordChange,
                     onChange: handleCoordChange })
}

function finalizeSelection()
{
  var output = util.format("%i %i %i %i\n", model.x1, model.y1, model.x2, model.x2)
  stdout.write(output, encoding='utf8')
  myWindow.close()
}

function doneButtonPressed()
{
  finalizeSelection()
}
$('#DONE_BUTTON').click(doneButtonPressed)


showImage(imagePath)
updateView()
