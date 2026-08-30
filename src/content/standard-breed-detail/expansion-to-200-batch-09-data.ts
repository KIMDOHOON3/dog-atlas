import { standardBreedDetailSchema } from "./schema";

type Step = [string, string, string, string, string];
type Reality = [string, string, string, string];
type SizeDetails = { summaryRows: { label: string; value: string }[]; detailsLabel: string; items: { id: string; label: string; value: string }[] };
type Seed = {
  slug: string; nameKo: string; metadataDescription: string; heroStatement: string; size: SizeDetails;
  storyTitle: string; storyDescription: string; steps: [Step, Step, Step]; caution: string;
  realitiesTitle: string; realities: [Reality, Reality]; readiness: [string, string, string];
  relatedTitle: string; relatedDescription: string; related: Record<string, string>;
};

const seeds = [
  {
    slug: "porcelaine", nameKo: "포셀린",
    metadataDescription: "프랑스 숲에서 작은 사냥감의 냄새를 따라 몰아가던 포셀린의 가벼운 추적, 흰 털과 주황색 귀, 생활 동선을 살펴봅니다.",
    heroStatement: "매끈하고 빛나는 흰 털과 주황색 귀가 도자기처럼 보이지만, 프랑스 숲에서 작은 사냥감의 냄새를 가볍고 오래 따라가던 후각하운드예요.",
    size: { summaryRows: [{ label: "체고", value: "성별로 다름" }, { label: "몸무게", value: "고정 기준 없음" }], detailsLabel: "공식 크기 기준 보기", items: [{ id: "male-size", label: "수컷", value: "체고 55~58cm" }, { id: "female-size", label: "암컷", value: "체고 53~56cm" }, { id: "exception", label: "예외", value: "우수한 수컷은 최대 60cm" }, { id: "weight", label: "몸무게", value: "FCI 고정 기준 없음" }] },
    storyTitle: "섬세해 보이는 흰 하운드가 왜 숲에서 지치지 않고 냄새를 이어갔을까요?",
    storyDescription: "작은 사냥감을 몰아가던 역할을 넓은 냄새 곡선, 도구 수납과 귀까지 받치는 휴식으로 바꿔봐요.",
    steps: [
      ["과거의 역할", "숲속 작은 사냥감의 냄새를 따라 대기한 사냥꾼 쪽으로 몰아갔어요.", "가볍고 지치지 않는 달리기로 냄새 길을 오래 이어가는 중형 하운드였어요. 흰 털과 주황색 귀는 다른 프랑스 하운드 사이에서도 포셀린을 바로 알아보게 해요.", "history", "프랑스 숲길에서 작은 사냥감의 냄새 흔적을 따라가는 흰색과 주황색 성견 포셀린 역사 삽화"],
      ["오늘의 활동", "넓은 S자 길에 놓인 세 냄새 표식을 천천히 이어 찾아요.", "표식 사이를 충분히 벌리고 긴 줄이 느슨한 범위에서 코로 길을 고르게 하세요. 마지막 표식에서 보호자를 돌아보면 같은 길을 반복하지 않고 끝내요.", "wide-scent-curve", "넓은 S자 길의 냄새 표식 세 개를 확인하는 성견 포셀린 삽화"],
      ["함께 살 때", "표식과 긴 줄이 사라지면 두 귀가 모두 올라가는 침대에서 쉬어요.", "냄새 천을 밀폐하고 줄을 닫힌 수납장에 넣으세요. 몸과 귀가 바닥에 흘러내리지 않는 넓은 침대에서 주변 확인이 줄 때까지 쉬게 해주세요.", "curve-to-ear-bed", "도구가 수납된 방의 넓은 침대에서 긴 귀를 편 채 쉬는 성견 포셀린 삽화"],
    ],
    caution: "후각하운드의 추적 배경이 모든 개체의 산책 반응을 정하지 않아요. 실제로 냄새에 몰입하는 거리와 돌아오는 속도를 보며 줄 길이를 조절해야 해요.",
    realitiesTitle: "지치지 않는 냄새 추적과 얇고 흰 피모는 산책 동선·날씨에서 무엇을 바꿀까요?",
    realities: [
      ["hedge-long-line", "수풀 옆에서는 자동줄보다 손에 감기지 않는 긴 줄로 출구를 먼저 막아요.", "냄새 길이 도로로 이어지지 않는 넓은 장소를 고르고 줄을 하네스에 연결하세요. 방향을 바꿀 때는 줄을 당기기보다 큰 곡선으로 함께 움직여요.", "수풀과 도로 사이 넓은 길에서 긴 줄로 안전 거리를 둔 성견 포셀린 삽화"],
      ["white-coat-weather", "얇은 흰 털은 강한 햇빛·비바람과 피부 흔적을 바로 드러내요.", "한낮을 피해 그늘진 길을 고르고 젖은 몸은 바로 닦아주세요. 산책 뒤에는 흰 털 아래 붉음과 작은 긁힘을 눈으로 살펴요.", "그늘진 현관에서 흰 털의 젖음과 피부 흔적을 살펴보는 성견 포셀린 삽화"],
    ],
    readiness: ["도로와 떨어진 넓은 냄새 산책 동선을 찾을 수 있나요?", "긴 줄을 당기지 않고 큰 곡선으로 다룰 수 있나요?", "얇은 흰 털의 햇빛·추위와 피부 흔적을 살필 수 있나요?"],
    relatedTitle: "프랑스의 긴 귀 후각하운드도 추적 대상과 피모가 달라요.", relatedDescription: "흰 바탕의 색보다 체고, 무리 추적 방식과 털 관리를 비교해보세요.",
    related: { "petit-bleu-de-gascogne": "프티 블뢰 드 가스코뉴는 푸른 반점 피모와 더 묵직한 체형으로 산토끼를 무리에서 추적해요.", "harrier": "해리어는 영국에서 산토끼를 무리로 오래 추적한 더 단단한 체형의 하운드예요." },
  },
  {
    slug: "petit-bleu-de-gascogne", nameKo: "프티 블뢰 드 가스코뉴",
    metadataDescription: "그랑 블뢰를 산토끼 사냥에 맞춰 줄인 프티 블뢰 드 가스코뉴의 푸른 반점, 무리 추적 목소리와 긴 귀 관리를 살펴봅니다.",
    heroStatement: "그랑 블뢰 드 가스코뉴의 작업 능력을 산토끼 추적에 맞는 중형 체구로 줄였으며, 검정·흰 반점이 푸르게 보이고 무리에서 목소리를 내며 냄새를 잇는 하운드예요.",
    size: { summaryRows: [{ label: "체고", value: "성별로 다름" }, { label: "몸무게", value: "고정 기준 없음" }], detailsLabel: "공식 크기 기준 보기", items: [{ id: "male-size", label: "수컷", value: "체고 52~58cm" }, { id: "female-size", label: "암컷", value: "체고 50~56cm" }, { id: "weight", label: "몸무게", value: "FCI 고정 기준 없음" }] },
    storyTitle: "큰 가스코뉴 하운드를 줄인 체구와 또렷한 목소리는 어떤 사냥에 맞았을까요?",
    storyDescription: "산토끼 냄새를 무리로 이어가던 역할을 갈라지는 흔적 찾기, 한 번 알리고 먼 매트로 돌아오는 순서로 풀어봐요.",
    steps: [
      ["과거의 역할", "그랑 블뢰보다 작은 몸으로 산토끼를 중심으로 무리 추적했어요.", "작업 목적에 맞춰 큰형의 체구를 의도적으로 줄인 품종이에요. 좋은 후각과 목소리로 무리에 쉽게 합류하며 산토끼뿐 아니라 큰 사냥감도 추적했어요.", "history", "프랑스 가스코뉴의 낮은 수풀에서 산토끼 냄새를 따라가는 푸른 반점 성견 프티 블뢰 드 가스코뉴 역사 삽화"],
      ["오늘의 활동", "두 갈래 냄새 길 가운데 이어지는 한쪽을 골라 끝까지 확인해요.", "출발점에서 두 천 조각 방향을 갈라 놓고 한쪽에만 다음 표식을 이어주세요. 맞는 길을 골랐다면 서두르지 않고 마지막 표식까지 확인한 뒤 돌아와요.", "forked-hare-scent", "두 갈래 냄새 길 가운데 이어지는 표식을 찾는 성견 프티 블뢰 드 가스코뉴 삽화"],
      ["함께 살 때", "갈림길 도구가 수납되면 조용한 넓은 침대에서 목과 귀를 펴요.", "냄새 천을 밀폐하고 긴 줄을 치운 뒤 물을 마시게 하세요. 소리가 적은 자리에서 두 귀가 접히지 않도록 넓게 쉬게 해주세요.", "fork-to-quiet-bed", "도구가 치워진 조용한 방의 넓은 침대에서 쉬는 성견 프티 블뢰 드 가스코뉴 삽화"],
    ],
    caution: "무리 사냥과 목소리 배경이 모든 개체의 짖음이나 다른 개와의 관계를 보장하지 않아요. 실제 소리 반응과 개별 거리를 기준으로 생활 동선을 나눠야 해요.",
    realitiesTitle: "냄새를 이을 때 나는 목소리와 코끝까지 닿는 귀는 현관·산책 뒤 무엇을 요구할까요?",
    realities: [
      ["voice-to-far-mat", "현관 소리를 한 번 알린 뒤 문에서 떨어진 매트로 이동하게 해요.", "문 앞에서 계속 머물지 않도록 넓은 통로 끝에 매트를 두세요. 매트로 돌아온 순간을 조용히 보상하고 문은 그 뒤에 열어요.", "닫힌 현관문에서 떨어진 매트로 돌아오는 성견 프티 블뢰 드 가스코뉴 삽화"],
      ["curled-ear-dry", "안으로 말린 긴 귀는 산책 뒤 펼쳐서 습기와 씨앗을 확인해요.", "귀를 잡아당기지 말고 한쪽씩 받쳐 안팎을 말리세요. 귓바퀴 주름과 귀 끝에 붙은 작은 씨앗도 손으로 나눠 제거해요.", "산책 뒤 안으로 말린 긴 귀의 습기와 씨앗을 확인하는 성견 프티 블뢰 드 가스코뉴 삽화"],
    ],
    readiness: ["두 갈래 이상의 냄새 길에서도 긴 줄을 안전하게 다룰 수 있나요?", "현관 알림 뒤 먼 매트로 이동하는 순서를 연습할 수 있나요?", "안으로 말린 긴 귀를 산책 뒤 말리고 확인할 수 있나요?"],
    relatedTitle: "가스코뉴의 푸른 하운드도 체구와 추적 대상이 달라요.", relatedDescription: "푸른 반점만 보지 말고 체고, 산토끼 중심 여부와 무리 반경을 비교해보세요.",
    related: { "grand-bleu-de-gascogne": "그랑 블뢰 드 가스코뉴는 프티 블뢰의 바탕이 된 더 큰 체구의 장거리 무리 하운드예요.", "gascon-saintongeois": "가스콩 생통주아는 흰 바탕의 검정 반점과 두 크기 유형을 지닌 별도 프랑스 하운드예요." },
  },
  {
    slug: "gordon-setter", nameKo: "고든 세터",
    metadataDescription: "스코틀랜드 들판에서 새의 위치를 가리키던 고든 세터의 묵직한 질주, 검정·탄 장모와 더위·깃털 관리를 살펴봅니다.",
    heroStatement: "석탄빛 검정과 선명한 탄 무늬를 지닌 세터 가운데 가장 묵직한 체형으로, 스코틀랜드 들판을 힘 있게 달리다 새의 위치를 멈춰 알리던 포인팅견이에요.",
    size: { summaryRows: [{ label: "체고", value: "성별로 다름" }, { label: "몸무게", value: "성별로 다름" }], detailsLabel: "공식 성별 크기 보기", items: [{ id: "male-size", label: "수컷", value: "체고 66cm · 29.5kg" }, { id: "female-size", label: "암컷", value: "체고 62cm · 25.5kg" }] },
    storyTitle: "검정·탄의 묵직한 세터가 들판을 달리다 갑자기 멈춘 이유는 무엇일까요?",
    storyDescription: "새의 위치를 조용히 가리키던 역할을 냄새를 발견하고 멈추는 짧은 과제와 충분한 회복으로 바꿔봐요.",
    steps: [
      ["과거의 역할", "스코틀랜드 들판을 달리다 새의 위치를 자세로 알려줬어요.", "무거운 짐을 견디는 사냥꾼에 비유될 만큼 힘 있는 체형과 꾸준한 질주선을 지녔어요. 냄새를 찾은 뒤 몸을 멈춰 사냥꾼에게 위치를 알렸어요.", "history", "스코틀랜드 황야에서 들새의 냄새 앞에 멈춰 선 검정·탄 성견 고든 세터 역사 삽화"],
      ["오늘의 활동", "넓은 들판 가장자리의 냄새 주머니를 찾으면 움직임을 멈춰요.", "긴 줄로 큰 곡선을 걷다가 냄새 주머니를 발견하면 가까이 돌진하지 않고 서 있게 해주세요. 보호자가 확인한 뒤 함께 출발점으로 돌아와요.", "moor-pause-scent", "넓은 풀밭에서 냄새 주머니 앞에 멈춰 선 검정·탄 성견 고든 세터 삽화"],
      ["함께 살 때", "주머니와 줄이 수납되면 깃털 같은 꼬리까지 펴고 쉬어요.", "도구를 닫힌 수납장에 넣고 물을 마시게 하세요. 몸과 꼬리 장식털이 모두 올라가는 서늘한 침대에서 숨이 고르게 돌아올 때까지 쉬어요.", "pause-to-plume-bed", "도구가 수납된 방의 서늘한 넓은 침대에서 쉬는 검정·탄 성견 고든 세터 삽화"],
    ],
    caution: "포인팅 배경이 모든 개체의 멈춤이나 새 반응을 같게 만들지 않아요. 실제 시선과 속도를 보며 자극과의 거리를 넓혀야 해요.",
    realitiesTitle: "검정 장모와 귀·다리·꼬리의 긴 장식털은 계절과 들판 산책 뒤 무엇을 바꿀까요?",
    realities: [
      ["black-coat-shade", "검정 장모는 햇빛을 빠르게 받아 한낮보다 그늘진 시간대가 중요해요.", "기온과 바닥 열을 먼저 확인하고 긴 활동을 서늘한 시간으로 옮기세요. 물과 그늘을 가까이 두고 숨이 가빠지기 전에 돌아와요.", "그늘진 산책길에서 물을 마시며 쉬는 검정·탄 성견 고든 세터 삽화"],
      ["feather-burr-check", "귀·다리·배·꼬리 장식털은 풀밭 뒤 씨앗과 엉킴을 구역별로 풀어요.", "귀 뒤와 겨드랑이를 손가락으로 먼저 나누고 작은 씨앗을 끝에서부터 제거하세요. 발가락 사이의 긴 털과 물기도 함께 확인해요.", "풀밭 산책 뒤 귀와 다리와 꼬리 장식털의 씨앗을 확인하는 검정·탄 성견 고든 세터 삽화"],
    ],
    readiness: ["넓은 장소에서 찾고 멈추는 과제를 안전하게 만들 수 있나요?", "검정 장모의 더위를 피해 활동 시간을 바꿀 수 있나요?", "귀·다리·배·꼬리 장식털을 산책 뒤 구역별로 관리할 수 있나요?"],
    relatedTitle: "세터도 체구와 피모, 들판에서 움직이는 방식이 달라요.", relatedDescription: "포인팅 역할만 보지 말고 체중, 질주선과 털 관리 범위를 비교해보세요.",
    related: { "english-setter": "잉글리시 세터는 더 가벼운 윤곽과 점박이 피모를 지닌 영국 세터예요.", "irish-red-setter": "아이리시 레드 세터는 붉은 단색 장모와 더 가벼운 질주 인상을 보이는 세터예요." },
  },
  {
    slug: "german-long-haired-pointer", nameKo: "저먼 롱헤어드 포인터",
    metadataDescription: "들판·물·숲에서 포인팅과 회수를 모두 맡은 저먼 롱헤어드 포인터의 다목적 작업, 갈색 장모와 젖은 피모 관리를 살펴봅니다.",
    heroStatement: "새 사냥개·매사냥개·워터독·후각하운드 계통을 바탕으로 들판과 물, 숲에서 사냥 전후의 일을 모두 맡도록 다듬은 갈색 장모의 다목적 포인팅견이에요.",
    size: { summaryRows: [{ label: "체고", value: "성별·이상적 범위 있음" }, { label: "몸무게", value: "평균 약 30kg" }], detailsLabel: "공식 크기 기준 보기", items: [{ id: "male-size", label: "수컷", value: "60~70cm · 이상적 63~66cm" }, { id: "female-size", label: "암컷", value: "58~66cm · 이상적 60~63cm" }, { id: "weight", label: "몸무게", value: "평균 약 30kg" }] },
    storyTitle: "한 마리가 들판·물·숲과 사냥 전후의 일을 모두 맡아야 했던 이유는 무엇일까요?",
    storyDescription: "다목적 작업을 세 환경의 표식 확인, 젖은 장비 수납과 충분한 건조로 나눠 일상에 옮겨봐요.",
    steps: [
      ["과거의 역할", "들판·물·숲에서 새를 찾고 가리키며 사냥 뒤 회수까지 맡았어요.", "1879년부터 순수 번식의 특징을 정리했고 1897년 첫 표준이 기반을 세웠어요. 여러 작업견 계통을 바탕으로 환경이 바뀌어도 사냥 전후를 이어가는 능력을 골랐어요.", "history", "독일의 들판과 얕은 물과 숲이 만나는 곳에서 작업하는 갈색 성견 저먼 롱헤어드 포인터 역사 삽화"],
      ["오늘의 활동", "마른 풀·낮은 물받이·나무 그늘의 세 표식을 순서대로 확인해요.", "미끄럽지 않은 한 동선에 서로 다른 바닥 표식 세 개를 두세요. 각 표식의 냄새 주머니를 확인하고 보호자를 돌아보면 다음 환경으로 이동해요.", "field-water-forest-route", "마른 풀과 낮은 물받이와 나무 그늘의 세 표식을 확인하는 갈색 성견 저먼 롱헤어드 포인터 삽화"],
      ["함께 살 때", "젖은 도구가 분리 수납되면 마른 침대에서 온몸을 쉬어요.", "젖은 천과 마른 천을 다른 통에 넣고 발과 배를 닦아주세요. 몸과 꼬리 장식털이 모두 올라가는 침대에서 흥분이 가라앉을 때까지 쉬게 해요.", "route-to-dry-bed", "젖은 도구가 분리 수납된 방의 마른 넓은 침대에서 쉬는 갈색 성견 저먼 롱헤어드 포인터 삽화"],
    ],
    caution: "다목적 작업견 배경이 모든 개체에게 물이나 회수를 좋아하게 만들지 않아요. 낯선 바닥과 물은 스스로 접근할 선택을 주고 실제 반응에 맞춰 단계를 줄여야 해요.",
    realitiesTitle: "물과 숲을 오가는 갈색 장모는 젖은 날과 풀씨 많은 계절에 무엇을 요구할까요?",
    realities: [
      ["wet-undercoat-dry", "젖은 귀·가슴·배의 속털은 겉만 닦지 말고 층을 나눠 말려요.", "수건으로 눌러 물기를 빼고 손가락으로 털을 벌려 피부 가까운 습기를 확인하세요. 완전히 마르기 전에는 젖은 하네스를 다시 채우지 않아요.", "물 활동 뒤 귀와 가슴과 배의 속털을 수건으로 말리는 갈색 성견 저먼 롱헤어드 포인터 삽화"],
      ["forest-feather-check", "숲길 뒤에는 귀·다리 장식털과 발가락 사이의 씨앗을 따로 찾아요.", "긴 털을 끝에서부터 나누고 붙은 열매를 손으로 제거하세요. 발바닥의 작은 돌과 꼬리 장식털의 엉킴도 함께 살펴요.", "숲길 산책 뒤 귀와 다리 장식털과 발을 확인하는 갈색 성견 저먼 롱헤어드 포인터 삽화"],
    ],
    readiness: ["들판·물·숲을 대신할 서로 다른 찾기 환경을 안전하게 만들 수 있나요?", "젖은 장모와 속털을 피부 가까이까지 말릴 수 있나요?", "귀·다리·꼬리 장식털과 발을 산책 뒤 확인할 수 있나요?"],
    relatedTitle: "독일 포인팅견도 피모와 물·숲 작업 범위가 달라요.", relatedDescription: "갈색 외형보다 털 길이, 회수 환경과 산책 뒤 관리 시간을 비교해보세요.",
    related: { "german-short-haired-pointing-dog": "저먼 쇼트헤어드 포인터는 같은 다목적 작업을 더 짧은 피모로 수행해요.", "german-wire-haired-pointing-dog": "저먼 와이어헤어드 포인터는 거친 보호 털과 수염을 지닌 별도 독일 포인팅견이에요." },
  },
  {
    slug: "french-spaniel", nameKo: "프렌치 스패니얼",
    metadataDescription: "중세 프랑스 새 사냥개 계통에서 이어진 프렌치 스패니얼의 단단한 포인팅과 회수, 흰색·갈색 장모 관리를 살펴봅니다.",
    heroStatement: "중세 기록의 새 사냥개 계통에서 이어져, 들판에서 냄새를 찾으면 단단히 멈춰 위치를 알리고 사냥 뒤에는 부드럽게 회수하던 흰색·갈색의 포인팅 스패니얼이에요.",
    size: { summaryRows: [{ label: "체고", value: "성별·허용 범위 있음" }, { label: "몸무게", value: "고정 기준 없음" }], detailsLabel: "공식 크기 기준 보기", items: [{ id: "male-size", label: "수컷", value: "체고 56~61cm" }, { id: "female-size", label: "암컷", value: "체고 55~59cm" }, { id: "tolerance", label: "허용", value: "공통 +2cm · -1cm" }, { id: "weight", label: "몸무게", value: "FCI 고정 기준 없음" }] },
    storyTitle: "중세 새 사냥개에서 이어진 프렌치 스패니얼은 왜 찾기와 회수를 함께 맡았을까요?",
    storyDescription: "단단히 멈춰 알리고 가져오던 역할을 발견-멈춤-부드러운 전달의 짧은 순서로 바꿔봐요.",
    steps: [
      ["과거의 역할", "들새를 찾아 위치를 가리키고 사냥 뒤에는 회수했어요.", "중세 가스통 페뷔스가 묘사한 새 사냥개의 후손으로 설명되며 1891년 첫 표준이 작성됐어요. 들판에서 단단히 멈추는 포인팅과 회수 능력을 함께 다듬었어요.", "history", "19세기 프랑스 들판에서 들새의 냄새 앞에 멈춰 선 흰색·갈색 성견 프렌치 스패니얼 역사 삽화"],
      ["오늘의 활동", "숨겨진 냄새 주머니 앞에 멈춘 뒤 부드러운 천 물체를 가져와요.", "냄새 주머니를 찾으면 잠시 서 있게 하고, 보호자가 놓아준 부드러운 천 물체 하나만 물어 출발 매트로 돌아오게 하세요. 당기기 놀이로 바꾸지 않고 손바닥에 놓으면 끝내요.", "point-soft-retrieve", "숨겨진 냄새 주머니 앞에 멈춘 뒤 부드러운 천 물체를 가져오는 성견 프렌치 스패니얼 삽화"],
      ["함께 살 때", "천 물체가 수납되면 물을 마시고 조용한 침대에서 쉬어요.", "젖거나 더러워진 물체를 닫힌 통에 넣고 발을 닦아주세요. 긴 꼬리 장식털까지 침대에 올라오게 한 뒤 다음 놀이를 바로 이어가지 않아요.", "retrieve-to-quiet-bed", "천 물체가 수납된 방의 조용한 침대에서 쉬는 성견 프렌치 스패니얼 삽화"],
    ],
    caution: "포인팅과 회수 배경이 모든 개체의 물기나 전달 행동을 보장하지 않아요. 물체를 억지로 빼앗지 말고 스스로 놓는 짧은 순서부터 확인해야 해요.",
    realitiesTitle: "흰색·갈색 장모와 들판 회수 배경은 산책 뒤 털 관리와 물건 수납에서 무엇을 바꿀까요?",
    realities: [
      ["feather-seed-map", "귀·겨드랑이·다리·꼬리 장식털은 들판 뒤 순서를 정해 씨앗을 찾아요.", "귀 뒤부터 겨드랑이, 다리와 꼬리 순서로 털을 나누세요. 끝에서부터 엉킴을 풀고 발가락 사이에 남은 풀씨도 확인해요.", "들판 산책 뒤 귀와 다리와 꼬리 장식털의 씨앗을 구역별로 확인하는 성견 프렌치 스패니얼 삽화"],
      ["household-object-storage", "양말·수건과 놀이용 천 물체는 서로 다른 닫힌 곳에 보관해요.", "가져와도 되는 물체는 한 바구니에서만 꺼내고 생활용 천은 문이 있는 수납장에 넣으세요. 잘못 문 물건은 쫓아가지 말고 교환할 물체를 보여주세요.", "닫힌 생활용품 수납장과 열린 놀이 바구니를 구분하는 성견 프렌치 스패니얼 삽화"],
    ],
    readiness: ["찾고 멈추고 가져오는 순서를 짧게 나눌 수 있나요?", "긴 장식털의 씨앗과 엉킴을 산책 뒤 관리할 수 있나요?", "생활용 천과 놀이용 물체를 닫힌 수납으로 구분할 수 있나요?"],
    relatedTitle: "프랑스 포인팅 스패니얼도 작업 지형과 피모가 달라요.", relatedDescription: "스패니얼 이름보다 멈춤·회수 범위, 체고와 장식털 관리를 비교해보세요.",
    related: { "brittany-spaniel": "브리트니는 더 작고 가벼운 체구로 빠르게 범위를 넓히는 프랑스 포인팅견이에요.", "small-munsterlander": "스몰 문스터랜더는 독일의 다목적 포인팅견으로 숲과 물 회수까지 폭넓게 맡아요." },
  },
  {
    slug: "braque-saint-germain", nameKo: "브라크 생제르맹",
    metadataDescription: "1830년대 프랑스 왕실 견사에서 형성된 브라크 생제르맹의 중간 범위 포인팅, 부드러운 회수와 흰색·주황색 단모 관리를 살펴봅니다.",
    heroStatement: "1830년 무렵 콩피에뉴 왕실 견사에서 잉글리시 포인터와 대륙 포인터를 교배해 만들었으며, 중간 범위를 부드럽게 달리고 새를 가리킨 뒤 거칠지 않게 회수하던 흰색·주황색 포인터예요.",
    size: { summaryRows: [{ label: "체고", value: "성별·예외 허용 있음" }, { label: "몸무게", value: "고정 기준 없음" }], detailsLabel: "공식 크기 기준 보기", items: [{ id: "male-size", label: "수컷", value: "체고 56~62cm" }, { id: "female-size", label: "암컷", value: "체고 54~59cm" }, { id: "tolerance", label: "예외 허용", value: "우수한 개체는 +2cm" }, { id: "weight", label: "몸무게", value: "FCI 고정 기준 없음" }] },
    storyTitle: "왕실 견사에서 시작한 흰색·주황색 포인터는 왜 멀리 사라지지 않는 범위를 골랐을까요?",
    storyDescription: "중간 범위로 새를 찾고 부드럽게 회수하던 역할을 넓지만 보이는 탐색, 조용한 전달과 선택 가능한 시작으로 풀어봐요.",
    steps: [
      ["과거의 역할", "중간 범위로 들새를 찾고 멈춰 알린 뒤 부드럽게 회수했어요.", "1830년 무렵 콩피에뉴 왕실 견사에서 잉글리시 포인터와 대륙 포인터를 교배해 형성했어요. 생제르맹앙레로 옮겨 이어졌고 1863년 첫 프랑스 도그쇼에도 많이 출전했어요.", "history", "19세기 콩피에뉴 숲 가장자리에서 들새 냄새 앞에 멈춰 선 흰색·주황색 성견 브라크 생제르맹 역사 삽화"],
      ["오늘의 활동", "보호자가 보이는 넓은 반원 안에서 냄새 표식을 찾고 천 물체를 가져와요.", "표식 세 개를 중간 거리의 반원으로 놓고 긴 줄이 느슨한 범위에서 찾게 하세요. 마지막에 놓인 부드러운 천 물체를 물면 출발 매트까지 천천히 함께 돌아와요.", "visible-arc-retrieve", "보호자가 보이는 반원형 표식 길에서 천 물체를 가져오는 성견 브라크 생제르맹 삽화"],
      ["함께 살 때", "표식과 물체가 수납되면 출발 매트가 넓은 휴식 자리로 바뀌어요.", "놀이 물체를 닫힌 통에 넣고 긴 줄을 치우세요. 같은 매트 위에 물과 얇은 침구를 놓아 다음 지시를 기다리지 않고 쉬게 해주세요.", "arc-to-rest-mat", "도구가 수납된 방의 넓은 매트에서 쉬는 성견 브라크 생제르맹 삽화"],
    ],
    caution: "사람 가까이 일하고 부드러운 훈련에 반응했다는 표준 설명이 모든 개체의 친화성이나 회수를 보장하지 않아요. 접촉과 물체 전달은 개가 선택할 수 있는 거리에서 시작해야 해요.",
    realitiesTitle: "사람 가까이 일한 포인터와 흰색·주황색 단모는 교육 방식·계절 산책에서 무엇을 요구할까요?",
    realities: [
      ["choice-start-gate", "거친 제지보다 출발선에서 참여할지 고를 짧은 시간을 줘요.", "하네스를 채운 뒤 바로 끌고 가지 말고 열린 출발선 앞에서 기다리세요. 개가 보호자를 보고 앞으로 나오면 시작하고 뒤로 물러나면 거리를 넓혀요.", "열린 출발선 앞에서 보호자의 조용한 손짓을 보고 선택하는 성견 브라크 생제르맹 삽화"],
      ["pale-coat-weather", "짧고 밝은 털은 강한 햇빛·찬비와 작은 피부 흔적을 바로 받아요.", "한낮을 피해 그늘진 길을 고르고 비에 젖은 몸은 바로 닦으세요. 흰 털 아래 붉음과 발의 작은 긁힘도 산책 뒤 살펴요.", "그늘진 현관에서 밝은 단모와 발을 살펴보는 성견 브라크 생제르맹 삽화"],
    ],
    readiness: ["보호자가 보이는 중간 범위에서 찾기 과제를 운영할 수 있나요?", "강하게 제지하지 않고 선택 가능한 시작을 만들 수 있나요?", "밝은 단모의 햇빛·찬비와 피부 흔적을 살필 수 있나요?"],
    relatedTitle: "프랑스 포인터도 형성 계통과 탐색 반경이 달라요.", relatedDescription: "흰색·주황색 외형보다 사람과의 거리, 포인팅 범위와 피모를 비교해보세요.",
    related: { "english-pointer": "잉글리시 포인터는 브라크 생제르맹 형성에 쓰였으며 더 넓은 들판을 빠르게 훑는 인상이 강해요.", "german-short-haired-pointing-dog": "저먼 쇼트헤어드 포인터는 물과 숲의 회수까지 폭넓게 맡은 독일 다목적 포인팅견이에요." },
  },
] satisfies Seed[];

const appendAndParticle = (name: string) => {
  const lastCodePoint = name.charCodeAt(name.length - 1);
  const hasFinalConsonant = lastCodePoint >= 0xac00 && lastCodePoint <= 0xd7a3 && (lastCodePoint - 0xac00) % 28 !== 0;
  return `${name}${hasFinalConsonant ? "과" : "와"}`;
};

export const expansionTo200Batch09StandardBreedDetails = seeds.map((seed) =>
  standardBreedDetailSchema.parse({
    slug: seed.slug, nameKo: seed.nameKo, metadataDescription: seed.metadataDescription, heroStatement: seed.heroStatement, heroSizeDetails: seed.size,
    story: {
      title: seed.storyTitle, description: seed.storyDescription,
      steps: seed.steps.map(([navLabel, title, body, imageId, imageAlt], index) => ({
        navLabel, eyebrow: `${index + 1}단계 · ${index === 0 ? "무엇을 하던 개였을까?" : index === 1 ? "그 흔적은 지금 어떻게 나타날까?" : "보호자는 무엇을 체감할까?"}`,
        title, body, image: `/illustrations/${imageId === "history" ? "v3" : "v4"}/${seed.slug}-${imageId === "history" ? "history" : `feature-${imageId}`}.webp`, imageAlt,
      })),
      caution: seed.caution,
    },
    realitiesTitle: seed.realitiesTitle,
    realities: seed.realities.map(([id, title, body, imageAlt]) => ({ id, title, body, image: `/illustrations/v4/${seed.slug}-feature-${id}.webp`, imageAlt })),
    readinessTitle: `${appendAndParticle(seed.nameKo)} 살기 전 확인할 세 가지`, readinessQuestions: seed.readiness,
    relatedTitle: seed.relatedTitle, relatedDescription: seed.relatedDescription, relatedDifferences: seed.related,
  }),
);
