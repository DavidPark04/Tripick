// =============================================
// PlaceList.jsx
// 장소 목록 표시, 카테고리 필터링, 상세 모달 관리
// =============================================

import React, { useState, useEffect } from 'react';
import PlaceModal from './PlaceModal';
import './PlaceList.css';

// 카테고리별 아이콘, 색상, 라벨 정의
const CATEGORY_STYLES = {
  FD6: { emoji: '🍕', color: '#e8735a', label: '음식점' },
  CE7: { emoji: '☕', color: '#a0784e', label: '카페' },
  AD5: { emoji: '🏨', color: '#5b8dee', label: '숙박' },
  AT4: { emoji: '🏞️', color: '#2ecc71', label: '관광명소' },
  CT1: { emoji: '🎭', color: '#9b59b6', label: '문화시설' },
};

// 장소의 카테고리에 맞는 스타일 반환
const getCategoryStyle = (place) => {
  return CATEGORY_STYLES[place.category_group_code] || {
    emoji: '📍',
    color: '#6c757d',
    label: '기타',
  };
};

export default function PlaceList({ places }) {

  // 현재 선택된 탭
  const [activeTab, setActiveTab] = useState('all');

  // 상세보기 모달에 표시할 장소
  const [selectedPlace, setSelectedPlace] = useState(null);

  // 검색 결과가 변경되면 전체 탭으로 초기화
  useEffect(() => {
    setActiveTab('all');
  }, [places]);

  // 카테고리별 장소 개수 계산
  const countByCode = (code) =>
    places.filter((p) => p.category_group_code === code).length;

  // 탭 메뉴 정보
  const tabs = [
    { key: 'all', label: '📍 전체', count: places.length },
    { key: 'FD6', label: '🍕 맛집', count: countByCode('FD6') },
    { key: 'CE7', label: '☕ 카페', count: countByCode('CE7') },
    { key: 'AD5', label: '🏨 숙소', count: countByCode('AD5') },
    {
      key: 'AT4',
      label: '🏞️ 관광/문화',
      count: countByCode('AT4') + countByCode('CT1'),
    },
  ];

  // 선택된 탭에 따라 장소 목록 필터링
  const getFilteredPlaces = () => {
    if (activeTab === 'all') return places;

    if (activeTab === 'AT4') {
      return places.filter(
        (p) =>
          p.category_group_code === 'AT4' ||
          p.category_group_code === 'CT1'
      );
    }

    return places.filter(
      (p) => p.category_group_code === activeTab
    );
  };

  // 현재 화면에 표시할 장소 목록
  const currentPlaces = getFilteredPlaces();

  return (
    <>
      <section className="place-section">

        {/* 장소 목록 제목 */}
        <h2>🗺️ 인기 스팟</h2>

        {/* 카테고리 선택 탭 */}
        <div className="tab-menu">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`tab-btn ${
                activeTab === tab.key ? 'active' : ''
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* 필터링된 장소 카드 목록 */}
        <div className="place-list">
          {currentPlaces.length > 0 ? (
            currentPlaces.map((place) => {
              const { emoji, color } =
                getCategoryStyle(place);

              // 카테고리 이름 간략화
              const shortCategory =
                place.category_name?.split(' > ').pop() ||
                place.category_name;

              return (
                <div
                  key={place.id}
                  className="place-item"

                  // 카드 클릭 시 상세 모달 표시
                  onClick={() => setSelectedPlace(place)}
                  title="클릭하면 상세 정보를 볼 수 있어요"
                >
                  <div
                    className="place-icon"
                    style={{ background: `${color}18` }}
                  >
                    {emoji}
                  </div>

                  <div className="place-info">
                    <h3 className="place-name">
                      {place.place_name}
                    </h3>

                    <span
                      className="category-badge"
                      style={{
                        background: `${color}20`,
                        color,
                        borderColor: `${color}40`,
                      }}
                    >
                      {emoji} {shortCategory}
                    </span>

                    <p className="place-address">
                      📍 {place.road_address_name || place.address_name}
                    </p>

                    {/* 전화번호가 있는 경우만 출력 */}
                    {place.phone && (
                      <p className="place-phone">
                        📞 {place.phone}
                      </p>
                    )}
                  </div>

                  <span className="place-arrow">›</span>
                </div>
              );
            })
          ) : (
            // 필터 결과가 없는 경우
            <p className="no-data">
              해당 카테고리에 등록된 장소가 없습니다.
            </p>
          )}
        </div>
      </section>

      {/* 장소 상세정보 모달 */}
      <PlaceModal
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
      />
    </>
  );
}