const memory = require("../memoryStore");
const { getRoomId, getUserName, registerUser } = require("./user");

// 점수 추가
function addScore(req, game) {
    const roomId = registerUser(req); // 자동 등록
    const user = req.body.userRequest.user;

    memory.rooms[roomId].users[user.id].scores[game] += 1;
}

// 랭킹 조회
function getRanking(req, game) {
    const roomId = registerUser(req); // 자동 등록

    const room = memory.rooms[roomId];
    if (!room) return [];

    return Object.values(room.users)
        .map(u => ({ name: u.name, score: u.scores[game] }))
        .sort((a, b) => b.score - a.score);
}

module.exports = { addScore, getRanking };