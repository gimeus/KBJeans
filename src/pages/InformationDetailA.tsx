import styled from "styled-components";
import InfoSection from "@/components/InfoSection";
import HeaderMain from "@/components/HeaderMain";
import HeaderSub from "@/components/HeaderSub";
import ScheduleA from "@/components/ScheduleA";
import TableComponent from "@/components/Table";
import ApplyButton from "@/components/ApplyButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface HouseModel {
    house_manage_no: string;
    pblanc_no: string;
    model_no: string | null;
    house_ty: string;
    suply_ar: number;
    suply_hshldco: number;
    spsply_hshldco: number;
    mnych_hshldco: number;
    nwwds_hshldco: number;
    lfe_frst_hshldco: number;
    old_parnts_suport_hshldco: number;
    instt_recomend_hshldco: number;
    etc_hshldco: number;
    transr_instt_enfsn_hshldco: number;
    ygmn_hshldco: number;
    nwbb_hshldco: number;
    lttot_top_amount: number;
}

interface HousingAnnouncement {
    house_manage_no: string;
    pblanc_no: string;
    house_nm: string;
    house_secd: string;
    house_secd_nm: string;
    house_dtl_secd: string;
    house_dtl_secd_nm: string;
    rent_secd: string;
    rent_secd_nm: string;
    subscrpt_area_code: string;
    subscrpt_area_code_nm: string;
    hssply_zip: string;
    hssply_adres: string;
    tot_suply_hshldco: number;
    rcrit_pblanc_de: string | null;
    subscrpt_rcept_bgnde: string | null;
    subscrpt_rcept_endde: string | null;
    rcept_bgnde: string | null;
    rcept_endde: string | null;
    spsply_rcept_bgnde: string | null;
    spsply_rcept_endde: string | null;
    gnrl_rnk1_crsparea_rcptde: string | null;
    gnrl_rnk1_crsparea_endde: string | null;
    gnrl_rnk1_etc_gg_rcptde: string | null;
    gnrl_rnk1_etc_gg_endde: string | null;
    gnrl_rnk1_etc_area_rcptde: string | null;
    gnrl_rnk1_etc_area_endde: string | null;
    gnrl_rnk2_crsparea_rcptde: string | null;
    gnrl_rnk2_crsparea_endde: string | null;
    gnrl_rnk2_etc_gg_rcptde: string | null;
    gnrl_rnk2_etc_gg_endde: string | null;
    gnrl_rnk2_etc_area_rcptde: string | null;
    gnrl_rnk2_etc_area_endde: string | null;
    przwner_presnatn_de: string | null;
    cntrct_cncls_bgnde: string | null;
    cntrct_cncls_endde: string | null;
    hmpg_adres: string | null;
    cnstrct_entrps_nm: string;
    mdhs_telno: string;
    bsns_mby_nm: string;
    mvn_prearnge_yn: string | null;
    speclt_rdn_earth_at: string;
    mdat_trget_area_secd: string;
    parcprc_uls_at: string;
    imprmn_bsns_at: string;
    public_house_earth_at: string;
    lrscl_bldlnd_at: string;
    npln_prvopr_public_house_at: string;
    public_house_spclm_applc_apt: string | null;
    pblanc_url: string | null;
    house_models: HouseModel[];
}
function formatNumberWithCommas(number: number) {
    if (number === null || number === undefined) {
        return null;
    }
    // Convert number to string and add commas
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatDateString(dateString: String | null | undefined): string {
    if (!dateString) {
        return ""; // 입력 값이 null, undefined 또는 빈 문자열인 경우 null 반환
    }

    return dateString.replace(/-/g, "."); // yyyy-mm-dd를 yyyy.mm.dd로 변환
}

const InformationDetailA = () => {
    const location = useLocation();
    const { pblanc_no, house_manage_no } = location.state || {};

    const [announcement, setAnnouncement] = useState<HousingAnnouncement>();

    const [infoDetails, setInfoDetails] = useState([
        { label: "공급규모", value: "53세대" },
        { label: "문의처", value: "1899-7727" },
        { label: "주택구분", value: "민영" },
    ]);

    const [table1Headers, setTable1Headers] = useState(["타입", "전용면적", "공급규모 일반", "공급규모 특별"]);

    const [table1Rows, setTable1Rows] = useState([
        { 타입: "0.59.3518A", 전용면적: "79.8921", "공급규모 일반": 5, "공급규모 특별": 7 },
        { 타입: "0.59.1113B", 전용면적: "80.61769", "공급규모 일반": 5, "공급규모 특별": 7 },
        { 타입: "0.75.7637A", 전용면적: "100.9899", "공급규모 일반": 7, "공급규모 특별": 5 },
        { 타입: "0.75.7637P", 전용면적: "100.9899", "공급규모 일반": 1, "공급규모 특별": 0 },
        { 타입: "0.84.6231A", 전용면적: "113.5201", "공급규모 일반": 7, "공급규모 특별": 5 },
    ]);

    const [table2Headers, setTable2Headers] = useState(["타입", "공급금액"]);

    const [table2Rows, setTable2Rows] = useState([
        { 타입: "0.59.3518A", 공급금액: "129,500" },
        { 타입: "0.59.1113B", 공급금액: "128,000" },
        { 타입: "0.75.7637A", 공급금액: "154,800" },
        { 타입: "0.75.7637P", 공급금액: "157,800" },
        { 타입: "0.84.6231A", 공급금액: "176,800" },
    ]);

    const [scheduleData, setScheduleData] = useState([
        { 구분: "특별공급", 해당지역: "2024.11.04", 기타지역: "2024.11.04" },
        { 구분: "1순위", 해당지역: "2024.11.05", 기타지역: "2024.11.05" },
        { 구분: "2순위", 해당지역: "2024.11.06", 기타지역: "2024.11.06" },
    ]);

    const handleApplyClick = () => {
        window.open(announcement?.hmpg_adres || "https://www.google.com", "_blank");
    };

    const fetchData = async () => {
        const response = await axios.get<{ data: HousingAnnouncement }>(
            "http://localhost:8080/api/v1/housing/getAnnouncementDetail",
            {
                params: {
                    pblancNo: pblanc_no,
                    houseManageNo: house_manage_no,
                    userId: 1,
                },
            }
        );
        const fetchedData = response.data.data;
        setAnnouncement(fetchedData);
        const infoDetailList = [
            { label: "공급규모", value: `${fetchedData.tot_suply_hshldco}세대` },
            { label: "문의처", value: fetchedData.mdhs_telno },
            { label: "주택구분", value: fetchedData.house_secd_nm },
        ];
        setInfoDetails(infoDetailList);
        const table1RowsList: any = [];
        const table2RowsList: any = [];
        fetchedData.house_models.forEach((m) => {
            table1RowsList.push({
                타입: m.house_ty,
                전용면적: m.suply_ar,
                "공급규모 일반": m.suply_hshldco,
                "공급규모 특별": m.spsply_hshldco,
            });
            table2RowsList.push({ 타입: m.house_ty, 공급금액: `${formatNumberWithCommas(m.lttot_top_amount)}` });
        });
        setTable1Rows(table1RowsList);
        setTable2Rows(table2RowsList);
        const scheduleDataList = [
            {
                구분: "특별공급",
                해당지역: formatDateString(fetchedData.spsply_rcept_bgnde),
                기타지역: formatDateString(fetchedData.spsply_rcept_bgnde),
            },
            {
                구분: "1순위",
                해당지역: formatDateString(fetchedData.gnrl_rnk1_crsparea_rcptde),
                기타지역: fetchedData.gnrl_rnk1_etc_area_rcptde,
            },
            {
                구분: "1순위",
                해당지역: formatDateString(fetchedData.gnrl_rnk2_crsparea_rcptde),
                기타지역: fetchedData.gnrl_rnk2_etc_area_rcptde,
            },
        ];

        const sanitizedScheduleData = scheduleDataList.map((item) => ({
            구분: item.구분,
            해당지역: item.해당지역 || "", // null을 빈 문자열로 변환
            기타지역: item.기타지역 || "", // null을 빈 문자열로 변환
        }));
        setScheduleData(sanitizedScheduleData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Wrapper>
            <HeaderMain backgroundColor="var(--g60)" />
            <HeaderSub title="청약 정보 상세보기" />
            <Content>
                <InfoSection
                    title={announcement?.house_nm}
                    address={announcement?.hssply_adres}
                    details={infoDetails}
                />
                <TableWrapper>
                    <TableComponent headers={table1Headers} rows={table1Rows} />
                    <TableComponent headers={table2Headers} rows={table2Rows} />
                </TableWrapper>
                <ScheduleA
                    title="청약 일정"
                    rows={scheduleData}
                    모집공고일={formatDateString(announcement?.rcrit_pblanc_de)}
                    계약시작일={formatDateString(announcement?.cntrct_cncls_bgnde)}
                    계약종료일={formatDateString(announcement?.cntrct_cncls_endde)}
                    당첨자발표일={formatDateString(announcement?.przwner_presnatn_de)}
                />
            </Content>
            <ApplyButton onClick={handleApplyClick} />
        </Wrapper>
    );
};

export default InformationDetailA;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Content = styled.div`
    width: 100%;
    max-width: 375px;
    margin: 0 auto;
    gap: 24px;
    padding-bottom: 120px;
`;

const TableWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
`;
