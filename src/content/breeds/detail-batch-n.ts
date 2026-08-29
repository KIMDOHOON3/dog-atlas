import type { Breed } from "./schema";
import { withTopicParticle } from "../../lib/korean-particles";

const checkedAt = "2026-08-07";
const historyAltOverrides: Partial<Record<string, string>> = {
  affenpinscher: "남부 독일의 오래된 마구간과 부엌 사이에서 작은 해충의 흔적을 살피는 검은 아펜핀셔를 그린 편집 수채화",
};
const historySources: Partial<Record<string, Breed["sources"]>> = {
  affenpinscher: [{ title: "Affenpinscher Breed History", organization: "American Kennel Club", url: "https://www.akc.org/expert-advice/dog-breeds/affenpinscher-history/", checkedAt: "2026-08-29" }],
};
type Group = "herding" | "guardian-working" | "terrier" | "spitz-primitive" | "scent-hound" | "pointing" | "retriever-spaniel" | "companion" | "sighthound";
type Level = "낮은 편" | "중간" | "높은 편" | "개체별 확인 필요";
type Seed = { slug: string; nameKo: string; nameEn: string; group: Group; origin: string; role: string; size: string; fciUrl: string; akcUrl?: string };
type Meta = { label: string; tags: readonly string[]; colors: [string, string, string]; levels: [Level, Level, Level, Level, Level, Level]; related: [string, string][]; care: [string, string] };

const meta: Record<Group, Meta> = {
  herding: { label: "목양견", tags: ["목양 본능", "협력 학습", "활동적인 일상"], colors: ["#7d725f", "#ded7c9", "#302d29"], levels: ["높은 편", "높은 편", "중간", "높은 편", "중간", "중간"], related: [["border-collie", "목양견의 협력 방식과 집중력을 비교해 보세요."], ["australian-cattle-dog", "가축 관리와 활동성의 차이를 살펴보세요."]], care: ["짧은 훈련과 냄새 찾기 과제를 일상에 나누어 주세요.", "움직임이 많은 날에도 안전한 휴식 루틴을 함께 마련하세요."] },
  "guardian-working": { label: "경비·작업견", tags: ["경비 역할", "체격 관리", "사회화"], colors: ["#806957", "#ded4c4", "#312b27"], levels: ["중간", "높은 편", "개체별 확인 필요", "중간", "높은 편", "중간"], related: [["rottweiler", "보호와 경계 반응의 차이를 비교해 보세요."], ["bernese-mountain-dog", "대형 체격과 일상 관리 조건을 살펴보세요."]], care: ["차분한 방문객 인사와 거리 조절을 반복 연습하세요.", "성장기부터 체중과 관절 부담을 세심하게 관리하세요."] },
  terrier: { label: "테리어", tags: ["작은 사냥감 추적", "끈기 있는 성향", "안전한 탐색"], colors: ["#946f57", "#e3d6c8", "#352e2a"], levels: ["높은 편", "높은 편", "개체별 확인 필요", "중간", "높은 편", "높은 편"], related: [["border-terrier", "작은 테리어의 탐색과 경계 반응을 비교해 보세요."], ["jack-russell-terrier", "추적 욕구를 안전한 과제로 전환하는 방법을 살펴보세요."]], care: ["쫓고 찾는 욕구를 안전한 장난감 과제로 연결하세요.", "털과 발톱 상태를 짧고 자주 확인해 주세요."] },
  "spitz-primitive": { label: "스피츠·원시형", tags: ["독립적인 판단", "감시 본능", "환경 적응"], colors: ["#8b715a", "#e2d8ca", "#332d29"], levels: ["중간", "중간", "높은 편", "개체별 확인 필요", "높은 편", "중간"], related: [["shiba", "독립적인 판단과 사회화 조건을 비교해 보세요."], ["akita", "스피츠 체형과 경계 반응의 차이를 살펴보세요."]], care: ["선택권이 있는 탐색과 호출 연습을 함께 제공하세요.", "더운 날씨와 이중모의 계절 관리에 대비하세요."] },
  "scent-hound": { label: "후각 하운드", tags: ["후각 추적", "지구력", "탐색 과제"], colors: ["#9a7057", "#e4d7c9", "#362d29"], levels: ["높은 편", "높은 편", "중간", "중간", "중간", "중간"], related: [["beagle", "후각 추적과 일상 탐색의 공통점을 비교해 보세요."], ["basset-hound", "체형에 맞는 운동과 관리 조건을 살펴보세요."]], care: ["긴 리드와 안전한 공간에서 냄새 과제를 제공하세요.", "귀와 발 상태를 활동 후 주기적으로 확인하세요."] },
  pointing: { label: "포인팅견", tags: ["사냥감 위치 알림", "집중력", "회수 협력"], colors: ["#ad8366", "#e8ded2", "#3a312c"], levels: ["높은 편", "높은 편", "중간", "높은 편", "중간", "중간"], related: [["english-setter", "포인팅과 사람 협력의 차이를 비교해 보세요."], ["german-short-haired-pointing-dog", "탐색과 회수 과제를 일상에 적용해 보세요."]], care: ["달리기와 멈춤 신호를 안전하게 연결해 주세요.", "관절 부담을 고려해 운동 강도를 천천히 조절하세요."] },
  "retriever-spaniel": { label: "리트리버·스패니얼", tags: ["회수 협력", "사람 중심", "물과 야외 활동"], colors: ["#9a785f", "#e4d8ca", "#372f2a"], levels: ["높은 편", "중간", "낮은 편", "높은 편", "중간", "중간"], related: [["english-springer-spaniel", "회수와 탐색 활동의 차이를 비교해 보세요."], ["golden-retriever", "사람 중심 협력과 체격 조건을 살펴보세요."]], care: ["회수 놀이를 짧은 세트로 나누어 과열을 막아 주세요.", "귀와 피부가 젖은 뒤에는 충분히 말려 주세요."] },
  companion: { label: "반려견", tags: ["사람과 생활", "실내 적응", "섬세한 교감"], colors: ["#9a7d72", "#e6d9d1", "#382d2b"], levels: ["중간", "중간", "낮은 편", "높은 편", "중간", "중간"], related: [["cavalier-king-charles-spaniel", "사람과 함께하는 생활 조건을 비교해 보세요."], ["bichon-frise", "소형 반려견의 교감과 관리 차이를 살펴보세요."]], care: ["짧은 놀이와 휴식을 번갈아 배치해 주세요.", "혼자 있는 시간은 작은 단계로 천천히 연습하세요."] },
  sighthound: { label: "사이트하운드", tags: ["시각 추적", "질주", "온화한 휴식"], colors: ["#8e7667", "#e1d8d0", "#332d2d"], levels: ["높은 편", "중간", "중간", "중간", "중간", "낮은 편"], related: [["whippet", "질주와 휴식의 균형을 비교해 보세요."], ["greyhound", "사이트하운드 체형과 운동 조건을 살펴보세요."]], care: ["안전하게 닫힌 공간에서 짧은 질주를 제공하세요.", "얇은 피모와 관절을 계절별로 보호해 주세요."] },
};

const seeds: Seed[] = [
  { slug: "berger-picard", nameKo: "피카르디 셰퍼드", nameEn: "Berger Picard", group: "herding", origin: "프랑스 피카르디", role: "농장 가축을 모으고 지키는 목양 작업", size: "중형 · 약 55~65cm, 20~30kg", fciUrl: "https://www.fci.be/en/nomenclature/PICARDY-SHEPHERD-DOG-176.html" },
  { slug: "pumi", nameKo: "푸미", nameEn: "Pumi", group: "herding", origin: "헝가리", role: "가축을 몰고 농장 주변을 감시하는 작업", size: "중형 · 약 38~47cm, 8~15kg", fciUrl: "https://www.fci.be/en/nomenclature/PUMI-56.html" },
  { slug: "pyrenean-sheepdog", nameKo: "피레니안 셰퍼드", nameEn: "Pyrenean Sheepdog", group: "herding", origin: "프랑스 피레네", role: "산악 목장에서 양 떼를 빠르게 이동시키는 작업", size: "소형~중형 · 약 40~54cm, 8~15kg", fciUrl: "https://www.fci.be/en/nomenclature/PYRENEAN-SHEEPDOG-141.html" },
  { slug: "lancashire-heeler", nameKo: "랭커셔 힐러", nameEn: "Lancashire Heeler", group: "herding", origin: "영국 랭커셔", role: "소를 몰고 농장의 작은 해충을 관리하는 작업", size: "소형 · 약 25~31cm, 5~8kg", fciUrl: "https://www.fci.be/en/nomenclature/LANCASHIRE-HEELER-360.html" },
  { slug: "saarloos-wolfdog", nameKo: "사르로스 울프도그", nameEn: "Saarloos Wolfdog", group: "herding", origin: "네덜란드", role: "사람과 협력하는 작업견 계통을 연구한 동반·작업", size: "대형 · 약 60~75cm, 30~45kg", fciUrl: "https://www.fci.be/en/nomenclature/SAARLOOS-WOLFDOG-311.html" },
  { slug: "aidi", nameKo: "아이디", nameEn: "Aidi", group: "guardian-working", origin: "모로코 아틀라스 산맥", role: "유목민의 가축과 야영지를 지키는 경비", size: "중형 · 약 52~62cm, 20~30kg", fciUrl: "https://www.fci.be/en/nomenclature/ATLAS-MOUNTAIN-DOG-AIDI-247.html" },
  { slug: "caucasian-shepherd-dog", nameKo: "코카시안 셰퍼드", nameEn: "Caucasian Shepherd Dog", group: "guardian-working", origin: "코카서스 지역", role: "가축과 거주지를 지키는 강건한 경비", size: "대형 · 약 64~75cm, 45~70kg", fciUrl: "https://www.fci.be/en/nomenclature/CAUCASIAN-SHEPHERD-DOG-328.html" },
  { slug: "presa-canario", nameKo: "프레사 카나리오", nameEn: "Presa Canario", group: "guardian-working", origin: "스페인 카나리아 제도", role: "농장 가축을 다루고 재산을 지키는 작업", size: "대형 · 약 56~66cm, 40~65kg", fciUrl: "https://www.fci.be/en/nomenclature/PRESA-CANARIO-346.html" },
  { slug: "black-russian-terrier", nameKo: "블랙 러시안 테리어", nameEn: "Black Russian Terrier", group: "guardian-working", origin: "러시아", role: "시설과 사람을 지키는 군·경비 작업", size: "대형 · 약 66~78cm, 36~60kg", fciUrl: "https://www.fci.be/en/nomenclature/BLACK-RUSSIAN-TERRIER-327.html" },
  { slug: "austrian-pinscher", nameKo: "오스트리안 핀셔", nameEn: "Austrian Pinscher", group: "guardian-working", origin: "오스트리아", role: "농장과 가축 주변을 지키는 다목적 작업", size: "중형 · 약 42~50cm, 12~18kg", fciUrl: "https://www.fci.be/en/nomenclature/AUSTRIAN-PINSCHER-64.html" },
  { slug: "danish-swedish-farmdog", nameKo: "덴마크-스웨디시 팜도그", nameEn: "Danish-Swedish Farmdog", group: "guardian-working", origin: "덴마크·스웨덴", role: "농장의 작은 해충을 관리하고 가족을 알리는 작업", size: "소형 · 약 32~37cm, 6~10kg", fciUrl: "https://www.fci.be/en/nomenclature/DANISH-SWEDISH-FARMDOG-356.html" },
  { slug: "estrela-mountain-dog", nameKo: "에스트렐라 마운틴 도그", nameEn: "Estrela Mountain Dog", group: "guardian-working", origin: "포르투갈 에스트렐라 산맥", role: "산악 목장의 가축을 지키는 경비", size: "대형 · 약 62~72cm, 30~50kg", fciUrl: "https://www.fci.be/en/nomenclature/ESTRELA-MOUNTAIN-DOG-173.html" },
  { slug: "welsh-terrier", nameKo: "웰시 테리어", nameEn: "Welsh Terrier", group: "terrier", origin: "영국 웨일스", role: "여우와 작은 사냥감을 추적하는 작업", size: "중형 · 약 36~39cm, 9~10kg", fciUrl: "https://www.fci.be/en/nomenclature/WELSH-TERRIER-78.html" },
  { slug: "brazilian-terrier", nameKo: "브라질리안 테리어", nameEn: "Brazilian Terrier", group: "terrier", origin: "브라질", role: "농장 주변의 작은 해충을 추적하는 작업", size: "소형~중형 · 약 33~40cm, 7~10kg", fciUrl: "https://www.fci.be/en/nomenclature/BRAZILIAN-TERRIER-341.html" },
  { slug: "english-toy-terrier", nameKo: "잉글리시 토이 테리어", nameEn: "English Toy Terrier", group: "terrier", origin: "영국", role: "도시와 가정의 작은 해충을 관리하는 작업", size: "소형 · 약 25~30cm, 2.7~3.6kg", fciUrl: "https://www.fci.be/en/nomenclature/ENGLISH-TOY-TERRIER-BLACK-AND-TAN-13.html" },
  { slug: "pharaoh-hound", nameKo: "파라오 하운드", nameEn: "Pharaoh Hound", group: "spitz-primitive", origin: "몰타", role: "시각과 후각으로 토끼를 추적하는 사냥", size: "중형 · 약 53~63cm, 18~27kg", fciUrl: "https://www.fci.be/en/nomenclature/PHARAOH-HOUND-248.html" },
  { slug: "ibizan-hound", nameKo: "이비잔 하운드", nameEn: "Ibizan Hound", group: "spitz-primitive", origin: "스페인 발레아레스 제도", role: "토끼를 시각과 후각으로 추적하는 사냥", size: "중형~대형 · 약 56~74cm, 19~25kg", fciUrl: "https://www.fci.be/en/nomenclature/IBIZAN-PODENCO-89.html" },
  { slug: "lapponian-herder", nameKo: "라포니안 허더", nameEn: "Lapponian Herder", group: "spitz-primitive", origin: "핀란드 라플란드", role: "순록을 몰고 북부 목장을 관리하는 작업", size: "중형 · 약 43~54cm, 25~30kg", fciUrl: "https://www.fci.be/en/nomenclature/LAPPONIAN-HERDER-284.html" },
  { slug: "swedish-lapphund", nameKo: "스웨디시 라프훈트", nameEn: "Swedish Lapphund", group: "spitz-primitive", origin: "스웨덴 라플란드", role: "순록 목축과 북부 농장의 감시 작업", size: "중형 · 약 40~51cm, 15~20kg", fciUrl: "https://www.fci.be/en/nomenclature/SWEDISH-LAPPHUND-135.html" },
  { slug: "podenco-canario", nameKo: "포덴코 카나리오", nameEn: "Canarian Warren Hound", group: "spitz-primitive", origin: "스페인 카나리아 제도", role: "섬의 거친 지형에서 토끼를 추적하는 사냥", size: "중형 · 약 55~64cm, 20~25kg", fciUrl: "https://www.fci.be/en/nomenclature/CANARIAN-WARREN-HOUND-329.html" },
  { slug: "austrian-black-and-tan-hound", nameKo: "오스트리안 블랙 앤 탄 하운드", nameEn: "Austrian Black and Tan Hound", group: "scent-hound", origin: "오스트리아", role: "산악 지형에서 사냥감의 냄새를 추적하는 작업", size: "중형 · 약 48~56cm, 15~22kg", fciUrl: "https://www.fci.be/en/nomenclature/AUSTRIAN-BLACK-AND-TAN-HOUND-63.html" },
  { slug: "styrian-coarse-haired-hound", nameKo: "슈타이리셰 코어스헤어드 하운드", nameEn: "Styrian Coarse-haired Hound", group: "scent-hound", origin: "오스트리아 슈타이리아", role: "거친 산악 지형에서 멧돼지와 사냥감을 추적하는 작업", size: "중형 · 약 45~53cm, 15~20kg", fciUrl: "https://www.fci.be/en/nomenclature/STYRIAN-COARSE-HAIRED-HOUND-62.html" },
  { slug: "slovakian-hound", nameKo: "슬로바키안 하운드", nameEn: "Slovakian Hound", group: "scent-hound", origin: "슬로바키아", role: "산림에서 멧돼지의 흔적을 추적하는 작업", size: "중형 · 약 45~50cm, 15~20kg", fciUrl: "https://www.fci.be/en/nomenclature/SLOVAKIAN-HOUND-244.html" },
  { slug: "posavac-hound", nameKo: "포사바츠 하운드", nameEn: "Posavac Hound", group: "scent-hound", origin: "크로아티아 포사비나", role: "숲과 들에서 작은 사냥감을 추적하는 작업", size: "중형 · 약 44~50cm, 16~20kg", fciUrl: "https://www.fci.be/en/nomenclature/POSAVATZ-HOUND-154.html" },
  { slug: "bosnian-broken-haired-hound", nameKo: "보스니안 브로큰헤어드 하운드", nameEn: "Bosnian Broken-haired Hound", group: "scent-hound", origin: "보스니아 헤르체고비나", role: "바위 많은 산악 지형에서 사냥감을 추적하는 작업", size: "중형 · 약 46~56cm, 16~24kg", fciUrl: "https://www.fci.be/en/nomenclature/BOSNIAN-BROKEN-HAIRED-HOUND-155.html" },
  { slug: "serbian-hound", nameKo: "세르비안 하운드", nameEn: "Serbian Hound", group: "scent-hound", origin: "세르비아", role: "발칸의 숲과 들에서 사냥감을 추적하는 작업", size: "중형 · 약 44~54cm, 18~22kg", fciUrl: "https://www.fci.be/en/nomenclature/SERBIAN-HOUND-150.html" },
  { slug: "montenegrin-mountain-hound", nameKo: "몬테네그린 마운틴 하운드", nameEn: "Montenegrin Mountain Hound", group: "scent-hound", origin: "몬테네그로", role: "험한 산악 지형에서 사냥감을 추적하는 작업", size: "중형 · 약 44~54cm, 20~25kg", fciUrl: "https://www.fci.be/en/nomenclature/MONTENEGRIN-MOUNTAIN-HOUND-279.html" },
  { slug: "greek-harehound", nameKo: "그릭 헤어하운드", nameEn: "Greek Harehound", group: "scent-hound", origin: "그리스", role: "산과 들에서 토끼의 냄새를 추적하는 작업", size: "중형 · 약 47~55cm, 17~20kg", fciUrl: "https://www.fci.be/en/nomenclature/GREEK-HAREHOUND-214.html" },
  { slug: "italian-segugio", nameKo: "이탈리안 세구지오", nameEn: "Italian Hound", group: "scent-hound", origin: "이탈리아", role: "산악과 농촌에서 토끼와 멧돼지를 추적하는 작업", size: "중형 · 약 48~58cm, 18~28kg", fciUrl: "https://www.fci.be/en/nomenclature/ITALIAN-SEGUGIO-337.html" },
  { slug: "spanish-hound", nameKo: "스패니시 하운드", nameEn: "Spanish Hound", group: "scent-hound", origin: "스페인", role: "험한 지형에서 작은 사냥감의 냄새를 추적하는 작업", size: "중형 · 약 43~57cm, 20~25kg", fciUrl: "https://www.fci.be/en/nomenclature/SPANISH-HOUND-204.html" },
  { slug: "grand-bleu-de-gascogne", nameKo: "그랑 블루 드 가스코뉴", nameEn: "Grand Bleu de Gascogne", group: "scent-hound", origin: "프랑스 가스코뉴", role: "큰 사냥감을 긴 거리에서 추적하는 무리 사냥", size: "대형 · 약 65~72cm, 30~35kg", fciUrl: "https://www.fci.be/en/nomenclature/GRAND-BLEU-DE-GASCOGNE-22.html" },
  { slug: "basset-bleu-de-gascogne", nameKo: "바셋 블루 드 가스코뉴", nameEn: "Basset Bleu de Gascogne", group: "scent-hound", origin: "프랑스 가스코뉴", role: "낮은 체고로 숲의 작은 사냥감을 추적하는 작업", size: "소형 · 약 34~38cm, 16~18kg", fciUrl: "https://www.fci.be/en/nomenclature/BASSET-BLEU-DE-GASCOGNE-35.html" },
  { slug: "basset-fauve-de-bretagne", nameKo: "바셋 포브 드 브르타뉴", nameEn: "Basset Fauve de Bretagne", group: "scent-hound", origin: "프랑스 브르타뉴", role: "거친 숲에서 토끼와 작은 사냥감을 추적하는 작업", size: "소형 · 약 32~38cm, 14~16kg", fciUrl: "https://www.fci.be/en/nomenclature/BASSET-FAUVE-DE-BRETAGNE-36.html" },
  { slug: "basset-artesien-normand", nameKo: "바셋 아르테지앙 노르망", nameEn: "Basset Artesien Normand", group: "scent-hound", origin: "프랑스 노르망디", role: "낮은 체고로 토끼와 작은 사냥감을 추적하는 작업", size: "소형 · 약 30~36cm, 15~20kg", fciUrl: "https://www.fci.be/en/nomenclature/BASSET-ARTESIEN-NORMAND-34.html" },
  { slug: "poitevin", nameKo: "푸아트뱅", nameEn: "Poitevin", group: "scent-hound", origin: "프랑스 푸아투", role: "사슴과 늑대 같은 큰 사냥감을 무리로 추적하는 작업", size: "대형 · 약 60~70cm, 25~35kg", fciUrl: "https://www.fci.be/en/nomenclature/POITEVIN-24.html" },
  { slug: "hamiltonstovare", nameKo: "해밀턴스퇴바레", nameEn: "Hamiltonstövare", group: "scent-hound", origin: "스웨덴", role: "숲과 설원에서 여우와 토끼를 추적하는 작업", size: "중형 · 약 49~61cm, 23~27kg", fciUrl: "https://www.fci.be/en/nomenclature/HAMILTONSTOVARE-132.html" },
  { slug: "schillerstovare", nameKo: "쉴러 스퇴바레", nameEn: "Schillerstövare", group: "scent-hound", origin: "스웨덴", role: "스칸디나비아 숲에서 토끼와 여우를 추적하는 작업", size: "중형 · 약 46~60cm, 18~25kg", fciUrl: "https://www.fci.be/en/nomenclature/SCHILLERSTOVARE-131.html" },
  { slug: "smaland-hound", nameKo: "스몰란드 하운드", nameEn: "Smålandsstövare", group: "scent-hound", origin: "스웨덴 스몰란드", role: "숲에서 토끼와 여우를 냄새로 추적하는 작업", size: "중형 · 약 42~54cm, 15~20kg", fciUrl: "https://www.fci.be/en/nomenclature/SMALANDSTOVARE-129.html" },
  { slug: "drever", nameKo: "드레버", nameEn: "Drever", group: "scent-hound", origin: "스웨덴", role: "낮은 체고로 사슴과 토끼를 천천히 추적하는 작업", size: "소형~중형 · 약 30~38cm, 14~16kg", fciUrl: "https://www.fci.be/en/nomenclature/DREVER-130.html" },
  { slug: "old-danish-pointer", nameKo: "올드 대니시 포인터", nameEn: "Old Danish Pointer", group: "pointing", origin: "덴마크", role: "들새의 위치를 알리고 회수를 돕는 사냥", size: "중형 · 약 50~60cm, 26~35kg", fciUrl: "https://www.fci.be/en/nomenclature/OLD-DANISH-POINTER-281.html" },
  { slug: "slovakian-wirehaired-pointer", nameKo: "슬로바키안 와이어헤어드 포인터", nameEn: "Slovakian Wirehaired Pointer", group: "pointing", origin: "슬로바키아", role: "산과 습지에서 사냥감을 찾고 회수하는 작업", size: "중형~대형 · 약 57~68cm, 25~35kg", fciUrl: "https://www.fci.be/en/nomenclature/SLOVAKIAN-WIRE-HAIRED-POINTER-320.html" },
  { slug: "burgos-pointer", nameKo: "부르고스 포인터", nameEn: "Burgos Pointer", group: "pointing", origin: "스페인 카스티야", role: "들새와 작은 사냥감의 위치를 알리는 사냥", size: "중형~대형 · 약 59~67cm, 25~30kg", fciUrl: "https://www.fci.be/en/nomenclature/BURGOS-POINTER-90.html" },
  { slug: "picardy-spaniel", nameKo: "피카르디 스패니얼", nameEn: "Picardy Spaniel", group: "pointing", origin: "프랑스 피카르디", role: "습지와 들에서 들새를 찾고 회수하는 작업", size: "중형 · 약 55~60cm, 20~25kg", fciUrl: "https://www.fci.be/en/nomenclature/PICARDY-SPANIEL-108.html" },
  { slug: "pont-audemer-spaniel", nameKo: "퐁 오데메르 스패니얼", nameEn: "Pont-Audemer Spaniel", group: "pointing", origin: "프랑스 노르망디", role: "습지에서 물새를 찾고 회수하는 작업", size: "중형 · 약 52~58cm, 18~24kg", fciUrl: "https://www.fci.be/en/nomenclature/PONT-AUDEMER-SPANIEL-114.html" },
  { slug: "stabyhoun", nameKo: "스타비하운", nameEn: "Stabyhoun", group: "pointing", origin: "네덜란드 프리슬란트", role: "들새를 찾고 작은 사냥감을 회수하는 작업", size: "중형 · 약 48~53cm, 18~25kg", fciUrl: "https://www.fci.be/en/nomenclature/STABIJHOUN-222.html" },
  { slug: "welsh-springer-spaniel", nameKo: "웰시 스프링어 스패니얼", nameEn: "Welsh Springer Spaniel", group: "retriever-spaniel", origin: "영국 웨일스", role: "덤불 속 들새를 찾아 몰아내고 회수하는 작업", size: "중형 · 약 43~48cm, 16~20kg", fciUrl: "https://www.fci.be/en/nomenclature/WELSH-SPRINGER-SPANIEL-126.html" },
  { slug: "affenpinscher", nameKo: "아펜핀셔", nameEn: "Affenpinscher", group: "companion", origin: "독일", role: "가정과 마구간의 작은 해충을 관리하는 동반 작업", size: "소형 · 약 25~30cm, 4~6kg", fciUrl: "https://www.fci.be/Nomenclature/Standards/186g02-en.pdf", akcUrl: "https://www.akc.org/dog-breeds/affenpinscher/" },
  { slug: "kromfohrlander", nameKo: "크롬포어랜더", nameEn: "Kromfohrländer", group: "companion", origin: "독일", role: "사람 곁에서 생활하며 가정에 적응하는 동반", size: "소형~중형 · 약 38~46cm, 9~16kg", fciUrl: "https://www.fci.be/en/nomenclature/KROMFOHRLANDER-192.html" },
  { slug: "biewer-terrier", nameKo: "비버 테리어", nameEn: "Biewer Terrier", group: "companion", origin: "독일", role: "가정에서 사람과 교감하는 소형 동반", size: "소형 · 약 18~28cm, 2~4kg", fciUrl: "https://www.fci.be/en/nomenclature/BIEWER-TERRIER.html" },
  { slug: "polish-greyhound", nameKo: "폴리시 그레이하운드", nameEn: "Polish Greyhound", group: "sighthound", origin: "폴란드", role: "넓은 들에서 시각으로 사냥감을 추적하는 질주", size: "대형 · 약 68~80cm, 27~31kg", fciUrl: "https://www.fci.be/en/nomenclature/POLISH-GREYHOUND-333.html" },
];

const roleHome: Record<Group, string> = {
  herding: "목양 작업의 배경은 오늘날 움직임과 협력 학습, 환경 읽기 과제로 이어질 수 있습니다.",
  "guardian-working": "경비와 작업의 배경은 차분한 경계 연습과 체격에 맞는 일상 관리로 연결됩니다.",
  terrier: "작은 사냥감 추적의 배경은 안전한 탐색과 짧고 반복적인 과제로 전환할 수 있습니다.",
  "spitz-primitive": "원시형 작업의 배경은 선택권이 있는 탐색과 예측 가능한 사회화로 이어질 수 있습니다.",
  "scent-hound": "후각 추적의 배경은 냄새 과제와 안전한 이동 루틴으로 일상에 적용할 수 있습니다.",
  pointing: "포인팅 작업의 배경은 찾기·멈추기·회수 신호를 안전한 놀이로 연결하는 데 참고가 됩니다.",
  "retriever-spaniel": "회수 작업의 배경은 사람과 협력하는 짧은 놀이와 물기 관리로 이어질 수 있습니다.",
  companion: "동반견의 배경은 사람과 함께하는 생활 리듬과 혼자 있는 시간의 단계적 연습으로 이어집니다.",
  sighthound: "시각 추적과 질주의 배경은 안전한 공간의 짧은 운동과 충분한 휴식으로 연결됩니다.",
};

const makeBreed = (seed: Seed): Breed => {
  const m = meta[seed.group];
  return {
    slug: seed.slug,
    contentStatus: "mvp-editorial-draft",
    nameKo: seed.nameKo,
    nameEn: seed.nameEn,
    tagline: `${withTopicParticle(seed.nameKo)} ${seed.role}이라는 역사적 배경을 지녔으며, 오늘의 생활에서는 개체 차이와 환경을 함께 살펴야 합니다.`,
    palette: { primary: m.colors[0], secondary: m.colors[1], ink: m.colors[2] },
    illustration: `/illustrations/v2/${seed.slug}-card.webp`,
    catalog: { group: seed.group, discoveryTags: [...m.tags, seed.origin] },
    historyVisual: { src: `/illustrations/v3/${seed.slug}-history.webp`, alt: historyAltOverrides[seed.slug] ?? `${seed.nameKo}의 기원과 원래 역할을 보여 주는 편집 초안 역사 장면` },
    identity: { origin: seed.origin, lineage: `${seed.origin}의 ${m.label} 계통에서 발전한 품종`, originalRole: seed.role, size: seed.size, lifespan: "개체와 생활 환경에 따라 달라지므로 공식 자료와 수의학적 상담을 함께 확인하세요." },
    behaviorClues: {
      originalRole: `${withTopicParticle(seed.nameKo)} ${seed.role}이라는 역할과 환경 속에서 형성되었습니다. 과거의 역할이 현재 개체의 행동을 보장하지는 않지만 생활 과제를 설계할 때 참고가 될 수 있습니다.`,
      today: `오늘날에는 ${seed.role}과 연결된 욕구를 안전한 놀이와 짧은 훈련으로 전환할 수 있습니다. 반응과 회복 속도는 개체마다 다릅니다.`,
      guardianContext: `${seed.nameKo}의 ${seed.size} 체격과 생활 환경을 고려해 운동, 휴식, 사회화, 안전 관리를 함께 계획해야 합니다.`,
    },
    story: {
      opening: `${withTopicParticle(seed.nameKo)} ${seed.origin}에서 ${seed.role}이라는 역사적 배경과 함께 발전했습니다. 이름이나 외형만으로 생활 적합성을 단정하기보다 형성 배경과 개체의 신호를 함께 살펴보세요.`,
      roleToHome: roleHome[seed.group],
      reality: `품종의 경향은 개별 성격을 보장하지 않습니다. ${seed.nameKo}와 함께하려면 ${seed.size}에 맞는 공간과 일상, 건강 상태, 보호자의 경험을 함께 고려하는 준비가 필요합니다.`,
    },
    tendencies: {
      activity: { label: m.levels[0], note: "짧은 운동과 휴식 시간을 균형 있게 구성하고 개체의 회복 신호를 관찰하세요." },
      mentalStimulation: { label: m.levels[1], note: "냄새 찾기와 간단한 문제 해결 과제를 생활 속에 나누어 제공하세요." },
      independence: { label: m.levels[2], note: "혼자 있는 시간과 보호자와 함께하는 시간을 무리 없이 단계적으로 연습하세요." },
      socialConnection: { label: m.levels[3], note: "낯선 사람과 동물에 대한 반응을 살피며 안전한 거리에서 사회화를 진행하세요." },
      alerting: { label: m.levels[4], note: "주변 자극에 대한 반응은 환경과 경험에 따라 달라지므로 차분한 회복을 도와주세요." },
      grooming: { label: m.levels[5], note: "피모와 발톱, 귀 상태를 정기적으로 확인하고 필요한 관리 루틴을 준비하세요." },
    },
    careNotes: m.care,
    healthEditorialNote: "건강 항목은 품종 경향을 소개하는 편집 초안이며, 진단이나 개체의 예후를 대신하지 않습니다. 이상 신호는 수의사에게 확인하세요.",
    daySnapshot: [
      { time: "아침", title: "몸 상태 확인", description: "산책 전 호흡과 관절 움직임을 살피고 짧은 냄새 과제로 하루를 시작하세요." },
      { time: "낮", title: "탐색과 휴식", description: "환경에 맞는 놀이와 충분한 휴식을 번갈아 제공해 과도한 자극을 피하세요." },
      { time: "저녁", title: "차분한 마무리", description: "간단한 신호 연습과 부드러운 빗질로 하루의 회복 루틴을 만들어 주세요." },
    ],
    related: m.related.map(([slug, reason]) => ({ slug, reason })),
    sources: [
      { title: `${seed.nameEn} FCI breed standard`, organization: "Fédération Cynologique Internationale", url: seed.fciUrl, checkedAt },
      ...(seed.akcUrl ? [{ title: `${seed.nameEn} Dog Breed Information`, organization: "American Kennel Club", url: seed.akcUrl, checkedAt }] : []),
      ...(historySources[seed.slug] ?? []),
    ],
  };
};

export const detailBatchNSlugs = seeds.map((seed) => seed.slug);
export const detailBatchN = seeds.map(makeBreed) satisfies Breed[];
