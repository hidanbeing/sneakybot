// ranking/getRanking.js
const { getRanking } = require("../utils/ranking");

function rankingApi(req, res) {
    const game = req.body.action.params.game_type;   // typing / color / picture
    const ranking = getRanking(req, game);

    if (ranking.length === 0) {
        return res.send({
            version: "2.0",
            template: {
                outputs: [{ simpleText: { text: "아직 점수가 없어요 😅" } }]
            }
        });
    }

    let text = `🏆 '${game}' 랭킹 🏆\n\n`;
    ranking.forEach((u, i) => {
        text += `${i + 1}위 : ${u.name} (${u.score}점)\n`;
    });

    return res.send({
        version: "2.0",
        template: { outputs: [{ simpleText: { text } }] }
    });
}

module.exports = { rankingApi };