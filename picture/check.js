const memory = require("../memoryStore");
const { addScore } = require("../utils/ranking");
const { getUserName } = require("../utils/user");

function checkPictureQuiz(req, res) {
    const userAnswer = req.body.userRequest.utterance.trim();
    const correct = memory.picture.answer;

    const user = req.body.userRequest.user;
    const name = getUserName(user);

    // 그림퀴즈 진행 여부
    if (!memory.currentGame || memory.currentGame !== "picture") {
        return res.send({
            version: "2.0",
            template: { outputs: [{ simpleText: { text: "그림퀴즈가 진행 중이 아니에요! 😊" }}] }
        });
    }

    // 정답
    if (userAnswer === correct) {

        addScore(req, "picture");  // 🔥 picture 점수 +1
        memory.currentGame = null;

        return res.send({
            version: "2.0",
            template: {
                outputs: [{
                    simpleText: { 
                        text: `🎉 @${name} 님 정답입니다!!\n정답은 '${correct}' 이었어요! 👏`
                    }
                }]
            }
        });
    }

    // 오답
    return res.send({
        version: "2.0",
        template: { outputs: [{ simpleText: { text: "❌ 오답! 다시 시도해주세요!" }}] }
    });
}

module.exports = { checkPictureQuiz };