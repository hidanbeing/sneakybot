const store = require('../memoryStore');

module.exports = function (req, res) {
  // 이미 게임 진행 중이면 시작 불가
  if (store.isPlaying === true) {
    return res.status(200).send({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: "이미 반응속도 게임이 진행 중이에요! 😆\n게임이 끝난 뒤 다시 시작해 주세요."
            }
          }
        ]
      }
    });
  }

  // 게임 LOCK
  store.isPlaying = true;

  // 랜덤 신호시간 2~5초
  const waitTime = Math.floor(Math.random() * 3000) + 2000;

  // 초기화
  store.buttonSentTime = null;
  store.winner = null;

  // 자동 종료 타이머(10초) 설정
  if (store.timeoutId) clearTimeout(store.timeoutId);

  store.timeoutId = setTimeout(() => {
    if (!store.winner) {
      store.isPlaying = false;        // 게임 종료
      store.buttonSentTime = null;
      store.timeoutId = null;
    }
  }, 10000);

  // start 응답
  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: `반응속도 게임을 시작할게요! 🔥\n\n준비하세요… 👀\n신호는 약 ${waitTime / 1000}초 뒤에 나옵니다!`
          }
        }
      ]
    }
  };

  setTimeout(() => {
    store.buttonSentTime = Date.now();
  }, waitTime);

  res.status(200).send(responseBody);
};