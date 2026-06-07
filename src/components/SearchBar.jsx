// =============================================
// SearchBar.jsx
// 사용자가 지역명을 입력하고 검색하는 컴포넌트
// =============================================

import React, { useState, useEffect } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, isLoading, keyword }) {

  // 검색창에 입력되는 값을 관리
  const [inputValue, setInputValue] = useState('');

  // 부모 컴포넌트의 keyword 값과 검색창 내용을 동기화
  useEffect(() => {
    if (keyword !== undefined) {
      setInputValue(keyword);
    }
  }, [keyword]);

  // 검색 버튼 클릭 또는 Enter 입력 시 실행
  const handleSubmit = (e) => {
    e.preventDefault();

    // 공백만 입력한 경우 검색 방지
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  return (
    <div className="search-bar-container">

      {/* 검색 폼 */}
      <form
        onSubmit={handleSubmit}
        className="search-form"
      >

        {/* 지역명 입력창 */}
        <input
          type="text"
          className="search-input"
          placeholder="가고 싶은 지역을 검색해 보세요 (예: 성수동, 애월)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}

          // 검색 중에는 입력 비활성화
          disabled={isLoading}
        />

        {/* 검색 버튼 */}
        <button
          type="submit"
          className="search-button"

          // 검색 중에는 버튼 비활성화
          disabled={isLoading}
        >
          {isLoading ? '검색 중...' : '검색'}
        </button>

      </form>
    </div>
  );
}

export default SearchBar;