

$(function() {
  var chords = ['C', 'A7', 'Dm', 'G7', 'D', 'E'];
  var meiXml = createMeiXml(chords);
  var vrvToolkit = createVerovioToolkit();
  var svg = vrvToolkit.renderData(meiXml);
  $("#svg_output").html(svg);
});