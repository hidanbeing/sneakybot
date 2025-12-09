const memory = require("../memoryStore");
const { checkTyping } = require("../typing/check");
const { checkColorGame } = require("../color/check");
const { checkPictureQuiz } = require("../picture/check");

function fallback(req, res) {
    const utter = req.body.userRequest.utterance?.trim();

    // 게임 없는 상태 → 기본 폴백
    if (!memory.currentGame) {
        return res.send({
            version: "2.0",
            template: {
                outputs: [{
                    simpleText: {
                        text: `무슨 말인지 잘 모르겠어요! 😅\n게임을 시작하려면 "@몰래봇 게임목록" 이라고 말해보세요!`
                    }
                }]
            }
        });
    }

    // 게임 있는 상태 → 게임별 오답 처리로 연결
    switch (memory.currentGame) {
        case "typing":
            // typing/check 내부에서 정답/오답 판단함
            return checkTyping(req, res);

        case "color":
            return checkColorGame(req, res);

        case "picture":
            return checkPictureQuiz(req, res);

        default:
            return res.send({
                version: "2.0",
                template: {
                    outputs: [{
                        simpleText: {
                            text: `❗ 알 수 없는 게임 상태입니다. 게임을 다시 시작해주세요!`
                        }
                    }]
                }
            });
    }
}

module.exports = { fallback };