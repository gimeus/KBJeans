import { useState, useEffect } from 'react';
import axios from 'axios';
import { HousingResponse } from '@/types/housing';

export const useHousing = (selectedTab2: number) => {
  const [housingResponse, setHousingResponse] =
    useState<HousingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const userId = 1; // TODO: 실제 사용자 ID로 교체 필요

  const fetchHousings = async () => {
    try {
      const response = await axios.get<HousingResponse>(
        `http://localhost:8080/api/v1/housing/${selectedTab2 === 0 ? 'getAnnouncement' : 'getAnnouncementLike'}`,
        {
          params: {
            page: 1,
            pageSize: 20,
            userId,
          },
        }
      );
      setHousingResponse(response.data);
    } catch (error) {
      console.error('청약 정보 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHousings();
  }, [selectedTab2]);

  return { housingResponse, loading, fetchHousings }; // fetchHousings 추가
};
