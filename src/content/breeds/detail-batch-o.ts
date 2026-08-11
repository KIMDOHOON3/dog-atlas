import type { Breed } from "./schema";
import { withTopicParticle } from "../../lib/korean-particles";

const checkedAt = "2026-08-07";
type Group = "herding" | "guardian-working" | "terrier" | "spitz-primitive" | "scent-hound" | "pointing" | "retriever-spaniel" | "companion" | "sighthound";
type Level = "낮은 편" | "중간" | "높은 편" | "개체별 확인 필요";
type Seed = {
  slug: string;
  nameKo: string;
  nameEn: string;
  group: Group;
  origin: string;
  role: string;
  size: string;
  registry?: "non-fci";
  sourceUrl?: string;
  sourceTitle?: string;
  sourceOrganization?: string;
};
type Meta = {
  label: string;
  tags: readonly string[];
  colors: [string, string, string];
  levels: [Level, Level, Level, Level, Level, Level];
  related: [string, string][];
  care: [string, string];
};

const meta: Record<Group, Meta> = {
  herding: { label: "목양견", tags: ["목양 본능", "협력 학습", "활동적인 일상"], colors: ["#7d725f", "#ded7c9", "#302d29"], levels: ["높은 편", "높은 편", "중간", "높은 편", "중간", "중간"], related: [["border-collie", "목양견의 협력 방식과 집중력을 비교해 보세요."], ["australian-cattle-dog", "가축 관리와 활동성의 차이를 살펴보세요."]], care: ["짧은 훈련과 냄새 찾기 과제를 일상에 나누어 주세요.", "움직임이 많은 날에도 안전한 휴식 루틴을 함께 마련하세요."] },
  "guardian-working": { label: "경비·작업견", tags: ["영역 경계", "튼튼한 체격", "차분한 안내"], colors: ["#806957", "#ded4c4", "#312b27"], levels: ["중간", "높은 편", "개체별 확인 필요", "중간", "높은 편", "중간"], related: [["rottweiler", "보호 역할과 경계 반응의 차이를 비교해 보세요."], ["bernese-mountain-dog", "큰 체격과 가족 생활 관리 조건을 살펴보세요."]], care: ["방문객과 생활 동선을 예측 가능하게 만들어 주세요.", "성장기 체중과 관절 부담을 수의사와 함께 관리하세요."] },
  terrier: { label: "테리어", tags: ["작은 사냥감 추적", "탐색 욕구", "안전한 전환"], colors: ["#946f57", "#e3d6c8", "#352e2a"], levels: ["높은 편", "높은 편", "개체별 확인 필요", "중간", "높은 편", "중간"], related: [["border-terrier", "작은 테리어의 탐색과 경계 반응을 비교해 보세요."], ["jack-russell-terrier", "추적 욕구를 안전한 과제로 전환하는 방법을 살펴보세요."]], care: ["땅을 파고 찾는 욕구를 안전한 노즈워크로 연결하세요.", "발톱과 피부 상태를 산책 뒤 자주 확인해 주세요."] },
  "spitz-primitive": { label: "스피츠·원시형", tags: ["독립적 판단", "감시 본능", "환경 적응"], colors: ["#8b715a", "#e2d8ca", "#332d29"], levels: ["중간", "중간", "높은 편", "개체별 확인 필요", "높은 편", "중간"], related: [["shiba", "독립적 판단과 사회화 조건을 비교해 보세요."], ["akita", "스피츠 체형과 경계 반응의 차이를 살펴보세요."]], care: ["선택권이 있는 탐색과 차분한 호출 연습을 제공하세요.", "계절별 이중모 관리와 더위 대책을 준비하세요."] },
  "scent-hound": { label: "후각 하운드", tags: ["후각 추적", "지구력", "탐색 과제"], colors: ["#9a7057", "#e4d7c9", "#362d29"], levels: ["높은 편", "높은 편", "중간", "중간", "중간", "중간"], related: [["beagle", "후각 추적과 일상 탐색의 공통점을 비교해 보세요."], ["basset-hound", "체형에 맞는 운동과 관리 조건을 살펴보세요."]], care: ["긴 줄과 안전한 공간에서 냄새 탐색 시간을 마련하세요.", "귀와 발 상태를 야외 활동 뒤 주기적으로 확인하세요."] },
  pointing: { label: "포인팅견", tags: ["사냥감 위치 알림", "집중력", "협력 작업"], colors: ["#ad8366", "#e8ded2", "#3a312c"], levels: ["높은 편", "높은 편", "중간", "높은 편", "중간", "중간"], related: [["english-setter", "포인팅과 사람 협력의 차이를 비교해 보세요."], ["german-short-haired-pointing-dog", "탐색과 회수 과제를 일상에 적용해 보세요."]], care: ["빠른 달리기보다 냄새·멈춤·호출을 묶어 연습하세요.", "활동량과 휴식 시간을 함께 계획해 과부하를 줄이세요."] },
  "retriever-spaniel": { label: "리트리버·스패니얼", tags: ["회수 협력", "사람 중심", "물과 야외 활동"], colors: ["#9a785f", "#e4d8ca", "#372f2a"], levels: ["높은 편", "중간", "낮은 편", "높은 편", "중간", "중간"], related: [["english-springer-spaniel", "회수와 탐색 활동의 차이를 비교해 보세요."], ["golden-retriever", "사람 중심 협력과 체격 조건을 살펴보세요."]], care: ["회수 욕구를 짧은 찾기 과제로 나누어 주세요.", "귀와 발가락 사이를 물놀이 뒤 충분히 말려 주세요."] },
  companion: { label: "반려견", tags: ["사람과 생활", "실내 적응", "관계 중심"], colors: ["#9a7d72", "#e6d9d1", "#382d2b"], levels: ["중간", "중간", "개체별 확인 필요", "높은 편", "중간", "중간"], related: [["cavalier-king-charles-spaniel", "사람 곁 생활의 조건을 비교해 보세요."], ["bichon-frise", "소형 반려견의 교감과 관리 차이를 살펴보세요."]], care: ["짧은 외출과 혼자 쉬는 시간을 균형 있게 연습하세요.", "작은 체구에 맞는 안전한 계단·하네스를 준비하세요."] },
  sighthound: { label: "사이트하운드", tags: ["시각 추적", "질주", "회복과 휴식"], colors: ["#8e7667", "#e1d8d0", "#332d2d"], levels: ["높은 편", "중간", "중간", "중간", "중간", "낮은 편"], related: [["whippet", "질주와 휴식 리듬을 비교해 보세요."], ["greyhound", "사이트하운드 체형과 생활 조건을 살펴보세요."]], care: ["안전하게 울타리 된 공간에서 짧은 질주를 제공하세요.", "얇은 피모와 추위·더위 민감성을 계절별로 관리하세요."] },
};

const fciGroupUrls: Record<Group, string> = {
  herding: "https://www.fci.be/en/nomenclature/1-Sheepdogs-and-Cattledogs-except-Swiss-Cattledogs.html",
  "guardian-working": "https://www.fci.be/en/nomenclature/2-Pinscher-and-Schnauzer-Molossoid-and-Swiss-Mountain-and-Cattledogs.html",
  terrier: "https://www.fci.be/en/nomenclature/3-Terriers.html",
  "spitz-primitive": "https://www.fci.be/en/nomenclature/5-Spitz-and-primitive-types.html",
  "scent-hound": "https://www.fci.be/en/nomenclature/6-Scent-hounds-and-related-breeds.html",
  pointing: "https://www.fci.be/en/nomenclature/7-Pointing-Dogs.html",
  "retriever-spaniel": "https://www.fci.be/en/nomenclature/8-Retrievers-Flushing-Dogs-Water-Dogs.html",
  companion: "https://www.fci.be/en/nomenclature/9-Companion-and-Toy-Dogs.html",
  sighthound: "https://www.fci.be/en/nomenclature/10-Sighthounds.html",
};

const kkfNonFciUrl = "https://www.thekkf.or.kr/new_home/06_studbook/02.studbook_request.php?request=2";

const seeds: Seed[] = [
  { slug: "smooth-collie", nameKo: "스무스 콜리", nameEn: "Collie Smooth", group: "herding", origin: "영국", role: "목양견의 민첩한 이동과 가축 관리", size: "중형 · 약 51~61cm, 18~30kg" },
  { slug: "bouvier-des-ardennes", nameKo: "부비에 데 아르덴", nameEn: "Bouvier des Ardennes", group: "herding", origin: "벨기에 아르덴", role: "거친 지형에서 가축을 몰고 지키는 농장 작업", size: "중형 · 약 52~62cm, 22~30kg" },
  { slug: "majorca-shepherd-dog", nameKo: "마요르카 셰퍼드", nameEn: "Majorca Shepherd Dog", group: "herding", origin: "스페인 마요르카", role: "가축 무리를 지키고 농장 경계를 살피는 작업", size: "대형 · 약 62~73cm, 30~40kg" },
  { slug: "south-russian-shepherd-dog", nameKo: "사우스 러시안 셰퍼드", nameEn: "South Russian Shepherd Dog", group: "herding", origin: "러시아 남부 초원", role: "가축 떼와 목장을 지키는 독립적인 목양 작업", size: "대형 · 약 62~66cm, 35~50kg" },
  { slug: "chodsky-pes", nameKo: "초드스키 페스", nameEn: "Chodsky Pes", group: "herding", origin: "체코", role: "국경 지대의 목양과 경비를 돕는 다목적 작업", size: "중형 · 약 49~55cm, 17~27kg" },
  { slug: "dutch-smoushond", nameKo: "더치 스무숀드", nameEn: "Dutch Smoushond", group: "guardian-working", origin: "네덜란드", role: "마구간과 농장의 작은 해충을 관리하는 반려 작업", size: "소형 · 약 35~42cm, 9~10kg" },
  { slug: "saint-miguel-cattle-dog", nameKo: "상 미겔 캐틀 도그", nameEn: "Saint Miguel Cattle Dog", group: "guardian-working", origin: "포르투갈 아조레스", role: "소를 몰고 농장 주변을 지키는 작업", size: "중형 · 약 50~60cm, 20~35kg" },
  { slug: "majorca-mastiff", nameKo: "마요르카 마스티프", nameEn: "Majorca Mastiff", group: "guardian-working", origin: "스페인 마요르카", role: "가축과 재산을 지키는 강한 경비 작업", size: "대형 · 약 52~58cm, 30~40kg" },
  { slug: "cimarron-uruguayo", nameKo: "시마론 우루과요", nameEn: "Cimarron Uruguayo", group: "guardian-working", origin: "우루과이", role: "목장 가축을 관리하고 농장 주변을 순찰하는 작업", size: "대형 · 약 58~61cm, 33~45kg" },
  { slug: "castro-laboreiro-dog", nameKo: "카스트루 라보레이루 독", nameEn: "Castro Laboreiro Dog", group: "guardian-working", origin: "포르투갈 북부", role: "산악 목장의 가축을 지키는 경비 작업", size: "대형 · 약 55~60cm, 25~40kg" },
  { slug: "rafeiro-do-alentejo", nameKo: "라페이루 두 알렌테주", nameEn: "Rafeiro do Alentejo", group: "guardian-working", origin: "포르투갈 알렌테주", role: "밤 동안 양 떼와 목장을 지키는 경비 작업", size: "대형 · 약 64~74cm, 35~60kg" },
  { slug: "romanian-bucovina-shepherd-dog", nameKo: "루마니안 부코비나 셰퍼드", nameEn: "Romanian Bucovina Shepherd", group: "guardian-working", origin: "루마니아 카르파티아", role: "산악 목장에서 가축과 사람을 지키는 작업", size: "대형 · 약 64~78cm, 50~80kg" },
  { slug: "karst-shepherd-dog", nameKo: "카르스트 셰퍼드", nameEn: "Karst Shepherd Dog", group: "guardian-working", origin: "슬로베니아 카르스트", role: "목장 가축을 보호하고 낯선 움직임을 알리는 경비", size: "대형 · 약 57~63cm, 25~42kg" },
  { slug: "canadian-eskimo-dog", nameKo: "캐나디안 에스키모 도그", nameEn: "Canadian Eskimo Dog", group: "spitz-primitive", origin: "캐나다 북극권", role: "눈밭에서 썰매를 끌고 물자를 운반하는 작업", size: "대형 · 약 50~70cm, 20~40kg" },
  { slug: "norwegian-elkhound-black", nameKo: "블랙 노르웨이언 엘크하운드", nameEn: "Norwegian Elkhound Black", group: "spitz-primitive", origin: "노르웨이", role: "북유럽 숲에서 큰 사냥감을 추적하고 알리는 작업", size: "중형 · 약 43~49cm, 18~27kg" },
  { slug: "thai-bangkaew-dog", nameKo: "타이 방깨우 독", nameEn: "Thai Bangkaew Dog", group: "spitz-primitive", origin: "태국", role: "가정과 농장 주변을 지키는 경계와 동행", size: "중형 · 약 43~53cm, 17~20kg" },
  { slug: "taiwan-dog", nameKo: "타이완 도그", nameEn: "Taiwan Dog", group: "spitz-primitive", origin: "타이완", role: "산림에서 사냥감을 찾고 마을 주변을 경계하는 작업", size: "중형 · 약 43~52cm, 12~18kg" },
  { slug: "brazilian-tracker", nameKo: "브라질리안 트래커", nameEn: "Brazilian Tracker", group: "scent-hound", origin: "브라질", role: "열대 숲에서 냄새로 사냥감을 추적하는 작업", size: "대형 · 약 56~65cm, 25~35kg" },
  { slug: "french-tricolour-hound", nameKo: "프렌치 트라이컬러 하운드", nameEn: "French Tricolour Hound", group: "scent-hound", origin: "프랑스", role: "여러 마리가 협력해 사냥감을 추적하는 작업", size: "대형 · 약 62~72cm, 30~35kg" },
  { slug: "french-white-and-black-hound", nameKo: "프렌치 화이트 앤 블랙 하운드", nameEn: "French White and Black Hound", group: "scent-hound", origin: "프랑스", role: "넓은 숲과 들판에서 냄새 흔적을 따라가는 작업", size: "대형 · 약 65~72cm, 30~35kg" },
  { slug: "french-white-and-orange-hound", nameKo: "프렌치 화이트 앤 오렌지 하운드", nameEn: "French White and Orange Hound", group: "scent-hound", origin: "프랑스", role: "무리 사냥에서 냄새 흔적을 오래 유지하는 작업", size: "대형 · 약 62~70cm, 25~35kg" },
  { slug: "great-anglo-french-tricolour-hound", nameKo: "그레이트 앵글로 프렌치 트라이컬러", nameEn: "Great Anglo-French Tricolour Hound", group: "scent-hound", origin: "프랑스·영국", role: "넓은 지역에서 무리로 큰 사냥감을 추적하는 작업", size: "대형 · 약 60~72cm, 30~35kg" },
  { slug: "great-anglo-french-white-and-black-hound", nameKo: "그레이트 앵글로 프렌치 화이트 앤 블랙", nameEn: "Great Anglo-French White and Black Hound", group: "scent-hound", origin: "프랑스·영국", role: "사냥 무리와 함께 긴 냄새 추적을 수행하는 작업", size: "대형 · 약 60~72cm, 30~35kg" },
  { slug: "great-anglo-french-white-and-orange-hound", nameKo: "그레이트 앵글로 프렌치 화이트 앤 오렌지", nameEn: "Great Anglo-French White and Orange Hound", group: "scent-hound", origin: "프랑스·영국", role: "넓은 들판에서 냄새 흔적을 따라가는 무리 사냥", size: "대형 · 약 60~72cm, 30~35kg" },
  { slug: "polish-hound", nameKo: "폴리시 하운드", nameEn: "Polish Hound", group: "scent-hound", origin: "폴란드", role: "숲과 습지에서 사냥감의 냄새를 추적하는 작업", size: "대형 · 약 56~65cm, 20~30kg" },
  { slug: "american-foxhound", nameKo: "아메리칸 폭스하운드", nameEn: "American Foxhound", group: "scent-hound", origin: "미국", role: "넓은 들판에서 냄새로 여우를 추적하는 작업", size: "대형 · 약 53~64cm, 25~32kg" },
  { slug: "black-and-tan-coonhound", nameKo: "블랙 앤 탄 쿤하운드", nameEn: "Black and Tan Coonhound", group: "scent-hound", origin: "미국", role: "야간에 냄새로 너구리와 사냥감을 추적하는 작업", size: "대형 · 약 58~69cm, 23~34kg" },
  { slug: "beagle-harrier", nameKo: "비글 해리어", nameEn: "Beagle Harrier", group: "scent-hound", origin: "프랑스", role: "중간 크기 사냥감을 무리로 추적하는 작업", size: "중형 · 약 45~50cm, 19~21kg" },
  { slug: "griffon-blue-gascony", nameKo: "그리폰 블루 드 가스코뉴", nameEn: "Griffon Bleu de Gascogne", group: "scent-hound", origin: "프랑스 가스코뉴", role: "거친 피모로 숲속 냄새 흔적을 추적하는 작업", size: "중형 · 약 48~57cm, 18~30kg" },
  { slug: "griffon-fauve-de-bretagne", nameKo: "그리폰 포브 드 브르타뉴", nameEn: "Griffon Fauve de Bretagne", group: "scent-hound", origin: "프랑스 브르타뉴", role: "거친 지형에서 작은 사냥감을 추적하는 작업", size: "중형 · 약 48~56cm, 18~22kg" },
  { slug: "griffon-nivernais", nameKo: "그리폰 니베르네", nameEn: "Griffon Nivernais", group: "scent-hound", origin: "프랑스 니베르네", role: "숲에서 멧돼지와 큰 사냥감의 냄새를 추적하는 작업", size: "중형 · 약 55~62cm, 22~25kg" },
  { slug: "hellenic-hound", nameKo: "헬레닉 하운드", nameEn: "Hellenic Hound", group: "scent-hound", origin: "그리스", role: "산악 지형에서 토끼의 냄새를 추적하는 작업", size: "중형 · 약 47~55cm, 17~20kg" },
  { slug: "serbian-tricolour-hound", nameKo: "세르비안 트라이컬러 하운드", nameEn: "Serbian Tricolour Hound", group: "scent-hound", origin: "세르비아", role: "숲과 구릉에서 무리로 사냥감을 추적하는 작업", size: "중형 · 약 44~55cm, 20~25kg" },
  { slug: "german-hound", nameKo: "저먼 하운드", nameEn: "German Hound", group: "scent-hound", origin: "독일", role: "숲과 농경지에서 냄새 흔적을 따라가는 작업", size: "중형 · 약 40~53cm, 15~20kg" },
  { slug: "westphalian-dachsbracke", nameKo: "베스트팔리안 닥스브라케", nameEn: "Westphalian Dachsbracke", group: "scent-hound", origin: "독일 베스트팔렌", role: "낮은 체고로 숲속 사냥감의 흔적을 추적하는 작업", size: "소형 · 약 30~38cm, 13~16kg" },
  { slug: "small-swiss-hound", nameKo: "스몰 스위스 하운드", nameEn: "Small Swiss Hound", group: "scent-hound", origin: "스위스", role: "좁은 산길에서 작은 사냥감을 냄새로 추적하는 작업", size: "소형 · 약 35~43cm, 8~15kg" },
  { slug: "hanoverian-scent-hound", nameKo: "하노버리안 센트하운드", nameEn: "Hanoverian Scent Hound", group: "scent-hound", origin: "독일 하노버", role: "부상한 사냥감의 오래된 냄새 흔적을 찾는 작업", size: "중형 · 약 48~55cm, 30~35kg" },
  { slug: "artois-hound", nameKo: "아르투아 하운드", nameEn: "Artois Hound", group: "scent-hound", origin: "프랑스 아르투아", role: "들판과 숲에서 토끼류의 냄새를 추적하는 작업", size: "중형 · 약 53~58cm, 28~30kg" },
  { slug: "istrian-short-haired-hound", nameKo: "이스트리안 쇼트헤어드 하운드", nameEn: "Istrian Short-haired Hound", group: "scent-hound", origin: "크로아티아 이스트리아", role: "돌이 많은 지형에서 토끼와 여우를 추적하는 작업", size: "중형 · 약 44~56cm, 18~20kg" },
  { slug: "istrian-wire-haired-hound", nameKo: "이스트리안 와이어헤어드 하운드", nameEn: "Istrian Wire-haired Hound", group: "scent-hound", origin: "크로아티아 이스트리아", role: "거친 피모로 바위 지형의 냄새 흔적을 추적하는 작업", size: "중형 · 약 46~58cm, 18~24kg" },
  { slug: "braque-francais-type-pyrenees", nameKo: "프렌치 포인터 피레네 타입", nameEn: "Braque Français, type Pyrénées", group: "pointing", origin: "프랑스 피레네", role: "새와 작은 사냥감의 위치를 가리키고 회수하는 작업", size: "중형 · 약 47~58cm, 17~25kg" },
  { slug: "braque-bourbonnais", nameKo: "브라크 뒤 부르보네", nameEn: "Braque du Bourbonnais", group: "pointing", origin: "프랑스 부르보네", role: "들판에서 새의 위치를 가리키고 함께 회수하는 작업", size: "중형 · 약 48~58cm, 16~25kg" },
  { slug: "ariege-pointing-dog", nameKo: "아리에주 포인팅 도그", nameEn: "Braque de l'Ariege", group: "pointing", origin: "프랑스 아리에주", role: "산악과 평지에서 새를 찾고 위치를 알리는 작업", size: "대형 · 약 56~67cm, 25~30kg" },
  { slug: "portuguese-pointing-dog", nameKo: "포르투기즈 포인팅 도그", nameEn: "Portuguese Pointing Dog", group: "pointing", origin: "포르투갈", role: "들새의 위치를 가리키고 사냥꾼과 협력하는 작업", size: "중형 · 약 52~60cm, 18~27kg" },
  { slug: "pudelpointer", nameKo: "푸델포인터", nameEn: "Pudelpointer", group: "pointing", origin: "독일", role: "물과 들판에서 사냥감을 찾고 가리키고 회수하는 작업", size: "대형 · 약 55~68cm, 20~30kg" },
  { slug: "bohemian-wire-haired-pointing-griffon", nameKo: "보헤미안 와이어헤어드 포인팅 그리폰", nameEn: "Bohemian Wire-haired Pointing Griffon", group: "pointing", origin: "체코", role: "거친 들판과 물가에서 사냥감을 찾고 회수하는 작업", size: "중형 · 약 58~66cm, 22~34kg" },
  { slug: "german-spaniel", nameKo: "저먼 스패니얼", nameEn: "German Spaniel", group: "retriever-spaniel", origin: "독일", role: "덤불과 물가에서 작은 사냥감을 찾아 회수하는 작업", size: "중형 · 약 45~54cm, 18~25kg" },
  { slug: "king-charles-spaniel", nameKo: "킹 찰스 스패니얼", nameEn: "King Charles Spaniel", group: "companion", origin: "영국", role: "사람 곁에서 생활하며 작은 조렵 역할을 돕던 반려견", size: "소형 · 약 23~28cm, 3.6~6.3kg" },
  { slug: "griffon-belge", nameKo: "벨지안 그리폰", nameEn: "Griffon Belge", group: "companion", origin: "벨기에", role: "도시 가정에서 동행하고 작은 해충을 알리는 반려 작업", size: "소형 · 약 18~28cm, 3.5~6kg" },
  { slug: "eesti-hound", nameKo: "에스티 하운드", nameEn: "Estonian Hound", group: "scent-hound", origin: "에스토니아", role: "숲과 들판에서 냄새로 작은 사냥감을 추적하는 작업", size: "중형 · 약 42~52cm, 15~20kg" },
  { slug: "kintamani-bali-dog", nameKo: "킨타마니 발리 도그", nameEn: "Kintamani-Bali Dog", group: "spitz-primitive", origin: "인도네시아 발리", role: "마을과 농장 주변을 지키고 사람과 동행하는 작업", size: "중형 · 약 40~55cm, 13~18kg" },
  { slug: "kazakh-tazy", nameKo: "카자흐 타지", nameEn: "Kazakh Tazy", group: "sighthound", origin: "카자흐스탄", role: "넓은 초원에서 시각으로 사냥감을 추적하는 질주", size: "중형~대형 · 약 60~70cm, 18~25kg" },
  { slug: "ratonero-bodeguero-andaluz", nameKo: "라토네로 보데게로 안달루스", nameEn: "Ratonero Bodeguero Andaluz", group: "terrier", origin: "스페인 안달루시아", role: "창고와 농장의 작은 해충을 추적하는 작업", size: "소형 · 약 34~43cm, 7~8kg" },
  { slug: "valencian-terrier", nameKo: "발렌시안 테리어", nameEn: "Valencian Terrier", group: "terrier", origin: "스페인 발렌시아", role: "농장과 마구간의 작은 해충을 관리하는 작업", size: "소형 · 약 30~40cm, 4~8kg" },
  { slug: "romanian-raven-shepherd-dog", nameKo: "루마니안 레이븐 셰퍼드", nameEn: "Romanian Raven Shepherd Dog", group: "guardian-working", origin: "루마니아", role: "산악 목장의 가축을 지키는 경비 작업", size: "대형 · 약 65~80cm, 45~65kg" },
  { slug: "tatra-hound", nameKo: "타트라 하운드", nameEn: "Tatra Hound", group: "scent-hound", origin: "폴란드 타트라", role: "산악 지형에서 냄새로 사냥감을 추적하는 작업", size: "중형 · 약 45~55cm, 18~25kg" },
  { slug: "transmontano-mastiff", nameKo: "트란스몬타노 마스티프", nameEn: "Transmontano Mastiff", group: "guardian-working", origin: "포르투갈 트란스몬테스", role: "산악 목장의 양 떼를 지키는 경비 작업", size: "대형 · 약 68~85cm, 50~75kg" },
  { slug: "brazilian-campeiro-bulldog", nameKo: "브라질리안 캄페이루 불도그", nameEn: "Brazilian Campeiro Bulldog", group: "guardian-working", origin: "브라질 남부", role: "소를 몰고 농장 주변을 지키는 작업", size: "중형 · 약 48~58cm, 35~45kg" },
  { slug: "segugio-dell-appennino", nameKo: "세구지오 델 아펜니노", nameEn: "Segugio dell'Appennino", group: "scent-hound", origin: "이탈리아 아펜니노", role: "산악 숲에서 토끼와 멧돼지를 추적하는 작업", size: "중형 · 약 45~52cm, 15~20kg" },
  { slug: "sabueso-fino-colombiano", nameKo: "사부에소 피노 콜롬비아노", nameEn: "Sabueso Fino Colombiano", group: "scent-hound", origin: "콜롬비아", role: "열대 숲에서 냄새로 사냥감을 추적하는 작업", size: "중형 · 약 45~55cm, 15~25kg" },
  { slug: "macedonian-shepherd-dog-karaman", nameKo: "마케도니안 셰퍼드 도그 카라만", nameEn: "Macedonian Shepherd Dog Karaman", group: "guardian-working", origin: "북마케도니아", role: "산악 목장의 가축과 사람을 지키는 경비 작업", size: "대형 · 약 60~75cm, 35~55kg" },
  { slug: "sapsaree", nameKo: "삽살개", nameEn: "Sapsaree", group: "spitz-primitive", origin: "대한민국 경산", role: "사람 곁에서 생활하며 집과 마을을 지키던 토종견", size: "중형 · 약 49~58cm, 17~25kg", registry: "non-fci", sourceUrl: "https://www.heritage.go.kr/heri/cul/culSelectDetail.do?VdkVgwKey=16%2C03680000%2C37&pageNo=1_1_1_1", sourceTitle: "경산의 삽살개 국가유산포털", sourceOrganization: "국가유산청" },
  { slug: "pungsan-dog", nameKo: "풍산개", nameEn: "Pungsan Dog", group: "spitz-primitive", origin: "한반도 북부", role: "산악 지형에서 사냥과 마을 경계를 돕던 토종견", size: "중형~대형 · 약 50~60cm, 20~30kg", registry: "non-fci", sourceUrl: kkfNonFciUrl, sourceTitle: "FCI 미등록 견종 안내(풍산개)", sourceOrganization: "한국애견연맹" },
  { slug: "donggyeongi", nameKo: "경주개 동경이", nameEn: "Donggyeongi", group: "spitz-primitive", origin: "대한민국 경주", role: "마을에서 사람과 함께 생활하며 집 주변을 살피던 토종견", size: "중형 · 약 40~50cm, 15~25kg", registry: "non-fci", sourceUrl: "https://www.heritage.go.kr/heri/cul/culSelectDetail.do?ccbaCpno=1363705400000", sourceTitle: "천연기념물 경주개 동경이", sourceOrganization: "국가유산청 국가유산포털" },
  { slug: "jeju-dog", nameKo: "제주개", nameEn: "Jeju Dog", group: "spitz-primitive", origin: "대한민국 제주", role: "섬의 농가에서 사람과 가축 곁을 지키던 토종견", size: "중형 · 약 45~55cm, 15~25kg", registry: "non-fci", sourceUrl: kkfNonFciUrl, sourceTitle: "FCI 미등록 견종 안내(제주개)", sourceOrganization: "한국애견연맹" },
];

const roleHome: Record<Group, string> = {
  herding: "목양 작업의 배경은 오늘날에도 움직임과 협력 학습, 환경 읽기 과제로 이어질 수 있습니다.",
  "guardian-working": "경비와 작업의 배경은 예측 가능한 경계 연습과 차분한 생활 동선으로 연결됩니다.",
  terrier: "작은 사냥감 추적의 배경은 안전한 탐색과 반복 가능한 문제 해결 과제로 전환할 수 있습니다.",
  "spitz-primitive": "감시와 자립적인 작업의 배경은 선택권이 있는 탐색과 예측 가능한 사회화로 이어집니다.",
  "scent-hound": "후각 추적의 배경은 냄새 과제와 안전한 이동 루틴으로 일상에 적용할 수 있습니다.",
  pointing: "포인팅 작업의 배경은 찾기·멈춤·호출을 묶은 협력 과제로 이어집니다.",
  "retriever-spaniel": "회수 작업의 배경은 사람과 함께하는 짧은 찾기와 물놀이 관리로 이어집니다.",
  companion: "반려견의 배경은 사람과 함께하는 생활 리듬과 혼자 쉬는 시간을 함께 연습하는 일로 이어집니다.",
  sighthound: "시각 추적과 질주의 배경은 안전한 공간의 짧은 운동과 충분한 회복으로 이어집니다.",
};

const makeBreed = (seed: Seed): Breed => {
  const m = meta[seed.group];
  const sourceUrl = seed.sourceUrl ?? fciGroupUrls[seed.group];
  const sourceOrganization = seed.sourceOrganization ?? "Fédération Cynologique Internationale";
  const sourceTitle = seed.sourceTitle ?? `${seed.nameEn} — FCI breeds nomenclature`;
  const registryNote = seed.registry === "non-fci" ? " 이 항목은 FCI 견종 표준에 등록되지 않은 한국 토종견 자료로, 별도 인정 체계를 구분해 읽어야 합니다." : "";
  return {
    slug: seed.slug,
    contentStatus: "mvp-editorial-draft",
    nameKo: seed.nameKo,
    nameEn: seed.nameEn,
    tagline: `${withTopicParticle(seed.nameKo)} ${seed.role}이라는 역사적 배경을 지녔으며, 오늘날에는 개체 차이와 생활 조건을 함께 살펴야 합니다.`,
    palette: { primary: m.colors[0], secondary: m.colors[1], ink: m.colors[2] },
    illustration: `/illustrations/v2/${seed.slug}-card.webp`,
    catalog: { group: seed.group, discoveryTags: [...m.tags, seed.origin] },
    historyVisual: { src: `/illustrations/v3/${seed.slug}-history.webp`, alt: `${seed.nameKo}의 기원과 원래 역할을 보여 주는 편집 수채화 역사 장면` },
    identity: { origin: seed.origin, lineage: `${seed.origin}의 ${m.label} 계통에서 발전한 견종`, originalRole: seed.role, size: seed.size, lifespan: "개체와 생활 환경에 따라 달라지므로 공식 자료와 수의학적 상담을 함께 확인하세요." },
    behaviorClues: {
      originalRole: `${withTopicParticle(seed.nameKo)} ${seed.role}이라는 역할과 환경 속에서 형성되었습니다. 과거 역할이 현재 개체의 행동을 보장하지는 않지만 생활 과제를 설계할 때 참고가 됩니다.`,
      today: `오늘날에는 원래 역할과 연결된 탐색·협력 욕구를 안전한 산책과 짧은 학습 과제로 전환할 수 있습니다. 반응과 회복 속도는 개체마다 다릅니다.`,
      guardianContext: `${seed.nameKo}와 함께 살 때는 ${seed.size}에 맞는 공간, 휴식, 사회화, 건강 관리를 함께 계획해야 합니다. 보호자의 경험과 환경도 중요한 변수입니다.`,
    },
    story: {
      opening: `${withTopicParticle(seed.nameKo)} ${seed.origin}에서 ${seed.role}이라는 역사적 배경과 함께 발전했습니다. 이름이나 외형만으로 생활 적합성을 단정하기보다 역사와 개체 차이를 함께 살펴보세요.`,
      roleToHome: roleHome[seed.group],
      reality: `품종의 경향은 개체의 성격을 보장하지 않습니다. ${seed.nameKo}와 살려면 ${seed.size}에 맞는 공간과 일상, 건강 상태, 보호자의 경험을 함께 점검하는 준비가 필요합니다.${registryNote}`,
    },
    tendencies: {
      activity: { label: m.levels[0], note: "짧은 활동과 충분한 휴식을 묶어 구성하고 개체의 회복 신호를 관찰해 주세요." },
      mentalStimulation: { label: m.levels[1], note: "냄새 찾기와 간단한 문제 해결 과제를 일상에 나누어 제공해 주세요." },
      independence: { label: m.levels[2], note: "혼자 쉬는 시간과 보호자와 함께하는 시간을 작은 단계로 연습해 주세요." },
      socialConnection: { label: m.levels[3], note: "사람과 다른 동물에 대한 반응은 개체 경험에 따라 다르므로 거리를 조절해 주세요." },
      alerting: { label: m.levels[4], note: "주변 자극에 대한 반응은 사회화와 생활 환경에 따라 달라질 수 있습니다." },
      grooming: { label: m.levels[5], note: "피모와 귀·발 상태를 확인하고 필요한 관리 루틴을 일찍 익혀 주세요." },
    },
    careNotes: m.care,
    healthEditorialNote: "건강 항목은 품종에서 관찰되는 경향을 소개하는 편집 초안이며, 진단이나 개체 예측이 아닙니다. 이상 신호는 수의사에게 확인하세요.",
    daySnapshot: [
      { time: "아침", title: "몸 상태 확인", description: "컨디션과 발·귀 상태를 살피고 짧은 탐색 과제로 하루를 시작하세요." },
      { time: "낮", title: "차분한 휴식", description: "활동 뒤에는 조용하고 예측 가능한 공간에서 충분히 쉬게 해 주세요." },
      { time: "저녁", title: "관계와 관리", description: "간단한 학습과 브러싱, 수분·식사 상태를 차분히 확인하세요." },
    ],
    related: m.related.map(([slug, reason]) => ({ slug, reason })),
    sources: [{ title: sourceTitle, organization: sourceOrganization, url: sourceUrl, checkedAt }],
  };
};

export const detailBatchOSlugs = seeds.map((seed) => seed.slug);
export const detailBatchO = seeds.map(makeBreed) satisfies Breed[];
