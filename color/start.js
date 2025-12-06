const memory = require("../memoryStore");

function startColorGame(req, res) {
    // 🔒 글로벌 게임 진행 여부 확인
    if (memory.globalGame.playing) {
        return res.send({
            version: "2.0",
            template: {
                outputs: [
                    {
                        simpleText: {
                            text: `⛔ 이미 "${memory.globalGame.type}" 게임이 진행 중이에요!\n먼저 그 게임을 마무리해주세요 😄`
                        }
                    }
                ]
            }
        });
    }

    // 게임 데이터 생성
    const colors = ["🔴", "🔵", "🟡"];
    const list = [];
    let targetCount = 0;

    for (let i = 0; i < 10; i++) {
        const c = colors[Math.floor(Math.random() * colors.length)];
        list.push(c);
        if (c === "🔴") targetCount++;
    }

    memory.color.answer = targetCount;
    memory.globalGame.playing = true;
    memory.globalGame.type = "색몇개";

    return res.send({
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleText: {
                        text:
`색몇개 게임을 시작합니다! 🎨
아래 그림에서 🔴는 몇 개인가요?

${list.join(" ")}`
                    }
                }
            ]
        }
    });
}

module.exports = { startColorGame };