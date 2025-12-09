const fortuneData = require("../gameData/fortuneData");

function getRandomFortune() {
  const idx = Math.floor(Math.random() * fortuneData.length);
  return fortuneData[idx];
}

function checkFortune(req, res) {
  const fortune = getRandomFortune();

  return res.send({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: `🔮 ${fortune}`,
          },
        },
      ],
    },
  });
}

module.exports = { checkFortune };
