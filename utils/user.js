const memory = require("../memoryStore");

// 🟦 유저 이름 가져오기
function getUserName(userObj) {
    if (userObj.properties?.nickname) return userObj.properties.nickname;
    return userObj.id.slice(0, 4) + "****";
}

// 🟦 방 ID 가져오기
function getRoomId(req) {
    const roomKey = req.body.userRequest?.chat?.properties?.botGroupKey;
    const userId = req.body.userRequest?.user?.id;

    if (!memory.userRoomMap) memory.userRoomMap = {};

    // 방 ID 있을 경우: 그걸 사용
    if (roomKey) {
        memory.userRoomMap[userId] = roomKey;
        return roomKey;
    }

    // 1:1 대화 → 유저ID 기반 가상방 생성
    if (!memory.userRoomMap[userId]) {
        memory.userRoomMap[userId] = "room_" + userId;
    }

    return memory.userRoomMap[userId];
}


// 🟦 유저 자동 등록 — 여기 핵심!!
function registerUser(req) {
    const roomId = getRoomId(req);
    const user = req.body.userRequest.user;
    const name = getUserName(user);

    if (!memory.rooms[roomId]) {
        memory.rooms[roomId] = { users: {} };
    }

    // 이미 있으면 스킵
    if (!memory.rooms[roomId].users[user.id]) {
        memory.rooms[roomId].users[user.id] = {
            name,
            scores: { typing: 0, color: 0, picture: 0 }
        };
    }

    return roomId;
}

module.exports = { getRoomId, getUserName, registerUser };