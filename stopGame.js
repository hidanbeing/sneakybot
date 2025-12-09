const memory = require("./memoryStore");

const GAME_NAMES = {
    typing: "타자배틀",
    color: "색몇개",
    picture: "그림퀴즈"
};

function stopGame(req, res) {
    const before = memory.currentGame;

    if (!before) {
        return res.send({
            version: "2.0",
            template: {
                outputs: [
                    {
                        simpleText: {
                            text: "🎮 현재 진행 중인 게임이 없어요!\n새로운 게임을 시작해보세요 😆"
                        }
                    }
                ]
            }
        });
    }

    // 현재 게임명 한글 변환
    const beforeKorean = GAME_NAMES[before] || before;

    // 전체 게임 리셋
    memory.resetGame();

    return res.send({
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleText: {
                        text: `⛔ '${beforeKorean}' 게임을 종료했어요!\n다른 게임을 시작할 수 있어요 😊`
                    }
                }
            ]
        }
    });
}

module.exports = { stopGame };