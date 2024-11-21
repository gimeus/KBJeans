import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Card from "@/components/Card";

const backIcon = "/icons/back.svg";
const searchIcon = "/icons/search.svg";
const categoryIcon = "/icons/multimedia.svg";
const pinIcon = "/icons/pin/svg";

type Location = {
    city: string;
    district: string;
    latitude: number;
    longitude: number;
};

const seoulLocations: Location[] = [
    { city: "서울특별시", district: "강동구", latitude: 37.530126, longitude: 127.1237708 },
    { city: "서울특별시", district: "송파구", latitude: 37.5145636, longitude: 127.1059186 },
    { city: "서울특별시", district: "강남구", latitude: 37.517305, longitude: 127.047502 },
    { city: "서울특별시", district: "서초구", latitude: 37.483569, longitude: 127.032598 },
    { city: "서울특별시", district: "관악구", latitude: 37.4781549, longitude: 126.9514847 },
    { city: "서울특별시", district: "동작구", latitude: 37.51245, longitude: 126.9395 },
    { city: "서울특별시", district: "영등포구", latitude: 37.526436, longitude: 126.896004 },
    { city: "서울특별시", district: "금천구", latitude: 37.4568644, longitude: 126.8955105 },
    { city: "서울특별시", district: "구로구", latitude: 37.495472, longitude: 126.887536 },
    { city: "서울특별시", district: "강서구", latitude: 37.550937, longitude: 126.849642 },
    { city: "서울특별시", district: "양천구", latitude: 37.517016, longitude: 126.866642 },
    { city: "서울특별시", district: "마포구", latitude: 37.5663245, longitude: 126.901491 },
    { city: "서울특별시", district: "서대문구", latitude: 37.579225, longitude: 126.9368 },
    { city: "서울특별시", district: "은평구", latitude: 37.602784, longitude: 126.929164 },
    { city: "서울특별시", district: "노원구", latitude: 37.654358, longitude: 127.056473 },
    { city: "서울특별시", district: "도봉구", latitude: 37.668768, longitude: 127.047163 },
    { city: "서울특별시", district: "강북구", latitude: 37.6397819, longitude: 127.0256135 },
    { city: "서울특별시", district: "성북구", latitude: 37.5894, longitude: 127.016749 },
    { city: "서울특별시", district: "중랑구", latitude: 37.6063242, longitude: 127.0925842 },
    { city: "서울특별시", district: "동대문구", latitude: 37.574524, longitude: 127.03965 },
    { city: "서울특별시", district: "광진구", latitude: 37.538617, longitude: 127.082375 },
    { city: "서울특별시", district: "성동구", latitude: 37.563456, longitude: 127.036821 },
    { city: "서울특별시", district: "용산구", latitude: 37.532527, longitude: 126.99049 },
    { city: "서울특별시", district: "중구", latitude: 37.563843, longitude: 126.997602 },
    { city: "서울특별시", district: "종로구", latitude: 37.5735207, longitude: 126.9788345 },
];

interface HousingAnnouncement {
    house_manage_no: string; // 주택 관리 번호
    pblanc_no: string; // 공고 번호
    house_nm: string; // 주택 이름
    house_secd: string; // 주택 구분 코드
    house_secd_nm: string; // 주택 구분 코드 이름
    house_dtl_secd: string; // 주택 상세 구분 코드
    house_dtl_secd_nm: string | null; // 주택 상세 구분 코드 이름 (nullable)
    rent_secd: string; // 임대 구분 코드
    rent_secd_nm: string; // 임대 구분 코드 이름
    subscrpt_area_code_nm: string; // 청약 지역 코드 이름
    hssply_adres: string; // 공급 주소ㅅㅅㅅ소ㅘㅣ;'ㅣㅏ/
    hssply_zip: string; // 공급 우편번호
    tot_suply_hshldco: number; // 총 공급 가구 수
    rcrit_pblanc_de: string; // 모집 공고일
    subscrpt_rcept_bgnde: string | null; // 청약 접수 시작일 (nullable)
    subscrpt_rcept_endde: string | null; // 청약 접수 종료일 (nullable)
    rcept_bgnde: string; // 접수 시작일
    rcept_endde: string; // 접수 종료일
    isLiked: boolean; // 좋아요 여부
}

const KakaoMap: React.FC = () => {
    const [announcements, setAnnouncements] = useState<HousingAnnouncement[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMarker, setSelectedMarker] = useState<HousingAnnouncement | null>(null);
    const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<Location>({
        city: "default",
        district: "default",
        latitude: 37.4197626,
        longitude: 126.8829669,
    });
    const kakao = (window as any).kakao;
    let map: any;
    const getAnnouncementStatus = (announcement: HousingAnnouncement) => {
        let startDate: string;
        let endDate: string;

        if (announcement.house_secd === "01" || announcement.house_secd === "10") {
            startDate = announcement.rcept_bgnde;
            endDate = announcement.rcept_endde;
        } else {
            startDate = announcement.subscrpt_rcept_bgnde!;
            endDate = announcement.subscrpt_rcept_endde!;
        }

        const today = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        // 날짜 비교 로직
        if (today >= start && today <= end) {
            return "접수 시작";
        } else if (today < start) {
            const daysUntilStart = Math.ceil((start.getTime() - today.getTime()) / (1000 * 3600 * 24));
            return `접수 예정`;
        } else {
            return "접수 종료";
        }
    };
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };
    const handleLocationClick = (location: Location) => {
        setSearchTerm("");
        setSelectedLocation(location);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setSearchTerm(input);

        if (input.trim() === "") {
            setFilteredLocations([]);
        } else {
            const filtered = seoulLocations.filter((location) => location.district.startsWith(input));
            setFilteredLocations(filtered);
        }
    };

    useEffect(() => {
        const getUserLocation = () => {
            return { latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }; // 기본 좌표
        };

        const loadMap = async () => {
            const location = getUserLocation();

            try {
                const response = await axios.get<{ data: HousingAnnouncement[] }>(
                    "http://localhost:8080/api/v1/housing/getMappedAnnouncement",
                    { params: { userId: 1 } }
                );
                const fetchedAnnouncements = response.data.data;
                setAnnouncements(fetchedAnnouncements);
                const container = document.getElementById("map");
                const options = {
                    center: new kakao.maps.LatLng(location.latitude, location.longitude),
                    level: 7,
                };
                map = new kakao.maps.Map(container, options);
                const geocoder = new kakao.maps.services.Geocoder();

                kakao.maps.event.addListener(map, "click", () => {
                    setSelectedMarker(null);
                });

                // 마커 추가
                fetchedAnnouncements.forEach((announcement) => {
                    const address = announcement.hssply_adres;
                    geocoder.addressSearch(address, function (result: any, status: any) {
                        if (status === kakao.maps.services.Status.OK) {
                            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                            const imageSize = new kakao.maps.Size(32, 35);
                            const markerImage = new kakao.maps.MarkerImage("../icons/pin.svg", imageSize);

                            const marker = new kakao.maps.Marker({
                                position: coords,
                                title: announcement.house_nm,
                                image: markerImage,
                            });
                            marker.setClickable(true);
                            kakao.maps.event.addListener(marker, "click", function () {
                                setSelectedMarker(announcement);
                            });
                            marker.setMap(map);
                        }
                    });
                });
            } catch (error) {
                console.error(error);
            }
        };

        loadMap(); // 비동기 함수 호출
    }, [selectedLocation]);

    return (
        <div>
            <Container>
                <BackIcon src={backIcon} onClick={handleBackClick} />
                <SearchBox>
                    <SearchIcon src={searchIcon} />
                    <PlaceholderText>
                        <input
                            type="text"
                            placeholder="지역 검색"
                            value={searchTerm}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                height: "100%",
                                border: "none",
                                background: "transparent",
                                outline: "none",
                                color: "var(--n100)", // 텍스트 색상
                                fontSize: "16px",
                                fontWeight: "500",
                                lineHeight: "100%",
                            }}></input>
                        {searchTerm.trim() && filteredLocations.length > 0 && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "120px",
                                    left: "20px",
                                    width: "300px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    background: "#fff",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                    zIndex: 100,
                                }}>
                                <ul style={{ margin: 0, padding: "10px", listStyle: "none" }}>
                                    {filteredLocations.map((location, index) => (
                                        <li
                                            key={index}
                                            style={{ padding: "5px 0", cursor: "pointer" }}
                                            onClick={() => {
                                                handleLocationClick(location);
                                            }}>
                                            {location.city}, {location.district}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </PlaceholderText>
                </SearchBox>
                <CategoryIcon src={categoryIcon} />
            </Container>

            <MapContainer>
                <div
                    id="map"
                    style={{
                        width: "100%",
                        height: "684px",
                    }}></div>
                {selectedMarker && (
                    <CardContainer>
                        <Card
                            status={getAnnouncementStatus(selectedMarker)}
                            scale={`공급규모 ${selectedMarker.tot_suply_hshldco.toString()}세대`}
                            apartmentName={selectedMarker.house_nm}
                            address={selectedMarker.hssply_adres}
                            pblanc_no={selectedMarker.pblanc_no}
                            house_manage_no={selectedMarker.house_manage_no}
                            liked={selectedMarker.isLiked}
                            userId={1}
                            house_secd={selectedMarker.house_secd}></Card>
                    </CardContainer>
                )}
            </MapContainer>
        </div>
    );
};

export default KakaoMap;

const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 64px;
    background-color: var(--g60);
    padding: 0 21px 0 8px;
`;

const SearchBox = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    height: 46px;
    background-color: var(--n30);
    border-radius: 10px;
    padding: 0 16px;
`;

const BackIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 10px;
`;

const SearchIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 10px;
`;

const CategoryIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-left: 14px;
`;

const PlaceholderText = styled.span`
    color: var(--n20);
    font-size: 16px;
    font-weight: 500;
    line-height: 100%;
`;

const CardContainer = styled.div`
    position: absolute;
    bottom: 10px; /* Adjust this to set the distance from the bottom of the map */
    width: 100%;
    z-index: 10; /* Ensure the card appears above the map */
    background: none;
`;

const MapContainer = styled.div`
    position: relative;
    width: 100%;
    height: 684px;
`;
