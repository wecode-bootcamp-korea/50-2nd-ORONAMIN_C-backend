const sqlResult = (result) =>{
    console.log("SQL 데이터 변동 결과")
    console.log("-----------------")
    if(result.insertId>0){console.log("추가 된 행 : 1행")}
    console.log("영향을 받은 행 : ", result.affectedRows, "행" )
    console.log("수정/삭제 된 행 : ", result.changedRows, "행" )
    if (result.serverStatus=2){console.log("서버 상태 : 정상")}
    else {console.log("SQL 서버가 정상작동중인지 확인이 필요합니다.")}
}
//
module.exports = { sqlResult }