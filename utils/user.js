const memory = require("../memoryStore");

function getRoomId(req) {
    const userId = req.body.userRequest?.user?.id;

    if (!memory.userRoomMap) memory.userRoomMap = {};

    // 최초 요청이면 room 자동 생성
    if (!memory.userRoomMap[userId]) {
        memory.userRoomMap[userId] = "room_" + Date.now();
    }

    return memory.userRoomMap[userId];
}

function getUserName(userObj) {
    if (userObj.properties?.nickname) return userObj.properties.nickname;
    return userObj.id.slice(0, 4) + "****";
}

module.exports = { getRoomId, getUserName };