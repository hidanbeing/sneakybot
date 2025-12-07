const { addScore } = require("../utils/ranking");

const memory = require("../memoryStore");

function checkPictureQuiz(req, res) {
    const userAnswer = req.body.userRequest.utterance.trim();
    const correct = memory.picture.answer;

    if (!memory.currentGame || memory.currentGame !== "picture") {
        return res.send({
            version: "2.0",
            template: { outputs: [{ simpleText: { text: "그림퀴즈가 진행 중이 아니에요! 😊" }}] }
        });
    }

    if (userAnswer === correct) {
        addScore(req, "typing");
        memory.currentGame = null;

        return res.send({
            version: "2.0",
            template: {
                outputs: [{
                    simpleText: { text: `🎉 정답입니다!! 정답은 '${correct}' 이었어요!` }
                }]
            }
        });
    }

    return res.send({
        version: "2.0",
        template: { outputs: [{ simpleText: { text: "❌ 오답! 다시 시도해주세요!" }}] }
    });
}

module.exports = { checkPictureQuiz };