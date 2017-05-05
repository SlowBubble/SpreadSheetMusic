
function createVerovioToolkit(zoom) {
  var vrvToolkit = new verovio.toolkit();
  var zoom = zoom || 80;
  var pageWidth = $(window).width() * 100 / zoom ;
  var options = {
    pageWidth: pageWidth,
    scale: zoom,
    adjustPageHeight: 1,
    ignoreLayout: 1
  };

  vrvToolkit.setOptions(options);
  return vrvToolkit;
}