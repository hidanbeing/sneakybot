const nonsenseList = require("../gameData/nonsense");

function sendNonsense(req, res) {

    const random = nonsenseList[Math.floor(Math.random() * nonsenseList.length)];

    return res.send({
        version: "2.0",
        template: {
            outputs: [{
                simpleText: { text: `🤪 오늘의 헛소리!\n\n"${random}"` }
            }]
        }
    });
}

module.exports = { sendNonsense };