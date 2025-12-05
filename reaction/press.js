const store = require('../memoryStore');

module.exports = function (req, res) {

  const userId = req.body.userRequest.user.id;
  const userName = req.body.userRequest.user.properties.nickname;

  const now = Date.now();

  // 아직 신호가 안 나온 경우
  if (!store.buttonSentTime) {
    return res.status(200).send({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: "아직 신호가 나오지 않았어요! 😅"
            }
          }
        ]
      }
    });
  }

  // 이미 승자 존재 → 그대로 안내
  if (store.winner) {
    return res.status(200).send({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: `이미 ${store.winner.name}님이 1등이에요! 🏆\n반응속도: ${store.winner.time}ms`
            }
          }
        ]
      }
    });
  }

  // 반응속도 계산
  const reactionTime = now - store.buttonSentTime;

  // 승자 기록
  store.winner = {
    id: userId,
    name: userName || "게스트",
    time: reactionTime
  };

  // 게임 종료 (UNLOCK)
  store.isPlaying = false;
  store.buttonSentTime = null;

  // 자동 종료 타이머 있었으면 해제
  if (store.timeoutId) clearTimeout(store.timeoutId);
  store.timeoutId = null;

  // 성공 메시지
  return res.status(200).send({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: `🎉 ${store.winner.name}님이 1등입니다!! 🏆\n반응속도: ${reactionTime}ms 🔥`
          }
        }
      ]
    }
  });
};