$(function init(){

  var mapManager = new MapManager(MAP_LIST);

  var saveMap = function(mapId){
    // Update local storage
    if(localStorage){
      localStorage.setItem("savedMap", mapId);
    }else if(chrome && chrome.storage && chrome.storage.local){
      chrome.storage.local.set({"savedMap": mapId});
    }
  };

  var searchCb = function(mapId, text){
    var map = mapManager.find(mapId);
    var room = map.search(text);
    if(room && awesomplete){
      awesomplete.close();
    }
    map.update(room);
  };

  var updateCurrentMap = function(mapId){
    map = mapManager.find(mapId);

    if(map !== mapManager.currentMap){
      var mapEle = $(".mapContainer[data-office-id="+mapId+"]"),
          currentMapEle = $(".mapContainer.active");

      currentMapEle.stop().fadeOut(function(){
        currentMapEle.removeClass("active");
        mapEle.stop().fadeIn(function(){
          mapEle.addClass("active");
          $("#inputSearch").data("mapid", mapId);
          mapManager.currentMap = map;
        });
      });
    }
  };

 // from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  var getParameterByName = function(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  /* Jquery listeners */
  $(".nav-bar li").click(function(evt){
    evt.preventDefault();

    var mapId = $(this).children("[data-js=office]").data("office-id");
    saveMap(mapId);
    updateCurrentMap(mapId);
  });

  $("input[data-js=search]").on("change", function(ele){
    ele = ele.target
    searchCb($(ele).data("mapid"), ele.value);
  });
  $(".beacon").hide();

  // Init Awesomecomplete
  var input = document.getElementById("inputSearch");
  var awesomplete = new Awesomplete(input, {
    list: mapManager.getAllRoomNames(),
    filter: function(text, input){
      /* Check if search term is within currently selected map */
      if(!mapManager.currentMap.search(input) ||
         !mapManager.currentMap.findRoomByName(text)){
        return false;
      }

      var regMatch = input.match(mapManager.currentMap.matchFn);
      if(regMatch){
        return Awesomplete.FILTER_CONTAINS(text, regMatch[1]);
      }else{
        return Awesomplete.FILTER_CONTAINS(text, input);
      }
    }
  });

  /* Awesomplete listeners */
  input.addEventListener('awesomplete-selectcomplete', function(){
    searchCb($("#inputSearch").data("mapid"), this.value);
  });


  /* DEV MODE */
  var query = getParameterByName('DEV_MODE');
  if(query === 'true'){
    $(".floor").append("<div class='devGrid'></div>");
    for(var i=0; i<20; i++){
      for(var j=0; j<20; j++){
        var y = Math.floor(i/20 * 100);
        var x = Math.floor(j/20 * 100);
        $(".devGrid").append("<div class='cell'>"+x+','+y+"</div>");
      }
    }

    $(".devGrid").click(function(e){
      var floorEle = $(e.target).parents(".floor");
      var percX = Math.round(e.pageX / floorEle.width() * 1000) / 10;
      var percY = Math.round((e.pageY - floorEle.offset().top) / floorEle.height() * 1000) / 10;
      var roomName = prompt("Please enter the room name");
      var level = floorEle.find("img").data("level");
      var delimiter = "\n  ";
      if(roomName){
        var template = "new Room({" + delimiter
          + "name: \""+roomName+"\","+delimiter
          + "level: "+level+","+delimiter
          + "x: "+percX+","+delimiter
          + "y: "+percY+"\n})";
        console.log(template);
      }
    });
  }

  var loadMap = function(mapId){
    if(mapId == mapManager.currentMap.name){
      return false;
    }

    $("#inputSearch").data("mapid", mapId);
    $(".mapContainer").removeClass("active");
    $(".mapContainer[data-office-id="+mapId+"]").addClass("active");
    mapManager.currentMap = mapManager.find(mapId);
  };

  /* INIT - Load up existing map */
  var init = function(){
    if(localStorage && localStorage.savedMap){
      loadMap(localStorage.savedMap);
    }else if(chrome && chrome.storage && chrome.storage.local){
      chrome.storage.local.get("savedMap", function(mapData){
        loadMap(mapData.savedMap || mapManager.currentMap.name);
      });
    }

  }();

  /* Search by query param: ffx-map/index.html?q=bridge */
  var query = getParameterByName('q');
  if(query !== null){
    $('#inputSearch').val(query).change();
  }
});
