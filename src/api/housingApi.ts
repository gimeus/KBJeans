import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/housing';

// API 호출: 모든 청약공고 가져오기
export const fetchHousingAnnouncements = async (
  page: number,
  pageSize: number,
  userId: number
) => {
  const response = await axios.get(`${BASE_URL}/getAnnouncement`, {
    params: { page, pageSize, userId },
  });
  return response.data;
};

// API 호출: 사용자가 찜한 청약공고 가져오기
export const fetchHousingAnnouncementsLike = async (
  page: number,
  pageSize: number,
  userId: number
) => {
  const response = await axios.get(`${BASE_URL}/getAnnouncementLike`, {
    params: { page, pageSize, userId },
  });
  return response.data;
};

// API 호출: 월별 청약공고 가져오기
export const fetchMonthlyHousingAnnouncements = async (
  year: number,
  month: number,
  userId: number
) => {
  const response = await axios.get(`${BASE_URL}/getMonthlyAnnouncement`, {
    params: { year, month, userId },
  });
  return response.data;
};

// API 호출: 월별 찜한 청약공고 가져오기
export const fetchMonthlyHousingAnnouncementsLike = async (
  year: number,
  month: number,
  userId: number
) => {
  const response = await axios.get(`${BASE_URL}/getMonthlyAnnouncementLike`, {
    params: { year, month, userId },
  });
  return response.data;
};

// API 호출: 지도에 들어가는 청약공고 가져오기
export const fetchMappedHousingAnnouncements = async (userId: number) => {
  const response = await axios.get(`${BASE_URL}/getMappedAnnouncement`, {
    params: { userId },
  });
  return response.data;
};

// API 호출: 지도에 들어가는 찜한 청약공고 가져오기
export const fetchMappedHousingAnnouncementsLike = async (userId: number) => {
  const response = await axios.get(`${BASE_URL}/getMappedAnnouncementLike`, {
    params: { userId },
  });
  return response.data;
};

// API 호출: 특정 청약공고의 자세한 정보 가져오기
export const fetchAnnouncementDetail = async (
  pblancNo: string,
  houseManageNo: string,
  userId: number
) => {
  const response = await axios.get(`${BASE_URL}/getAnnouncementDetail`, {
    params: { pblancNo, houseManageNo, userId },
  });
  return response.data;
};