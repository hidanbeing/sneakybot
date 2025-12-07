const { addScore } = require("../utils/ranking");

const memory = require("../memoryStore");

function checkColorGame(req, res) {
    const user = req.body.userRequest.user;
    const name = user.properties?.nickname || user.id.slice(0,4)+"****";
    
    const guess = parseInt(req.body.userRequest.utterance);
    const correct = memory.color.answer;

    if (guess === correct) {
        addScore(req, "typing");
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

    return res.send({
        version: "2.0",
        template: {
            outputs: [{
                simpleText: { text: "틀렸어요! 다시 시도해보세요 😢" }
            }]
        }
    });
}

module.exports = { checkColorGame };