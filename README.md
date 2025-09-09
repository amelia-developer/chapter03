<strong># 글리치에서 호스팅종료로 인한 오류 vercel로 옮겨서 현재 디벨롭 작업중(2025-09-09)<br><br></strong>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
  <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">
</p>
<br>
<p align="center">
   <h1><strong>React-Calender-Memo-Weather 프로젝트</strong>📅📝🌤️</h1>

  <ul>
    <li><span>목표: 매일 사용하는 네이버 캘린더에서 아이디어를 착안하여, react와 redux를 활용한 상태관리 및 API활용</span></li>
    <li><span>기술스택: react, redux, scss, axios, 날씨api, firebaseHosting, json-server를 Glitch에서 호스팅하여 API 엔드포인트 변경</li>
    <li><span>배포링크: https://react-calendar-weather-memo.web.app/</span></li>
    <li>
      <span>주요기능</span>
      <ol>
        <li>캘린더ui</li>
        <li>메모 CRUD</li>
        <li>날씨 데이터연동</li>
        <li>반응형 대응(해상도에 따라 '토,일' 선택 시 메모의 동적 위치 수정)</li>
        <li>skin Thema(dark, nonDark)</li>
        <li>로그인 세션(jwt)</li>
      </ol>
    </li>
  </ul>

  <h2>ISSUE</h2>
  <ul>
    <li>
      <span>2025-09-09(화)</span>
      <ol>
        <li>
          <span>날짜를 클릭했을때 메모입력란이 열리고, 해당메모에대해서 ‘닫기’ 버튼을 눌렀는데 메모가 안닫힘</span>
          <p>원인: 메모의 닫기버튼 이벤트가 날짜클릭시 실행되는 onHandlerDateNumber이벤트와 버블링이 일어났고, 로그확인으로 해당이벤트(onHandlerDateNumber)안에서 console.log(`ttt`)라고 넣은 로그가 메모에서 닫기버튼을 눌렀을때 로그가 찍힘</p>
          <p>해결방법: 메모의 닫기버튼을 클릭했을때 event.stopPropagation을 실행시킴</p>
        </li>
        <li>
          <span>로그인세션에 대해 jwt으로 처리(미해결)</span>
          <p>원인: 해당건은 jwt로 처리를 했는데, 크롬 > 네트워크 > 헤더 > 페이로드에 비밀번호를 server.js에서 분명 제외를시키고 token을 발급시켰는데도비밀번호가 계속 나옴</p>
          <p>해결방법: 미해결, 진행중</p>
        </li>
      </ol>
    </li>
  </ul>
</p>
