/* Map */
function Map(name, rooms){
  this.name = name;
  this.rooms = rooms || [];

  this.matchFn = RegExp(/^The\s+(.*)$/i);
}

Map.prototype.getEl = function(){
  return $(".mapContainer[data-office-id="+this.name+"]");
};

Map.prototype.getFloorEl = function(floor){
  return this.getEl().find('.map[data-level='+floor+']');
};

Map.prototype.findRoomByName = function(roomName){
  return this.rooms.find(function(room){
    return room.name == roomName;
  });
}

Map.prototype.search = function(name){
  if(!name){
    return;
  }
  var regMatch = name.match(this.matchFn);
  if(regMatch){
    name = regMatch[1];
  }
  var roomHash = {
    exactMatch: null,
    searchMach: null
  };

  this.rooms.reduce(function(memo, room){
    if(room.name.toLowerCase() === name.toLowerCase()){
      memo.exactMatch = room;
    }
    if(room.name.toLowerCase().search(name.toLowerCase()) > -1){
      memo.searchMatch = room;
    }
    return memo;
  }, roomHash);

  return roomHash.exactMatch || roomHash.searchMatch;
};

Map.prototype.update = function(room){
  var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  if(room){
    this.scrollTo(room.level);
    $(".beacon").detach().appendTo(this.getFloorEl(room.level).parent());


    if(is_firefox) {
      $(".tooltip").css({
        top: (room.y + 2.1) + "%",
        left: (room.x - 2) + "%"
      });
      $(".beacon").css({
        top: room.y - 0.5 + "%",
        left: room.x - 0.5 + "%"
      });
    }else{
      $(".tooltip").css({
        top: (room.y + 1) + "%",
        left: (room.x - 2) + "%"
      });
      $(".beacon").css({
        top: room.y + "%",
        left: room.x + "%"
      });
    }
    $(".tooltip").detach().appendTo(this.getFloorEl(room.level).parent());
    $(".tooltip").html(room.name);
    $(".tooltip").show();
    wiggle(".tooltip");
    $(".beacon").show();
  }else{
    $(".tooltip").hide();
    $(".beacon").hide();
  }

  function wiggle(myelement) {
    var position = $(myelement).position();
    $(myelement)
      .delay( 200 )
      .animate({'left':(position.left - 5)+'px'},200)
      .animate({'left':(position.left + 5)+'px'},200)
      .animate({'left':(position.left - 5)+'px'},200)
      .animate({'left':(position.left + 5)+'px'},200)
      .animate({'left':(position.left - 5)+'px'},200)
      .animate({'left':(position.left)+'px'},200);
  };

};

Map.prototype.scrollTo = function(level){
  var mapEle = this.getFloorEl(level);
  $(document.body).animate({
    scrollTop: mapEle.offset().top
  }, 500);
};