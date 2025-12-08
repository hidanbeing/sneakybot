function roomInfo(req, res) {
    const groupKey = req.body.userRequest?.chat?.properties?.botGroupKey;
    const userId = req.body.userRequest?.user?.id;

    return res.send({
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleText: {
                        text:
`🧪 방 정보 디버그

• botGroupKey: ${groupKey || "❌ 없음 (1:1 대화)"}
• user.id: ${userId}
`
                    }
                }
            ]
        }
    });
}

module.exports = { roomInfo };