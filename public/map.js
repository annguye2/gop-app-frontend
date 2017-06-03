require([
  "esri/map",
  "esri/layers/FeatureLayer",
  "esri/dijit/FeatureTable",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/Color",
  "esri/tasks/QueryTask",
  "esri/tasks/query",
  "esri/dijit/Search",
  "esri/InfoTemplate",
  "esri/dijit/HomeButton",
  "esri/dijit/Scalebar",
  "dojo/on",
  "dojo/dom",
  "dojo/ready",
  "dojo/domReady!"
],
function(
  Map,
  FeatureLayer,
  FeatureTable,
  SimpleMarkerSymbol,
  SimpleLineSymbol,
  Color,
  QueryTask,
  Query,
  Search,
  InfoTemplate,
  HomeButton,
  Scalebar,
  on,
  dom,
  ready

) {
    var myFeatureTable = {};
    var basemapSelector ;
    var featureLayerUrl;
    var currentLayer;
    var usCenter = [-98.5795, 39.828175];
    var centralUS = [-97.380979, 42.877742];  //central us
    var centralVA = [-77.871094, 37.439974];  // central virginia
    var centralNY = [-77.0369, 38.9072];
    var tableID = '';
    var selectionSymbol =  new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 12, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 197, 1])));

    //*********************** Map components initialize  ********************
    // console.log('map is loading..');
    var map = new Map("map", {
      basemap:"streets",
      center: centralUS,
      sliderPosition: "top-right",
      zoom: 4
    });
    //************ hide waiting image
    function init() {
      loading = dom.byId("loadingImg");  //loading image. i
      on(map, "update-start", showLoading);
      on(map, "update-end", hideLoading);
      console.log(map);
    }
    function showLoading() {
     esri.show(loading);
     map.disableMapNavigation();
     map.hideZoomSlider();
   }
    function hideLoading(error) {
     esri.hide(loading);
     map.enableMapNavigation();
     map.showZoomSlider();
   }

    // Home Button
    var home = new HomeButton({
        map: map,
        attachTo: "top-left"
    }, "HomeButton");
    home.startup();

    // Scalebar
    var scalebar = new Scalebar({
      map: map,
     attachTo: "top-left"
   }, dojo.byId("scalebar"));

    //*********************** add serch bar  *******************
    var search = new Search({
      map: map
     }, "search");
     search.startup();  // add search bar

    // *********** change base map on drop down select *********
    $("#basemapSelector" ).change(() =>{
      // $("#basemapSelector").find("option:selected").text();
      map.setBasemap($("#basemapSelector").find("option:selected").val())
    });

    //************************ featureServiceSelector **********
    $("#loadProjectToMap").click(() => {
      if(localStorage.getItem('currentFeatureUrl')){
        featureLayerUrl = localStorage.getItem('currentFeatureUrl');
        addFeatureLayer(featureLayerUrl);
        console.log('ADD Map');
      }
    });

    //************************ Load ShareProject To map ********
    $('#loadSharedProjectToMap').click(() => {
      console.log('loading from here..', localStorage.getItem('currentFeatureUrl'));
      if(localStorage.getItem('currentFeatureUrl')){
        featureLayerUrl = localStorage.getItem('currentFeatureUrl');
        addFeatureLayer(featureLayerUrl);
        console.log('ADD Map');

      }else{ console.log('Can not add layer');}
      //localStorage.setItem('currentFeatureUrl', "");
    });

    //************************ removeLayer *********************

    $('#removeLayer').click(() => {
      removeLayer();
    });

    //************************ add layer event ******************

    $("#addLayer").click(() =>{

       console.log('this is attribte table Id: ',  $('.attr-table'));
      if(localStorage.getItem('currentFeatureUrl')){
        featureLayerUrl = localStorage.getItem('currentFeatureUrl');
        addFeatureLayer(featureLayerUrl);
        console.log('ADD Map');
      }
    });

    //******************* add FeatureLayer **********************
    var addFeatureLayer = (url) => {
      var _id = makeId() ;
      var $div = $("<div>", {id: _id, "class": "attr-table",}); //create new div for attribute table
       $("#bot").append($div);
      if(url) {
        console.log('add layer: ');
        var tempFeatureLayer = new FeatureLayer(url);
        var template = new InfoTemplate();
        tempFeatureLayer.on("load", function () {
          template.setTitle("<b>" + tempFeatureLayer.name + "</b>");
        });
        var _featureLayer = new FeatureLayer(url,{
          mode: FeatureLayer.MODE_ONDEMAND,
          infoTemplate: template,
          outFields: ['*'],
          opacity: 1,
          visible: true,
           id: "fLayer"
        });
          _featureLayer.setSelectionSymbol(selectionSymbol);
          myFeatureTable = new FeatureTable({
          map: map,
          syncSelection: true,
          zoomToSelection: true,
             featureLayer : _featureLayer,
             showGridMenu: false,
        }, _id);

        console.log('muy feature table :',myFeatureTable);

        myFeatureTable.startup();
        map.addLayer(_featureLayer);  // add layer
        map.refresh;
        currentLayer = _featureLayer;
        }else {  console.log("no layer to add");}
    }

    //******************* remove FeatureLayer *******************
    var removeLayer = () => {
      if(currentLayer){
        console.log('remove current layer: ', map);
        map.removeLayer(currentLayer);
        myFeatureTable.destroy();
        map.refresh;
        currentLayer = '';
        featureLayerUrl = '';
      }else{console.log('no layer to remove');}

    }
    //************************ Read data*************************
    //
    var readData =  () =>{
      //var dataUrl = "https://services2.arcgis.com/1cdV1mIckpAyI7Wo/arcgis/rest/services/Hurricane_Evacuation_Routes/FeatureServer/0?f=pjson"
      // $.getJSON(DOMAIN + 'arcgis/rest/services/WebIMT_GP_UCI_Capacity/UCICapacityTool/GPServer/UCI_Capacity_Query?f=pjson&callback=?', function (data) {
      $.getJSON('https://services2.arcgis.com/1cdV1mIckpAyI7Wo/ArcGIS/rest/services?f=pjson&callback=?', function (data) {
        //console.log("this is hurican data: ", data.services);
        for (var i = 0; i < 5; i ++) {
          console.log("this datatype", data.services[i].type);
          console.log("this name", data.services[i].name);
          console.log("this url", data.services[i].url + "/0");

        }
      });
    };// end of read data function

  //********** Generate new id of attr-table : https://stackoverflow.com **************
   var makeId =  () =>{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 3; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
  // ready(init(map));
  ready(init);
  //******** end testing section ********
});// end ESRI require
