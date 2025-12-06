const memory = require("../memoryStore");

function checkTyping(req, res) {
    const userInput = req.body.userRequest.utterance;
    const answer = memory.typing.sentence;

    if (!memory.globalGame.playing || memory.globalGame.type !== "타자배틀") {
        return res.send({
            version: "2.0",
            template: {
                outputs: [
                    { simpleText: { text: "❌ 현재 타자배틀이 진행 중이 아니에요!" } }
                ]
            }
        });
    }

    // 정답
    if (userInput === answer) {
        memory.globalGame.playing = false;
        memory.globalGame.type = null;

        return res.send({
            version: "2.0",
            template: {
                outputs: [
                    { simpleText: { text: `🎉 정답입니다!` } }
                ]
            }
        });
    }

    // 오답
    return res.send({
        version: "2.0",
        template: {
            outputs: [
                { simpleText: { text: `오타가 난 것 같아요! 다시 시도해주세요 ✏️` } }
            ]
        }
    });
}

module.exports = { checkTyping };