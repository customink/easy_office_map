function MapManager(maps){
  this.maps = maps;
  this.currentMap = maps[0];
};

MapManager.prototype.find = function(id){
  return this.maps.find(function(map){
    return map.name == id;
  });
};

MapManager.prototype.getAllRoomNames = function(){
  var allRoomNames = this.maps.map(function(map){
    return map.rooms.map(function(room){
      return room.name;
    })
  });
  return allRoomNames.reduce(function(memo, map){
    map.forEach(function(roomName){
      memo.push(roomName);
    });
    return memo;
  }, []);
};