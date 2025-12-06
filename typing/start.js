const memory = require("../memoryStore");

const sentences = [
    "단비는 개발을 잘 한다",
    "카카오톡 챗봇은 정말 재미있다",
    "빠른 갈색 여우가 게으른 개를 넘었다"
];

function startTypingBattle(req, res) {
    // 🔒 글로벌 게임 LOCK 확인
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

    // 게임 시작
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];

    memory.typing.sentence = randomSentence;

    memory.globalGame.playing = true;
    memory.globalGame.type = "타자배틀";

    return res.send({
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleText: {
                        text:
`타자배틀을 시작합니다! ✨
아래 문장을 가장 먼저 정확하게 입력해주세요! 🏁

👉 "${randomSentence}"`
                    }
                }
            ]
        }
    });
}

module.exports = { startTypingBattle };