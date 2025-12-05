const store = require('../memoryStore');

module.exports = function (req, res) {

  const userId = req.body.userRequest.user.id;
  const userName = req.body.userRequest.user.properties.nickname;

  const now = Date.now();

  // 1) 아직 start 스킬에서 신호가 나오기 전임
  if (!store.buttonSentTime) {
    return res.status(200).send({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: "아직 신호가 나오지 않았어요! 😅\n준비 신호 이후에 눌러주세요!"
            }
          }
        ]
      }
    });
  }

  // 2) 이미 승자가 있는 경우 → 중복 처리
  if (store.winner) {
    const message = `이미 ${store.winner.name}님이 1등이에요! 🏆\n반응속도: ${store.winner.time}ms`;

    return res.status(200).send({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: { text: message }
          }
        ]
      }
    });
  }

  // 3) 반응속도 계산
  const reactionTime = now - store.buttonSentTime;

  // 4) 승자 저장
  store.winner = {
    id: userId,
    name: userName || "알 수 없음",
    time: reactionTime
  };

  // 5) 유저에게 결과 출력
  return res.status(200).send({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: `🎉 ${store.winner.name}님, 1등이에요! 🎉\n\n반응속도: ${reactionTime}ms ⚡️`
          }
        }
      ]
    }
  });
};