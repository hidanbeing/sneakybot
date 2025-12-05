const store = require('../memoryStore');

module.exports = function (req, res) {

  // 2~5초 랜덤 시간 생성
  const waitTime = Math.floor(Math.random() * 3000) + 2000; 
  // (2000~5000ms)

  // 버튼 전송 시간을 memoryStore에 저장 (아직 null)
  store.buttonSentTime = null;
  store.winner = null;

  // 준비 메시지
  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: `반응속도 게임을 시작할게요!\n\n준비하세요… 👀🔥\n신호가 약 ${waitTime / 1000}초 후에 나옵니다!`
          }
        }
      ],
      quickReplies: [
        {
          label: "시작 대기 중…",
          action: "message",
          messageText: "시작 대기 중…"
        }
      ]
    }
  };

  // “지금!” 버튼이 실제 전송되기 전에 기다리는 시간
  setTimeout(() => {
    store.buttonSentTime = Date.now(); // 버튼 찍힌 시각 기록

    // 여기서 실제로 카카오톡에 메시지를 '추가로' 보낼 수 없음.
    // 대신 챗봇 블록에서 자동으로 /api/reaction/press 를 호출하도록 설계하거나,
    // 사용자가 "지금!" 버튼을 누르도록 유도해야 함.
  }, waitTime);

  res.status(200).send(responseBody);
};