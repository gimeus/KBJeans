import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/users';

// API 호출: 사용자 청약 희망 면적 조회
export const fetchDesiredArea = async (userId: number) => {
  const response = await axios.get(`${BASE_URL}/desired-area`, { params: { userId } });
  return response.data;
};

// API 호출: 사용자 청약 희망 면적 업데이트
export const updateDesiredArea = async (userId: number, desiredArea: number) => {
  const response = await axios.put(`${BASE_URL}/desired-area`, null, { params: { userId, desiredArea } });
  return response.data;
};

// API 호출: 뱃지 개수 조회
export const fetchBadgeCount = async (userId: number) => {
  const response = await axios.get(`${BASE_URL}/badge-count`, { params: { userId } });
  return response.data;
};

// API 호출: 보유 뱃지 조회
export const fetchBadges = async (userId: number) => {
  const response = await axios.get(`${BASE_URL}/badges`, { params: { userId } });
  return response.data;
};

// API 호출: 캘린더 기능 사용 횟수 증가
export const incrementCalendarUsage = async (userId: number) => {
  const response = await axios.post(`${BASE_URL}/calendar-usage`, null, { params: { userId } });
}

// API 호출: 페이지 방문 수 증가
export const incrementPageVisit = async (userId: number) => {
  const response = await axios.post(`${BASE_URL}/visit`, null, { params: { userId } });
  return response.data;
};