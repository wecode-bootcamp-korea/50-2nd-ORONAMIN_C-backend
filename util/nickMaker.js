// 실행시 자동으로 닉네임을 생성해주는 함수//
const nicknameMaker = () => {
    const day = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];
    const time = ["동틀녘의", "새벽의", "아침의", "점심의", "저녁의", "해질녘의", "밤의"];
    const face = ["화난", "여유로운", "심심한", "외로운", "행복한", "졸린"];
    const animal = ["고양이", "강아지", "호랑이", "쿼카", "고슴도치", "햄스터"];

    const dayIndex = Math.floor(Math.random() * day.length);
    const timeIndex = Math.floor(Math.random() * time.length);
    const faceIndex = Math.floor(Math.random() * face.length);
    const animalIndex = Math.floor(Math.random() * animal.length);

    return day[dayIndex] + " " + time[timeIndex] + " " + face[faceIndex] + " " + animal[animalIndex];
};

module.exports = { nicknameMaker };
