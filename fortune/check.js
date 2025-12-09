const fortuneData = require("../gameData/fortuneData");
const memory = require("../memoryStore");

function getRandomFortune() {
  const idx = Math.floor(Math.random() * fortuneData.length);
  return fortuneData[idx];
}

function checkFortune(req, res) {
  const userId = req.body.userRequest.user.id;
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  // dailyFortune이 없으면 초기화
  if (!memory.dailyFortune[userId]) {
    memory.dailyFortune[userId] = {};
  }

  // 오늘 운세가 이미 존재하면 그걸 그대로 리턴
  if (memory.dailyFortune[userId][today]) {
    return res.send({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: `🔮 ${memory.dailyFortune[userId][today]}`,
            },
          },
        ],
      },
    });
  }

  // 없으면 새 랜덤 운세 저장
  const todayFortune = getRandomFortune();
  memory.dailyFortune[userId][today] = todayFortune;

  return res.send({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: `🔮 ${todayFortune}`,
          },
        },
      ],
    },
  });
}

module.exports = { checkFortune };
