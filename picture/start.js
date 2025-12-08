const memory = require("../memoryStore");
const pictureQuizSet = require("../gameData/pictureQuiz"); // ← 데이터 분리

function startPictureQuiz(req, res) {
    // 랜덤 문제 선택
    const quiz = pictureQuizSet[Math.floor(Math.random() * pictureQuizSet.length)];

    // 메모리 상태 초기화 + 문제 저장
    memory.currentGame = "picture";
    memory.picture.answer = quiz.answer;
    memory.picture.art = quiz.art;

    return res.send({
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleText: {
                        text:
`🖼 그림퀴즈 시작!
아래 그림이 무엇인지 맞춰보세요!

${quiz.art}`
                    }
                }
            ]
        }
    });
}

module.exports = { startPictureQuiz };