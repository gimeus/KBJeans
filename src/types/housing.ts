export interface HousingListDto {
  house_manage_no: string; // 주택관리번호
  pblanc_no: string; // 공고번호
  house_nm: string; // 주택명
  house_secd: string; // 주택구분코드
  house_secd_nm: string; // 주택구분코드명
  house_dtl_secd: string; // 주택상세구분코드
  house_dtl_secd_nm: string; // 주택상세구분코드명
  rent_secd: string; // 분양구분코드
  rent_secd_nm: string; // 분양구분코드명
  subscrpt_area_code_nm: string; // 공급지역명
  hssply_adres: string; // 공급위치
  tot_suply_hshldco: number; // 공급규모
  rcrit_pblanc_de: string; // 모집공고일
  subscrpt_rcept_bgnde: string | null; // 청약접수시작일
  subscrpt_rcept_endde: string | null; // 청약접수종료일
  rcept_bgnde: string | null; // 청약접수시작일
  rcept_endde: string | null; // 청약접수종료일
  isLiked: boolean; // 사용자가 좋아요 했는지
}

export interface HousingResponse {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  data: HousingListDto[];
}
