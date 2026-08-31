import type { Breed } from "./schema";
import { withTopicParticle } from "../../lib/korean-particles";

const historySources: Partial<Record<string, Breed["sources"]>> = {
  komondor: [{ title: "Komondor FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/053g01-en.pdf", checkedAt: "2026-08-29" }],
  "catalan-sheepdog": [{ title: "Catalan Sheepdog FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/087g01-en.pdf", checkedAt: "2026-08-31" }],
  "croatian-sheepdog": [{ title: "Croatian Shepherd Dog FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/277g01-en.pdf", checkedAt: "2026-08-31" }],
  kuvasz: [{ title: "Kuvasz FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/054g01-en.pdf", checkedAt: "2026-08-31" }],
  schapendoes: [{ title: "Schapendoes FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/313g01-en.pdf", checkedAt: "2026-08-31" }],
  "portuguese-sheepdog": [{ title: "Portuguese Sheepdog FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/093g01-en.pdf", checkedAt: "2026-08-31" }],
  "maremma-sheepdog": [{ title: "Maremma and Abruzzo Shepherd Dog FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/201g01-en.pdf", checkedAt: "2026-08-31" }],
  "polish-tatra-sheepdog": [{ title: "Tatra Shepherd Dog FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/252g01-en.pdf", checkedAt: "2026-08-31" }],
  "romanian-mioritic-shepherd-dog": [{ title: "Romanian Mioritic Shepherd Dog FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/349g01-en.pdf", checkedAt: "2026-08-31" }],
  "romanian-carpathian-shepherd-dog": [{ title: "Romanian Carpathian Shepherd Dog FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/350g01-en.pdf", checkedAt: "2026-08-31" }],
  broholmer: [{ title: "Broholmer FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/315g02-en.pdf", checkedAt: "2026-08-31" }],
  "fila-brasileiro": [{ title: "Fila Brasileiro FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/225g02-en.pdf", checkedAt: "2026-08-31" }],
  hovawart: [{ title: "Hovawart FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/190g02-en.pdf", checkedAt: "2026-08-31" }],
  landseer: [{ title: "Landseer FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/226g02-en.pdf", checkedAt: "2026-08-31" }],
  "pyrenean-mastiff": [{ title: "Pyrenean Mastiff FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/092g02-en.pdf", checkedAt: "2026-08-31" }],
  sarplaninac: [{ title: "Sarplaninac FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/041g02-en.pdf", checkedAt: "2026-08-31" }],
  tosa: [{ title: "Tosa FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/260g02-en.pdf", checkedAt: "2026-08-31" }],
  tornjak: [{ title: "Tornjak FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/355g02-en.pdf", checkedAt: "2026-08-31" }],
  "central-asian-shepherd-dog": [{ title: "Central Asian Shepherd Dog FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/335g02-en.pdf", checkedAt: "2026-08-31" }],
  "spanish-mastiff": [{ title: "Spanish Mastiff FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/091g02-en.pdf", checkedAt: "2026-08-31" }],
  "australian-terrier": [{ title: "Australian Terrier FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/008g03-en.pdf", checkedAt: "2026-08-31" }],
  "irish-terrier": [{ title: "Irish Terrier FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/139g03-en.pdf", checkedAt: "2026-08-31" }],
  "lakeland-terrier": [{ title: "Lakeland Terrier FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/070g03-en.pdf", checkedAt: "2026-08-31" }],
  "skye-terrier": [{ title: "Skye Terrier FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/075g03-en.pdf", checkedAt: "2026-08-31" }],
  "dandie-dinmont-terrier": [{ title: "Dandie Dinmont Terrier FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/168g03-en.pdf", checkedAt: "2026-08-31" }],
  "glen-of-imaal-terrier": [{ title: "Glen of Imaal Terrier FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/302g03-en.pdf", checkedAt: "2026-08-31" }],
  "japanese-terrier": [{ title: "Japanese Terrier FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/259g03-en.pdf", checkedAt: "2026-08-31" }],
  "german-hunting-terrier": [{ title: "German Hunting Terrier FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/103g03-en.pdf", checkedAt: "2026-08-31" }],
  "norwegian-buhund": [{ title: "Norwegian Buhund FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/237g05-en.pdf", checkedAt: "2026-08-31" }],
  "russian-european-laika": [{ title: "Russian-European Laika FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/304g05-en.pdf", checkedAt: "2026-08-31" }],
  "east-siberian-laika": [{ title: "East-Siberian Laika FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/305g05-en.pdf", checkedAt: "2026-08-31" }],
  "west-siberian-laika": [{ title: "West-Siberian Laika FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/306g05-en.pdf", checkedAt: "2026-08-31" }],
  norrbottenspets: [{ title: "Norrbottenspets FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/276g05-en.pdf", checkedAt: "2026-08-31" }],
  jamthund: [{ title: "Jämthund FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/042g05-en.pdf", checkedAt: "2026-08-31" }],
  ariegeois: [{ title: "Ariégeois FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/020g06-en.pdf", checkedAt: "2026-08-31" }],
  "anglo-francais-de-petite-venerie": [{ title: "Anglo-Français de Petite Vénerie FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/325g06-en.pdf", checkedAt: "2026-08-31" }],
  billy: [{ title: "Billy FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/025g06-en.pdf", checkedAt: "2026-08-31" }],
  "briquet-griffon-vendeen": [{ title: "Briquet Griffon Vendéen FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/019g06-en.pdf", checkedAt: "2026-08-31" }],
  dunker: [{ title: "Dunker FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/203g06-en.pdf", checkedAt: "2026-08-31" }],
  "halden-hound": [{ title: "Halden Hound FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/267g06-en.pdf", checkedAt: "2026-08-31" }],
  "hygen-hound": [{ title: "Hygen Hound FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/266g06-en.pdf", checkedAt: "2026-08-31" }],
  "transylvanian-hound": [{ title: "Transylvanian Scent Hound FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/241g06-en.pdf", checkedAt: "2026-08-31" }],
  "tyrolean-hound": [{ title: "Tyrolean Hound FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/068g06-en.pdf", checkedAt: "2026-08-31" }],
  "braque-francais-type-gascogne": [{ title: "French Pointing Dog Gascogne Type FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/133g07-en.pdf", checkedAt: "2026-08-31" }],
  "braque-d-auvergne": [{ title: "Auvergne Pointer FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/180g07-en.pdf", checkedAt: "2026-08-31" }],
  "german-stichelhaar": [{ title: "Deutsch Stichelhaar FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/232g07-en.pdf", checkedAt: "2026-08-31" }],
  "spinone-italiano": [{ title: "Spinone Italiano FCI breed standard PDF", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/165g07-en.pdf", checkedAt: "2026-08-31" }],
};

const checkedAt = "2026-08-06";
type Group = "herding" | "guardian-working" | "terrier" | "spitz-primitive" | "scent-hound" | "pointing";
type Level = "낮은 편" | "중간" | "높은 편" | "개체별 확인 필요";
type Seed = { slug: string; nameKo: string; nameEn: string; group: Group; origin: string; role: string; size: string; fciUrl: string };

const meta: Record<Group, {
  label: string; tags: string[]; colors: [string, string, string]; levels: [Level, Level, Level, Level, Level, Level];
  related: [string, string][]; care: [string, string];
}> = {
  herding: {
    label: "목양견", tags: ["목양 본능", "협력 학습", "활동적인 일상"], colors: ["#7d725f", "#ded7c9", "#302d29"],
    levels: ["높은 편", "높은 편", "중간", "높은 편", "중간", "중간"], related: [["border-collie", "목양견의 협력 방식과 움직임을 비교해 보세요."], ["australian-cattle-dog", "가축 관리와 활동량의 차이를 살펴보세요."]], care: ["움직임과 냄새 찾기 과제를 짧게 나누어 제공하세요.", "몰이 행동은 안전한 대체 과제로 전환하세요."],
  },
  "guardian-working": {
    label: "경비·작업견", tags: ["경비 역할", "체격 관리", "사회화"], colors: ["#806957", "#ded4c4", "#312b27"],
    levels: ["중간", "높은 편", "개체별 확인 필요", "중간", "높은 편", "중간"], related: [["rottweiler", "보호자 협력과 경계 반응의 차이를 비교해 보세요."], ["bernese-mountain-dog", "대형견의 체격과 일상 관리 조건을 살펴보세요."]], care: ["차분한 방문객 인사와 거리 조절을 반복하세요.", "성장기부터 관절 부담과 체중을 관리하세요."],
  },
  terrier: {
    label: "테리어", tags: ["작은 사냥감 추적", "대담한 성향", "탐색 놀이"], colors: ["#946f57", "#e3d6c8", "#352e2a"],
    levels: ["높은 편", "높은 편", "개체별 확인 필요", "중간", "높은 편", "낮은 편"], related: [["border-terrier", "작은 테리어의 탐색과 경계 반응을 비교해 보세요."], ["jack-russell-terrier", "추적 욕구를 안전한 놀이로 전환해 보세요."]], care: ["쫓고 파는 욕구를 냄새 과제로 연결하세요.", "흥분이 올라가기 전 짧은 회복 시간을 넣으세요."],
  },
  "spitz-primitive": {
    label: "스피츠·원시형", tags: ["독립적인 판단", "원시형 계통", "환경 적응"], colors: ["#8b715a", "#e2d8ca", "#332d29"],
    levels: ["높은 편", "중간", "높은 편", "개체별 확인 필요", "높은 편", "중간"], related: [["shiba", "독립적인 판단과 사회화 조건을 비교해 보세요."], ["akita", "스피츠 체형과 경계 반응의 차이를 살펴보세요."]], care: ["선택권이 있는 탐색 산책을 제공하세요.", "이중 리드와 문단속으로 이탈을 예방하세요."],
  },
  "scent-hound": {
    label: "후각 하운드", tags: ["후각 추적", "지구력", "탐색 과제"], colors: ["#9a7057", "#e4d7c9", "#362d29"],
    levels: ["높은 편", "높은 편", "중간", "중간", "중간", "낮은 편"], related: [["beagle", "후각 추적과 일상 탐색의 공통점을 비교해 보세요."], ["basset-hound", "체형에 맞는 산책과 관절 관리 조건을 살펴보세요."]], care: ["긴 줄을 사용할 수 있는 안전한 공간을 고르세요.", "귀·발·체중을 정기적으로 확인하세요."],
  },
  pointing: {
    label: "포인팅견", tags: ["사냥감 위치 알림", "집중력", "회수 협력"], colors: ["#ad8366", "#e8ded2", "#3a312c"],
    levels: ["높은 편", "높은 편", "중간", "높은 편", "중간", "중간"], related: [["english-setter", "포인팅과 사람 협력의 차이를 비교해 보세요."], ["german-short-haired-pointing-dog", "탐색·회수 과제를 일상에 적용해 보세요."]], care: ["찾기·멈추기·회수 과제를 나누어 제공하세요.", "달리기와 충동 조절, 회복을 함께 연습하세요."],
  },
};

const seeds: Seed[] = [
  { slug: "catalan-sheepdog", nameKo: "카탈란 셰퍼드", nameEn: "Catalan Sheepdog", group: "herding", origin: "스페인 카탈루냐", role: "산악 목초지에서 양 떼를 모으고 지키는 작업", size: "중형 · 암컷 45~53cm, 수컷 47~55cm, FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/CATALAN-SHEEPDOG-87.html" },
  { slug: "croatian-sheepdog", nameKo: "크로아티안 셰퍼드", nameEn: "Croatian Sheepdog", group: "herding", origin: "크로아티아", role: "농장의 가축을 몰고 주변을 경계하는 작업", size: "중형 · 암컷 43~48cm, 수컷 45~50cm(우수한 타입 ±3cm), FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/CROATIAN-SHEPHERD-DOG-277.html" },
  { slug: "komondor", nameKo: "코몬도르", nameEn: "Komondor", group: "herding", origin: "헝가리", role: "목초지의 가축을 포식자로부터 지키는 보호", size: "대형 · 약 65~80cm, 40~60kg", fciUrl: "https://www.fci.be/en/nomenclature/KOMONDOR-53.html" },
  { slug: "kuvasz", nameKo: "쿠바스", nameEn: "Kuvasz", group: "herding", origin: "헝가리", role: "가축과 영지를 지키는 야간 경비", size: "대형 · 암컷 66~70cm·37~50kg, 수컷 71~76cm·48~62kg", fciUrl: "https://www.fci.be/en/nomenclature/KUVASZ-54.html" },
  { slug: "schapendoes", nameKo: "샤펜도스", nameEn: "Schapendoes", group: "herding", origin: "네덜란드", role: "목초지에서 양 떼를 모으는 민첩한 작업", size: "중형 · 암컷 40~47cm, 수컷 43~50cm, FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/SCHAPENDOES-313.html" },
  { slug: "portuguese-sheepdog", nameKo: "포르투기즈 셰퍼드", nameEn: "Portuguese Sheepdog", group: "herding", origin: "포르투갈", role: "가축을 몰고 농장 주변을 관리하는 작업", size: "중형 · 암컷 42~52cm, 수컷 45~55cm, 17~27kg", fciUrl: "https://www.fci.be/en/nomenclature/PORTUGUESE-SHEEPDOG-93.html" },
  { slug: "maremma-sheepdog", nameKo: "마렘마 앤 아브루초 셰퍼드", nameEn: "Maremma and Abruzzo Shepherd Dog", group: "herding", origin: "이탈리아", role: "양 떼를 대형 포식자로부터 지키는 보호", size: "대형 · 암컷 62~70cm·35~45kg, 수컷 67~73.5cm·40~52kg", fciUrl: "https://www.fci.be/en/nomenclature/MAREMMA-AND-ABRUZZES-SHEEPDOG-201.html" },
  { slug: "polish-tatra-sheepdog", nameKo: "폴리시 타트라 셰퍼드", nameEn: "Tatra Shepherd Dog", group: "herding", origin: "폴란드 타트라", role: "산악 목초지에서 양 떼를 포식자로부터 지키는 보호", size: "대형 · 암컷 60~65cm, 수컷 65~70cm, FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/TATRA-SHEPHERD-DOG-252.html" },
  { slug: "romanian-mioritic-shepherd-dog", nameKo: "루마니안 미오리틱 셰퍼드", nameEn: "Romanian Mioritic Shepherd Dog", group: "herding", origin: "루마니아", role: "카르파티아 목초지에서 가축을 큰 포식자로부터 지키는 보호", size: "대형 · 암컷 최소 65cm(이상적 70cm), 수컷 최소 70cm(이상적 75cm), 몸무게는 체격에 비례", fciUrl: "https://www.fci.be/en/nomenclature/ROMANIAN-MIORITIC-SHEPHERD-DOG-349.html" },
  { slug: "romanian-carpathian-shepherd-dog", nameKo: "루마니안 카르파티안 셰퍼드", nameEn: "Romanian Carpathian Shepherd Dog", group: "herding", origin: "루마니아 카르파티아", role: "산악 가축 무리를 포식자로부터 지키는 보호", size: "대형 · 암컷 이상적 59~67cm(±2cm), 수컷 65~73cm(±2cm), 몸무게는 체격에 비례", fciUrl: "https://www.fci.be/en/nomenclature/ROMANIAN-CARPATHIAN-SHEPHERD-DOG-350.html" },
  { slug: "broholmer", nameKo: "브로홀머", nameEn: "Broholmer", group: "guardian-working", origin: "덴마크", role: "중세 사슴 사냥 뒤 영지와 큰 농장을 지키는 경비", size: "대형 · 암컷 약 70cm·40~60kg, 수컷 약 75cm·50~70kg", fciUrl: "https://www.fci.be/en/nomenclature/BROHOLMER-315.html" },
  { slug: "fila-brasileiro", nameKo: "필라 브라질레이로", nameEn: "Fila Brasileiro", group: "guardian-working", origin: "브라질", role: "농장 가축 관리와 영지 경비", size: "대형 · 암컷 60~70cm·40kg 이상, 수컷 65~75cm·50kg 이상", fciUrl: "https://www.fci.be/en/nomenclature/FILA-BRASILEIRO-225.html" },
  { slug: "hovawart", nameKo: "호바바르트", nameEn: "Hovawart", group: "guardian-working", origin: "독일", role: "농장·영지 경비에서 구조·추적까지 이어진 다목적 작업", size: "대형 · 암컷 58~65cm, 수컷 63~70cm, FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/HOVAWART-190.html" },
  { slug: "landseer", nameKo: "랜드시어", nameEn: "Landseer", group: "guardian-working", origin: "독일·스위스", role: "경비와 동반", size: "대형 · 암컷 67~72cm, 수컷 72~80cm, FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/LANDSEER-EUROPEAN-CONTINENTAL-TYPE-226.html" },
  { slug: "pyrenean-mastiff", nameKo: "피레니안 마스티프", nameEn: "Pyrenean Mastiff", group: "guardian-working", origin: "스페인 피레네", role: "가축 무리를 늑대와 곰으로부터 지키는 산악 보호", size: "대형 · 암컷 최소 72cm(권장 75cm 초과), 수컷 최소 77cm(권장 81cm 초과), FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/PYRENEAN-MASTIFF-92.html" },
  { slug: "sarplaninac", nameKo: "샤르플라니나츠", nameEn: "Sarplaninac", group: "guardian-working", origin: "샤르 산맥", role: "가축 무리를 포식자로부터 지키는 보호", size: "대형 · 암컷 평균 58cm(최소 54cm)·30~40kg, 수컷 평균 62cm(최소 56cm)·35~45kg", fciUrl: "https://www.fci.be/en/nomenclature/SHARPLANINA-SHEPHERD-DOG-41.html" },
  { slug: "tosa", nameKo: "도사", nameEn: "Tosa", group: "guardian-working", origin: "일본", role: "역사적 투견 계통에서 형성된 오늘의 경비", size: "대형 · 암컷 최소 55cm, 수컷 최소 60cm, FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/TOSA-260.html" },
  { slug: "tornjak", nameKo: "토르냐크", nameEn: "Tornjak", group: "guardian-working", origin: "보스니아·헤르체고비나·크로아티아", role: "산악 목초지의 가축과 농장을 지키는 보호", size: "대형 · 암컷 60~65cm(±2cm), 수컷 65~70cm(±2cm), FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/TORNJAK-355.html" },
  { slug: "central-asian-shepherd-dog", nameKo: "센트럴 아시안 셰퍼드", nameEn: "Central Asian Shepherd Dog", group: "guardian-working", origin: "중앙아시아", role: "유목 가축·카라반 행렬·거처를 지키는 보호", size: "대형 · 암컷 65cm·40kg 이상, 수컷 70cm·50kg 이상", fciUrl: "https://www.fci.be/en/nomenclature/CENTRAL-ASIA-SHEPHERD-DOG-335.html" },
  { slug: "spanish-mastiff", nameKo: "스패니시 마스티프", nameEn: "Spanish Mastiff", group: "guardian-working", origin: "스페인", role: "계절 이동하는 양 떼를 포식자로부터 지키는 보호", size: "대형 · 암컷 최소 72cm(권장 75cm 초과), 수컷 최소 77cm(권장 80cm 초과), FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/SPANISH-MASTIFF-91.html" },
  { slug: "australian-terrier", nameKo: "오스트레일리안 테리어", nameEn: "Australian Terrier", group: "terrier", origin: "오스트레일리아", role: "개척지의 일손·경계·동반을 함께 맡는 작업", size: "소형 · 수컷 약 25cm·6.5kg, 암컷은 조금 작음", fciUrl: "https://www.fci.be/en/nomenclature/AUSTRALIAN-TERRIER-8.html" },
  { slug: "irish-terrier", nameKo: "아이리시 테리어", nameEn: "Irish Terrier", group: "terrier", origin: "아일랜드", role: "농장 경계·사냥과 전쟁 전령을 맡는 다목적 작업", size: "중형 · 약 45.5cm, 암컷 11.4kg, 수컷 12.25kg", fciUrl: "https://www.fci.be/en/nomenclature/IRISH-TERRIER-139.html" },
  { slug: "lakeland-terrier", nameKo: "레이클랜드 테리어", nameEn: "Lakeland Terrier", group: "terrier", origin: "영국 레이크 디스트릭트", role: "바위산에서 양을 노리는 여우를 추적", size: "소형 · 37cm 이하, 암컷 6.8kg, 수컷 7.7kg", fciUrl: "https://www.fci.be/en/nomenclature/LAKELAND-TERRIER-70.html" },
  { slug: "skye-terrier", nameKo: "스카이 테리어", nameEn: "Skye Terrier", group: "terrier", origin: "스코틀랜드 서부 제도", role: "바위틈과 굴에서 작은 사냥감을 추적", size: "소형 · 수컷 이상적 25~26cm, 암컷은 조금 작음, FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/SKYE-TERRIER-75.html" },
  { slug: "dandie-dinmont-terrier", nameKo: "댄디 딘몬트 테리어", nameEn: "Dandie Dinmont Terrier", group: "terrier", origin: "스코틀랜드", role: "오소리와 수달을 추적", size: "소형 · FCI 고정 체고 없음, 작업 상태 8~11kg", fciUrl: "https://www.fci.be/en/nomenclature/DANDIE-DINMONT-TERRIER-168.html" },
  { slug: "glen-of-imaal-terrier", nameKo: "글렌 오브 이말 테리어", nameEn: "Glen of Imaal Terrier", group: "terrier", origin: "아일랜드 위클로", role: "오소리·여우·쥐를 상대하고 농가 회전바퀴를 돌리는 작업", size: "중소형 · 수컷 35.5cm 이하·16kg, 암컷은 알맞게 작음", fciUrl: "https://www.fci.be/en/nomenclature/GLEN-OF-IMAAL-TERRIER-302.html" },
  { slug: "japanese-terrier", nameKo: "재패니즈 테리어", nameEn: "Japanese Terrier", group: "terrier", origin: "일본", role: "항구 도시에서 사람 곁을 지킨 무릎개", size: "소형 · 약 30~33cm, FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/JAPANESE-TERRIER-259.html" },
  { slug: "german-hunting-terrier", nameKo: "저먼 헌팅 테리어", nameEn: "German Hunting Terrier", group: "terrier", origin: "독일", role: "굴 사냥·덤불 몰이·물 작업을 맡는 다목적 사냥", size: "소형 · 암수 33~40cm, 몸무게는 체격에 비례", fciUrl: "https://www.fci.be/en/nomenclature/GERMAN-HUNTING-TERRIER-103.html" },
  { slug: "norwegian-buhund", nameKo: "노르웨이안 부훈트", nameEn: "Norwegian Buhund", group: "spitz-primitive", origin: "노르웨이", role: "농장의 가축 몰이와 집·마당 경계", size: "중형 · 암컷 41~45cm·약 12~16kg, 수컷 43~47cm·약 14~18kg", fciUrl: "https://www.fci.be/en/nomenclature/NORWEGIAN-BUHUND-237.html" },
  { slug: "russian-european-laika", nameKo: "러시안 유러피안 라이카", nameEn: "Russian-European Laika", group: "spitz-primitive", origin: "러시아 유럽 산림", role: "숲의 여러 사냥감을 찾아 위치를 알리는 작업", size: "중형 · 암컷 48~54cm, 수컷 52~58cm, FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/RUSSO-EUROPEAN-LAIKA-304.html" },
  { slug: "east-siberian-laika", nameKo: "이스트 시베리안 라이카", nameEn: "East Siberian Laika", group: "spitz-primitive", origin: "동·중부 시베리아", role: "타이가와 산지에서 큰 사냥감을 특히 찾는 작업", size: "중형 · 암컷 53~60cm, 수컷 57~64cm, FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/EAST-SIBERIAN-LAIKA-305.html" },
  { slug: "west-siberian-laika", nameKo: "웨스트 시베리안 라이카", nameEn: "West Siberian Laika", group: "spitz-primitive", origin: "우랄·서시베리아", role: "깃털·털 달린 사냥감을 모두 찾는 산림 사냥", size: "중형 · 암컷 51~58cm, 수컷 55~62cm, FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/WEST-SIBERIAN-LAIKA-306.html" },
  { slug: "norrbottenspets", nameKo: "노르보텐스펫츠", nameEn: "Norrbottenspets", group: "spitz-primitive", origin: "스웨덴 북보텐", role: "큰 숲새와 모피 동물을 찾아 위치를 알리는 사냥", size: "소형~중형 · 암컷 이상적 42cm(±2cm), 수컷 이상적 45cm(±2cm), FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/NORRBOTTENSPETS-276.html" },
  { slug: "jamthund", nameKo: "얌트훈트", nameEn: "Jämthund", group: "spitz-primitive", origin: "스웨덴", role: "엘크를 멈춰 세우고 위치를 오래 알리는 사냥", size: "대형 · 암컷 52~60cm(이상적 56cm), 수컷 57~65cm(이상적 61cm), FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/JAMTHUND-42.html" },
  { slug: "ariegeois", nameKo: "아리에주아", nameEn: "Ariégeois", group: "scent-hound", origin: "프랑스 아리에주", role: "험지에서 산토끼를 중심으로 노루·멧돼지를 추적", size: "중형 · 암컷 50~56cm, 수컷 52~58cm, FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/ARIEGEOIS-20.html" },
  { slug: "anglo-francais-de-petite-venerie", nameKo: "앙글로 프랑세 드 프티트 베네리", nameEn: "Anglo-Français de Petite Vénerie", group: "scent-hound", origin: "프랑스", role: "작은 사냥감을 냄새로 잇는 무리 사냥", size: "중형 · 48~56cm(예외 허용 ±2cm), FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/ANGLO-FRANCAIS-DE-PETITE-VENERIE-325.html" },
  { slug: "billy", nameKo: "빌리", nameEn: "Billy", group: "scent-hound", origin: "프랑스", role: "큰 사냥감을 긴 거리에서 추적하는 무리 사냥", size: "대형 · 암컷 58~62cm, 수컷 60~70cm, FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/BILLY-25.html" },
  { slug: "briquet-griffon-vendeen", nameKo: "브리케 그리폰 방데앙", nameEn: "Briquet Griffon Vendeen", group: "scent-hound", origin: "프랑스 방데", role: "거친 지형에서 큰 사냥감·여우·산토끼를 작은 무리로 추적", size: "중형 · 암컷 48~53cm, 수컷 50~55cm, 허용 ±1cm, FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/BRIQUET-GRIFFON-VENDEEN-19.html" },
  { slug: "dunker", nameKo: "둥케르", nameEn: "Dunker", group: "scent-hound", origin: "노르웨이", role: "숲과 설원에서 산토끼를 냄새로 추적", size: "중형 · 암컷 47~54cm(이상적 49~51cm), 수컷 50~58cm(이상적 52~54cm), FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/DUNKER-203.html" },
  { slug: "halden-hound", nameKo: "할덴 하운드", nameEn: "Halden Hound", group: "scent-hound", origin: "노르웨이 할덴", role: "숲과 설원에서 산토끼 같은 작은 사냥감을 추적", size: "중형 · 암컷 50~58cm(이상적 54cm), 수컷 52~60cm(이상적 56cm), FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/HALDENSTOVARE-267.html" },
  { slug: "hygen-hound", nameKo: "히겐 하운드", nameEn: "Hygen Hound", group: "scent-hound", origin: "노르웨이", role: "노르웨이 숲에서 산토끼와 여우를 추적", size: "중형 · 암컷 47~55cm(이상적 51cm), 수컷 50~58cm(이상적 54cm), FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/HYGENHUND-266.html" },
  { slug: "transylvanian-hound", nameKo: "트란실바니안 하운드", nameEn: "Transylvanian Hound", group: "scent-hound", origin: "헝가리·루마니아", role: "카르파티아에서 큰 사냥감을 독립적으로 추적", size: "중형~대형 · 이상적 55~65cm, 최소 25kg", fciUrl: "https://www.fci.be/en/nomenclature/TRANSYLVANIAN-SCENT-HOUND-241.html" },
  { slug: "tyrolean-hound", nameKo: "티롤리안 하운드", nameEn: "Tyrolean Hound", group: "scent-hound", origin: "오스트리아 티롤", role: "산에서 산토끼·여우를 쫓고 다친 사냥감의 흔적을 추적", size: "중형 · 암컷 42~48cm, 수컷 44~50cm, FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/TYROLEAN-HOUND-68.html" },
  { slug: "braque-francais-type-gascogne", nameKo: "브라크 프랑세 타입 가스코뉴", nameEn: "Braque Français, type Gascogne", group: "pointing", origin: "프랑스 남서부", role: "새와 작은 사냥감의 위치를 가리키는 큰 프렌치 포인터", size: "대형 · 암컷 58~68cm, 수컷 60~69cm, FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/BRAQUE-FRANCAIS-TYPE-GASCOGNE-133.html" },
  { slug: "braque-d-auvergne", nameKo: "브라크 도베르뉴", nameEn: "Braque d'Auvergne", group: "pointing", origin: "프랑스 오베르뉴", role: "거친 들판에서 새를 찾고 위치를 가리키는 작업", size: "중형~대형 · 암컷 53~59cm(이상적 56cm), 수컷 57~63cm(이상적 60cm), 허용 +2/-1cm, FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/BRAQUE-D'AUVERGNE-180.html" },
  { slug: "german-stichelhaar", nameKo: "저먼 스티헬하르", nameEn: "German Stichelhaar", group: "pointing", origin: "독일", role: "들판과 물에서 찾기·포인팅·회수를 맡는 다목적 작업", size: "대형 · 암컷 58~68cm, 수컷 60~70cm, FCI 고정 몸무게 없음", fciUrl: "https://www.fci.be/en/nomenclature/GERMAN-STICHELHAAR-232.html" },
  { slug: "spinone-italiano", nameKo: "스피노네 이탈리아노", nameEn: "Spinone Italiano", group: "pointing", origin: "이탈리아", role: "가시덤불과 찬물에서 포인팅·회수", size: "대형 · 암컷 58~65cm·28~30kg, 수컷 60~70cm·32~37kg", fciUrl: "https://www.fci.be/en/nomenclature/ITALIAN-ROUGH-HAIRED-POINTER-165.html" },
  { slug: "large-munsterlander", nameKo: "라지 뮌스터랜더", nameEn: "Large Munsterlander", group: "pointing", origin: "독일", role: "새를 찾고 가리키며 육상·수상 회수", size: "대형 · 약 58~65cm, 25~32kg", fciUrl: "https://www.fci.be/en/nomenclature/LARGE-MUNSTERLANDER-118.html" },
  { slug: "irish-red-and-white-setter", nameKo: "아이리시 레드 앤 화이트 세터", nameEn: "Irish Red and White Setter", group: "pointing", origin: "아일랜드", role: "새의 위치를 알리는 포인팅과 사냥 협력", size: "대형 · 약 57~66cm, 25~32kg", fciUrl: "https://www.fci.be/en/nomenclature/IRISH-RED-AND-WHITE-SETTER-330.html" },
  { slug: "hungarian-wirehaired-vizsla", nameKo: "헝가리안 와이어헤어드 비즐라", nameEn: "Hungarian Wirehaired Vizsla", group: "pointing", origin: "헝가리", role: "들판과 물에서 포인팅·회수하는 다목적 작업", size: "대형 · 약 54~64cm, 20~30kg", fciUrl: "https://www.fci.be/en/nomenclature/HUNGARIAN-WIRE-HAIRED-POINTER-239.html" },
];

const roleHome = (group: Group) => group === "herding" ? "목양의 배경은 오늘날 움직임·협력·환경 읽기 과제로 이어질 수 있습니다." : group === "guardian-working" ? "경비와 운반의 배경은 차분한 경계 연습과 체격에 맞는 생활 설계로 연결할 수 있습니다." : group === "terrier" ? "작은 사냥감 추적의 배경은 냄새 찾기와 안전한 쫓기 놀이로 전환할 수 있습니다." : group === "spitz-primitive" ? "원시형 작업의 배경은 선택권이 있는 탐색과 예측 가능한 산책으로 풀어낼 수 있습니다." : group === "scent-hound" ? "후각 추적의 배경은 긴 줄 산책과 냄새 과제로 일상에 담을 수 있습니다." : "포인팅과 회수의 배경은 찾기·멈추기·가져오기 과제로 안전하게 연결할 수 있습니다.";

const makeBreed = (seed: Seed): Breed => {
  const m = meta[seed.group];
  return {
    slug: seed.slug, contentStatus: "mvp-editorial-draft", nameKo: seed.nameKo, nameEn: seed.nameEn,
    tagline: `${withTopicParticle(seed.nameKo)} ${seed.role}이라는 역사적 배경을 지녔으며, 오늘의 생활에서는 개체 차이와 환경을 함께 살펴야 합니다.`,
    palette: { primary: m.colors[0], secondary: m.colors[1], ink: m.colors[2] },
    illustration: `/illustrations/v2/${seed.slug}-card.webp`, catalog: { group: seed.group, discoveryTags: [...m.tags, seed.origin] },
    historyVisual: { src: `/illustrations/v3/${seed.slug}-history.webp`, alt: `${seed.nameKo}의 기원과 역할을 보여 주는 편집 초안 역사 장면` },
    identity: { origin: seed.origin, lineage: `${seed.origin}의 오래된 ${m.label} 계통에서 발전한 품종`, originalRole: seed.role, size: seed.size, lifespan: "개체와 관리 환경에 따라 달라지며 공식 자료와 수의사 상담을 함께 확인하세요." },
    behaviorClues: {
      originalRole: `${withTopicParticle(seed.nameKo)} ${seed.role}이라는 역할과 환경 속에서 형성되었습니다. 과거의 역할은 현재 개체의 행동을 단정하지 않지만 생활 설계의 참고 단서가 될 수 있습니다.`,
      today: `오늘날에는 ${seed.role}과 연결된 욕구를 놀이·탐색·협력 과제로 전환할 수 있습니다. 반응과 필요한 활동량은 개체마다 다릅니다.`,
      guardianContext: `보호자는 ${seed.nameKo}의 체격(${seed.size})과 생활 환경을 고려해 운동, 휴식, 사회화, 안전 관리를 함께 계획해야 합니다.`,
    },
    story: {
      opening: `${withTopicParticle(seed.nameKo)} ${seed.origin}에서 ${seed.role}이라는 역사적 배경과 함께 발전했습니다. 이름과 외형만으로 생활 난이도를 판단하기보다 형성 배경과 개체의 신호를 함께 살펴보세요.`,
      roleToHome: roleHome(seed.group),
      reality: `품종의 경향은 개인의 성격을 보장하지 않습니다. ${seed.nameKo}에게는 ${seed.size}에 맞는 공간과 일상, 건강 상태, 보호자와의 경험을 함께 고려하는 준비가 필요합니다.`,
    },
    tendencies: {
      activity: { label: m.levels[0], note: "짧은 활동과 회복 시간을 번갈아 구성하고 몸 상태를 살펴보세요." },
      mentalStimulation: { label: m.levels[1], note: "냄새 찾기와 간단한 문제 해결을 생활 속에 나누어 제공하세요." },
      independence: { label: m.levels[2], note: "혼자 쉬는 시간과 보호자와 함께하는 시간을 균형 있게 연습하세요." },
      socialConnection: { label: m.levels[3], note: "낯선 대상과의 거리는 개체의 회복 신호를 보며 조절하세요." },
      alerting: { label: m.levels[4], note: "경계 반응은 환경과 경험에 따라 달라지므로 안전한 거리에서 관찰하세요." },
      grooming: { label: m.levels[5], note: "피모·귀·발톱 상태를 정기적으로 확인하고 필요한 관리를 준비하세요." },
    },
    careNotes: m.care,
    healthEditorialNote: "건강 항목은 품종 경향을 소개하는 편집 초안이며, 진단이나 개체의 예후를 대신하지 않습니다. 이상 신호는 수의사에게 확인하세요.",
    daySnapshot: [
      { time: "아침", title: "몸 상태 확인", description: "수면 뒤 움직임과 식욕을 살피고 짧은 산책으로 하루를 시작하세요." },
      { time: "낮", title: "탐색과 휴식", description: "환경에 맞는 냄새·찾기 과제를 제공한 뒤 조용히 회복할 시간을 주세요." },
      { time: "저녁", title: "차분한 교감", description: "짧은 교육과 접촉, 브러싱 등 편안한 루틴으로 마무리하세요." },
    ],
    related: m.related.map(([slug, reason]) => ({ slug, reason })),
    sources: [
      { title: `${seed.nameEn} FCI breed standard`, organization: "Fédération Cynologique Internationale", url: seed.fciUrl, checkedAt },
      ...(historySources[seed.slug] ?? []),
    ],
  };
};

export const detailBatchMSlugs = seeds.map((seed) => seed.slug);
export const detailBatchM = seeds.map(makeBreed) satisfies Breed[];
