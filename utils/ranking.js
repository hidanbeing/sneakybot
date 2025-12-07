// utils/ranking.js
const memory = require("../memoryStore");
const { getRoomId, getUserName } = require("./user");

// 점수 +1 저장
function addScore(req, game) {
    const roomId = getRoomId(req);
    const user = req.body.userRequest.user;
    const name = getUserName(user);

    // 방 없으면 생성
    if (!memory.rooms) memory.rooms = {};
    if (!memory.rooms[roomId]) {
        memory.rooms[roomId] = { users: {} };
    }

    // 유저 없으면 생성
    if (!memory.rooms[roomId].users[user.id]) {
        memory.rooms[roomId].users[user.id] = {
            name,
            scores: { typing: 0, color: 0, picture: 0 }
        };
    }

    // 점수 +1
    memory.rooms[roomId].users[user.id].scores[game] += 1;
}

// 랭킹 계산
function getRanking(req, game) {
    const roomId = getRoomId(req);

    if (!memory.rooms || !memory.rooms[roomId]) return [];

    return Object.values(memory.rooms[roomId].users)
        .map(u => ({ name: u.name, score: u.scores[game] }))
        .sort((a, b) => b.score - a.score);
}

module.exports = { addScore, getRanking };