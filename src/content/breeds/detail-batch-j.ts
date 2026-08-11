import type { Breed } from "./schema";
import { withTopicParticle } from "../../lib/korean-particles";

const checkedAt = "2026-08-05";
type Level = "낮은 편" | "중간" | "높은 편";
type Seed = {
  slug: string;
  nameKo: string;
  nameEn: string;
  group: Breed["catalog"]["group"];
  tags: string[];
  colors: [string, string, string];
  origin: string;
  lineage: string;
  role: string;
  size: string;
  lifespan: string;
  levels: [Level, Level, Level, Level, Level, Level];
  care: string[];
  related: [string, string][];
  fciUrl: string;
  akcUrl: string;
};

const seeds: Seed[] = [
  { slug: "belgian-shepherd-dog", nameKo: "벨지안 셰퍼드 독", nameEn: "Belgian Shepherd Dog", group: "herding", tags: ["벨기에 목양견", "경계와 협력", "높은 학습 욕구"], colors: ["#8b806f", "#ded9ca", "#302d29"], origin: "벨기에", lineage: "벨기에의 네 가지 타입으로 나뉘는 목양견 계통", role: "가축을 모으고 농장과 사람 주변을 지키는 다목적 목양", size: "중대형 · 약 56~66cm, 20~30kg", lifespan: "약 12~14년 (AKC 참고, 개체별 차이 있음)", levels: ["높은 편", "높은 편", "중간", "높은 편", "높은 편", "중간"], care: ["매일 걷기와 냄새·신호 과제를 함께 제공하세요.", "낯선 자극을 관찰할 안전한 거리를 보장하세요.", "피모 타입에 맞춘 빗질과 발·귀 점검을 계획하세요."], related: [["border-collie", "목양 협력과 높은 학습 욕구를 공유하지만 경계 반응과 피모 타입이 달라요."], ["dutch-shepherd-dog", "사람과 가축 주변에서 일한 배경을 공유하며 체형과 생활 자극을 비교해 보세요."]], fciUrl: "https://www.fci.be/en/nomenclature/BELGIAN-SHEPHERD-DOG-15.html", akcUrl: "https://www.akc.org/dog-breeds/belgian-malinois/" },
  { slug: "czechoslovakian-wolfdog", nameKo: "체코슬로바키안 울프독", nameEn: "Czechoslovakian Wolfdog", group: "herding", tags: ["중부 유럽 작업견", "넓은 활동 반경", "신중한 사회화"], colors: ["#9a927f", "#e5e0d3", "#36312c"], origin: "체코·슬로바키아", lineage: "독일 셰퍼드와 카르파티아 늑대 계통을 바탕으로 한 작업견", role: "국경 순찰과 지구력 있는 작업을 수행하던 견종", size: "대형 · 수컷 약 65cm 이상, 26kg 이상", lifespan: "약 12~16년 (FCI 참고, 개체별 차이 있음)", levels: ["높은 편", "높은 편", "높은 편", "중간", "높은 편", "낮은 편"], care: ["높은 울타리와 긴 리드로 추적 행동을 관리하세요.", "혼자 해결하려는 선택을 존중하며 보상 기반 교육을 이어가세요.", "계절성 피모 교체와 발톱·귀 상태를 꾸준히 확인하세요."], related: [["german-shepherd-dog", "셰퍼드 계통의 협력을 공유하지만 독립성과 활동 반경을 비교해야 해요."], ["siberian-husky", "지구력과 독립적인 이동 욕구를 공유하며 안전한 울타리 기준이 달라요."]], fciUrl: "https://www.fci.be/en/nomenclature/CZECHOSLOVAKIAN-WOLFDOG-332.html", akcUrl: "https://www.akc.org/dog-breeds/czechoslovakian-vlcak/" },
  { slug: "bearded-collie", nameKo: "비어디드 콜리", nameEn: "Bearded Collie", group: "herding", tags: ["스코틀랜드 목양견", "활기찬 협력", "긴 이중모"], colors: ["#a18d72", "#dfd8c8", "#3c352d"], origin: "스코틀랜드", lineage: "스코틀랜드의 오래된 거친 털 목양견", role: "양을 몰고 험한 목초지에서 목자와 협력", size: "중형 · 약 51~56cm, 18~27kg", lifespan: "약 12~14년 (AKC 참고, 개체별 차이 있음)", levels: ["높은 편", "높은 편", "중간", "높은 편", "중간", "높은 편"], care: ["달리기보다 냄새 찾기와 방향 전환을 섞어 주세요.", "아이와 만날 때는 흥분한 몰이 행동을 관리하세요.", "긴 이중모가 엉키지 않도록 규칙적으로 나누어 빗질하세요."], related: [["border-collie", "목양 과제와 사람 협력을 공유하지만 털과 흥분 조절 방식이 달라요."], ["collie-rough", "스코틀랜드 목양견의 계통을 공유하며 체형과 피모 부담을 비교해 보세요."]], fciUrl: "https://www.fci.be/en/nomenclature/BEARDED-COLLIE-271.html", akcUrl: "https://www.akc.org/dog-breeds/bearded-collie/" },
  { slug: "white-swiss-shepherd-dog", nameKo: "화이트 스위스 셰퍼드 독", nameEn: "White Swiss Shepherd Dog", group: "herding", tags: ["흰색 셰퍼드", "사람과의 협력", "피모 관리"], colors: ["#b8b5a8", "#f0eee5", "#393733"], origin: "스위스", lineage: "흰 피모의 셰퍼드 계통", role: "목양과 동행, 다양한 협력 작업", size: "중대형 · 약 55~66cm, 25~40kg", lifespan: "약 12~14년 (FCI 참고, 개체별 차이 있음)", levels: ["높은 편", "높은 편", "중간", "높은 편", "중간", "높은 편"], care: ["사람과 함께하는 산책·학습 시간을 매일 확보하세요.", "흰 피모를 이유로 야외 활동을 줄이지 말고 피부를 점검하세요.", "낯선 환경에서 스스로 회복할 조용한 장소를 마련하세요."], related: [["german-shepherd-dog", "셰퍼드의 협력성과 체형을 공유하지만 피모와 자극 민감도를 비교해 보세요."], ["samoyed", "흰 이중모 관리가 비슷해 보이지만 역할과 운동 방식은 달라요."]], fciUrl: "https://www.fci.be/en/nomenclature/WHITE-SWISS-SHEPHERD-DOG-347.html", akcUrl: "https://www.akc.org/dog-breeds/white-shepherd/" },
  { slug: "bouvier-des-flandres", nameKo: "부비에 데 플랑드르", nameEn: "Bouvier des Flandres", group: "herding", tags: ["플랑드르 농장견", "소몰이와 경비", "거친 털"], colors: ["#716d63", "#d5d0c3", "#302f2a"], origin: "벨기에·프랑스 플랑드르", lineage: "플랑드르의 소몰이·농장 작업견", role: "소를 몰고 수레를 끌며 농장을 지키는 다목적 작업", size: "대형 · 약 59~68cm, 27~40kg", lifespan: "약 10~12년 (AKC 참고, 개체별 차이 있음)", levels: ["높은 편", "높은 편", "중간", "높은 편", "높은 편", "높은 편"], care: ["큰 몸이 안전하게 움직일 넓고 미끄럽지 않은 동선을 만드세요.", "거친 털과 수염 주변을 매일 확인하고 정기 미용을 계획하세요.", "경비 반응을 억누르기보다 거리와 대체 행동을 가르치세요."], related: [["briard", "유럽 농장에서 무리를 지킨 거친 털 목양견의 공통점을 비교해 보세요."], ["giant-schnauzer", "농장 경비와 큰 몸, 강한 털 관리 부담을 공유해요."]], fciUrl: "https://www.fci.be/en/nomenclature/BOUVIER-DES-FLANDRES-191.html", akcUrl: "https://www.akc.org/dog-breeds/bouvier-des-flandres/" },
  { slug: "miniature-american-shepherd", nameKo: "미니어처 아메리칸 셰퍼드", nameEn: "Miniature American Shepherd", group: "herding", tags: ["작은 목양견", "민첩한 학습", "이중모"], colors: ["#8b7863", "#e1ded2", "#342f2a"], origin: "미국", lineage: "작은 오스트레일리안 셰퍼드 계통", role: "작은 가축 무리와 사람 곁에서 수행하는 목양·스포츠", size: "소중형 · 약 33~46cm, 9~18kg", lifespan: "약 12~13년 (AKC 참고, 개체별 차이 있음)", levels: ["높은 편", "높은 편", "중간", "높은 편", "중간", "높은 편"], care: ["작은 몸에 맞는 점프와 회전 강도를 조절하세요.", "짧은 학습을 여러 번 나누고 과흥분 뒤 회복을 돕세요.", "털갈이 시기에는 피부까지 닿는 빗질을 하세요."], related: [["australian-shepherd", "목양 협력과 색 변이를 공유하지만 체격과 생활 공간이 달라요."], ["shetland-sheepdog", "작은 목양견의 학습 욕구와 경계 반응을 비교해 보세요."]], fciUrl: "https://www.akc.org/dog-breeds/miniature-american-shepherd/", akcUrl: "https://www.akc.org/dog-breeds/miniature-american-shepherd/" },
  { slug: "dogo-argentino", nameKo: "도고 아르헨티노", nameEn: "Dogo Argentino", group: "guardian-working", tags: ["아르헨티나 대형 작업견", "큰 사냥감 추적", "높은 안전 책임"], colors: ["#c9c4b7", "#eeece3", "#36322e"], origin: "아르헨티나", lineage: "코르도바 투견 계통과 다양한 사냥견의 교배", role: "넓은 지형에서 큰 사냥감을 추적하던 무리 사냥", size: "대형 · 약 60~68cm, 35~45kg", lifespan: "약 9~15년 (AKC 참고, 개체별 차이 있음)", levels: ["높은 편", "높은 편", "중간", "높은 편", "높은 편", "낮은 편"], care: ["큰 힘을 다룰 수 있는 보호자와 안전 장비를 준비하세요.", "다른 동물과의 만남은 통제된 거리에서 개체별로 확인하세요.", "햇빛에 민감한 흰 피모와 운동 후 회복을 살피세요."], related: [["cane-corso", "큰 몸과 작업 통제 책임을 공유하지만 역할과 피모가 달라요."], ["rhodesian-ridgeback", "큰 사냥감을 추적한 역사를 공유하며 독립성과 활동 반경을 비교해 보세요."]], fciUrl: "https://www.fci.be/en/nomenclature/DOGO-ARGENTINO-292.html", akcUrl: "https://www.akc.org/dog-breeds/dogo-argentino/" },
  { slug: "dogue-de-bordeaux", nameKo: "도그 드 보르도", nameEn: "Dogue de Bordeaux", group: "guardian-working", tags: ["프랑스 몰로시안", "무거운 체격", "차분한 경계"], colors: ["#9d6652", "#e0c8b9", "#3b302c"], origin: "프랑스", lineage: "프랑스의 오래된 마스티프 타입 경비견", role: "재산과 가축을 지키고 무거운 작업을 보조", size: "대형 · 약 58~68cm, 45kg 이상", lifespan: "약 5~8년 (AKC 참고, 개체별 차이 있음)", levels: ["중간", "중간", "중간", "높은 편", "높은 편", "낮은 편"], care: ["관절과 더위, 큰 몸의 이동 비용을 생활 계획에 넣으세요.", "침착한 거리 관찰과 사람의 핸들링을 보상하세요.", "짧은 주둥이와 피부 주름, 체중 변화를 정기적으로 확인하세요."], related: [["bullmastiff", "경비 배경과 무거운 체격을 공유하지만 주둥이와 역사적 환경이 달라요."], ["mastiff", "마스티프 계통의 차분한 존재감을 공유하며 생활 규모를 비교해 보세요."]], fciUrl: "https://www.fci.be/en/nomenclature/DOGUE-DE-BORDEAUX-116.html", akcUrl: "https://www.akc.org/dog-breeds/dogue-de-bordeaux/" },
  { slug: "bulldog", nameKo: "불독", nameEn: "Bulldog", group: "companion", tags: ["영국 반려견", "짧은 주둥이", "더위·호흡 관리"], colors: ["#b49376", "#e0d3c3", "#3e322d"], origin: "영국", lineage: "영국의 불독 타입 반려견", role: "역할견에서 사람 곁의 반려견으로 변화", size: "중형 · 약 31~40cm, 18~25kg", lifespan: "약 8~10년 (AKC 참고, 개체별 차이 있음)", levels: ["낮은 편", "중간", "중간", "높은 편", "중간", "중간"], care: ["더운 날씨와 격한 운동을 피하고 호흡을 우선 살피세요.", "체중과 피부 주름, 발가락 사이를 규칙적으로 확인하세요.", "짧은 산책과 냄새 활동으로 무리 없는 자극을 제공하세요."], related: [["french-bulldog", "짧은 주둥이와 반려 역사를 공유하지만 체격과 호흡 부담이 달라요."], ["pug", "작은 몰로시안 반려견의 얼굴 구조와 더위 관리를 비교해 보세요."]], fciUrl: "https://www.fci.be/en/nomenclature/ENGLISH-BULLDOG-149.html", akcUrl: "https://www.akc.org/dog-breeds/bulldog/" },
  { slug: "neapolitan-mastiff", nameKo: "네아폴리탄 마스티프", nameEn: "Neapolitan Mastiff", group: "guardian-working", tags: ["이탈리아 마스티프", "주름진 피부", "영역 경계"], colors: ["#77746d", "#d9d5c9", "#302f2c"], origin: "이탈리아", lineage: "고대 몰로시안과 나폴리 지역의 마스티프", role: "가정과 재산을 지키는 묵직한 경비", size: "초대형 · 약 60~75cm, 50~70kg 이상", lifespan: "약 8~10년 (AKC 참고, 개체별 차이 있음)", levels: ["중간", "중간", "중간", "높은 편", "높은 편", "높은 편"], care: ["주거 공간과 차량, 의료 이동을 대형견 기준으로 준비하세요.", "주름과 피부 사이의 습기, 눈과 귀를 매일 살피세요.", "낯선 사람에게 접근을 강요하지 않고 예측 가능한 루틴을 만드세요."], related: [["cane-corso", "이탈리아 경비견 계통과 큰 힘을 공유하지만 주름과 체형이 달라요."], ["mastiff", "마스티프의 묵직한 경비 성향과 생활 규모를 비교해 보세요."]], fciUrl: "https://www.fci.be/en/nomenclature/MASTINO-NAPOLETANO-197.html", akcUrl: "https://www.akc.org/dog-breeds/neapolitan-mastiff/" },
  { slug: "tibetan-mastiff", nameKo: "티베탄 마스티프", nameEn: "Tibetan Mastiff", group: "guardian-working", tags: ["히말라야 경비견", "독립적 판단", "풍성한 이중모"], colors: ["#775e4e", "#ded5c7", "#302a26"], origin: "티베트 고원", lineage: "히말라야 지역의 오래된 가축·사원 경비견", role: "무리와 사원을 밤에 지키는 영역 경비", size: "대형 · 약 61~71cm, 34~73kg", lifespan: "약 10~12년 (AKC 참고, 개체별 차이 있음)", levels: ["중간", "중간", "높은 편", "중간", "높은 편", "높은 편"], care: ["밤의 짖음과 영역 경계를 이웃과 함께 관리할 수 있는지 확인하세요.", "독립적인 휴식 시간을 존중하되 안전한 호출을 반복 연습하세요.", "계절성 털갈이와 더위, 체중을 세심하게 관리하세요."], related: [["great-dane", "대형견 생활 규모를 공유하지만 경계 반응과 피모가 달라요."], ["newfoundland", "풍성한 이중모와 큰 몸을 공유하며 역할과 더위 관리가 다릅니다."]], fciUrl: "https://www.fci.be/en/nomenclature/TIBETAN-MASTIFF-230.html", akcUrl: "https://www.akc.org/dog-breeds/tibetan-mastiff/" },
  { slug: "continental-bulldog", nameKo: "컨티넨탈 불독", nameEn: "Continental Bulldog", group: "companion", tags: ["스위스 불독", "활동적인 반려", "호흡 관찰"], colors: ["#ad8e75", "#e3d8c9", "#3b302a"], origin: "스위스", lineage: "현대 스위스에서 형성된 불독 타입", role: "가정 반려와 일상 동행", size: "중형 · 약 40~50cm, 20~30kg", lifespan: "약 10~12년 (FCI 참고, 개체별 차이 있음)", levels: ["중간", "중간", "중간", "높은 편", "중간", "낮은 편"], care: ["짧은 주둥이의 호흡과 더위 반응을 산책 전후 확인하세요.", "체중이 늘지 않도록 짧고 규칙적인 활동을 구성하세요.", "피부와 발, 치아를 일상 핸들링에 익숙하게 하세요."], related: [["bulldog", "불독 타입의 반려 배경을 공유하며 체형과 활동량 차이를 비교해 보세요."], ["french-bulldog", "짧은 주둥이 관리와 사람 곁의 생활을 함께 살펴볼 수 있어요."]], fciUrl: "https://www.fci.be/en/nomenclature/CONTINENTAL-BULLDOG-365.html", akcUrl: "https://www.ukcdogs.com/continental-bulldog" },
  { slug: "smooth-fox-terrier", nameKo: "스무드 폭스 테리어", nameEn: "Smooth Fox Terrier", group: "terrier", tags: ["영국 여우굴 테리어", "빠른 반응", "짧은 피모"], colors: ["#b58b68", "#e6dfd0", "#37312b"], origin: "영국", lineage: "여우 사냥에 참여한 폭스 테리어 계통", role: "여우를 굴에서 몰아내고 사냥꾼과 협력", size: "중형 · 약 36~39cm, 7~8kg", lifespan: "약 12~15년 (AKC 참고, 개체별 차이 있음)", levels: ["높은 편", "높은 편", "중간", "중간", "높은 편", "낮은 편"], care: ["작은 동물을 향한 추적을 리드와 울타리로 관리하세요.", "짧은 놀이와 냄새 찾기를 번갈아 제공하세요.", "짧은 털과 피부, 발톱 상태를 간단히 확인하세요."], related: [["jack-russell-terrier", "굴 사냥 테리어의 빠른 반응과 끈기를 공유해요."], ["border-terrier", "작은 사냥감을 추적한 역사와 체격을 비교해 보세요."]], fciUrl: "https://www.fci.be/en/nomenclature/FOX-TERRIER-SMOOTH-12.html", akcUrl: "https://www.akc.org/dog-breeds/smooth-fox-terrier/" },
  { slug: "wire-fox-terrier", nameKo: "와이어 폭스 테리어", nameEn: "Wire Fox Terrier", group: "terrier", tags: ["거친 털 테리어", "여우굴 작업", "높은 활동성"], colors: ["#a78061", "#e5ded0", "#38312b"], origin: "영국", lineage: "폭스 테리어의 거친 털 작업 계통", role: "여우를 굴에서 몰아내는 지하 추적과 사냥 협력", size: "중형 · 약 36~39cm, 7~8kg", lifespan: "약 12~15년 (AKC 참고, 개체별 차이 있음)", levels: ["높은 편", "높은 편", "중간", "중간", "높은 편", "높은 편"], care: ["울타리와 리드 없이 추적할 수 있는 환경을 만들지 마세요.", "거친 털은 정기적인 브러싱과 트리밍 계획이 필요해요.", "흥분을 멈추고 회복하는 신호를 놀이 중에 연습하세요."], related: [["smooth-fox-terrier", "같은 폭스 테리어 계통에서 피모와 관리 방식의 차이를 살펴보세요."], ["airedale-terrier", "테리어의 추적과 끈기를 공유하지만 체격 규모가 달라요."]], fciUrl: "https://www.fci.be/en/nomenclature/FOX-TERRIER-WIRE-169.html", akcUrl: "https://www.akc.org/dog-breeds/wire-fox-terrier/" },
  { slug: "kerry-blue-terrier", nameKo: "케리 블루 테리어", nameEn: "Kerry Blue Terrier", group: "terrier", tags: ["아일랜드 다목적 테리어", "청회색 피모", "활발한 협력"], colors: ["#69757a", "#d8d8cf", "#302f2d"], origin: "아일랜드 케리", lineage: "아일랜드 농장의 다목적 테리어", role: "작은 해충을 잡고 가축과 재산을 지키는 작업", size: "중형 · 약 44~49cm, 13~18kg", lifespan: "약 12~15년 (AKC 참고, 개체별 차이 있음)", levels: ["높은 편", "높은 편", "중간", "높은 편", "높은 편", "높은 편"], care: ["사람과 다른 동물 사이의 거리를 안전하게 설계하세요.", "곱슬 피모를 엉키지 않게 빗질하고 정기적으로 다듬으세요.", "활동 뒤 차분한 자리로 이동하는 루틴을 만드세요."], related: [["soft-coated-wheaten-terrier", "아일랜드 테리어의 농장 역할과 피모 관리 부담을 공유해요."], ["airedale-terrier", "다목적 테리어의 학습과 경계 역할을 비교해 보세요."]], fciUrl: "https://www.fci.be/en/nomenclature/KERRY-BLUE-TERRIER-3.html", akcUrl: "https://www.akc.org/dog-breeds/kerry-blue-terrier/" },
  { slug: "cairn-terrier", nameKo: "케언 테리어", nameEn: "Cairn Terrier", group: "terrier", tags: ["스코틀랜드 소형 테리어", "바위틈 추적", "거친 털"], colors: ["#a58a62", "#ded6c6", "#3b342d"], origin: "스코틀랜드", lineage: "돌무더기 사이 해충을 찾던 하이랜드 테리어", role: "바위틈과 굴에서 작은 동물을 찾아내는 작업", size: "소형 · 약 23~25cm, 6~8kg", lifespan: "약 13~15년 (AKC 참고, 개체별 차이 있음)", levels: ["높은 편", "높은 편", "중간", "중간", "중간", "중간"], care: ["작은 동물과의 추적 상황을 리드와 울타리로 관리하세요.", "안전한 파기 상자와 냄새 찾기로 본능을 전환하세요.", "거친 털은 피부까지 닿는 빗질과 정기 트리밍이 필요해요."], related: [["west-highland-white-terrier", "스코틀랜드 소형 테리어의 굴 작업과 거친 털을 공유해요."], ["norfolk-terrier", "작은 체격과 쥐·여우 추적 경향을 비교해 보세요."]], fciUrl: "https://www.fci.be/en/nomenclature/CAIRN-TERRIER-4.html", akcUrl: "https://www.akc.org/dog-breeds/cairn-terrier/" },
  { slug: "norfolk-terrier", nameKo: "노퍽 테리어", nameEn: "Norfolk Terrier", group: "terrier", tags: ["작은 영국 테리어", "굴 작업", "사교적 활기"], colors: ["#a17b59", "#e2d7c8", "#3a3029"], origin: "영국", lineage: "동앵글리아의 작은 사냥 테리어", role: "마구간 주변 해충과 여우를 추적하는 작업", size: "소형 · 약 23~25cm, 5~6kg", lifespan: "약 12~15년 (AKC 참고, 개체별 차이 있음)", levels: ["높은 편", "높은 편", "중간", "높은 편", "중간", "중간"], care: ["몸집보다 큰 추적 욕구를 리드와 안전한 공간으로 관리하세요.", "짧은 산책에 냄새 찾기와 회복 시간을 섞으세요.", "거친 털과 귀 안쪽을 주기적으로 확인하세요."], related: [["norwich-terrier", "같은 지역의 작은 테리어로 체형과 귀 모양 차이를 비교해 보세요."], ["cairn-terrier", "굴 작업과 소형 테리어의 끈기를 공유하지만 피모가 달라요."]], fciUrl: "https://www.fci.be/en/nomenclature/NORFOLK-TERRIER-272.html", akcUrl: "https://www.akc.org/dog-breeds/norfolk-terrier/" },
  { slug: "norwich-terrier", nameKo: "노리치 테리어", nameEn: "Norwich Terrier", group: "terrier", tags: ["동앵글리아 테리어", "작은 몸의 용기", "직립 귀"], colors: ["#9d7958", "#e4d9ca", "#362f29"], origin: "영국", lineage: "동앵글리아의 마구간·사냥 테리어", role: "마구간 해충을 통제하고 여우굴 작업에 참여", size: "소형 · 약 23~25cm, 5~6kg", lifespan: "약 12~15년 (AKC 참고, 개체별 차이 있음)", levels: ["높은 편", "높은 편", "중간", "높은 편", "중간", "중간"], care: ["작은 체격을 과소평가하지 말고 추적 안전을 먼저 확보하세요.", "사람과의 놀이 뒤 멈춤과 휴식을 함께 가르치세요.", "거친 털과 직립 귀를 정기적으로 손질하세요."], related: [["norfolk-terrier", "동앵글리아의 작은 테리어 계통을 공유하며 귀 형태가 달라요."], ["jack-russell-terrier", "빠른 추적과 활동성을 공유하지만 체형과 털이 다릅니다."]], fciUrl: "https://www.fci.be/en/nomenclature/NORWICH-TERRIER-72.html", akcUrl: "https://www.akc.org/dog-breeds/norwich-terrier/" },
  { slug: "miniature-bull-terrier", nameKo: "미니어처 불테리어", nameEn: "Miniature Bull Terrier", group: "terrier", tags: ["작은 불 테리어", "단단한 몸", "흥분 조절"], colors: ["#b99b7b", "#e6ded1", "#3a312c"], origin: "영국", lineage: "불테리어의 소형 타입", role: "반려와 전시 중심으로 정착한 불 타입 테리어", size: "소형 · 약 25~35cm, 체중은 체고에 비례", lifespan: "약 11~14년 (AKC 참고, 개체별 차이 있음)", levels: ["높은 편", "높은 편", "중간", "높은 편", "중간", "낮은 편"], care: ["힘 있는 놀이를 멈추고 회복하는 신호를 연습하세요.", "다른 개와의 상호작용은 실제 반응을 안전하게 관찰하세요.", "짧은 털과 피부, 치아와 발톱을 일상적으로 확인하세요."], related: [["bull-terrier", "불 테리어의 독특한 머리와 단단한 몸을 공유하며 크기가 달라요."], ["staffordshire-bull-terrier", "작은 불 타입 테리어의 교감과 힘을 비교해 보세요."]], fciUrl: "https://www.fci.be/en/nomenclature/MINIATURE-BULL-TERRIER-359.html", akcUrl: "https://www.akc.org/dog-breeds/miniature-bull-terrier/" },
  { slug: "american-staffordshire-terrier", nameKo: "아메리칸 스태포드셔 테리어", nameEn: "American Staffordshire Terrier", group: "terrier", tags: ["미국 불 타입 테리어", "사람과의 교감", "힘과 안전 관리"], colors: ["#8a7562", "#ddd6c8", "#332e2a"], origin: "미국", lineage: "불 타입 테리어에서 발전한 미국의 반려·스포츠견", role: "사람과 협력하는 작업과 반려 생활로 변화", size: "중형 · 약 43~48cm, 18~32kg", lifespan: "약 12~16년 (AKC 참고, 개체별 차이 있음)", levels: ["높은 편", "높은 편", "중간", "높은 편", "중간", "낮은 편"], care: ["힘을 안전하게 다룰 수 있는 장비와 보상 교육을 준비하세요.", "다른 개·사람과의 관계는 품종 이미지가 아닌 개체 반응으로 확인하세요.", "근육량과 체중, 피부·관절 상태를 꾸준히 살피세요."], related: [["staffordshire-bull-terrier", "불 타입 테리어의 교감과 힘을 공유하며 체격이 달라요."], ["bull-terrier", "미국의 불 타입 계통과 현대 생활의 힘·안전 관리를 비교해 보세요."]], fciUrl: "https://www.fci.be/en/nomenclature/AMERICAN-STAFFORDSHIRE-TERRIER-286.html", akcUrl: "https://www.akc.org/dog-breeds/american-staffordshire-terrier/" },
];

const roleHome = (seed: Seed) =>
  seed.group === "terrier"
    ? "작은 동물을 찾고 몰아내던 끈기는 현대 가정에서 빠른 추적과 끈질긴 놀이로 나타날 수 있습니다. 멈춤과 회복을 함께 가르쳐야 해요."
    : seed.group === "herding"
      ? "무리와 사람의 움직임을 읽고 협력하던 배경은 가정에서 높은 학습 욕구와 주변을 살피는 행동으로 이어질 수 있습니다."
      : "영역과 큰 사냥감을 다루던 배경은 현대 가정에서 큰 힘과 거리 조절 책임으로 이어질 수 있습니다. 보호자의 안전 계획이 먼저예요.";

const makeBreed = (seed: Seed): Breed => ({
  slug: seed.slug,
  contentStatus: "mvp-editorial-draft",
  nameKo: seed.nameKo,
  nameEn: seed.nameEn,
  tagline: `${seed.nameKo}의 매력은 외형 하나보다 ${seed.role}의 역사가 오늘의 생활 조건과 함께 보일 때 더 선명해져요.`,
  palette: { primary: seed.colors[0], secondary: seed.colors[1], ink: seed.colors[2] },
  illustration: `/illustrations/v2/${seed.slug}-card.webp`,
  catalog: { group: seed.group, discoveryTags: seed.tags },
  historyVisual: { src: `/illustrations/v3/${seed.slug}-history.webp`, alt: `${seed.nameKo}의 원래 역할과 생활 환경을 표현한 편집 수채화` },
  identity: { origin: seed.origin, lineage: seed.lineage, originalRole: seed.role, size: seed.size, lifespan: seed.lifespan },
  behaviorClues: {
    originalRole: `${withTopicParticle(seed.nameKo)} ${seed.role}이라는 역할과 환경 속에서 형성된 견종입니다. 과거의 역할은 현재 개체의 행동을 결정하지 않지만 살펴볼 단서가 될 수 있어요.`,
    today: `현재 가정에서는 ${seed.role}의 흔적이 움직임·탐색·경계 방식으로 다르게 나타날 수 있습니다. 사회성과 반응은 개체마다 달라요.`,
    guardianContext: `보호자는 ${seed.nameKo}의 체격과 활동, 자극 반응에 맞는 거리와 회복 시간을 준비해야 합니다. 품종만으로 성격이나 위험을 단정하지 마세요.`,
  },
  story: {
    opening: `${withTopicParticle(seed.nameKo)} ${seed.origin}에서 ${seed.role}이라는 역사적 배경을 지닌 견종입니다. ${seed.lineage}라는 배경을 알면 외형만으로는 보이지 않는 생활 조건을 생각할 수 있어요.`,
    roleToHome: roleHome(seed),
    reality: `귀엽거나 강인해 보이는 인상만으로는 충분하지 않습니다. ${seed.nameKo}와 살려면 ${seed.size}에 맞는 공간과 일상, 교육·관리 비용을 미리 확인해야 해요.`,
  },
  tendencies: {
    activity: { label: seed.levels[0], note: seed.levels[0] === "높은 편" ? "매일 충분한 움직임과 회복 시간을 함께 구성해야 합니다." : "신체 구조와 컨디션에 맞춘 규칙적인 산책이 필요합니다." },
    mentalStimulation: { label: seed.levels[1], note: seed.levels[1] === "높은 편" ? "냄새 탐색과 학습 과제를 매일의 생활에 포함하는 편이 좋습니다." : "짧은 찾기와 신호 놀이로 일상에 변화를 줄 수 있습니다." },
    independence: { label: seed.levels[2], note: "사람과의 거리와 혼자 쉬는 능력은 개체와 경험에 따라 다르므로 실제 생활에서 확인하세요." },
    socialConnection: { label: seed.levels[3], note: "사람과의 관계 방식은 사회화와 생활 경험에 따라 달라질 수 있습니다." },
    alerting: { label: seed.levels[4], note: "소리와 낯선 변화에 대한 반응은 환경과 개체에 따라 달라질 수 있습니다." },
    grooming: { label: seed.levels[5], note: seed.levels[5] === "높은 편" ? "피부까지 확인하는 규칙적인 빗질과 피모 관리 시간이 필요합니다." : "정기적인 피부·발·귀 상태 확인이 필요합니다." },
  },
  careNotes: seed.care,
  healthEditorialNote: "건강 항목은 공식 견종 자료를 바탕으로 정리한 편집 초안이며 수의학 검수 전입니다. 품종만으로 질환을 단정하지 않고 개별 진료를 대신하지 않습니다.",
  daySnapshot: [
    { time: "아침", title: "몸과 냄새 깨우기", description: "견종의 체력과 기온에 맞춰 걷고 냄새를 살펴요." },
    { time: "낮", title: "차분한 회복", description: "자극에서 벗어나 조용히 쉬는 시간을 보장해요." },
    { time: "저녁", title: "협력 과제", description: "짧은 학습과 핸들링 뒤 편하게 마무리해요." },
  ],
  related: seed.related.map(([slug, reason]) => ({ slug, reason })),
  sources: [
    { title: `${seed.nameEn} breed standard`, organization: "Fédération Cynologique Internationale", url: seed.fciUrl, checkedAt },
    { title: `${seed.nameEn} Dog Breed Information`, organization: "American Kennel Club", url: seed.akcUrl, checkedAt },
  ],
});

export const detailBatchJSlugs = seeds.map((seed) => seed.slug);
export const detailBatchJ = seeds.map(makeBreed) satisfies Breed[];
