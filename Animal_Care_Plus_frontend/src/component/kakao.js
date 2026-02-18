import React, { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { useMediaQuery } from 'react-responsive';
import * as S from './Kakao.style';
import leftAngle from '../assets/icon/angle-small-left.svg';
import rightAngle from '../assets/icon/angle-small-right.svg';
import reSearch from '../assets/icon/research-icon.svg';
import Modal from './modal';

const { kakao } = window;

const KEYWORD_LIST = [
  { id: 1, value: '애견카페', emoji: '☕️' },
  { id: 2, value: '동물병원', emoji: '💊' },
  { id: 3, value: '애견호텔', emoji: '🏨' },
];

const Kakao = () => {
  // 기본 위치 상태
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  // 카카오 맵에 접근해 지도 상태 조작하는 상태 변수
  const [map, setMap] = useState(null);
  // 검색에 사용될 키워드를 관리하는 상태 변수
  const [keyword, setKeyword] = useState('애견카페');
  // 검색 결과를 담는 상태 변수
  const [search, setSearch] = useState([]);
  // 검색 결과의 페이지네이션 정보를 관리하는 상태 변수
  const [pagination, setPagination] = useState(null);
  // 현재 페이지 번호를 관리하는 상태 변수
  // 페이지네이션 기능과 연동해 어떤 페이지를 보고 있는지 나타냄
  const [currentPage, setCurrentPage] = useState(1);
  // 현재 열려있는 마커의 ID를 관리하는 상태 변수
  const [openMarkerId, setOpenMarkerId] = useState(null);
  // 사이드바의 열림/닫힘 상태를 관리하는 상태 변수
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // 모바일 환경에서 사용될 모달의 열림/닫힘 상태를 관리하는 상태 변수
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 미디어쿼리를 이용해 현재 화면이 모바일 크기인지 판단하는 변수
  const isMobile = useMediaQuery({ maxWidth: 768 });
  // 접속 위치 마우스오버 상태 변수
  const [isMouseOver, setIsMouseOver] = useState(false);
  // 마지막으로 이동한 지도의 중심 좌표 저장 상태 변수
  const [lastCenter, setLastCenter] = useState(null);

  // 현재 사용자 위치 받아오기 (geolocation)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  }, []);

  // 키워드로 주변 위치 검색
  const searchPlaces = (center, page) => {
    // Places 서비스 객체 생성
    const ps = new kakao.maps.services.Places();
    // 검색 옵션 설정
    const options = {
      // 함수 호출 시에 전달받은 중심 좌표를 사용해 검색을 수행하게 변경
      location: new kakao.maps.LatLng(center.lat, center.lng),
      radius: 5000,
      sort: kakao.maps.services.SortBy.DISTANCE,
      page,
    };

    // Places 서비스의 keywordSearch 메소드 호출
    ps.keywordSearch(
      keyword,
      (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          console.log(data);
          displayPlaces(data);

          // 검색 결과만을 기준으로 지도 영역을 조정
          const bounds = new kakao.maps.LatLngBounds();
          data.forEach((item) => bounds.extend(new kakao.maps.LatLng(item.y, item.x)));

          // 조정된 지도 영역을 설정하며 줌 레벨을 변경하지 않음
          map.setBounds(bounds);

          setPagination(pagination);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          setIsSidebarOpen(true);
          setSearch(data);
        } else if (status === kakao.maps.services.Status.ERROR) {
          console.error('검색에 실패하였습니다.');
        }
      },
      options,
    );
  };

  // 검색된 장소 표시하기
  const displayPlaces = (data) => {
    const bounds = new kakao.maps.LatLngBounds();

    // 검색된 장소 위치와 현재위치 기준으로 지도 범위 재설정
    data.forEach((item) => bounds.extend(new kakao.maps.LatLng(item.y, item.x)));
    bounds.extend(new kakao.maps.LatLng(state.center.lat, state.center.lng));
    map.setBounds(bounds);
    setSearch(data);
  };

  // 마커의 위치로 지도의 중심 좌표 이동하기
  const moveLatLng = (data) => {
    const newLatLng = new kakao.maps.LatLng(data.y, data.x);
    map.panTo(newLatLng);
  };

  // 클릭한 마커로 중심 좌표 이동 및 검색 수행 함수
  useEffect(() => {
    if (!map) return;
    setOpenMarkerId(null);
    searchPlaces(currentPage);
  }, [map, keyword, currentPage]);

  // 마커 클릭 시 CustomOverlayMap를 열고 닫는 함수
  useEffect(() => {
    if (!map) return;
    const clickListener = () => {
      setOpenMarkerId(null);
    };
    kakao.maps.event.addListener(map, 'click', clickListener);

    return () => {
      kakao.maps.event.removeListener(map, 'click', clickListener);
    };
  }, [map]);

  // 현재 위치로 돌아가기
  const goBack = () => {
    const newLatLng = new kakao.maps.LatLng(state.center.lat, state.center.lng);
    map.panTo(newLatLng);
  };

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  // 현 지도에서 재검색하기
  const handleReSearch = () => {
    if (!map) return;

    // 현재 지도의 중심 좌표를 검색할 위치로 설정
    const centerLatLng = map.getCenter();
    const newCenter = {
      lat: centerLatLng.getLat(),
      lng: centerLatLng.getLng(),
    };

    // 검색할 페이지를 1페이지로 초기화
    setCurrentPage(1);

    // 검색 실행
    searchPlaces(newCenter, 1);

    // lastCenter 업데이트
    setLastCenter(newCenter);
  };

  // 재검색 후, 키워드를 선택할 때마다 검색하기
  const handleKeywordSelect = (selectedKeyword) => {
    setKeyword(selectedKeyword);

    if (lastCenter) {
      // 이미 이동한 지도의 중심 좌표가 있으면 해당 위치를 기반으로 검색
      searchPlaces(lastCenter, 1);
    } else {
      // 처음 페이지 로딩 시 현재 위치를 기반으로 검색
      searchPlaces(state.center, 1);
    }
  };

  // 카카오톡 공유 init 설정
  useEffect(() => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init('cd3b6df7832aacc2d14220f313f3dbc2');
      }
    }
  }, []);

  if (state.isLoading) return <div>Loading...</div>;

  return (
    <>
      <S.MapContainer>
        {/* 지도 컴포넌트 */}
        <Map
          center={state.center}
          style={{ width: '100%', height: 'calc(100vh - 109px)', marginTop: '48px' }}
          level={3}
          onCreate={setMap} // 지도가 생성될 때 setMap 함수를 호출해 지도 객체 업데이트 추가
        >
          {/* 현재 위치 마커 표시 */}
          <MapMarker
            position={state.center}
            image={{
              src: 'https://cdn-icons-png.flaticon.com/128/7124/7124723.png',
              size: {
                width: 50,
                height: 50,
              },
            }}
          />
          {/* 현재 내 위치로 돌아가는 버튼 */}
          {isMouseOver && <S.GoBackTxt isModalOpen={isModalOpen}>접속위치</S.GoBackTxt>}
          <S.GoBackButton
            onClick={goBack}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            isModalOpen={isModalOpen}
          ></S.GoBackButton>
          {/* 현 지도에서 키워드 재검색 버튼 */}
          <S.ReSearch onClick={handleReSearch} isModalOpen={isModalOpen}>
            <S.ReSearchImg src={reSearch} alt='재검색' />현 지도에서 검색
          </S.ReSearch>
          {/* 검색된 장소 마커 표시 */}
          {search.map((data) => (
            <React.Fragment key={data.id}>
              <MapMarker
                key={data.id}
                position={{ lat: data.y, lng: data.x }}
                image={{
                  src: 'https://cdn-icons-png.flaticon.com/128/2098/2098567.png',
                  size: {
                    width: 35,
                    height: 35,
                  },
                }}
                onClick={() => {
                  if (data.id === openMarkerId) {
                    setOpenMarkerId(null);
                  } else {
                    setOpenMarkerId(data.id);
                    moveLatLng(data);
                  }
                }}
              />
              {/* 해당 마커에 커스텀 오버레이 표시 */}
              {openMarkerId === data.id && (
                <CustomOverlayMap yAnchor={2.1} position={{ lat: data.y, lng: data.x }} clickable>
                  <S.Overlay>
                    <S.Arrow />
                    <S.PlaceName>{data.place_name}</S.PlaceName>
                    {/* 상세 정보로 연결되는 링크 */}
                    <S.DetailLink href={data.place_url} target='_blank'>
                      <img src={rightAngle} alt='오른쪽 화살표' />
                    </S.DetailLink>
                  </S.Overlay>
                </CustomOverlayMap>
              )}
            </React.Fragment>
          ))}
        </Map>
        {/* 검색 버튼들 */}
        <S.SearchBtns>
          {KEYWORD_LIST.map((item) => (
            <S.KeywordBtn
              key={item.id}
              type='button'
              selected={item.value === keyword}
              // 키워드를 선택할 때 이동한 중심 좌표를 저장하도록 변경
              onClick={() => handleKeywordSelect(item.value)} 
              style={{ fontFamily: "Noto Sans KR" }}
            >
              {item.value} {item.emoji}
            </S.KeywordBtn>
          ))}
        </S.SearchBtns>

        {/* PC 화면일 경우, 검색 결과 목록 사이드바로 표시 */}
        {!isMobile && (
          <S.ListContainer isClosed={!isSidebarOpen}>
            <Modal
              search={search}
              openMarkerId={openMarkerId}
              setOpenMarkerId={setOpenMarkerId}
              isModalOpen={isModalOpen}
              moveLatLng={moveLatLng}
              pagination={pagination}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            {/* 사이드바 열고 다는 버튼 */}
            <S.SideBarOpenBtn isClosed={!isSidebarOpen} onClick={() => setIsSidebarOpen((prev) => !prev)}>
              <img src={isSidebarOpen ? leftAngle : rightAngle} alt={isSidebarOpen ? '왼쪽 화살표' : '오른쪽 화살표'} style={{ width: '30px', height: '80px' }} />
            </S.SideBarOpenBtn>
          </S.ListContainer>
        )}
        {/* 모바일 화면일 경우 검색 결과 모달로 표시 */}
        {isMobile && (
          <S.Modal>
            <S.ModalBtn onClick={() => setIsModalOpen((prev) => !prev)} />
            <Modal
              search={search}
              openMarkerId={openMarkerId}
              setOpenMarkerId={setOpenMarkerId}
              isModalOpen={isModalOpen}
              moveLatLng={moveLatLng}
              pagination={pagination}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </S.Modal>
        )}
      </S.MapContainer>
    </>
  );
};

export default Kakao;