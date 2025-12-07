const memory = require("../memoryStore");

const sentences = [
    "빠른 갈색 여우가 게으른 개를 넘었다",
    "나는 오늘도 열심히 살아간다",
    "카카오톡 챗봇은 정말 재미있다",
    "단비는 개발을 잘 한다"
];

function startTypingBattle(req, res) {
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];

    memory.currentGame = "typing";

    memory.typing.sentence = randomSentence;
    memory.typing.winner = null;

    return res.send({
        version: "2.0",
        template: {
            outputs: [{
                simpleText: {
                    text:
`⌨️ 타자배틀을 시작합니다!

아래 문장을 가장 먼저 정확하게 입력해주세요! 🏁

👉 "${randomSentence}"`
                }
            }]
        }
    });
}

module.exports = { startTypingBattle };