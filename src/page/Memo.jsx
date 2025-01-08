import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchClickDateNumber, fetchModifyMemo, insertDateNumber, fetchDeleteMemo, fetchAllMemoList } from '../redux/joinAction'

const Memo = ({currentMemo, memoList, setMemoID, setCurrentMemo, closeStatus, setCloseStatus, element, loginID}) => {
    const dispatch = useDispatch()
    // 날짜에 대한 메모저장
    const onDateMemoSave = (date, event) => {
        dispatch(fetchClickDateNumber(date, currentMemo, loginID))
        if(closeStatus === false) {
            alert(`저장되었습니다`)
        }
        event.stopPropagation()
        setCloseStatus(true)
    }

    // 날짜에 대한 메모수정
    const onDateMemoModify = (date, event) => {
        // const dataMatch = memoList.find(value => value.selectDate === date)
        const dataMatch = memoList.find(value => 
                            value.selectDate.year === date.year &&
                            value.selectDate.month === date.month &&
                            value.selectDate.day === date.day
                        )
        if(dataMatch) {
            setMemoID(dataMatch.id)
            setCurrentMemo(currentMemo)
            dispatch(fetchModifyMemo({id: dataMatch.id, memoContent: currentMemo}))
        }
        if(closeStatus === false) {
            alert(`수정되었습니다`)
        }
        event.stopPropagation()
        setCloseStatus(true)
    }

    // 날짜에 대한 메모닫기
    const onDateMemoClose = (event) => {
        event.stopPropagation() // 상위부모 'onHandleDateNumber' 이벤트핸들러로 버블링 되지 않도록 하기위해(이게 없으면, 닫기를 할때 onHandlerDateNumber에있는 ttt가 찍힘)
        setCloseStatus(true)
        dispatch(insertDateNumber(null)) // 상태 업데이트 후 비동기적으로 dispatch 실행
// console.log(`닫기버튼 클릭시 closeStatus = ${closeStatus}`);      
    }

    // 날짜에 대한 메모삭제
    const onDateMemoDelete = (date, event) => {
        const dataMatch = memoList.find(value => 
                                    value.selectDate.year === date.year &&
                                    value.selectDate.month === date.month &&
                                    value.selectDate.day === date.day
                        )
        if(dataMatch) {
            setMemoID(dataMatch.id)
            setCurrentMemo(currentMemo)
            dispatch(fetchDeleteMemo({id: dataMatch.id, memoContent: currentMemo}))
            dispatch(fetchAllMemoList())
        }
        if(closeStatus === false) {
            alert(`삭제되었습니다`)
        }
        event.stopPropagation()
        setCloseStatus(true)
    }
  return (
    <>
        <div className="box">
            <p className="text-memo"><textarea onChange={(e) => setCurrentMemo(e.target.value)} value={currentMemo}></textarea></p>
            <div className="btn-box">
                <button type="button" onClick={(event) => onDateMemoSave(element, event)}>저장</button>
                <button type="button" onClick={(event) => onDateMemoClose(event)}>취소</button>
                <button type="button" onClick={(event) => onDateMemoModify(element, event)}>수정</button>
                <button type="button" onClick={(event) => onDateMemoDelete(element, event)}>삭제</button>
            </div>
        </div>
    </>
  )
}

export default Memo