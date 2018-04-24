var contentBody = JSON.parse('{"theme":{"stage":{"manifest":{"media":[]},"x":0,"y":0,"w":100,"h":100,"id":"stage1"},"manifest":{"media":[]},"plugin-manifest":"","compatibilityVersion":2,"id":"theme","version":1,"startStage":"stage1"}}');

function setUpRenderer() {
  var canvas = "<div ng-app='genie-canvas' id='gameArea'><div id='overlay'></div><canvas id='gameCanvas' style='top: 10px;left: 10px;position: absolute;'></canvas></div><div id='splashScreen'></div>";
  var body = document.getElementsByTagName("body")[0];
  var div = document.createElement('div');
  div.innerHTML = canvas;
  body.appendChild(div.children[0]);
  setGlobalConfig({config: {}, context: {}});
  window.isMobile = window.cordova ? true : false;
  window.content = JSON.parse('{"baseDir":"/base/public/test/testContent", "path":"/base/public/test/testContent", "identifier": "org.ekstep.item.sample", "mimeType": "application/vnd.ekstep.ecml-archive", "name": "Content Preview ", "author": "EkStep", "localData": {"name": "Content Preview ", "loadingMessage": "Without requirements or design, programming is the art of adding bugs to an empty text file. ...", "identifier": "org.ekstep.item.sample" }, "pkgVersion": 1, "isAvailable": true}');
  window.content.body = JSON.parse(JSON.stringify(contentBody));
  org.ekstep.service.init();
  AppConfig.corePluginspath = '/public/coreplugins';
  org.ekstep.contentrenderer.initPlugins('', '/public/coreplugins');
  GlobalContext.game.id = packageName;
  GlobalContext.game.ver = version;
  startTelemetry(GlobalContext.game.id, GlobalContext.game.ver);
};

function startRenderer(data) {
  window.content.body = JSON.parse(JSON.stringify(data));
  Renderer.start("", "gameCanvas", {}, data);
}

setUpRenderer();
