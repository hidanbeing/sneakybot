const memory = require("../memoryStore");

function checkColorGame(req, res) {
    const userNum = parseInt(req.body.userRequest.utterance);
    const answer = memory.color.answer;

    if (!memory.globalGame.playing || memory.globalGame.type !== "색몇개") {
        return res.send({
            version: "2.0",
            template: {
                outputs: [
                    { simpleText: { text: "❌ 색몇개 게임이 진행 중이 아니에요!" } }
                ]
            }
        });
    }

    // 정답 체크
    if (userNum === answer) {
        memory.globalGame.playing = false;
        memory.globalGame.type = null;

        return res.send({
            version: "2.0",
            template: {
                outputs: [
                    { simpleText: { text: `🎉 정답입니다! 🔴는 ${answer}개였어요!` } }
                ]
            }
        });
    }

    return res.send({
        version: "2.0",
        template: {
            outputs: [
                { simpleText: { text: `❌ 아쉽지만 틀렸어요! 다시 시도해보세요!` } }
            ]
        }
    });
}

module.exports = { checkColorGame };