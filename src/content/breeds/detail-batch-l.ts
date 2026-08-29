import type { Breed } from "./schema";
import { withTopicParticle } from "../../lib/korean-particles";

const checkedAt = "2026-08-06";
const historyAltOverrides: Partial<Record<string, string>> = {
  "bedlington-terrier": "잉글랜드 북부 광산 마을 가장자리의 들판에서 토끼 흔적을 찾는 청회색 베들링턴 테리어를 그린 편집 수채화",
};
const historySources: Partial<Record<string, Breed["sources"]>> = {
  "bedlington-terrier": [{ title: "Bedlington Terrier Breed History", organization: "American Kennel Club", url: "https://www.akc.org/expert-advice/dog-breeds/bedlington-terrier-history/", checkedAt: "2026-08-29" }],
};
type Group = Exclude<Breed["catalog"]["group"], "northern-working" | "dachshund">;
type Level = "낮은 편" | "중간" | "높은 편" | "개체별 확인 필요";
type Seed = {
  slug: string;
  nameKo: string;
  nameEn: string;
  group: Group;
  origin: string;
  role: string;
  size: string;
  fciUrl: string;
  akcUrl?: string;
};

const groupMeta: Record<Group, {
  label: string;
  tags: string[];
  colors: [string, string, string];
  levels: [Level, Level, Level, Level, Level, Level];
  related: [string, string][];
  care: [string, string];
}> = {
  herding: {
    label: "목양·가축 관리견",
    tags: ["목양 본능", "협력 학습", "활동적인 일상"],
    colors: ["#7d725f", "#ded7c9", "#302d29"],
    levels: ["높은 편", "높은 편", "중간", "높은 편", "중간", "중간"],
    related: [["border-collie", "목양견의 협력 방식과 움직임을 비교해 보세요."], ["australian-cattle-dog", "가축 관리와 활동량의 차이를 살펴보세요."]],
    care: ["움직임과 냄새 찾기 과제를 짧게 나누어 제공하세요.", "사람이나 동물을 몰려는 행동은 안전한 대체 과제로 전환하세요."],
  },
  "guardian-working": {
    label: "경비·작업견",
    tags: ["경비 역할", "체격 관리", "사회화"],
    colors: ["#806957", "#ded4c4", "#312b27"],
    levels: ["중간", "높은 편", "개체별 확인 필요", "중간", "높은 편", "중간"],
    related: [["rottweiler", "보호자 협력과 경계 반응의 차이를 비교해 보세요."], ["bernese-mountain-dog", "대형견의 체격과 일상 관리 조건을 살펴보세요."]],
    care: ["차분한 방문객 인사와 거리 조절을 반복해서 연습하세요.", "성장기부터 관절 부담을 줄이는 운동과 체중 관리를 계획하세요."],
  },
  terrier: {
    label: "테리어",
    tags: ["작은 사냥감 추적", "대담한 성향", "탐색 놀이"],
    colors: ["#946f57", "#e3d6c8", "#352e2a"],
    levels: ["높은 편", "높은 편", "개체별 확인 필요", "중간", "높은 편", "낮은 편"],
    related: [["border-terrier", "작은 테리어의 탐색과 경계 반응을 비교해 보세요."], ["jack-russell-terrier", "추적 욕구를 안전한 놀이로 전환하는 방법을 살펴보세요."]],
    care: ["쫓고 파는 욕구를 울타리 안 탐색과 냄새 과제로 연결하세요.", "흥분이 올라가기 전 짧은 휴식과 회복 시간을 넣으세요."],
  },
  "spitz-primitive": {
    label: "스피츠·원시형",
    tags: ["독립적인 판단", "원시형 계통", "환경 적응"],
    colors: ["#8b715a", "#e2d8ca", "#332d29"],
    levels: ["높은 편", "중간", "높은 편", "개체별 확인 필요", "높은 편", "중간"],
    related: [["shiba", "독립적인 판단과 사회화 조건을 비교해 보세요."], ["akita", "스피츠 체형과 경계 반응의 차이를 살펴보세요."]],
    care: ["예측 가능한 산책과 냄새 탐색으로 선택권을 안전하게 제공하세요.", "이중 리드와 문단속처럼 생활 속 이탈 예방을 먼저 점검하세요."],
  },
  "scent-hound": {
    label: "후각 하운드",
    tags: ["후각 추적", "지구력", "탐색 과제"],
    colors: ["#9a7057", "#e4d7c9", "#362d29"],
    levels: ["높은 편", "높은 편", "중간", "중간", "중간", "낮은 편"],
    related: [["beagle", "후각 추적과 일상 탐색의 공통점을 비교해 보세요."], ["basset-hound", "체형에 맞는 산책과 관절 관리 조건을 살펴보세요."]],
    care: ["긴 줄을 사용할 수 있는 안전한 공간에서 냄새 산책을 계획하세요.", "귀와 발, 체중을 정기적으로 확인하고 무리한 점프를 줄이세요."],
  },
  pointing: {
    label: "포인팅견",
    tags: ["사냥감 위치 알림", "집중력", "회수 협력"],
    colors: ["#ad8366", "#e8ded2", "#3a312c"],
    levels: ["높은 편", "높은 편", "중간", "높은 편", "중간", "중간"],
    related: [["english-setter", "포인팅과 사람 협력의 차이를 비교해 보세요."], ["german-short-haired-pointing-dog", "탐색·회수 과제를 일상에 적용하는 방법을 살펴보세요."]],
    care: ["시각·후각 탐색을 짧은 성공 경험으로 나누어 제공하세요.", "달리기만 늘리기보다 회복과 충동 조절을 함께 연습하세요."],
  },
  "retriever-spaniel": {
    label: "리트리버·스패니얼",
    tags: ["회수 협력", "사람과 작업", "수상 활동"],
    colors: ["#806555", "#e1d6c7", "#322d29"],
    levels: ["높은 편", "높은 편", "중간", "높은 편", "중간", "중간"],
    related: [["labrador-retriever", "회수와 사람 협력의 공통점을 비교해 보세요."], ["english-cocker-spaniel", "작업 강도와 피모 관리의 차이를 살펴보세요."]],
    care: ["물기·찾기·가져오기 과제를 안전한 장난감으로 전환하세요.", "귀와 피모를 활동 뒤 확인하고 충분히 말려 주세요."],
  },
  companion: {
    label: "컴패니언",
    tags: ["반려 생활", "사람과 교감", "작은 체구"],
    colors: ["#b48668", "#eaded2", "#3b302b"],
    levels: ["중간", "중간", "개체별 확인 필요", "높은 편", "중간", "중간"],
    related: [["maltese", "작은 체구 반려견의 교감과 피모 관리를 비교해 보세요."], ["cavalier-king-charles-spaniel", "사람과의 접촉 욕구와 건강 관리 조건을 살펴보세요."]],
    care: ["짧고 긍정적인 교육을 생활 루틴에 여러 번 나누어 넣으세요.", "작은 체구에 맞는 계단·점프 환경과 체중을 관리하세요."],
  },
  sighthound: {
    label: "사이트하운드",
    tags: ["시각 추적", "빠른 질주", "휴식 시간"],
    colors: ["#9d7660", "#e3d8ce", "#342e2a"],
    levels: ["높은 편", "중간", "높은 편", "중간", "중간", "낮은 편"],
    related: [["greyhound", "질주와 회복을 함께 계획하는 방법을 비교해 보세요."], ["borzoi", "큰 체형 사이트하운드의 공간과 산책 조건을 살펴보세요."]],
    care: ["안전하게 닫힌 공간에서 짧은 질주와 긴 회복을 번갈아 주세요.", "얇은 피모와 추위, 충돌 위험을 고려해 산책 환경을 점검하세요."],
  },
};

const seeds: Seed[] = [
  { slug: "bolognese", nameKo: "볼로네즈", nameEn: "Bolognese", group: "companion", origin: "이탈리아", role: "귀족 가정의 동반과 교감", size: "소형 · 약 25~30cm, 2.5~4kg", fciUrl: "https://www.fci.be/en/nomenclature/BOLOGNESE-196.html" },
  { slug: "tibetan-spaniel", nameKo: "티베탄 스패니얼", nameEn: "Tibetan Spaniel", group: "companion", origin: "티베트", role: "사원과 가정의 경계 알림 및 동반", size: "소형 · 약 24~26cm, 4~7kg", fciUrl: "https://www.fci.be/en/nomenclature/TIBETAN-SPANIEL-231.html" },
  { slug: "tibetan-terrier", nameKo: "티베탄 테리어", nameEn: "Tibetan Terrier", group: "companion", origin: "티베트", role: "수도원과 유목 가정의 동반·경계 알림", size: "중형 · 약 35~41cm, 8~14kg", fciUrl: "https://www.fci.be/en/nomenclature/TIBETAN-TERRIER-209.html" },
  { slug: "japanese-chin", nameKo: "재패니즈 친", nameEn: "Japanese Chin", group: "companion", origin: "일본", role: "궁정과 가정의 교감 중심 반려", size: "소형 · 약 20~27cm, 1.5~6kg", fciUrl: "https://www.fci.be/en/nomenclature/JAPANESE-CHIN-206.html" },
  { slug: "prague-ratter", nameKo: "프라하 라터", nameEn: "Prague Ratter", group: "companion", origin: "체코", role: "도시 가정의 작은 설치류 추적과 동반", size: "소형 · 약 21~23cm, 2~3kg", fciUrl: "https://www.fci.be/en/nomenclature/PRAGUE-RATTER-363.html" },
  { slug: "azawakh", nameKo: "아자와크", nameEn: "Azawakh", group: "sighthound", origin: "서아프리카 사헬", role: "유목민의 가축 경계와 시각 추적", size: "대형 · 약 60~74cm, 15~25kg", fciUrl: "https://www.fci.be/en/nomenclature/AZA-WAKH-307.html" },
  { slug: "sloughi", nameKo: "슬루기", nameEn: "Sloughi", group: "sighthound", origin: "북아프리카", role: "사막 지형에서의 시각 추적과 사냥 협력", size: "대형 · 약 61~72cm, 18~28kg", fciUrl: "https://www.fci.be/en/nomenclature/SLOUGHI-188.html" },
  { slug: "galgo-espanol", nameKo: "스페니시 그레이하운드", nameEn: "Spanish Greyhound", group: "sighthound", origin: "스페인", role: "넓은 평원에서의 시각 추적과 질주", size: "대형 · 약 60~70cm, 20~30kg", fciUrl: "https://www.fci.be/en/nomenclature/SPANISH-GREYHOUND-285.html" },
  { slug: "bergamasco-shepherd", nameKo: "베르가마스코 셰퍼드", nameEn: "Bergamasco Shepherd", group: "herding", origin: "이탈리아 알프스", role: "산악 목초지에서 양 떼를 모으고 지키는 작업", size: "대형 · 약 56~60cm, 26~38kg", fciUrl: "https://www.fci.be/en/nomenclature/BERGAMASCO-SHEPHERD-DOG-194.html" },
  { slug: "mudi", nameKo: "무디", nameEn: "Mudi", group: "herding", origin: "헝가리", role: "가축 몰이와 농장 주변 경계 작업", size: "중형 · 약 38~47cm, 8~13kg", fciUrl: "https://www.fci.be/en/nomenclature/MUDI-238.html" },
  { slug: "schipperke", nameKo: "스키퍼키", nameEn: "Schipperke", group: "herding", origin: "벨기에", role: "운하 선박과 농장의 작은 해충 경계", size: "소형 · 약 25~33cm, 3~9kg", fciUrl: "https://www.fci.be/en/nomenclature/SCHIPPERKE-83.html" },
  { slug: "slovakian-cuvac", nameKo: "슬로바키안 쿠바츠", nameEn: "Slovakian Cuvac", group: "herding", origin: "슬로바키아", role: "산악 목초지에서 양 떼와 가족을 지키는 작업", size: "대형 · 약 59~70cm, 30~45kg", fciUrl: "https://www.fci.be/en/nomenclature/SLOVAKIAN-CHUVACH-142.html" },
  { slug: "polish-lowland-sheepdog", nameKo: "폴리시 로랜드 시프도그", nameEn: "Polish Lowland Sheepdog", group: "herding", origin: "폴란드", role: "목초지에서 가축을 모으고 농장을 지키는 작업", size: "중형 · 약 42~50cm, 14~23kg", fciUrl: "https://www.fci.be/en/nomenclature/POLISH-LOWLAND-SHEEPDOG-251.html" },
  { slug: "appenzeller-cattle-dog", nameKo: "아펜첼러 캐틀 도그", nameEn: "Appenzeller Cattle Dog", group: "guardian-working", origin: "스위스", role: "농장 가축 관리와 마차 호위", size: "중형 · 약 48~58cm, 22~32kg", fciUrl: "https://www.fci.be/en/nomenclature/APPENZELLER-330.html" },
  { slug: "entlebucher-mountain-dog", nameKo: "엔틀레부허 마운틴 도그", nameEn: "Entlebucher Mountain Dog", group: "guardian-working", origin: "스위스", role: "알프스 목초지의 가축 몰이와 농장 보조", size: "중형 · 약 42~50cm, 20~30kg", fciUrl: "https://www.fci.be/en/nomenclature/ENTLEBUCHER-CATTLE-DOG-47.html" },
  { slug: "greater-swiss-mountain-dog", nameKo: "그레이터 스위스 마운틴 도그", nameEn: "Greater Swiss Mountain Dog", group: "guardian-working", origin: "스위스", role: "수레 운반과 농장 가축 관리", size: "대형 · 약 60~72cm, 50~65kg", fciUrl: "https://www.fci.be/en/nomenclature/GREAT-SWISS-MOUNTAIN-DOG-58.html" },
  { slug: "german-pinscher", nameKo: "저먼 핀셔", nameEn: "German Pinscher", group: "guardian-working", origin: "독일", role: "농장 해충 통제와 경계", size: "중형 · 약 45~50cm, 14~20kg", fciUrl: "https://www.fci.be/en/nomenclature/GERMAN-PINSCHER-184.html" },
  { slug: "kangal-shepherd-dog", nameKo: "캉갈 셰퍼드 도그", nameEn: "Kangal Shepherd Dog", group: "guardian-working", origin: "튀르키예", role: "가축 무리를 대형 포식자로부터 지키는 보호", size: "대형 · 약 65~78cm, 40~60kg", fciUrl: "https://www.fci.be/en/nomenclature/KANGAL-SHEPHERD-DOG-331.html" },
  { slug: "bedlington-terrier", nameKo: "베들링턴 테리어", nameEn: "Bedlington Terrier", group: "terrier", origin: "영국", role: "광산 마을의 작은 사냥감과 해충 추적", size: "중형 · 약 38~43cm, 8~10kg", fciUrl: "https://www.fci.be/en/nomenclature/BEDLINGTON-TERRIER-9.html", akcUrl: "https://www.akc.org/dog-breeds/bedlington-terrier/" },
  { slug: "parson-russell-terrier", nameKo: "파슨 러셀 테리어", nameEn: "Parson Russell Terrier", group: "terrier", origin: "영국", role: "굴속 여우를 쫓는 민첩한 사냥 협력", size: "소형 · 약 31~36cm, 5~8kg", fciUrl: "https://www.fci.be/en/nomenclature/PARSON-RUSSELL-TERRIER-339.html" },
  { slug: "sealyham-terrier", nameKo: "실리햄 테리어", nameEn: "Sealyham Terrier", group: "terrier", origin: "웨일스", role: "굴속 사냥감과 농장 해충 추적", size: "소형 · 약 27~30cm, 8~10kg", fciUrl: "https://www.fci.be/en/nomenclature/SEALYHAM-TERRIER-74.html" },
  { slug: "manchester-terrier", nameKo: "맨체스터 테리어", nameEn: "Manchester Terrier", group: "terrier", origin: "영국", role: "도시와 농장의 쥐 통제", size: "중형 · 약 38~41cm, 5~10kg", fciUrl: "https://www.fci.be/en/nomenclature/MANCHESTER-TERRIER-71.html" },
  { slug: "cesky-terrier", nameKo: "체스키 테리어", nameEn: "Cesky Terrier", group: "terrier", origin: "체코", role: "숲과 농장의 작은 사냥감 추적", size: "소형 · 약 25~32cm, 6~10kg", fciUrl: "https://www.fci.be/en/nomenclature/CESKY-TERRIER-246.html" },
  { slug: "thai-ridgeback", nameKo: "타이 리지백", nameEn: "Thai Ridgeback", group: "spitz-primitive", origin: "태국", role: "마을 경계와 사냥, 수레 호위", size: "중형 · 약 51~61cm, 16~34kg", fciUrl: "https://www.fci.be/en/nomenclature/THAI-RIDGEBACK-DOG-338.html" },
  { slug: "portuguese-podengo", nameKo: "포르투기즈 포뎅고", nameEn: "Portuguese Podengo", group: "spitz-primitive", origin: "포르투갈", role: "토끼와 작은 사냥감을 시각·후각으로 추적", size: "소형~대형 · 유형별 약 20~70cm", fciUrl: "https://www.fci.be/en/nomenclature/PODENGO-PORTUGUES-94.html" },
  { slug: "greenland-dog", nameKo: "그린란드 도그", nameEn: "Greenland Dog", group: "spitz-primitive", origin: "그린란드", role: "북극권 썰매 운송과 사냥 협력", size: "대형 · 약 55~68cm, 25~35kg", fciUrl: "https://www.fci.be/en/nomenclature/GREENLAND-DOG-274.html" },
  { slug: "peruvian-hairless-dog", nameKo: "페루비안 헤어리스 도그", nameEn: "Peruvian Hairless Dog", group: "spitz-primitive", origin: "페루", role: "고대 가정의 동반과 경계 알림", size: "소형~대형 · 유형별 약 25~65cm", fciUrl: "https://www.fci.be/en/nomenclature/PERUVIAN-HAIRLESS-DOG-310.html" },
  { slug: "cirneco-dell-etna", nameKo: "치르네코 델에트나", nameEn: "Cirneco dell'Etna", group: "spitz-primitive", origin: "이탈리아 시칠리아", role: "바위 지형에서 토끼를 시각·후각으로 추적", size: "중형 · 약 42~52cm, 8~12kg", fciUrl: "https://www.fci.be/en/nomenclature/CIRNECO-DELL'ETNA-199.html" },
  { slug: "gascon-saintongeois", nameKo: "가스콩 생통주아", nameEn: "Gascon Saintongeois", group: "scent-hound", origin: "프랑스", role: "큰 사냥감을 무리로 추적하는 후각 작업", size: "대형 · 약 62~72cm, 25~35kg", fciUrl: "https://www.fci.be/en/nomenclature/GASCON-SAINTONGEOIS-21.html" },
  { slug: "grand-basset-griffon-vendeen", nameKo: "그랑 바셋 그리폰 방데앙", nameEn: "Grand Basset Griffon Vendeen", group: "scent-hound", origin: "프랑스 방데", role: "거친 지형에서 토끼와 작은 사냥감 추적", size: "중형 · 약 39~43cm, 18~20kg", fciUrl: "https://www.fci.be/en/nomenclature/GRAND-BASSET-GRIFFON-VENDEEN-33.html" },
  { slug: "schweizer-laufhund", nameKo: "슈바이처 라우프훈트", nameEn: "Schweizer Laufhund", group: "scent-hound", origin: "스위스", role: "산악 지형에서 사냥감을 냄새로 추적", size: "중형 · 약 47~59cm, 15~20kg", fciUrl: "https://www.fci.be/en/nomenclature/SWISS-HOUND-59.html" },
  { slug: "porcelaine", nameKo: "포셀린", nameEn: "Porcelaine", group: "scent-hound", origin: "프랑스", role: "토끼와 작은 사냥감을 향기로 추적", size: "중형 · 약 53~58cm, 23~28kg", fciUrl: "https://www.fci.be/en/nomenclature/PORCELAINE-30.html" },
  { slug: "petit-bleu-de-gascogne", nameKo: "프티 블뢰 드 가스코뉴", nameEn: "Petit Bleu de Gascogne", group: "scent-hound", origin: "프랑스 가스코뉴", role: "작은 사냥감을 무리로 추적하는 후각 작업", size: "중형 · 약 43~58cm, 18~23kg", fciUrl: "https://www.fci.be/en/nomenclature/PETIT-BLEU-DE-GASCOGNE-31.html" },
  { slug: "gordon-setter", nameKo: "고든 세터", nameEn: "Gordon Setter", group: "pointing", origin: "스코틀랜드", role: "새의 위치를 알려 주고 사냥을 돕는 포인팅", size: "대형 · 약 58~69cm, 20~36kg", fciUrl: "https://www.fci.be/en/nomenclature/GORDON-SETTER-6.html" },
  { slug: "german-long-haired-pointer", nameKo: "저먼 롱헤어드 포인터", nameEn: "German Long-Haired Pointing Dog", group: "pointing", origin: "독일", role: "새와 작은 사냥감의 위치 알림 및 회수", size: "대형 · 약 58~70cm, 27~32kg", fciUrl: "https://www.fci.be/en/nomenclature/GERMAN-LONG-HAIRED-POINTER-117.html" },
  { slug: "french-spaniel", nameKo: "프렌치 스패니얼", nameEn: "French Spaniel", group: "pointing", origin: "프랑스·캐나다", role: "새를 찾아 알리고 회수하는 조렵 작업", size: "대형 · 약 55~61cm, 20~27kg", fciUrl: "https://www.fci.be/en/nomenclature/FRENCH-SPANIEL-175.html" },
  { slug: "braque-saint-germain", nameKo: "브라크 생제르맹", nameEn: "Braque Saint-Germain", group: "pointing", origin: "프랑스", role: "새의 위치를 포인팅하고 회수하는 작업", size: "대형 · 약 54~62cm, 18~27kg", fciUrl: "https://www.fci.be/en/nomenclature/BRAQUE-SAINT-GERMAIN-115.html" },
  { slug: "blue-picardy-spaniel", nameKo: "블루 피카디 스패니얼", nameEn: "Blue Picardy Spaniel", group: "pointing", origin: "프랑스 피카디", role: "습지와 들판에서 새를 찾고 회수하는 작업", size: "대형 · 약 56~61cm, 20~27kg", fciUrl: "https://www.fci.be/en/nomenclature/BLUE-PICARDY-SPANIEL-106.html" },
  { slug: "field-spaniel", nameKo: "필드 스패니얼", nameEn: "Field Spaniel", group: "retriever-spaniel", origin: "영국", role: "들판과 숲에서 사냥감을 찾아내고 회수", size: "중형 · 약 43~46cm, 16~20kg", fciUrl: "https://www.fci.be/en/nomenclature/FIELD-SPANIEL-123.html" },
  { slug: "sussex-spaniel", nameKo: "서식스 스패니얼", nameEn: "Sussex Spaniel", group: "retriever-spaniel", origin: "영국", role: "숲과 덤불에서 사냥감을 찾아내는 조렵 작업", size: "중형 · 약 33~38cm, 16~20kg", fciUrl: "https://www.fci.be/en/nomenclature/SUSSEX-SPANIEL-127.html" },
  { slug: "wetterhoun", nameKo: "베터훈", nameEn: "Wetterhoun", group: "retriever-spaniel", origin: "네덜란드", role: "습지에서 수달과 물새를 추적·회수", size: "중형 · 약 55~59cm, 25~35kg", fciUrl: "https://www.fci.be/en/nomenclature/WETTERHOUN-221.html" },
  { slug: "kooikerhondje", nameKo: "쿠이커혼제", nameEn: "Nederlandse Kooikerhondje", group: "retriever-spaniel", origin: "네덜란드", role: "오리 유인과 회수에 협력하는 수상 작업", size: "소형~중형 · 약 35~40cm, 9~11kg", fciUrl: "https://www.fci.be/en/nomenclature/NEDERLANDSE-KOOIKERHONDJE-314.html" },
  { slug: "drentsche-patrijshond", nameKo: "드렌츠허 파트레이스훈트", nameEn: "Drentsche Patrijshond", group: "retriever-spaniel", origin: "네덜란드", role: "들판에서 새를 찾고 가리키며 회수", size: "중형 · 약 55~63cm, 20~25kg", fciUrl: "https://www.fci.be/en/nomenclature/DRENTSCHE-PATRIJSHOND-224.html" },
  { slug: "griffon-bruxellois", nameKo: "브뤼셀 그리폰", nameEn: "Griffon Bruxellois", group: "companion", origin: "벨기에", role: "도시 가정의 동반과 작은 해충 경계", size: "소형 · 약 18~28cm, 3.5~6kg", fciUrl: "https://www.fci.be/en/nomenclature/GRIFFON-BELGE-81.html" },
  { slug: "petit-brabancon", nameKo: "프티 브라방송", nameEn: "Petit Brabancon", group: "companion", origin: "벨기에", role: "도시 가정의 동반과 경계 알림", size: "소형 · 약 18~28cm, 3.5~6kg", fciUrl: "https://www.fci.be/en/nomenclature/PETIT-BRABANCON-82.html" },
  { slug: "russian-toy", nameKo: "러시안 토이", nameEn: "Russian Toy", group: "companion", origin: "러시아", role: "도시 가정의 교감과 경계 알림", size: "소형 · 약 20~28cm, 1.5~3kg", fciUrl: "https://www.fci.be/en/nomenclature/RUSSIAN-TOY-352.html" },
  { slug: "lowchen", nameKo: "뢰첸", nameEn: "Lowchen", group: "companion", origin: "프랑스·독일권", role: "가정의 동반과 사람 곁의 경계 알림", size: "소형 · 약 26~32cm, 4~8kg", fciUrl: "https://www.fci.be/en/nomenclature/LOWCHEN-233.html" },
  { slug: "english-toy-spaniel", nameKo: "잉글리시 토이 스패니얼", nameEn: "English Toy Spaniel", group: "companion", origin: "영국", role: "궁정과 가정의 동반 및 교감", size: "소형 · 약 23~28cm, 3.5~6.5kg", fciUrl: "https://www.fci.be/en/nomenclature/KING-CHARLES-SPANIEL-128.html" },
  { slug: "scottish-deerhound", nameKo: "스코티시 디어하운드", nameEn: "Scottish Deerhound", group: "sighthound", origin: "스코틀랜드", role: "넓은 고지대에서 사슴을 시각 추적", size: "대형 · 약 71~80cm, 34~50kg", fciUrl: "https://www.fci.be/en/nomenclature/DEERHOUND-164.html" },
  { slug: "hungarian-greyhound", nameKo: "헝가리안 그레이하운드", nameEn: "Hungarian Greyhound", group: "sighthound", origin: "헝가리", role: "평원에서 토끼와 사슴을 시각 추적", size: "대형 · 약 62~70cm, 22~30kg", fciUrl: "https://www.fci.be/en/nomenclature/MAGYAR-AGAR-240.html" },
];

const roleHome = (group: Group) => {
  if (group === "herding") return "목양과 가축 관리의 배경은 오늘날 움직임·협력·환경 읽기 과제로 이어질 수 있습니다.";
  if (group === "guardian-working") return "경비와 운반 작업의 배경은 차분한 경계 연습과 체격에 맞는 생활 설계로 연결할 수 있습니다.";
  if (group === "terrier") return "작은 사냥감 추적의 배경은 냄새 찾기와 안전한 쫓기 놀이로 전환할 수 있습니다.";
  if (group === "spitz-primitive") return "원시형 작업의 배경은 선택권이 있는 탐색과 예측 가능한 산책으로 풀어낼 수 있습니다.";
  if (group === "scent-hound") return "후각 추적의 배경은 긴 줄 산책과 냄새 과제로 일상에 담을 수 있습니다.";
  if (group === "pointing") return "포인팅과 회수의 배경은 찾기·멈추기·가져오기 과제로 안전하게 연결할 수 있습니다.";
  if (group === "retriever-spaniel") return "수상 회수와 조렵의 배경은 물기·찾기·협력 놀이로 전환할 수 있습니다.";
  if (group === "sighthound") return "시각 추적과 질주의 배경은 안전한 질주와 충분한 회복 시간으로 설계할 수 있습니다.";
  return "동반견의 배경은 사람 곁의 교감과 짧고 긍정적인 생활 교육으로 이어질 수 있습니다.";
};

const makeBreed = (seed: Seed): Breed => {
  const meta = groupMeta[seed.group];
  const roleHomeText = roleHome(seed.group);
  return {
    slug: seed.slug,
    contentStatus: "mvp-editorial-draft",
    nameKo: seed.nameKo,
    nameEn: seed.nameEn,
    tagline: `${withTopicParticle(seed.nameKo)} ${seed.role}이라는 역사적 배경을 지녔으며, 오늘의 생활에서는 개체 차이와 환경을 함께 살펴야 합니다.`,
    palette: { primary: meta.colors[0], secondary: meta.colors[1], ink: meta.colors[2] },
    illustration: `/illustrations/v2/${seed.slug}-card.webp`,
    catalog: { group: seed.group, discoveryTags: [...meta.tags, seed.origin] },
    historyVisual: { src: `/illustrations/v3/${seed.slug}-history.webp`, alt: historyAltOverrides[seed.slug] ?? `${seed.nameKo}의 기원과 역할을 보여 주는 편집 초안 역사 장면` },
    identity: { origin: seed.origin, lineage: `${seed.origin}의 오래된 ${meta.label} 계통에서 발전한 품종`, originalRole: seed.role, size: seed.size, lifespan: "개체와 관리 환경에 따라 달라지며 공식 자료와 수의사 상담을 함께 확인하세요." },
    behaviorClues: {
      originalRole: `${withTopicParticle(seed.nameKo)} ${seed.role}이라는 역할과 환경 속에서 형성되었습니다. 과거의 역할은 현재 개체의 행동을 단정하지 않지만 생활 설계의 참고 단서가 될 수 있습니다.`,
      today: `오늘날에는 ${seed.role}과 연결된 욕구를 놀이·탐색·협력 과제로 전환할 수 있습니다. 반응과 필요한 활동량은 개체마다 다릅니다.`,
      guardianContext: `보호자는 ${seed.nameKo}의 체격(${seed.size})과 생활 환경을 고려해 운동, 휴식, 사회화, 안전 관리를 함께 계획해야 합니다.`,
    },
    story: {
      opening: `${withTopicParticle(seed.nameKo)} ${seed.origin}에서 ${seed.role}이라는 역사적 배경과 함께 발전했습니다. 이름과 외형만으로 생활 난이도를 판단하기보다 형성 배경과 개체의 신호를 함께 살펴보세요.`,
      roleToHome: roleHomeText,
      reality: `품종의 경향은 개인의 성격을 보장하지 않습니다. ${seed.nameKo}에게는 ${seed.size}에 맞는 공간과 일상, 건강 상태, 보호자와의 경험을 함께 고려하는 준비가 필요합니다.`,
    },
    tendencies: {
      activity: { label: meta.levels[0], note: "짧은 활동과 회복 시간을 번갈아 구성하고 개체의 몸 상태를 살펴보세요." },
      mentalStimulation: { label: meta.levels[1], note: "냄새 찾기와 간단한 문제 해결을 생활 속에 나누어 제공하세요." },
      independence: { label: meta.levels[2], note: "혼자 쉬는 시간과 보호자와 함께하는 시간을 균형 있게 연습하세요." },
      socialConnection: { label: meta.levels[3], note: "낯선 사람·동물과의 거리는 개체의 회복 신호를 보며 조절하세요." },
      alerting: { label: meta.levels[4], note: "경계 반응은 환경과 경험에 따라 달라지므로 안전한 거리에서 관찰하세요." },
      grooming: { label: meta.levels[5], note: "피모·귀·발톱 상태를 정기적으로 확인하고 필요한 관리를 준비하세요." },
    },
    careNotes: meta.care,
    healthEditorialNote: "건강 항목은 품종 경향을 소개하는 편집 초안이며, 진단이나 개체의 예후를 대신하지 않습니다. 이상 신호는 수의사에게 확인하세요.",
    daySnapshot: [
      { time: "아침", title: "몸 상태 확인", description: "수면 뒤 움직임과 식욕을 살피고 짧은 산책으로 하루를 시작하세요." },
      { time: "낮", title: "탐색과 휴식", description: "환경에 맞는 냄새·찾기 과제를 제공한 뒤 조용히 회복할 시간을 주세요." },
      { time: "저녁", title: "차분한 교감", description: "짧은 교육과 접촉, 브러싱 등 개체가 편안해하는 루틴으로 마무리하세요." },
    ],
    related: meta.related.map(([slug, reason]) => ({ slug, reason })),
    sources: [
      { title: `${seed.nameEn} FCI breed standard`, organization: "Fédération Cynologique Internationale", url: seed.fciUrl, checkedAt },
      ...(seed.akcUrl ? [{ title: `${seed.nameEn} breed profile`, organization: "American Kennel Club", url: seed.akcUrl, checkedAt }] : []),
      ...(historySources[seed.slug] ?? []),
    ],
  };
};

export const detailBatchLSlugs = seeds.map((seed) => seed.slug);
export const detailBatchL = seeds.map(makeBreed) satisfies Breed[];
