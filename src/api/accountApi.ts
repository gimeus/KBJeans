import axios from 'axios';

// API 기본 URL 설정
const BASE_URL = 'http://localhost:8080/api/v1/account';

// 사용자 보유 계좌 조회
export const fetchUserAccounts = async (userId: number) => {
  const response = await axios.get(`${BASE_URL}/accounts`, {
    params: { userId },
  });
  return response.data;
};

// 청약 납입 (deposit)
export const incrementDeposit = async (userId: number, accountId: number, depositAmount: number) => {
  const response = await axios.post(`${BASE_URL}/deposit`, null, {
    params: { userId, accountId, depositAmount },
  });
  return response.data;
};

// 계좌 잔액 총합 조회
export const fetchTotalBalance = async (userId: number) => {
  const response = await axios.get(`${BASE_URL}/accounts-balance-total`, {
    params: { userId },
  });
  return response.data;
};

// 청약 납입 리스트 조회
export const fetchDepositsByAccountId = async (accountId: number) => {
  const response = await axios.get(`${BASE_URL}/deposits`, {
    params: { accountId },
  });
  return response.data;
};