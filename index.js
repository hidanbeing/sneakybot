const express = require("express");
const app = express();
app.use(express.json());

const memory = require("./memoryStore");

// 타자배틀
const { startTypingBattle } = require("./typing/start");
const { checkTyping } = require("./typing/check");

// 색맞추기
const { startColorGame } = require("./color/start");
const { checkColorGame } = require("./color/check");


// ----- 게임 시작 요청 시 공통 중복 체크 -----
function blockIfGameRunning(game, res) {
    if (memory.currentGame && memory.currentGame !== game) {
        return res.send({
            version: "2.0",
            template: {
                outputs: [{
                    simpleText: {
                        text: `⚠️ 현재 '${memory.currentGame}' 게임이 진행 중입니다!\n먼저 게임을 마쳐주세요 🎮`
                    }
                }]
            }
        });
    }
    return null;
}


// ---------------- API ROUTES ----------------

// 타자배틀 시작
app.post("/api/typing/start", (req, res) => {
    const block = blockIfGameRunning("typing", res);
    if (block) return;
    return startTypingBattle(req, res);
});

// 타자배틀 정답 체크
app.post("/api/typing/check", (req, res) => {
    return checkTyping(req, res);
});

// 색몇개 시작
app.post("/api/color/start", (req, res) => {
    const block = blockIfGameRunning("color", res);
    if (block) return;
    return startColorGame(req, res);
});

// 색몇개 정답 체크
app.post("/api/color/check", (req, res) => {
    return checkColorGame(req, res);
});


// fallback
app.use((req, res) => {
    res.status(404).send({
        version: "2.0",
        template: {
            outputs: [{ simpleText: { text: "❌ 잘못된 스킬 경로입니다." } }]
        }
    });
});

app.listen(3000, () => {
    console.log("🔥 Kakao Game Skill Server running on port 3000");
});