const fortuneData = require("../gameData/fortuneData");
const memory = require("../memoryStore");
const { getUserName } = require("../utils/user");

function getRandomFortune() {
  const idx = Math.floor(Math.random() * fortuneData.length);
  return fortuneData[idx];
}

function checkFortune(req, res) {
  const user = req.body.userRequest.user;
  const name = getUserName(user); // ← @단비 같은 이름 추출
  const userId = user.id;

  const today = new Date().toISOString().slice(0, 10);

  if (!memory.dailyFortune[userId]) {
    memory.dailyFortune[userId] = {};
  }

  // 이미 오늘 운세가 존재할 경우
  if (memory.dailyFortune[userId][today]) {
    const fortune = memory.dailyFortune[userId][today];
    return res.send({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              // ⭐ 여기서 "@이름 운세 내용" 출력!
              text: `🔮 @${name} ${fortune}`,
            },
          },
        ],
      },
    });
  }

  // 오늘 처음 뽑는 운세라면
  const todayFortune = getRandomFortune();
  memory.dailyFortune[userId][today] = todayFortune;

  return res.send({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: `🔮 @${name} ${todayFortune}`,
          },
        },
      ],
    },
  });
}

module.exports = { checkFortune };
