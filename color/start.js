const memory = require("../memoryStore");

function startColorGame(req, res) {
    const colors = ["🔴", "🔵", "🟢", "🟡"];
    const list = [];

    // 랜덤 색 글자 생성
    for (let i = 0; i < 10; i++) {
        list.push(colors[Math.floor(Math.random() * colors.length)]);
    }

    // 정답: 예를 들어 🔴 개수 세기
    const targetColor = colors[Math.floor(Math.random() * colors.length)];
    const answer = list.filter(c => c === targetColor).length;

    memory.currentGame = "color";
    memory.color.answer = answer;
    memory.color.winner = null;

    return res.send({
        version: "2.0",
        template: {
            outputs: [{
                simpleText: {
                    text:
`색몇개 게임 시작! 🎨  
아래 색 중 '${targetColor}' 는 몇 개인가요?

${list.join(" ")}`
                }
            }]
        }
    });
}

module.exports = { startColorGame };