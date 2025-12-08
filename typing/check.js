const memory = require("../memoryStore");
const { addScore } = require("../utils/ranking");
const { getUserName } = require("../utils/user");
const { registerUser } = require("../utils/user");

function checkTyping(req, res) {
    registerUser(req);
    const user = req.body.userRequest.user;
    const name = getUserName(user);

    const answer = req.body.userRequest.utterance.trim();
    const correct = memory.typing.sentence;

    // 🔥 정답일 때
    if (answer === correct) {
        addScore(req, "typing");   // 점수 +1
        memory.currentGame = null; // 게임 종료

        return res.send({
            version: "2.0",
            template: {
                outputs: [
                    {
                        simpleText: {
                            text: `🎉 @${name} 님 정답입니다!! 🎊`
                        }
                    }
                ]
            }
        });
    }

    // ❌ 오답일 때
    return res.send({
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleText: {
                        text: "오타가 난 것 같아요! 다시 시도해보세요 ✏️"
                    }
                }
            ]
        }
    });
}

module.exports = { checkTyping };