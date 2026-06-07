// =============================================
// 카카오 로컬 API를 호출하여 지역 내 인기 스팟을 가져오는 모듈
// =============================================

// Vite 환경변수에서 카카오 REST API 키를 가져옴
const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

// API 키가 없을 경우 콘솔에 경고 출력
if (!KAKAO_REST_API_KEY) {
  console.error("Kakao REST API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.");
}

// 카카오 API 요청 시 사용할 공통 헤더
const kakaoHeaders = {
  Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
};

/**
 * 사용자가 입력한 키워드를 좌표(x, y)로 변환
 * 1. 주소 검색
 * 2. 실패 시 키워드 검색
 * 3. 둘 다 실패 시 null 반환
 */
const getCoordinates = (keyword) => {
  const addressUrl =
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(keyword)}&size=1`;

  return fetch(addressUrl, { headers: kakaoHeaders })
    .then((res) => res.json())
    .then((data) => {

      // 주소 검색 결과가 존재하는 경우
      if (data.documents?.length > 0) {
        return {
          x: data.documents[0].x,
          y: data.documents[0].y,
        };
      }

      // 주소 검색 실패 시 일반 키워드 검색 수행
      const keywordUrl =
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(keyword)}&size=1`;

      return fetch(keywordUrl, { headers: kakaoHeaders })
        .then((res) => res.json())
        .then((kwData) => {

          // 키워드 검색 성공
          if (kwData.documents?.length > 0) {
            return {
              x: kwData.documents[0].x,
              y: kwData.documents[0].y,
            };
          }

          // 검색 결과 없음
          return null;
        });
    });
};

/**
 * 특정 좌표 주변의 장소 목록 조회
 * @param {string} x - 경도
 * @param {string} y - 위도
 */
const getPlacesByCoords = (x, y) => {

  // 검색 반경 (5km)
  const RADIUS = 5000;

  // 검색할 카테고리 코드
  const categoryCodes = [
    'FD6', // 음식점
    'CE7', // 카페
    'AD5', // 숙박
    'AT4', // 관광명소
    'CT1', // 문화시설
  ];

  // 각 카테고리에 대해 병렬 요청 수행
  const requests = categoryCodes.map((code) => {

    // 정확도 순으로 정렬하여 검색
    const url =
      `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=${code}&x=${x}&y=${y}&radius=${RADIUS}&sort=accuracy`;

    return fetch(url, { headers: kakaoHeaders })
      .then((res) => {

        // 응답 실패 시 예외 발생
        if (!res.ok) {
          throw new Error(`Kakao Category ${code} Fetch Failed`);
        }

        return res.json();
      })
      .then((data) => data.documents || [])
      .catch((err) => {

        // 특정 카테고리 요청 실패 시 빈 배열 반환
        console.error(err);
        return [];
      });
  });

  // 모든 카테고리 결과를 병합
  return Promise.all(requests).then((results) => {

    // 2차원 배열 -> 1차원 배열
    const merged = results.flat();

    // 장소 ID 기준 중복 제거
    const unique = Array.from(
      new Map(merged.map((place) => [place.id, place])).values()
    );

    return unique;
  });
};

/**
 * 외부에서 사용하는 메인 함수
 * 사용자가 입력한 지역명 → 좌표 변환 → 주변 장소 검색
 *
 * @param {string} keyword
 * @returns {Promise<Array>}
 */
export const fetchPlaceData = (keyword) => {
  return getCoordinates(keyword)
    .then((coords) => {

      // 좌표를 찾지 못한 경우 빈 배열 반환
      if (!coords) return [];

      // 좌표 기반 장소 검색
      return getPlacesByCoords(coords.x, coords.y);
    })
    .catch((error) => {

      // 전체 프로세스 에러 처리
      console.error('Kakao API Main Error:', error);
      return [];
    });
};