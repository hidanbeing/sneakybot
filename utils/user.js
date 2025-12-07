// utils/user.js
function getRoomId(req) {
    return req.body.userRequest?.room?.id || "default_room";
}

function getUserName(user) {
    if (user.properties?.nickname) return user.properties.nickname;
    return user.id.slice(0, 4) + "****";
}

module.exports = { getRoomId, getUserName };