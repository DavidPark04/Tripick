// =============================================
// PlaceModal.jsx
// 선택한 장소의 상세 정보를 표시하는 모달 컴포넌트
// =============================================

import React from 'react';
import './PlaceModal.css';

// 카테고리별 아이콘 매핑
const CATEGORY_EMOJI = {
  FD6: '🍕',
  CE7: '☕',
  AD5: '🏨',
  AT4: '🏞️',
  CT1: '🎭',
};

export default function PlaceModal({ place, onClose }) {

  // 선택된 장소가 없으면 모달 렌더링하지 않음
  if (!place) return null;

  // 장소 카테고리에 맞는 아이콘 선택
  const emoji =
    CATEGORY_EMOJI[place.category_group_code] || '📍';

  // 카테고리명을 간략하게 표시
  const shortCategory =
    place.category_name?.split(' > ').pop() ||
    place.category_name;

  // 모달 바깥 영역 클릭 시 닫기
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
    >
      <div className="modal-box">

        {/* 모달 닫기 버튼 */}
        <button
          className="modal-close"
          onClick={onClose}
        >
          ✕
        </button>

        {/* 장소 이름 및 카테고리 표시 */}
        <div className="modal-header">
          <span className="modal-emoji">{emoji}</span>

          <div>
            <h2 className="modal-place-name">
              {place.place_name}
            </h2>

            <span className="modal-category-badge">
              {shortCategory}
            </span>
          </div>
        </div>

        {/* 장소 상세 정보 */}
        <div className="modal-body">

          {/* 도로명 주소 */}
          {place.road_address_name && (
            <div className="modal-row">
              <span className="modal-label">
                📍 도로명 주소
              </span>
              <span>{place.road_address_name}</span>
            </div>
          )}

          {/* 지번 주소 */}
          {place.address_name && (
            <div className="modal-row">
              <span className="modal-label">
                🗺️ 지번 주소
              </span>
              <span>{place.address_name}</span>
            </div>
          )}

          {/* 전화번호 정보 */}
          {place.phone ? (
            <div className="modal-row">
              <span className="modal-label">
                📞 전화번호
              </span>

              <a
                href={`tel:${place.phone}`}
                className="modal-phone"
              >
                {place.phone}
              </a>
            </div>
          ) : (
            <div className="modal-row">
              <span className="modal-label">
                📞 전화번호
              </span>

              <span className="modal-none">
                정보 없음
              </span>
            </div>
          )}

          {/* 전체 카테고리 정보 */}
          {place.category_name && (
            <div className="modal-row">
              <span className="modal-label">
                🏷️ 카테고리
              </span>
              <span>{place.category_name}</span>
            </div>
          )}
        </div>

        {/* 카카오맵 상세 페이지 이동 버튼 */}
        {place.place_url && (
          <a
            href={place.place_url}
            target="_blank"
            rel="noopener noreferrer"
            className="modal-kakao-btn"
          >
            카카오맵에서 보기 ↗
          </a>
        )}
      </div>
    </div>
  );
}