const memory = require("../memoryStore");

function startColorGame(req, res) {
    const colors = ["🔴", "🔵", "🟢", "🟡"];
    const list = [];

    // 랜덤 색 10개 생성
    for (let i = 0; i < 10; i++) {
        list.push(colors[Math.floor(Math.random() * colors.length)]);
    }

    // 정답 색 지정
    const targetColor = colors[Math.floor(Math.random() * colors.length)];
    const answer = list.filter(c => c === targetColor).length;

    memory.currentGame = "color";
    memory.color.answer = answer;

    return res.send({
        version: "2.0",
        template: {
            outputs: [{
                simpleText: {
                    text:
`🎨 색몇개 게임 시작!

아래 목록에서 '${targetColor}' 는 몇 개인가요?

${list.join(" ")}

숫자로만 입력해주세요!`
                }
            }]
        }
    });
}

module.exports = { startColorGame };