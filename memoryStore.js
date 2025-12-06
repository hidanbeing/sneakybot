module.exports = {
    currentGame: null, // 진행중인 게임 종류 ("typing" / "color")

    typing: {
        sentence: "",
        winner: null,
    },

    color: {
        answer: null,
        winner: null,
    }
};