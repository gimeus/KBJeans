import styled from "styled-components";
import InfoSection from "@/components/InfoSection";
import TableComponent from "@/components/Table";
import ScheduleB from "@/components/ScheduleB";
import HeaderMain from "@/components/HeaderMain";
import HeaderSub from "@/components/HeaderSub";
import ApplyButton from "@/components/ApplyButton";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

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
function formatDateString(dateString: String | null | undefined): string {
    if (!dateString) {
        return ""; // 입력 값이 null, undefined 또는 빈 문자열인 경우 null 반환
    }

    return dateString.replace(/-/g, "."); // yyyy-mm-dd를 yyyy.mm.dd로 변환
}

const InformationDetailB = () => {
    const location = useLocation();
    const { pblanc_no, house_manage_no } = location.state || {};
    const [announcement, setAnnouncement] = useState<HousingAnnouncement>();
    const infoDetails = [
        { label: "공급규모", value: "4세대" },
        { label: "문의처", value: "02-995-5949" },
        { label: "주택구분", value: "도시형생활주택" },
    ];

    const tableHeaders = ["타입", "전용면적", "공급규모", "공급금액"];
    const [tableRows, setTableRows] = useState([
        { 타입: "75D", 전용면적: "75.6300", 공급규모: "1", 공급금액: "87,100" },
        { 타입: "77E", 전용면적: "77.8200", 공급규모: "1", 공급금액: "81,100" },
        { 타입: "79A", 전용면적: "79.9600", 공급규모: "1", 공급금액: "84,500" },
        { 타입: "83B", 전용면적: "83.8900", 공급규모: "1", 공급금액: "84,500" },
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
        const tableRowList: any = [];
        fetchedData.house_models.forEach((m) => {
            tableRowList.push({
                타입: m.house_ty,
                전용면적: m.suply_ar || "",
                공급규모: m.suply_hshldco,
                공급금액: m.lttot_top_amount,
            });
        });
        setTableRows(tableRowList);
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
                    title="이문월드메르디앙 힐트리움 더테라스"
                    address="서울특별시 동대문구 이문동 348-11, 348-12"
                    details={[
                        { label: "공급규모", value: `${announcement?.tot_suply_hshldco}세대` },
                        { label: "문의처", value: `${announcement?.mdhs_telno}` },
                        { label: "주택구분", value: `${announcement?.house_secd_nm}` },
                    ]}
                />
                <TableComponent headers={tableHeaders} rows={tableRows} />
                <ScheduleB
                    items={[
                        { label: "모집공고일", value: formatDateString(announcement?.rcrit_pblanc_de) },
                        {
                            label: "청약접수",
                            value: `${formatDateString(announcement?.subscrpt_rcept_bgnde)} ~ ${formatDateString(announcement?.subscrpt_rcept_endde)}`,
                        },
                        { label: "당첨자 발표일", value: formatDateString(announcement?.przwner_presnatn_de) },
                        {
                            label: "계약일",
                            value: `${formatDateString(announcement?.cntrct_cncls_bgnde)} ~ ${formatDateString(announcement?.cntrct_cncls_endde)}`,
                        },
                    ]}
                />
            </Content>
            <ApplyButton onClick={handleApplyClick} />
        </Wrapper>
    );
};

export default InformationDetailB;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Content = styled.div`
    width: 100%;
    max-width: 375px;
    margin: 0 auto;
    padding-top: 10px;
    padding-bottom: 120px;
`;
