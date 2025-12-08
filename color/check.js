const memory = require("../memoryStore");
const { addScore } = require("../utils/ranking");
const { getUserName } = require("../utils/user");
const { registerUser } = require("../utils/user");

function checkColorGame(req, res) {
    registerUser(req);
    const user = req.body.userRequest.user;
    const name = getUserName(user);

    const guess = parseInt(req.body.userRequest.utterance);
    const correct = memory.color.answer;

    // 정답 체크
    if (guess === correct) {
        addScore(req, "color");   // 🔥 color 점수 +1
        memory.currentGame = null;

        return res.send({
            version: "2.0",
            template: {
                outputs: [{
                    simpleText: { 
                        text: `🎉 @${name} 님 정답입니다!! 👏`
                    }
                }]
            }
        });
    }

    // 오답
    return res.send({
        version: "2.0",
        template: {
            outputs: [{
                simpleText: { 
                    text: "틀렸어요! 다시 시도해보세요 😢" 
                }
            }]
        }
    });
}

module.exports = { checkColorGame };