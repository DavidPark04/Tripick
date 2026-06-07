// =============================================
// App.jsx
// 애플리케이션의 최상위 루트 컴포넌트
// 검색, 데이터 관리, 화면 전환을 담당
// =============================================

import React, { useState } from 'react';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import PlaceList from './components/PlaceList.jsx';
import { fetchPlaceData } from './api/kakaoApi.js';
import './App.css';

// 추천 인기 여행지 태그
const HOT_PLACE_TAGS = [
  '성수동',
  '연남동',
  '광안리',
  '해운대',
  '애월'
];

// 숨겨진 로컬 스팟 태그
const HIDDEN_SPOT_TAGS = [
  '문래동',
  '해방촌',
  '망원동',
  '교동',
  '행궁동'
];

function App() {

  // 현재 검색어
  const [keyword, setKeyword] = useState('');

  // 카카오 API에서 받아온 장소 데이터
  const [placeData, setPlaceData] = useState([]);

  // 데이터 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // 오류 메시지
  const [errorMsg, setErrorMsg] = useState('');

  // 홈 화면으로 초기화
  const handleHome = () => {
    setKeyword('');
    setPlaceData([]);
    setErrorMsg('');
  };

  // 검색 실행
  const handleSearch = (inputKeyword) => {

    // 검색 상태 초기화
    setKeyword(inputKeyword);
    setIsLoading(true);
    setErrorMsg('');
    setPlaceData([]);

    // 카카오 API 호출
    fetchPlaceData(inputKeyword)
      .then((placeResult) => {

        // 검색 결과 저장
        setPlaceData(placeResult);
      })
      .catch((error) => {

        // 오류 발생 시 메시지 출력
        console.error('Search Error:', error);

        setErrorMsg(
          '장소 데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
        );
      })
      .finally(() => {

        // 로딩 상태 종료
        setIsLoading(false);
      });
  };

  return (
    <div className="app-container">

      {/* 상단 헤더 */}
      <Header onHome={handleHome} />

      {/* 검색창 */}
      <SearchBar
        keyword={keyword}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {/* 검색 전 메인 화면 */}
      {!keyword && !isLoading && (
        <div className="home-welcome">

          {/* 인기 여행지 추천 */}
          <div className="recommend-section">
            <h2>
              Tripick이 추천하는 요즘 핫플레이스 🔥
            </h2>

            <div className="tag-container">
              {HOT_PLACE_TAGS.map((tag) => (
                <button
                  key={tag}
                  className="recommend-tag"

                  // 태그 클릭 시 바로 검색
                  onClick={() => handleSearch(tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* 숨겨진 여행지 추천 */}
          <div
            className="recommend-section"
            style={{ marginTop: '3rem' }}
          >
            <h2>
              나만 알고 싶은 숨겨진 로컬 스팟 🤫
            </h2>

            <div className="tag-container">
              {HIDDEN_SPOT_TAGS.map((tag) => (
                <button
                  key={tag}
                  className="recommend-tag hidden-tag"

                  // 태그 클릭 시 바로 검색
                  onClick={() => handleSearch(tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 검색 결과 영역 */}
      {keyword && (
        <div className="search-results">

          {/* 로딩 화면 */}
          {isLoading ? (
            <div className="loading-box">
              <p>
                ⏳ <strong>{keyword}</strong>
                의 인기 스팟을 불러오는 중입니다...
              </p>
            </div>

          /* 오류 화면 */
          ) : errorMsg ? (
            <div className="error-box">
              <p>⚠️ {errorMsg}</p>
            </div>

          /* 정상 검색 결과 화면 */
          ) : (
            <div className="dashboard-single">

              {/* 장소 목록 출력 */}
              <PlaceList places={placeData} />

            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default App;