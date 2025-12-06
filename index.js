const express = require("express");
const app = express();
app.use(express.json());

// 타자배틀
const { startTypingBattle } = require("./typing/start");
const { checkTyping } = require("./typing/check");

// 색몇개
const { startColorGame } = require("./color/start");
const { checkColorGame } = require("./color/check");

// ========== 게임 시작 라우트 ==========

// 타자배틀 시작
app.post("/api/typing/start", (req, res) => {
    return startTypingBattle(req, res);
});

// 타자배틀 판정
app.post("/api/typing/check", (req, res) => {
    return checkTyping(req, res);
});

// 색몇개 시작
app.post("/api/color/start", (req, res) => {
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
            outputs: [
                { simpleText: { text: "❌ 잘못된 스킬 경로입니다." } }
            ]
        }
    });
});

app.listen(3000, () =>
    console.log("🔥 Game skill server running on port 3000")
);