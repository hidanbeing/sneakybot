// debug/roomInfo.js
function roomInfo(req, res) {
    const room = req.body.userRequest?.room;
    const user = req.body.userRequest?.user;

    return res.send({
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleText: {
                        text:
`🧪 방 정보 디버그

• room.id: ${room?.id || "❌ 없음 (1:1 채팅방)"}
• user.id: ${user?.id}
`
                    }
                }
            ]
        }
    });
}

module.exports = { roomInfo };