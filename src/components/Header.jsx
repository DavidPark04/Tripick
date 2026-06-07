// Header 컴포넌트 스타일 import
import './Header.css';

/**
 * 상단 헤더 컴포넌트
 * @param {Function} onHome - 로고 클릭 시 홈으로 이동하는 함수
 */
export default function Header({ onHome }) {
  return (
    <header className="app-header">

      {/* 로고 영역 클릭 시 홈 화면으로 이동 */}
      <div onClick={onHome} className="logo-wrap">

        {/* SVG 기반 로고 */}
        <svg
          width="240"
          height="80"
          viewBox="0 0 240 80"
          xmlns="http://www.w3.org/2000/svg"
        >

          {/* 서비스명 표시 */}
          <text
            x="30"
            y="58"
            fontFamily="Pretendard, sans-serif"
            fontSize="56"
            fontWeight="800"
            fill="#0f172a"
            letterSpacing="-2"
          >
            Tripick
          </text>

          {/* 로고 강조용 포인트 원 */}
          <circle
            cx="222"
            cy="8"
            r="7"
            fill="#2563eb"
          />
        </svg>
      </div>

      {/* 서비스 소개 문구 */}
      <p className="header-sub">
        여행지 검색 한 번으로 모두 해결!
      </p>

    </header>
  );
}