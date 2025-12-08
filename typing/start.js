const memory = require("../memoryStore");
const sentences = require("../gameData/typingSentences"); 

function startTypingBattle(req, res) {
    // 랜덤 문장 뽑기
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];

    // 게임 상태 세팅
    memory.currentGame = "typing";
    memory.typing.sentence = randomSentence;
    memory.typing.winner = null;

    return res.send({
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleText: {
                        text:
`⌨️ 타자배틀을 시작합니다!

아래 문장을 가장 먼저 정확하게 입력해주세요! 🏁

👉 "${randomSentence}"`
                    }
                }
            ]
        }
    });
}

module.exports = { startTypingBattle };