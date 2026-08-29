import { breedCollectionSchema, sourceSchema, type Breed } from "./schema";
import { detailBatchA } from "./detail-batch-a";
import { detailBatchB } from "./detail-batch-b";
import { detailBatchC } from "./detail-batch-c";
import { detailBatchD } from "./detail-batch-d";
import { detailBatchE } from "./detail-batch-e";
import { detailBatchF } from "./detail-batch-f";
import { detailBatchG } from "./detail-batch-g";
import { detailBatchH } from "./detail-batch-h";
import { detailBatchI } from "./detail-batch-i";
import { detailBatchJ } from "./detail-batch-j";
import { detailBatchK } from "./detail-batch-k";
import { detailBatchL } from "./detail-batch-l";
import { detailBatchM } from "./detail-batch-m";
import { detailBatchN } from "./detail-batch-n";
import { detailBatchO } from "./detail-batch-o";
import { detailBatchP } from "./detail-batch-p";
import { detailBatchQ } from "./detail-batch-q";
import { detailBatchR } from "./detail-batch-r";
import { detailBatchS } from "./detail-batch-s";
import { detailBatchT } from "./detail-batch-t";
import { detailBatchU } from "./detail-batch-u";

const checkedAt = "2026-08-01";

export const behaviorContextSources = sourceSchema.array().parse([
  {
    title: "Dog Bite Prevention — revised policy",
    organization: "American Veterinary Medical Association",
    url: "https://www.avma.org/sites/default/files/2023-03/2023W_Resolution9F.pdf",
    checkedAt,
  },
  {
    title: "Ancestry-inclusive dog genomics challenges popular breed stereotypes",
    organization: "Science / PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/35482869/",
    checkedAt,
  },
  {
    title: "How to get your puppy to love bathing and nail trims",
    organization: "VCA Animal Hospitals",
    url: "https://vcahospitals.com/pediatric/puppy/behavior-training/puppy-bathing-and-nail-trims",
    checkedAt,
  },
  {
    title: "Genomic evidence for behavioral adaptation of herding dogs",
    organization: "Science Advances / PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/40305603/",
    checkedAt,
  },
]);

const draftBreeds = [
  {
    slug: "japanese-spitz",
    contentStatus: "mvp-editorial-draft",
    nameKo: "재패니즈 스피츠",
    nameEn: "Japanese Spitz",
    tagline: "하얀 이중모와 또렷한 표정 뒤에, 사람 곁을 좋아하는 활기찬 일상이 있어요.",
    palette: { primary: "#dce9e2", secondary: "#f6f1e7", ink: "#18382e" },
    illustration: "/illustrations/v2/japanese-spitz-card.webp",
    catalog: { group: "companion", discoveryTags: ["스피츠 계열", "가족과의 교감", "이중모 관리"] },
    historyVisual: {
      src: "/illustrations/v3/japanese-spitz-history.webp",
      alt: "일본식 주택 마당에서 흰 스피츠형 개와 마주 보는 사람을 그린 편집 삽화",
    },
    identity: {
      origin: "일본",
      lineage: "스피츠 계열",
      originalRole: "반려견",
      size: "소형~중소형",
      lifespan: "약 10~14년 (출처별 범위 차이 있음)",
    },
    behaviorClues: {
      originalRole: "사람 곁의 반려견으로 발전했고, 주변 변화를 알아차려 알리는 맥락이 함께 소개됩니다.",
      today: "낯선 소리나 움직임에 경계·알림 행동이 나타날 수 있지만 빈도와 강도는 개체마다 다릅니다.",
      guardianContext: "그루밍과 목욕 반응은 품종 역사보다 개별 경험, 물소리, 미끄러운 바닥, 몸을 잡는 방식과 점진적 적응을 함께 확인해요.",
    },
    story: {
      opening: "20세기 초 일본에서 여러 흰색 스피츠 계열의 개들을 바탕으로 발전했습니다. 이후 선택적인 번식을 거치며 풍성한 순백색 이중모와 뾰족한 귀, 등에 말린 꼬리 같은 지금의 모습이 자리 잡았습니다.",
      roleToHome: "사람과 가까이 지내는 반려견으로 발전해 가족의 움직임에 관심을 보일 수 있습니다. 주변 변화를 빠르게 알아차리는 경향은 가정에서 알림 짖음으로 이어질 수 있어요.",
      reality: "작아 보인다는 이유로 활동과 교육이 적게 필요한 것은 아닙니다. 규칙적인 산책, 긍정적인 사회화, 털갈이 시기의 빗질을 일상으로 받아들일 준비가 필요합니다.",
    },
    tendencies: {
      activity: { label: "중간", note: "매일의 산책과 놀이가 필요한 활기찬 반려견으로 소개됩니다." },
      mentalStimulation: { label: "중간", note: "짧은 훈련과 탐색 놀이로 일상에 변화를 주는 편이 좋습니다." },
      independence: { label: "개체별 확인 필요", note: "가족과의 유대와 혼자 쉬는 능력은 개체와 경험에 따라 달라집니다." },
      socialConnection: { label: "높은 편", note: "가족과 함께하는 생활을 즐기는 경향으로 소개됩니다." },
      alerting: { label: "높은 편", note: "낯선 소리와 움직임을 알리는 행동이 나타날 수 있습니다." },
      grooming: { label: "높은 편", note: "풍성한 이중모는 특히 털갈이 시기에 꾸준한 빗질이 필요합니다." },
    },
    careNotes: [
      "알림 짖음을 단순히 제지하기보다 자극의 원인과 생활 환경을 함께 살펴보세요.",
      "이중모를 짧게 미는 방식보다 정기적인 빗질과 피부 상태 확인이 우선입니다.",
      "사람 곁을 좋아하더라도 짧고 편안한 혼자 쉬기부터 단계적으로 연습해 분리 상황의 부담을 줄여주세요.",
    ],
    healthEditorialNote: "건강 항목은 수의학 전문가 검수 전인 MVP 초안입니다. 품종만으로 질환을 단정하지 않으며 개별 상담을 대신하지 않습니다.",
    daySnapshot: [
      { time: "아침", title: "냄새 맡는 산책", description: "속도보다 탐색할 여유를 포함해요." },
      { time: "낮", title: "안정적으로 쉬기", description: "혼자 쉬는 연습은 천천히 진행해요." },
      { time: "저녁", title: "놀이와 빗질", description: "짧은 놀이 뒤 털과 피부를 확인해요." },
    ],
    related: [
      { slug: "samoyed", reason: "같은 스피츠형 외모지만 체격과 필요한 생활 부담이 크게 달라요." },
      { slug: "maltese", reason: "국내에서 익숙한 흰 반려견이지만 털의 형태와 관리 방식이 달라요." },
      { slug: "german-spitz", reason: "뾰족한 귀와 풍성한 이중모, 알림 행동은 닮았지만 크기 바라이어티와 계통이 달라요." },
      { slug: "finnish-spitz", reason: "스피츠형 실루엣과 빠른 알림 반응을 공유하지만 원래 역할과 활동 리듬은 달라요." },
    ],
    sources: [
      { title: "Japanese Spitz Dog Breed Information", organization: "American Kennel Club", url: "https://www.akc.org/dog-breeds/japanese-spitz/", checkedAt },
      { title: "Japanese Spitz Official Breed Standard", organization: "United Kennel Club", url: "https://www.ukcdogs.com/breed-groups/japanese-spitz", checkedAt },
    ],
  },
  {
    slug: "maltese",
    contentStatus: "mvp-editorial-draft",
    nameKo: "말티즈",
    nameEn: "Maltese",
    tagline: "작은 체구만으로는 설명되지 않는, 오랜 반려의 역사와 생기 있는 성격을 만나요.",
    palette: { primary: "#f1e7d6", secondary: "#fbfaf6", ink: "#473625" },
    illustration: "/illustrations/v2/maltese-card.webp",
    catalog: { group: "companion", discoveryTags: ["작은 체격", "사람 곁을 선호", "피모 관리"] },
    historyVisual: {
      src: "/illustrations/v3/maltese-history.webp",
      alt: "지중해 연안으로 보이는 마을에서 사람 곁에 앉은 흰 소형견을 그린 편집 삽화",
    },
    identity: { origin: "지중해권", lineage: "토이 그룹", originalRole: "반려견", size: "초소형", lifespan: "장수하는 편으로 알려짐 (세부 범위 검토 중)" },
    behaviorClues: {
      originalRole: "중앙 지중해의 항구 도시에서 창고와 배 안의 쥐를 잡던 작은 개의 배경이 있고, 고대 로마에서는 사람 곁의 반려견으로 기록됩니다.",
      today: "사람 가까이 머물려는 모습과 빗질·눈가 관리처럼 반복되는 핸들링 상황을 함께 살펴봐요.",
      guardianContext: "몸을 만지고 관리하는 과정은 짧고 편안한 단계부터 보상과 함께 긍정적인 경험으로 쌓아야 합니다.",
    },
    story: {
      opening: "말티즈라는 이름 때문에 몰타섬에서 시작된 견종으로 생각하기 쉽지만, 정확한 기원은 그렇게 단순하지 않습니다. 조상으로 여겨지는 작은 개들은 오래전부터 중앙 지중해의 항구와 해안 도시에서 생활했으며, 창고와 배에서 쥐를 잡는 역할도 했던 것으로 전해집니다.",
      roleToHome: "고대 로마에서는 사람 곁의 반려견으로 사랑받았고, 르네상스 시대에는 사람들과 함께 있는 모습이 여러 회화에 등장하기도 했습니다. 오랜 세월 사람 곁에서 반려견으로 자리해 온 역사는 오늘날 말티즈를 이해하는 중요한 배경이에요.",
      reality: "작은 체격은 관리가 쉽다는 뜻이 아닙니다. 털과 치아 관리, 안전한 환경, 혼자 있는 시간에 대한 점진적인 연습을 함께 고려해야 합니다.",
    },
    tendencies: {
      activity: { label: "중간", note: "체구는 작지만 매일 산책과 놀이를 즐길 수 있습니다." },
      mentalStimulation: { label: "중간", note: "일관된 긍정적 교육과 짧은 놀이가 도움이 됩니다." },
      independence: { label: "낮은 편", note: "사람과의 교감을 선호하는 경향이 있어 혼자 있는 연습이 중요합니다." },
      socialConnection: { label: "높은 편", note: "가족과 가까이 지내는 반려견으로 알려져 있습니다." },
      alerting: { label: "중간", note: "외로움이나 주변 자극이 짖음으로 표현될 수 있습니다." },
      grooming: { label: "높은 편", note: "긴 털을 유지한다면 엉킴 방지를 위한 규칙적인 관리가 필요합니다." },
    },
    careNotes: ["작은 체구를 고려해 높은 곳에서의 낙상과 거친 상호작용을 예방하세요.", "사람과 붙어 있는 시간뿐 아니라 편안하게 혼자 쉬는 경험도 만들어주세요."],
    healthEditorialNote: "건강 항목은 수의학 전문가 검수 전인 MVP 초안입니다. 치아를 포함한 개별 관리 계획은 동물병원과 상의해야 합니다.",
    daySnapshot: [
      { time: "아침", title: "가벼운 산책", description: "작아도 바깥 냄새를 탐색할 시간이 필요해요." },
      { time: "낮", title: "차분히 혼자 쉬기", description: "짧은 시간부터 독립적인 휴식을 연습해요." },
      { time: "저녁", title: "교감과 위생 관리", description: "놀이 뒤 털과 치아 상태를 살펴봐요." },
    ],
    related: [
      { slug: "japanese-spitz", reason: "하얀 외모는 닮았지만 체격과 털의 구조, 알림 행동을 비교해볼 수 있어요." },
      { slug: "bichon-frise", reason: "비슷한 흰 소형견이지만 곱슬 피모의 손질 방식과 활동 리듬이 달라요." },
    ],
    sources: [
      { title: "Maltese Dog Breed Information", organization: "American Kennel Club", url: "https://www.akc.org/dog-breeds/maltese/", checkedAt },
      { title: "Is the Maltese a Good Fit for Your Lifestyle?", organization: "American Kennel Club", url: "https://www.akc.org/expert-advice/dog-breeds/maltese-right-for-you/", checkedAt },
      { title: "Maltese History", organization: "American Kennel Club", url: "https://www.akc.org/expert-advice/dog-breeds/maltese-history/", checkedAt: "2026-08-29" },
      { title: "FCI Standard No. 65 — Maltese", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/nomenclature/Standards/065g09-en.pdf", checkedAt },
    ],
  },
  {
    slug: "border-collie",
    contentStatus: "mvp-editorial-draft",
    nameKo: "보더콜리",
    nameEn: "Border Collie",
    tagline: "목초지의 판단력과 집중력은 가정에서도 사라지지 않아요.",
    palette: { primary: "#cad7c4", secondary: "#e9e2d1", ink: "#26362b" },
    illustration: "/illustrations/v2/border-collie-card.webp",
    catalog: { group: "herding", discoveryTags: ["목양견", "높은 활동", "정신적 자극"] },
    historyVisual: {
      src: "/illustrations/v3/border-collie-history.webp",
      alt: "돌담이 있는 목초지에서 목자의 신호에 맞춰 양 떼를 모는 보더콜리를 그린 편집 삽화",
    },
    identity: { origin: "영국·스코틀랜드 접경 지역", lineage: "목양견", originalRole: "양 떼를 모는 목양견", size: "중형", lifespan: "자료 출처별 범위 확인 중" },
    behaviorClues: {
      originalRole: "사람의 신호에 맞춰 양 떼를 모으고 이동시키는 목양 작업을 수행해 온 배경이 있습니다.",
      today: "응시, 몸을 낮추는 자세, 추적과 몰이 행동이 보일 수 있고 움직이는 대상이나 발목을 몰려 할 수도 있습니다.",
      guardianContext: "이런 몰이 단서를 공격성과 동일하게 보지 말고 대상, 거리, 흥분도와 중단 신호에 대한 반응을 함께 확인해요.",
    },
    story: {
      opening: "보더콜리는 잉글랜드와 스코틀랜드의 접경 지역에서 목자와 함께 양 떼를 관리하던 작업견으로 발전했습니다. 넓고 거친 지형에서 가축의 움직임을 읽고, 멀리 돌아 나가 양을 모은 뒤 목자 쪽으로 데려오는 능력이 중요하게 여겨졌습니다.",
      roleToHome: "이 작업에서는 몸을 낮춰 조용히 접근하고 강한 시선으로 양의 움직임을 조절하는 방식이 중요했습니다. 이러한 독특한 작업 방식은 오늘날에도 보더콜리를 대표하는 특징으로 남아 있습니다.",
      reality: "산책 거리만 채우는 것으로 충분하다고 단정하기 어렵습니다. 신체 활동과 냄새 탐색, 문제 해결 놀이, 차분히 쉬는 연습이 균형을 이뤄야 합니다.",
    },
    tendencies: {
      activity: { label: "높은 편", note: "활동적인 작업견으로 충분한 신체 활동을 요구하는 경향이 있습니다." },
      mentalStimulation: { label: "높은 편", note: "학습과 문제 해결 과제가 생활 만족에 중요한 품종으로 알려져 있습니다." },
      independence: { label: "중간", note: "사람과 협력하면서도 상황을 판단하도록 발달한 배경이 있습니다." },
      socialConnection: { label: "높은 편", note: "보호자와의 협력과 상호작용을 중요하게 여길 수 있습니다." },
      alerting: { label: "중간", note: "움직임과 주변 변화에 민감하게 반응할 수 있습니다." },
      grooming: { label: "중간", note: "털 유형에 따라 빗질 빈도와 관리 부담이 달라집니다." },
    },
    careNotes: ["달리기만 반복하기보다 냄새 탐색과 문제 해결, 휴식 교육을 균형 있게 구성하세요.", "사람이나 다른 동물을 모는 듯한 행동이 나타나면 환경 관리와 전문적인 지도를 고려하세요."],
    healthEditorialNote: "건강 정보는 품종 클럽 자료와 수의학 검수를 추가한 뒤 공개 범위를 넓힐 예정입니다.",
    daySnapshot: [
      { time: "아침", title: "활동과 탐색", description: "움직임과 냄새 탐색을 함께 구성해요." },
      { time: "낮", title: "차분히 쉬기", description: "자극이 이어지지 않는 휴식 시간도 중요해요." },
      { time: "저녁", title: "협력 과제", description: "짧은 교육과 문제 해결 놀이를 함께해요." },
    ],
    related: [
      { slug: "samoyed", reason: "작업견 배경은 공유하지만 협력 방식과 생활 관리의 초점이 달라요." },
      { slug: "australian-shepherd", reason: "사람과 협력해 가축을 움직인 목양 배경과 높은 활동 요구를 함께 비교해볼 수 있어요." },
      { slug: "shetland-sheepdog", reason: "콜리형 외모와 빠른 반응은 닮았지만 체격과 피모 관리 부담에는 차이가 있어요." },
      { slug: "australian-kelpie", reason: "집중력 높은 목양견이라는 공통점 속에서 작업 방식과 일상 자극 요구를 비교해볼 수 있어요." },
    ],
    sources: [
      { title: "Border Collie Dog Breed Information", organization: "American Kennel Club", url: "https://www.akc.org/dog-breeds/border-collie/", checkedAt },
      { title: "Is the Border Collie a Good Fit for You?", organization: "American Kennel Club", url: "https://www.akc.org/expert-advice/dog-breeds/border-collie-right-for-you/", checkedAt },
      { title: "Official Standard of the Border Collie", organization: "American Kennel Club", url: "https://images.akc.org/pdf/breeds/standards/Border_Collie.pdf", checkedAt },
      { title: "Border Collie History: The Herding Dog’s Development Through Time", organization: "American Kennel Club", url: "https://www.akc.org/expert-advice/dog-breeds/border-collie-history/", checkedAt: "2026-08-29" },
    ],
  },
  {
    slug: "greyhound",
    contentStatus: "mvp-editorial-draft",
    nameKo: "그레이하운드",
    nameEn: "Greyhound",
    tagline: "빠르게 달리는 순간과 집에서 쉬는 시간은 서로 모순되지 않아요.",
    palette: { primary: "#ddd4c8", secondary: "#eef0ea", ink: "#3f342d" },
    illustration: "/illustrations/v2/greyhound-card.webp",
    catalog: { group: "sighthound", discoveryTags: ["시각 하운드", "질주와 휴식", "큰 체격"] },
    historyVisual: {
      src: "/illustrations/v3/greyhound-history.webp",
      alt: "건조한 들판에서 먼 대상을 바라보는 사람과 시각 하운드형 개를 그린 편집 삽화",
    },
    identity: { origin: "고대 기원의 시각 하운드 계통", lineage: "시각 하운드", originalRole: "시각으로 사냥감을 쫓는 시각 하운드", size: "대형", lifespan: "약 10~13년 (AKC 참고 범위)" },
    behaviorClues: {
      originalRole: "시야에 들어온 대상을 빠르게 발견하고 추적하는 시각 하운드의 작업 배경이 있습니다.",
      today: "빠르고 작은 움직임 같은 시각 자극에 주의가 집중되거나 추적 행동으로 이어질 수 있습니다.",
      guardianContext: "안전한 리드와 울타리, 다른 동물과의 실제 반응을 확인하되 품종만으로 입을 사용하는 행동이나 공격성을 단정하지 않아요.",
    },
    story: {
      opening: "그레이하운드와 닮은 시각 하운드형 개의 흔적은 고대부터 발견될 만큼 오랜 역사를 가지고 있습니다. 이후 유럽, 특히 영국에서 사냥감을 눈으로 발견하고 빠르게 뒤쫓는 시각 하운드로 발전했으며, 넓은 지형에서 사냥감을 추적하는 능력이 중요하게 여겨졌습니다.",
      roleToHome: "오랜 세월 사냥감을 눈으로 찾아 뒤쫓는 사냥견으로 활약했고, 근대에는 경주에서도 뛰어난 속도로 주목받았습니다. 깊은 가슴과 긴 다리, 유연하고 넓게 뻗는 움직임은 오늘날에도 그레이하운드를 대표하는 특징입니다.",
      reality: "대형견이라는 이유만으로 넓은 마당이면 충분하다고 볼 수 없습니다. 안전한 리드 관리, 추적 본능을 고려한 환경, 체형에 맞는 편안한 휴식 공간이 필요합니다.",
    },
    tendencies: {
      activity: { label: "중간", note: "질주의 순간과 충분한 휴식이 함께 필요한 것으로 알려져 있습니다." },
      mentalStimulation: { label: "중간", note: "냄새와 시각 탐색을 포함한 차분한 외부 경험도 중요합니다." },
      independence: { label: "높은 편", note: "시각 하운드 계통의 독립적인 판단 경향이 나타날 수 있습니다." },
      socialConnection: { label: "개체별 확인 필요", note: "사람과 다른 동물에 대한 반응은 개체 경험을 직접 확인해야 합니다." },
      alerting: { label: "낮은 편", note: "일반적으로 지속적인 알림 행동이 중심인 품종은 아닙니다." },
      grooming: { label: "낮은 편", note: "짧은 털이지만 피부와 추위에 대한 생활 관리가 필요합니다." },
    },
    careNotes: ["움직이는 대상을 추적할 가능성을 고려해 안전한 리드와 울타리 환경을 확인하세요.", "짧은 털과 낮은 체지방을 고려해 추운 날씨와 단단한 바닥에서의 휴식을 살펴보세요."],
    healthEditorialNote: "응급 위험을 포함한 건강 정보는 수의학 검수 후 별도 경고 체계로 제공할 예정입니다.",
    daySnapshot: [
      { time: "아침", title: "리듬 있는 산책", description: "안전하게 주변을 보고 냄새 맡을 시간을 줘요." },
      { time: "낮", title: "편안한 휴식", description: "몸을 받쳐주는 조용한 자리를 마련해요." },
      { time: "저녁", title: "안전한 활동", description: "추적 본능을 고려한 통제된 환경이 중요해요." },
    ],
    related: [
      { slug: "border-collie", reason: "달리는 능력은 모두 뛰어나지만 일상에서 원하는 과제와 활동 리듬이 달라요." },
      { slug: "maltese", reason: "체격은 크게 다르지만 집 안에서 사람 곁에 머무는 방식의 차이를 볼 수 있어요." },
    ],
    sources: [
      { title: "Greyhound Dog Breed Information", organization: "American Kennel Club", url: "https://www.akc.org/dog-breeds/greyhound/", checkedAt },
      { title: "Greyhound Breed Standard", organization: "The Royal Kennel Club", url: "https://www.royalkennelclub.com/breed-standards/hound/greyhound/", checkedAt },
      { title: "The Greyhound Club of America — A Short History", organization: "Greyhound Club of America", url: "https://www.greyhoundclubofamericainc.org/club-history/", checkedAt },
      { title: "All About Greyhounds", organization: "Greyhound Trust", url: "https://www.greyhoundtrust.org.uk/home-a-greyhound/all-about-greyhounds", checkedAt },
      { title: "Basic Commands and Training", organization: "Greyhound Trust", url: "https://www.greyhoundtrust.org.uk/assets/000/004/111/training_tips_original.pdf?1581612710=", checkedAt },
      { title: "Quick Tips to Keep Your Greyhound Healthy in Winter", organization: "Greyhound Trust", url: "https://www.greyhoundtrust.org.uk/about-us/news/3908-quick-tips-to-keep-your-greyhound-healthy-in-winter", checkedAt },
    ],
  },
  {
    slug: "samoyed",
    contentStatus: "mvp-editorial-draft",
    nameKo: "사모예드",
    nameEn: "Samoyed",
    tagline: "눈밭의 아름다움 뒤에는 사람과 함께 일해온 힘과 두꺼운 털의 관리가 있어요.",
    palette: { primary: "#dbe7e5", secondary: "#e9edf2", ink: "#1f3c43" },
    illustration: "/illustrations/v2/samoyed-card.webp",
    catalog: { group: "northern-working", discoveryTags: ["북방 작업견", "사람과의 협력", "이중모 관리"] },
    historyVisual: {
      src: "/illustrations/v3/samoyed-history.webp",
      alt: "눈 덮인 북부 러시아와 시베리아의 생활 터전에서 순록 무리와 썰매 곁을 함께하는 사모예드들을 그린 편집 삽화",
    },
    identity: { origin: "북부 러시아·시베리아", lineage: "북방 스피츠·작업견", originalRole: "썰매견·반려견", size: "중대형 · 약 48~60cm, 16~30kg", lifespan: "약 12~14년 (AKC 참고 범위)" },
    behaviorClues: {
      originalRole: "북부 러시아와 시베리아에서 순록을 몰고 사냥과 썰매를 돕는 한편, 사람과 가까이 생활한 작업견입니다.",
      today: "가족의 활동에 참여하려 하거나 몸을 쓰는 과제와 교감을 적극적으로 찾는 모습이 보일 수 있습니다.",
      guardianContext: "충분한 활동과 함께 편안히 쉬는 시간, 더운 계절의 실내 환경과 이중모 관리까지 준비하세요. 반응은 개체마다 다릅니다.",
    },
    story: {
      opening: "사모예드는 북부 러시아와 시베리아에서 사모예드계 민족과 함께 생활하며 발전했습니다. 지역에 따라 순록을 몰고, 사냥과 썰매 이동을 도우며, 거처 안에서 사람과 가까이 지냈습니다.",
      roleToHome: "19세기 말 탐험가들이 이 개들을 영국으로 데려갔고, 1909년 첫 견종 표준이 작성되며 오늘날의 사모예드가 정립되기 시작했습니다. 탄탄하면서 유연한 몸과 촘촘한 이중모는 추운 환경에서 여러 일을 수행한 배경을 보여줍니다.",
      reality: "미소 짓는 듯한 외모만으로 선택하기에는 일상의 부담이 큽니다. 규칙적인 활동과 교감, 더운 날씨 관리, 털갈이 시기의 집중적인 빗질을 함께 준비해야 합니다.",
    },
    tendencies: {
      activity: { label: "높은 편", note: "힘과 지구력을 가진 작업견으로 규칙적인 활동이 필요합니다." },
      mentalStimulation: { label: "중간", note: "사람과 함께하는 놀이와 과제로 일상에 참여하는 것을 좋아할 수 있습니다." },
      independence: { label: "중간", note: "스피츠 계통의 자율성과 사람과의 협력 성향을 함께 볼 필요가 있습니다." },
      socialConnection: { label: "높은 편", note: "사람과 가까이 생활해온 사회적인 작업견으로 소개됩니다." },
      alerting: { label: "중간", note: "주변 변화에 반응하거나 목소리로 표현할 수 있습니다." },
      grooming: { label: "높은 편", note: "두꺼운 이중모, 특히 털갈이 시기의 관리 부담이 큽니다." },
    },
    careNotes: ["더운 날씨에는 선선한 시간대를 고르고 실내 온도와 호흡 상태를 세심하게 살펴주세요.", "평소에도 피부 가까이까지 빗고 털갈이 시기에는 관리 횟수와 건조 시간을 충분히 확보하세요."],
    healthEditorialNote: "품종별 건강 위험은 수의학 검수와 출처 교차 확인 전까지 진단형 정보로 제공하지 않습니다.",
    daySnapshot: [
      { time: "아침", title: "선선할 때 활동", description: "날씨를 고려해 충분한 움직임을 제공해요." },
      { time: "낮", title: "시원하게 쉬기", description: "실내 온도와 편안한 휴식을 확인해요." },
      { time: "저녁", title: "교감과 털 관리", description: "함께하는 놀이 뒤 이중모를 살펴봐요." },
    ],
    related: [
      { slug: "japanese-spitz", reason: "하얀 스피츠형 외모는 닮았지만 체격과 활동·털 관리 부담이 달라요." },
      { slug: "border-collie", reason: "모두 작업견 배경이 있지만 사람과 협력해온 방식과 자극의 종류가 달라요." },
    ],
    sources: [
      { title: "FCI Standard No. 212 — Samoyed", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/Nomenclature/Standards/212g05-en.pdf", checkedAt },
      { title: "Samoyed Dog Breed Information", organization: "American Kennel Club", url: "https://www.akc.org/dog-breeds/samoyed/", checkedAt },
      { title: "Samoyed History: From Nomadic Hunters to Fluffy Friends", organization: "American Kennel Club", url: "https://www.akc.org/expert-advice/dog-breeds/samoyed-history/", checkedAt },
      { title: "Is the Samoyed a Good Fit for You?", organization: "American Kennel Club", url: "https://www.akc.org/expert-advice/dog-breeds/samoyed-right-for-you/", checkedAt },
    ],
  },
  ...detailBatchA,
  ...detailBatchB,
  ...detailBatchC,
  ...detailBatchD,
  ...detailBatchE,
  ...detailBatchF,
  ...detailBatchG,
  ...detailBatchH,
  ...detailBatchI,
  ...detailBatchJ,
  ...detailBatchK,
  ...detailBatchL,
  ...detailBatchM,
  ...detailBatchN,
  ...detailBatchO,
  ...detailBatchP,
  ...detailBatchQ,
  ...detailBatchR,
  ...detailBatchS,
  ...detailBatchT,
  ...detailBatchU,
] satisfies Breed[];

export const breeds = breedCollectionSchema.parse(draftBreeds.map((breed) => (
  breed.slug === "german-spitz"
    ? { ...breed, nameKo: "포메라이언", nameEn: "Pomeranian" }
    : breed
)));

export function getBreed(slug: string) {
  return breeds.find((breed) => breed.slug === slug);
}

const catalogGroupLabels: Record<Breed["catalog"]["group"], string> = {
  companion: "반려견",
  herding: "목양견",
  sighthound: "시각 하운드",
  "northern-working": "북방 작업견",
  dachshund: "닥스훈트",
  "scent-hound": "후각 하운드",
  "retriever-spaniel": "리트리버·스패니얼",
  "spitz-primitive": "스피츠·원시형",
  "guardian-working": "경비·작업견",
  pointing: "포인팅견",
  terrier: "테리어",
};

export function getRelatedBreeds(breed: Breed) {
  const explicitRelated = breed.related.flatMap((relation) => {
    const relatedBreed = getBreed(relation.slug);
    return relatedBreed ? [{ breed: relatedBreed, reason: relation.reason }] : [];
  });

  if (explicitRelated.length >= 4) return explicitRelated;

  const includedSlugs = new Set([breed.slug, ...explicitRelated.map(({ breed: item }) => item.slug)]);
  const inferredRelated = breeds
    .filter((candidate) => !includedSlugs.has(candidate.slug))
    .map((candidate) => {
      const sharedTags = candidate.catalog.discoveryTags.filter((tag) => breed.catalog.discoveryTags.includes(tag)).length;
      const matchingTendencies = Object.keys(breed.tendencies).filter((key) => {
        const tendency = key as keyof Breed["tendencies"];
        return breed.tendencies[tendency].label === candidate.tendencies[tendency].label;
      }).length;
      const reverseRelation = candidate.related.some((relation) => relation.slug === breed.slug);
      const sameGroup = candidate.catalog.group === breed.catalog.group;

      return {
        breed: candidate,
        score: (sameGroup ? 100 : 0) + (reverseRelation ? 40 : 0) + sharedTags * 12 + matchingTendencies,
      };
    })
    .sort((left, right) => right.score - left.score || left.breed.nameKo.localeCompare(right.breed.nameKo, "ko"))
    .slice(0, 4 - explicitRelated.length)
    .map(({ breed: candidate }) => ({
      breed: candidate,
      reason: candidate.catalog.group === breed.catalog.group
        ? `같은 ${catalogGroupLabels[breed.catalog.group]} 계열에서 활동과 교감, 관리 조건의 차이를 살펴보세요.`
        : "비슷한 생활 경향을 기준으로 활동과 관리 조건의 차이를 살펴보세요.",
    }));

  return [...explicitRelated, ...inferredRelated];
}
