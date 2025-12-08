const express = require("express");
const app = express();
app.use(express.json());

// ----------------------
//       MEMORY STORE
// ----------------------
const memory = require("./memoryStore");

// ----------------------
//       GAME LOGIC
// ----------------------

// 타자배틀
const { startTypingBattle } = require("./typing/start");
const { checkTyping } = require("./typing/check");

// 색몇개
const { startColorGame } = require("./color/start");
const { checkColorGame } = require("./color/check");

// 그림퀴즈
const { startPictureQuiz } = require("./picture/start");
const { checkPictureQuiz } = require("./picture/check");

// 종료 스킬
const { stopGame } = require("./stopGame");

// 디버그
const { roomInfo } = require("./debug/roomInfo");

// 랭킹 API (게임별)
const {
    rankingTyping,
    rankingColor,
    rankingPicture
} = require("./ranking/rankController");


// ----------------------
//  GAME RUNNING CHECKER
// ----------------------
function blockIfGameRunning(game, res) {
    if (memory.currentGame && memory.currentGame !== game) {
        return res.send({
            version: "2.0",
            template: {
                outputs: [{
                    simpleText: {
                        text: `⚠️ 현재 '${memory.currentGame}' 게임이 진행 중입니다!\n먼저 종료해주세요 🎮`
                    }
                }]
            }
        });
    }
    return null;
}



// ----------------------
//        API ROUTES
// ----------------------

// ⛔ 게임 종료
app.post("/api/game/stop", stopGame);


// ⌨️ 타자배틀
app.post("/api/typing/start", (req, res) => {
    const block = blockIfGameRunning("typing", res);
    if (block) return;
    startTypingBattle(req, res);
});
app.post("/api/typing/check", checkTyping);


// 🎨 색몇개
app.post("/api/color/start", (req, res) => {
    const block = blockIfGameRunning("color", res);
    if (block) return;
    startColorGame(req, res);
});
app.post("/api/color/check", checkColorGame);


// 🖼 그림퀴즈
app.post("/api/picture/start", (req, res) => {
    const block = blockIfGameRunning("picture", res);
    if (block) return;
    startPictureQuiz(req, res);
});
app.post("/api/picture/check", checkPictureQuiz);


// 🏆 랭킹 (게임별)
app.post("/api/ranking/typing", rankingTyping);
app.post("/api/ranking/color", rankingColor);
app.post("/api/ranking/picture", rankingPicture);


// 🧪 디버그 API
app.post("/api/debug/room", roomInfo);


// ----------------------
//       FALLBACK
// ----------------------
app.use((req, res) => {
    res.status(404).send({
        version: "2.0",
        template: {
            outputs: [
                { simpleText: { text: "❌ 잘못된 스킬 경로입니다." } }
            ]
        }
    });
});


// ----------------------
//      SERVER START
// ----------------------
app.listen(3000, () => {
    console.log("🔥 Kakao Game Skill Server running on port 3000");
});