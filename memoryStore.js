module.exports = {
    currentGame: null,

    typing: { sentence: null },
    color: { answer: null },
    picture: { answer: null, image: null },

    rooms: {},   // ⭐ 방별 랭킹 저장
    userRoomMap: {}  
};

// 초기화 함수
module.exports.resetGame = function () {
    module.exports.currentGame = null;
    module.exports.typing.sentence = null;
    module.exports.color.answer = null;
    module.exports.picture.answer = null;
    module.exports.picture.image = null;
};