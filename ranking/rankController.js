const { getRanking } = require("../utils/ranking");

function rankingTyping(req, res) {
    return sendRanking(req, res, "typing");
}

function rankingColor(req, res) {
    return sendRanking(req, res, "color");
}

function rankingPicture(req, res) {
    return sendRanking(req, res, "picture");
}

function sendRanking(req, res, game) {
    const list = getRanking(req, game);

    if (list.length === 0) {
        return res.send({
            version: "2.0",
            template: {
                outputs: [
                    { simpleText: { text: `아직 ${game} 점수가 없어요 😅` } }
                ]
            }
        });
    }

    let text = `🏆 ${game} 랭킹 🏆\n\n`;
    list.forEach((u, idx) => {
        text += `${idx + 1}위 : @${u.name} (${u.score}점)\n`;
    });

    return res.send({
        version: "2.0",
        template: { outputs: [{ simpleText: { text } }] }
    });
}

module.exports = { rankingTyping, rankingColor, rankingPicture };