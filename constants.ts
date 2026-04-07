
import { AboutSection, CourseCategory, BlogPost, Course } from './types';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Creative Wave Learning', path: '/creative-wave-learning' },
  { name: 'Contact', path: '/contact' },
];

export const ABOUT_CONTENT: Record<string, AboutSection> = {
  ceo: {
    title: "CEO",
    intro: "인문융합기술 전문가\nAI활용 콘텐츠 기획·교육, 콘텐츠 기획·연구\n공간 스토리텔링(다크헤리티지, 실감콘텐츠 등)",
    content: [
      { year: "현재", text: "한성대학교 문학문화콘텐츠학과 겸임교수" },
      { year: "현재", text: "도서출판 시잉(Seeing) 대표" },
      { year: "현재", text: "한국영상문화학회 편집이사" },
      { year: "현재", text: "와이아트인서울(whyartinseoul.com) 디지털 디렉터" },
      { year: "현재", text: "경기콘텐츠진흥원 평가심의위원" },
            { year: "현재", text: "K-문화교류포럼 기획이사" },
    ],
    awards: [
      { year: "2024년 6월", text: "한국영상문화학회 학술상 | 한국영상문화학회" },
      { year: "2021년 6월", text: "인문콘텐츠학회 춘계학술대회 학문후속세대발표 대상 | 인문콘텐츠학회" },
      { year: "2020년 12월", text: "제4회 박물관학 학술논문공모전 일반부 최우수상 | 한국박물관학회" },
      { year: "2018년 12월", text: "후백제디지털영상공모전 장려상 | 전주시청, 군산대학교" },
      { year: "2017년 12월", text: "안양시 정책대회 공모 동상(당해 최고수상 등급) | 안양시청" },
      { year: "2017년 10월", text: "스토리테마파크공모전 장려상(팀) | 한국국학진흥원" },
      { year: "2016년 12월", text: "글로벌문화콘텐츠학회 우수논문 발표자 포스터 부문 선정 | 글로벌문화콘텐츠학회" },
    ],
  },
  planning: {
    title: "기획",
    intro: "콘텐츠기획경력 14년",
    content: [
      { year: "2026", text: "[광운대학교 산학협력단 / 주식회사 너즈] 2026 태안국제원예치유박람회, AI 힐링 코스 추천 어플리케이션 기획" },
      { year: "2024", text: "[성결대학교 창의문화공작소] 단편영화 <하늘물고기> PM" },
      { year: "2024", text: "[성결대학교 창의문화공작소] 장애인일자리 인식 개선을 위한 영상제작 및 교육프로그램, 보드게임지도사 자격증을 위한 보드게임 개발 워크숍 운영" },
      { year: "2023", text: "[성결대학교 창의문화공작소] 성결대 창의창업캠프, 제3회 금천패션영화제 학생심사단 운영" },
      { year: "2022", text: "[성결대학교 창의문화공작소] 취·창업 워크숍, VR콘텐츠기획세미나, 메타버스 콘텐츠 '천로역정' 오디오북 구연동화 기획 및 개발" },
      { year: "2022", text: "[성결대학교 창의문화공작소] 제19회 EBS국제다큐영화제 및 제14회 DMZ국제다큐멘터리 영화제 학생심사단 운영, 세계아시아기호학회 국제학술대회 운영" },
      { year: "2016", text: "[와이아트인서울] 기획전시 <WHYART, 서울 현대미술을 수집하다> | 한남동 드 플로허 갤러리" },
      { year: "2015", text: "[와이아트인서울] 에듀케이션 <발터 벤야민>" },
      { year: "2015", text: "[와이아트인서울] 관객참여형 전시 <몬스터를 찾아서> | 서교예술실험센터" },
      { year: "2015", text: "홍대 지역 중심 활동아티스트 구술(인터뷰) 아카이브 프로젝트" },
    ],
  },
  education: {
    title: "교육",
    intro: "대학생 대상 강의경력 10년, 다수의 외부특강",
    content: [
      { year: "2025.05", text: "[경기도 평생배움대학 강사]<AI 크리에이티브 기획과 마케팅> 'AI 활용 콘텐츠 기획' 분야 강의" },
      { year: "2024.11~12", text: "[서울시민대학 동남권 캠퍼스 강사]|<부정적문화유산을 통해 살펴보는 서울의 기억과 상실, 공존의 교차점>" },
      { year: "2024.03~현재", text: "[한성대학교 문학문화콘텐츠학과 겸임교수]|<생성형 AI 제작툴과 디지털콘텐츠 워크플로우>|<디지털콘텐츠제작툴의 이해>|<AID+ 디지털콘텐츠 어드밴스(실무 응용)> / K-MOOC (한국형 온라인 공개강좌)" },
      { year: "2024.03~2025.02", text: "[성결대학교 파이데이아대학 객원교수]|<창업사업계획서 작성법>|<미디어와 커뮤니케이션>|<소셜벤처창업>" },
      { year: "2023.03~2024.02", text: "[성결대학교 문화선교학과 겸임교수]|<IT영상콘텐츠>|<미디어와 커뮤니케이션>" },
      { year: "2023.03~2024.02", text: "[백석예술대학교 글로벌문화콘텐츠학과 강사]|<기획도구의 활용>|<문화콘텐츠의 이해>|<도시재생과 코디네이팅>|<창업자본조달과 크라우드 펀딩>" },
      { year: "2020.09.07", text: "[경기콘텐츠진흥원 특강]|<돋보이는 캐릭터 스토리텔링> / 지역특화 스토리지원사업 온라인 창작워크샵" },
      { year: "2020.09.03", text: "[인덕대학교 캠퍼스타운 특강]|<대중을 사로잡는 유튜브 기획과 운영> / 2020 캠퍼스타운, Culture Du 지역연계수업" },
      { year: "2020.08.24", text: "[경기콘텐츠진흥원 특강]|<매력있는 캐릭터 디벨로핑> / 지역특화 스토리지원사업 온라인 창작워크샵" },
      { year: "2020.03~2022.02", text: "[백석예술대학교 언어문화학부 겸임교수]|<1인 크리에이터입문>|<글로벌문화콘텐츠의 이해>|<디지털인문학입문>|<현대문화와 도시재생>|<창업자본조달과 크라우드펀딩>" },
      { year: "2018.09.14", text: "[충청북도문화재연구원 특강]|<지역문화유산과 스토리텔링> / 지역문화유산교육 '꿈 이은 문화유산'" },
      { year: "2018.03~2019.02", text: "[성결대학교 파이데이아대학 객원교수]|<문화콘텐츠산업과 창의성>|<지역전통문화와 스토리텔링>" },
      { year: "2017.09~2017.12", text: "[성결대학교 파이데이아대학 강사]|<문학과 영상>" },
    ],
  },
  research: {
    title: "연구/발표",
    intro: "다수의 연구수행 및 학술대회 발표",
    content: [
      {year: "2025.10~현재", text: "건국대학교 산학협력단 연구직(박사연구자)|<디지털인문기반 치유농업 융합연구센터> / 건국대학교 산학협력단" },
      { year: "2025.06", text: "[한국영상문화학회 춘계학술대회]|<과학기술학에 관점에서 본 AI 에이전트 사례 연구> / 한국영상문화학회" },
      { year: "2023.11~2024.04", text: "[완주문화도시지원센터] 연구지원 선정|<완주문화도시 조성을 위한 완주군민 생활사 기반 콘텐츠 전략 연구>" },
      { year: "2021.06", text: "[인문콘텐츠학회 춘계학술대회]|<질적 메타분석에 근거한 '다크뮤지엄'의 개념정립> / 인문콘텐츠학회" },
      { year: "2020.09~2021.08", text: "[한국연구재단 인문사회학술연구교수(B유형)]|<국내 다크뮤지엄 전시 소재의 유형화와 특성에 따른 활용방안 연구>" },
      { year: "2018.11.05", text: "[독립기념관 전시콘퍼런스]|<독립기념관 전시에서의 디지털기술 활용 제언>(공동) / 독립기념관, 건국대학교" },
      { year: "2018.05~12", text: "[대한민국역사박물관 연구보조원]|<대한민국역사박물관 3층 상설전시실 개편 전시기획>(공동연구)" },
      { year: "2018.04~06", text: "[안양시청 공동연구원]|<만안각부지활용용역>" },
      { year: "2018.01", text: "[장수가야 디지털콘텐츠 워크숍]|<AR, VR, MR 파크 어떻게 만들고 운영할 것인가> / 군산대학교, 가야문화연구소" },
      { year: "2017.09", text: "[인문콘텐츠학회 추계학술대회]|<한중 다크투어리즘의 내재된 윤리적 함의와 문화콘텐츠 활용에 대한 연구>(공동) / 인문콘텐츠학회" },
      { year: "2017.07", text: "[제8회 전국 해양문화학자대회]|<지속가능한 헤리티지를 위한 지역주민 구술의 콘텐츠화 방안> / 목포대학교, 도서문화연구원" },
      { year: "2017.04~2018.01", text: "[안동시청 공동연구원]|<한(韓)문화 ICT 융복합밸리 조성 기본계획 수립>(공동연구)" },
      { year: "2016.12", text: "[글로벌문화콘텐츠학회 학술대회]|<고객의 선택경험을 활용한 문화콘텐츠 기반의 브랜드 아이덴티티 구축사례 연구> / 글로벌문화콘텐츠학회" },
      { year: "2016.03~2018.02", text: "[건국대학교 BK21사업단 장학연구원]|건국대학교 BK21플러스 특화전문인재양성 사업단" },
      { year: "2015.12", text: "[인문콘텐츠학회 추계학술대회]|<구술기반 지역축제 활성화 방안 연구> / 인문콘텐츠학회" },
    ],
  },
  papers: {
    title: "연구논문",
    intro: "등재지 8편, 등재후보지 3편, 일반학술지 1편",
    content: [
      {
        year: "2026.02.28",
        text: "[예술과미디어학회, 예술과미디어 25권 1호]|<생성형 AI 기반 영상 제작에서 ‘행위자-네트워크’ 이론을 통해 본 워크플로우 연구: 힉스필드 AI 활용 사례를 중심으로>",
      },
      {
        year: "2025.12.30",
        text: "[한국영상문화학회, 영상문화 47호]|<’과학기술학’ 관점에서의 AI Agent 사례 연구: ‘젠스파크’ 사례를 중심으로>",
      },
      {
        year: "2025.07.31",
        text: "[경희대학교 K컬처스토리연구소 (완주문화도시지원센터 지원), 스토리콘텐츠 7호(등재후보지)]|<완주문화도시 조성을 위한 완주군민 생활사 기반 콘텐츠 전략 연구>",
      },
      { 
        year: "2023.12.30", 
        text: "[한국박물관학회, 박물관학보 46호]|<시노그라피 전략으로 본 박물관 실감콘텐츠의 역할과 활용 의의: 국립중앙박물관의 디지털 실감콘텐츠 사례를 중심으로>",
        link: "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003032112"
      },
      { 
        year: "2023.12.30", 
        text: "[한국영상문화학회, 영상문화 43호]|<국내 다크뮤지엄 전시 소재의 유형화와 특성에 따른 활용방안 연구>",
        link: "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003030985"
      },
      { year: "2023.01.31", text: "[경희대학교 K컬처스토리연구소, 스토리콘텐츠 2호]|<'썸머필름을 타고!'에 나타난 시간초월 모티브 변용과 성숙 플롯 문법의 스토리텔링 전략> (일반학술지)" },
      { 
        year: "2022.12.30", 
        text: "[고려대학교 응용문화연구소, 에피스테메 28호]|<A Comparative Study on the Value Representation of Museums and How to Use 'Dark Heritage' : Focusing on 'The War Memorial of Korea' and France's 'Historial de la Grande Guerre'>",
        link: "http://journal.cacs.or.kr/sub/sub_detail.html?code=424070&?search=&year=2022&searchType=all#"
      },
      { 
        year: "2022.08.31", 
        text: "[글로컬문화전략연구소, 문화콘텐츠연구 25호]|<DMZ박물관의 전시특성과 다크뮤지엄으로서 전시개선방안 연구>",
        link: "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002872020"
      },
      { year: "2019.06.30", text: "[인문학연구원, 통일인문학 78집]|<'에코뮤지엄'의 위성박물관 개념을 활용한 DMZ박물관 기획전략 연구>(공동)" },
      { year: "2017.08.31", text: "[글로컬문화전략연구소, 문화콘텐츠연구 10호]|<지역주민 구술의 콘텐츠화를 위한 구술수집기획 방안 연구> (등재후보지)" },
      { year: "2017.02.28", text: "[글로벌문화콘텐츠학회, 글로벌문화콘텐츠 26호]|<3.0시장, '가치주도' 시대의 브랜드의 '추구가치' 기반 문화콘텐츠 활용방식 연구: 글로벌 브랜드 '반스-VANS'를 중심으로>" },
      { year: "2016.06.30", text: "[글로컬문화전략연구소, 문화콘텐츠연구 7호]|<구술특성을 적용한 지역축제의 차별화 방안연구> (등재후보지)" },
    ],
  },
};

export const FREE_COURSES_DATA: Course[] = [
  { 
    title: '', 
    description: '',
    duration: '',
    level: '',
    price: '',
    curriculum: [],
    learningGoals: [],
    tags: [],
    youtubeUrl: 'https://www.youtube.com/watch?v=placeholder' // 레이아웃 유지용 placeholder
  },
  { 
    title: '', 
    description: '',
    duration: '',
    level: '',
    price: '',
    curriculum: [],
    learningGoals: [],
    tags: [],
    youtubeUrl: 'https://www.youtube.com/watch?v=placeholder' // 레이아웃 유지용 placeholder
  },
  { 
    title: '', 
    description: '',
    duration: '',
    level: '',
    price: '',
    curriculum: [],
    learningGoals: [],
    tags: [],
    youtubeUrl: 'https://www.youtube.com/watch?v=placeholder' // 레이아웃 유지용 placeholder
  },
];

export const PAID_COURSES_DATA: CourseCategory[] = [
  {
    categoryTitle: 'AI 활용 콘텐츠 기획',
    courses: [
      { 
        title: '', 
        description: '',
        duration: '',
        level: '',
        price: '',
        curriculum: [],
        learningGoals: [],
        tags: [],
        targetAudience: []
      },
    ]
  },
  {
    categoryTitle: '문화예술콘텐츠 기획',
    courses: [
      { 
        title: '', 
        description: '',
        duration: '',
        level: '',
        price: '',
        curriculum: [],
        learningGoals: [],
        tags: [],
        targetAudience: []
      },
    ]
  },
  {
    categoryTitle: '글쓰기',
    courses: [
      { 
        title: '', 
        description: '',
        duration: '',
        level: '',
        price: '',
        curriculum: [],
        learningGoals: [],
        tags: [],
        targetAudience: []
      },
    ]
  },
];

// 기존 호환성을 위해 유지
export const COURSES_DATA: CourseCategory[] = [];

export const BLOG_POSTS: BlogPost[] = [];
