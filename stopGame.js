const memory = require("./memoryStore");

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

    // 전체 게임 리셋
    memory.resetGame();

    return res.send({
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleText: {
                        text: `⛔ '${before}' 게임을 종료했어요!\n다른 게임을 시작할 수 있어요 😊`
                    }
                }
            ]
        }
    });
}

module.exports = { stopGame };