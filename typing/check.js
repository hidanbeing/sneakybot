const memory = require("../memoryStore");
const { addScore } = require("../utils/ranking");

// 유저 닉네임 가져오기 (없으면 ID 앞 4자리 사용)
function getUserName(userObj) {
    if (userObj.properties?.nickname) {
        return userObj.properties.nickname;
    }
    return userObj.id.slice(0, 4) + "****";
}

function checkTyping(req, res) {
    const user = req.body.userRequest.user;
    const name = getUserName(user);

    const answer = req.body.userRequest.utterance.trim();
    const correct = memory.typing.sentence;

    // 정답일 때
    if (answer === correct) {
        // 게임 종료 처리
        addScore(req, "typing");
        memory.currentGame = null;

        return res.send({
            version: "2.0",
            template: {
                outputs: [
                    {
                        simpleText: {
                            text: `🎉 @${name} 님 정답입니다!! 🎊`
                        }
                    }
                ]
            }
        });
    }

    // 오답일 때
    return res.send({
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleText: {
                        text: "오타가 난 것 같아요! 다시 시도해보세요 ✏️"
                    }
                }
            ]
        }
    });
}

module.exports = { checkTyping };