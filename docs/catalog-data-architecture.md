# 견종 카탈로그 데이터 아키텍처

문서 상태: 구현 제안안  
작성일: 2026-08-03  
대상 규모: 마스터 카탈로그 100종 이상, 상세 콘텐츠 우선 발행 20종  
기준 자료: 현재 `schema.ts`·`data.ts`·`catalog.ts`, `catalog-20-proposal.md`

## 1. 결론

견종의 이름과 탐색 정보만 담는 **마스터 카탈로그**와 역사·행동·돌봄 원고를 담는 **상세 콘텐츠**를 별도 컬렉션으로 분리한다.

- 마스터 카탈로그는 100종 이상을 모두 포함하며 검색, 필터, 후보 보관함, 사이트맵의 원본이 된다.
- 상세 콘텐츠는 우선 20종만 만들고 마스터의 `slug`를 외래키처럼 참조한다.
- 목록 화면과 Client Component에는 마스터에서 필요한 작은 DTO만 전달한다.
- 상세·비교 화면은 상세 콘텐츠가 발행된 견종만 완전한 정보로 렌더링한다.
- 기존 `Breed`, `breeds`, `getBreed()` 계약은 초기 마이그레이션 동안 호환 어댑터로 유지한다.

이 방식이면 100번째 견종을 검색 결과에 추가하기 위해 100번째 상세 원고까지 작성할 필요가 없고, 상세 원고가 없는 견종을 완성된 정보처럼 노출하는 문제도 피할 수 있다.

## 2. 현재 구조 감사

### 2.1 확인된 장점

- 모든 데이터가 Zod를 통과하므로 잘못된 필드가 빌드 전에 드러난다.
- `slug`가 URL, 관련 견종, 비교 후보의 공통 식별자로 이미 사용된다.
- 행동 축을 하나의 적합도 점수로 합치지 않고 독립적으로 보관한다.
- 출처에 확인일이 있고, 관련 견종 참조 무결성을 테스트한다.
- 현재 5종에서는 하나의 `Breed` 객체를 홈·상세·비교가 공유해 구현이 단순하다.

### 2.2 100종 확장에서 생기는 문제

현재 `breedSchema`는 목록에 견종 하나를 추가할 때도 다음 상세 필드를 전부 요구한다.

- 역사 시각 자료와 긴 역사 원고
- 행동 단서 3개와 행동 경향 6개 설명
- 돌봄 문구, 건강 편집 문구, 하루 장면 3개
- 관련 견종과 연결 이유, 상세 출처

이 때문에 “검색 가능한 견종 수”와 “편집 완료된 상세 페이지 수”를 독립적으로 늘릴 수 없다. 또한 `catalog.ts`가 상세 배열인 `breeds`를 직접 필터링하므로 카탈로그 진행률도 상세 원고 수와 동일해진다.

그 밖의 결합 지점은 다음과 같다.

- `contentStatus`가 `mvp-editorial-draft` 한 값으로 고정되어 실제 발행·검수 수명주기를 표현하지 못한다.
- `catalog.group`이 네 종류뿐이라 20종 제안의 리트리버, 스패니얼, 후각 하운드, 수호견 등을 안정적으로 분류하기 어렵다.
- `identity.size`, 활동·털 관리 단계가 한글 표시 문자열이라 필터 조건과 화면 카피가 결합돼 있다.
- 홈, 루트 Provider, 사이트맵이 상세 `breeds` 전체를 import한다.
- `getBreed()`가 배열을 매번 선형 탐색한다. 100종에서는 치명적이지 않지만 색인 생성이 더 명확하고 안전하다.
- 공통 행동 출처가 별도 배열이고 견종별 출처는 객체로 반복되어 출처 중복과 수정 불일치가 생길 수 있다.
- `illustration` 필드는 현재 실제 카드 이미지 매핑과 일치하지 않아 데이터와 렌더링 자산의 단일 원본이 아니다.

## 3. 데이터 계층

```text
Master catalog (100+)
  slug, 이름, 별칭, 탐색 분류, 독립 비교 축, 짧은 카드 카피,
  상세 제공 상태, 최소 출처
                │ slug로 결합
                ▼
Detail content (초기 20)
  히어로/역사/행동/돌봄/하루 장면/관련 이유/상세 출처
                │
                ▼
Selectors & adapters
  검색 DTO, 카드 DTO, 비교 모델, 기존 Breed 호환 모델
```

마스터는 상세 콘텐츠를 import하지 않는다. 상세 레지스트리와 selector만 두 계층을 함께 import할 수 있다. 이 의존 방향을 지켜야 홈 검색 번들에 상세 원고 20종 전체가 섞이지 않는다.

## 4. 마스터 카탈로그 스키마

### 4.1 필수 필드

| 필드 | 목적 | 비고 |
|---|---|---|
| `slug` | 영구 식별자와 URL | 발행 뒤 변경 금지, 변경 시 별도 redirect 관리 |
| `name.ko`, `name.en` | 기본 표시명 | 협회별 표기 차이는 aliases에 둔다 |
| `aliases.ko`, `aliases.en` | 검색 동의어 | 빈 배열 허용, 중복·공백 정규화 |
| `origin.label` | 카드용 형성 지역 | 국가 단정이 어려운 경우 편집 문구 허용 |
| `classification.editorialGroup` | 한 개의 주 탐색 그룹 | 화면 그룹이며 공식 협회 그룹과 분리 |
| `classification.roleTags` | 원래 역할 다중 분류 | 최소 1개 |
| `sizeBand` | 독립 크기 필터 | `xs`~`xl`, 표시명은 별도 label map |
| `comparisonAxes` | 활동·털 관리·알림 독립 축 | 값 미확정은 `null`; 총점 계산 금지 |
| `catalogLine` | 카드 한 줄 설명 | 관찰 가능한 행동·관리 맥락 중심 |
| `discoveryTags` | 검색·발견 키워드 | 최소 2개, 통제 어휘 우선 |
| `publication` | 목록·상세·검수 상태 | 서로 다른 상태 축으로 분리 |
| `sourceIds` | 기본 사실의 근거 | 공개 항목은 최소 1개 |

### 4.2 선택 필드

| 필드 | 사용하는 경우 |
|---|---|
| `origin.countryCodes` | 국가 기반 필터가 사실관계를 왜곡하지 않을 때만 사용 |
| `classification.officialGroups` | AKC, FCI 등 출처별 공식 그룹을 따로 표시할 때 사용 |
| `media.card` | 검수된 카드 이미지가 있을 때 사용; 없으면 UI fallback 사용 |
| `climateTags` | `heat-sensitive`, `cold-sensitive`처럼 편집 검수된 경우 |
| `relatedBreedSlugs` | 상세 원고 없이도 탐색 연결을 제공할 때 |
| `sortKeyKo` | 기본 이름 정렬 외 별도 편집 순서가 필요할 때 |
| `featuredCollections` | 오늘의 발견 등 수동 큐레이션에 포함할 때 |

선택 필드는 필터에서 “낮음”이나 “해당 없음”으로 해석하지 않는다. `undefined`나 `null`은 **정보 미확정**이며 해당 필터 결과에서 제외한다.

### 4.3 TypeScript/Zod 제안

```ts
import { z } from "zod";

export const breedSlugSchema = z.string().regex(/^[a-z0-9-]+$/);
export const sizeBandSchema = z.enum(["xs", "s", "m", "l", "xl"]);
export const tendencyBandSchema = z.enum(["low", "moderate", "high", "very-high"]);

export const editorialGroupSchema = z.enum([
  "companion-toy",
  "spitz-northern",
  "herding",
  "guardian-working",
  "retriever-spaniel",
  "scenthound",
  "sighthound",
  "terrier",
  "primitive-hunting",
  "other-working",
]);

export const roleTagSchema = z.enum([
  "companion",
  "herding",
  "livestock-guardian",
  "retrieving",
  "flushing",
  "scent-trailing",
  "sighthound-pursuit",
  "burrow-hunting",
  "sled-work",
  "watching",
]);

export const catalogEntrySchema = z.object({
  slug: breedSlugSchema,
  name: z.object({
    ko: z.string().min(1),
    en: z.string().min(1),
  }),
  aliases: z.object({
    ko: z.array(z.string().min(1)).default([]),
    en: z.array(z.string().min(1)).default([]),
  }),
  origin: z.object({
    label: z.string().min(1),
    countryCodes: z.array(z.string().length(2)).optional(),
  }),
  classification: z.object({
    editorialGroup: editorialGroupSchema,
    roleTags: z.array(roleTagSchema).min(1),
    officialGroups: z.record(z.string(), z.string()).optional(),
  }),
  sizeBand: sizeBandSchema,
  comparisonAxes: z.object({
    activity: tendencyBandSchema.nullable(),
    grooming: tendencyBandSchema.nullable(),
    alerting: tendencyBandSchema.nullable(),
  }),
  catalogLine: z.string().min(15).max(120),
  discoveryTags: z.array(z.string().min(1)).min(2),
  media: z.object({
    card: z.object({
      src: z.string().startsWith("/"),
      alt: z.string().min(1),
    }).optional(),
  }).default({}),
  relatedBreedSlugs: z.array(breedSlugSchema).default([]),
  featuredCollections: z.array(z.string().min(1)).default([]),
  publication: z.object({
    catalogStatus: z.enum(["draft", "published", "archived"]),
    detailStatus: z.enum(["none", "draft", "published"]),
    reviewStatus: z.enum(["draft", "source-reviewed", "expert-reviewed"]),
    updatedAt: z.iso.date(),
  }),
  sourceIds: z.array(z.string().min(1)),
});

export type BreedCatalogEntry = z.infer<typeof catalogEntrySchema>;
```

`catalogStatus`, `detailStatus`, `reviewStatus`를 분리하는 이유는 다음과 같다.

- 이름·계통·카드 카피만 검수되어 목록에는 공개할 수 있지만 상세는 없을 수 있다.
- 상세 원고가 존재해도 아직 공개하지 않을 수 있다.
- 공개 상태와 전문가 검수 여부는 같은 의미가 아니다.

컬렉션 schema의 `superRefine`에서는 공개된 항목에 `sourceIds`가 최소 1개인지, slug와 이름·별칭이 중복되지 않는지, 자기 자신을 관련 견종으로 참조하지 않는지를 검사한다.

## 5. 상세 콘텐츠 스키마

상세 콘텐츠는 마스터와 중복되는 이름, 크기 단계, 탐색 그룹을 다시 저장하지 않는다. `slug`로 결합하고, 상세 화면에 필요한 설명과 자산만 가진다.

### 5.1 필수 필드

| 영역 | 필수 데이터 |
|---|---|
| 식별 | `slug`, `contentVersion` |
| 히어로 | `tagline`, palette 또는 theme key, detail visual |
| 정체성 보충 | 계통 표시 문구, 원래 역할 문구, 수명 표시 문구 |
| 역사 | opening, role-to-home, 필요 시 history visual |
| 행동 단서 | 원래 역할, 오늘 보일 수 있는 장면, 보호자가 확인할 맥락 |
| 행동 경향 | 6개 축의 label과 근거 설명 |
| 생활 현실 | care notes, 건강 편집 안내, 하루 장면 3개 이상 |
| 연결 | 관련 견종 slug와 비교 이유 |
| 근거 | 상세에서 사용한 source ID 1개 이상 |

### 5.2 선택 필드

- 역사 삽화: 없어도 텍스트가 완전해야 한다.
- 수의학 검수 건강 모듈: 전문가 검수 전에는 진단형 정보 대신 편집 안내만 사용한다.
- 한국 생활 맥락 모듈: 공동주택, 기후, 이동 환경에 대한 별도 검수가 끝난 경우만 추가한다.
- 장기적으로 추가할 미디어·오디오·영상은 코어 schema가 아니라 optional module로 둔다.

### 5.3 Zod 구조 제안

```ts
const tendencyDetailSchema = z.object({
  band: tendencyBandSchema.nullable(),
  label: z.string().min(1),
  note: z.string().min(10),
  sourceIds: z.array(z.string().min(1)).default([]),
});

export const breedDetailContentSchema = z.object({
  slug: breedSlugSchema,
  contentVersion: z.number().int().positive(),
  hero: z.object({
    tagline: z.string().min(10),
    theme: z.object({
      primary: z.string(),
      secondary: z.string(),
      ink: z.string(),
    }),
    visual: z.object({ src: z.string().startsWith("/"), alt: z.string().min(1) }),
  }),
  identityEditorial: z.object({
    lineageLabel: z.string().min(1),
    originalRoleLabel: z.string().min(1),
    lifespanLabel: z.string().min(1),
  }),
  historyVisual: z.object({
    src: z.string().startsWith("/"),
    alt: z.string().min(1),
  }).optional(),
  behaviorClues: z.object({
    originalRole: z.string().min(20),
    today: z.string().min(20),
    guardianContext: z.string().min(20),
  }),
  story: z.object({
    opening: z.string().min(30),
    roleToHome: z.string().min(30),
    reality: z.string().min(30),
  }),
  tendencies: z.object({
    activity: tendencyDetailSchema,
    mentalStimulation: tendencyDetailSchema,
    independence: tendencyDetailSchema,
    socialConnection: tendencyDetailSchema,
    alerting: tendencyDetailSchema,
    grooming: tendencyDetailSchema,
  }),
  careNotes: z.array(z.string().min(10)).min(2),
  healthEditorialNote: z.string().min(20),
  daySnapshot: z.array(z.object({
    time: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
  })).min(3),
  related: z.array(z.object({
    slug: breedSlugSchema,
    reason: z.string().min(10),
  })).min(2),
  sourceIds: z.array(z.string().min(1)).min(1),
});

export type BreedDetailContent = z.infer<typeof breedDetailContentSchema>;
export type PublishedBreed = BreedCatalogEntry & { detail: BreedDetailContent };
```

마스터의 `comparisonAxes`와 상세 `tendencies.*.band`가 모두 존재할 때는 빌드 검증에서 값이 같은지 확인한다. 상세가 더 풍부한 설명을 가지더라도 필터 단계와 상세 단계가 서로 모순되면 안 된다.

## 6. 출처 레지스트리

출처 객체를 견종마다 복사하지 않고 ID로 참조한다.

```ts
const sourceRegistrySchema = z.record(
  z.string(),
  z.object({
    title: z.string().min(1),
    organization: z.string().min(1),
    url: z.url(),
    checkedAt: z.iso.date(),
    sourceType: z.enum(["breed-standard", "veterinary", "behavior-research", "welfare-guidance"]),
  }),
);
```

`sourceIds`가 레지스트리에 실제 존재하는지, 상세 관련 견종 slug가 마스터에 존재하는지는 모든 파일을 합친 registry 단계에서 검사한다. 파일 단위 schema만으로는 컬렉션 간 참조 무결성을 확인할 수 없다.

## 7. 권장 파일 구조

```text
src/content/breeds/
├─ schemas/
│  ├─ shared.ts
│  ├─ catalog-entry.ts
│  ├─ detail-content.ts
│  └─ registry.ts
├─ master/
│  ├─ companion-toy.ts
│  ├─ spitz-northern.ts
│  ├─ herding.ts
│  ├─ guardian-working.ts
│  ├─ retriever-spaniel.ts
│  ├─ hounds.ts
│  └─ index.ts
├─ details/
│  ├─ japanese-spitz.ts
│  ├─ maltese.ts
│  ├─ border-collie.ts
│  ├─ greyhound.ts
│  ├─ samoyed.ts
│  └─ index.ts
├─ sources/
│  ├─ breed-standards.ts
│  ├─ behavior.ts
│  ├─ veterinary.ts
│  └─ index.ts
├─ selectors.ts
├─ search-index.ts
├─ legacy-adapter.ts
└─ index.ts
```

마스터는 한 파일에 100개를 넣지 않고 편집 그룹별 10~25개 단위로 나눈다. 상세는 견종당 한 파일을 원칙으로 해 충돌과 검수 범위를 줄인다. `index.ts`만 컬렉션을 합치고 Zod parse와 교차 검증을 수행한다.

JSON보다 TypeScript 객체를 우선 권장한다. 현재 팀이 TypeScript 중심이고 이미지 경로·enum·`satisfies` 검사를 즉시 받을 수 있기 때문이다. 비개발 편집자가 직접 관리하게 되는 시점에는 같은 schema를 유지한 채 CMS export를 입력원으로 교체한다.

## 8. Selector와 공개 API

화면이 원본 배열을 직접 import하지 않도록 다음 API를 제공한다.

```ts
export const catalogEntries: readonly BreedCatalogEntry[];
export const publishedDetails: readonly PublishedBreed[];

export function getCatalogEntry(slug: string): BreedCatalogEntry | undefined;
export function getPublishedBreed(slug: string): PublishedBreed | undefined;
export function hasPublishedDetail(slug: string): boolean;
export function getCatalogCards(filter?: CatalogFilter): CatalogCardDto[];
export function searchCatalog(query: string, filter?: CatalogFilter): CatalogSearchResult[];
export function getRelatedCatalogEntries(slug: string): BreedCatalogEntry[];
```

내부에서는 시작 시점에 다음 색인을 한 번 만든다.

```ts
const catalogBySlug = new Map(catalogEntries.map((entry) => [entry.slug, entry]));
const detailBySlug = new Map(detailContents.map((detail) => [detail.slug, detail]));
```

`getBreed()` 안에서 매번 `Array.find()`를 반복하지 않고 Map을 조회한다. 반환 배열은 `readonly`로 노출해 런타임에서 원본 순서가 우연히 변경되는 것을 막는다.

## 9. 검색과 카테고리 성능

100~300종은 별도 검색 서버나 데이터베이스가 필요한 규모가 아니다. 빌드 시 생성한 작은 검색 DTO를 브라우저에서 필터링해도 충분하다.

### 9.1 클라이언트에 전달할 검색 DTO

```ts
type CatalogSearchDto = {
  slug: string;
  nameKo: string;
  nameEn: string;
  aliases: string[];
  normalizedSearchText: string;
  editorialGroup: EditorialGroup;
  roleTags: RoleTag[];
  sizeBand: SizeBand;
  activityBand: TendencyBand | null;
  groomingBand: TendencyBand | null;
  alertingBand: TendencyBand | null;
  detailStatus: "none" | "draft" | "published";
};
```

긴 `story`, `behaviorClues`, `sources`는 이 DTO에 넣지 않는다. 현재 루트 Provider에도 `slug`, `nameKo`만 전달하는 원칙을 유지한다.

### 9.2 검색 정규화

- 한글·영문 이름과 별칭을 소문자 및 Unicode NFC로 정규화한다.
- 공백, 하이픈 차이와 흔한 국내 표기 변형은 aliases로 해결한다.
- `normalizedSearchText`는 실행 시마다 만들지 않고 빌드 시 파생한다.
- 결과 정렬은 정확한 이름 일치 → 별칭 일치 → 접두어 → 포함 순으로 고정한다.
- 초성 검색이 실제 요구로 확인되기 전에는 별도 라이브러리를 추가하지 않는다.

### 9.3 필터 색인

100종에서는 단순 `Array.filter()`도 충분하지만, selector에서 그룹별 배열을 미리 만들면 구현 의도가 명확하다.

```ts
const slugsByEditorialGroup = new Map<EditorialGroup, readonly string[]>();
const slugsBySizeBand = new Map<SizeBand, readonly string[]>();
```

필터 축은 독립적으로 교집합을 구하며 점수나 순위를 만들지 않는다. `null` 축은 결과에서 “낮음”으로 포함하지 않는다.

### 9.4 Next.js 번들 경계

- 홈·도감의 Server Component는 마스터를 읽고 카드 DTO만 Client Component에 전달한다.
- 상세 route는 요청된 slug의 상세 파일만 찾는 registry를 사용한다.
- 20개 상세 파일을 정적 import해도 현재 규모에서는 문제가 없지만, 100개 상세로 늘어날 때는 생성된 manifest와 동적 import를 검토한다.
- 사이트맵은 `catalogStatus === "published"`이며 실제로 접근 가능한 route만 포함한다.
- 상세가 없는 마스터 항목을 검색에 노출한다면 URL 정책을 먼저 결정한다. 권장안은 동일 `/breeds/[slug]`에서 요약 상태를 제공하고 `상세 콘텐츠 준비 중`을 명시하는 것이다. 준비 중 페이지를 원하지 않으면 검색 결과를 `detailStatus === "published"`로 제한한다.

## 10. 기존 코드 호환 전략

현재 소비 코드는 `Breed`가 모든 필드를 가진다고 가정한다. 한 번에 전부 바꾸지 말고 호환 계층을 둔다.

```ts
// legacy-adapter.ts
export type Breed = LegacyBreed;

export const breeds: readonly Breed[] = publishedDetails.map(toLegacyBreed);

export function getBreed(slug: string): Breed | undefined {
  return legacyBreedBySlug.get(slug);
}
```

`toLegacyBreed()`는 마스터와 상세를 결합해 현재 필드를 만든다.

| 현재 필드 | 새 원본 |
|---|---|
| `slug`, `nameKo`, `nameEn` | master |
| `catalog.group`, `discoveryTags` | master classification |
| `identity.origin`, `identity.size` | master label map |
| `tagline`, `palette`, `historyVisual` | detail |
| `behaviorClues`, `story`, `tendencies` | detail |
| `careNotes`, `daySnapshot`, `related` | detail |
| `sources` | source registry에서 detail sourceIds 해석 |

초기에는 기존 `src/content/breeds/data.ts`가 이 어댑터를 다시 export하도록 해 아래 코드를 바로 깨뜨리지 않는다.

- 홈 캐러셀과 현재 홈 카드
- 상세 route의 `generateStaticParams()`와 `getBreed()`
- 비교 페이지와 비교 쿼리 resolver
- 기존 테스트와 `BreedVisual`

동시에 새 도감·검색 기능은 처음부터 `catalogEntries`와 DTO API를 사용한다. 따라서 기존 `breeds.length === 5` 테스트는 “발행된 상세 5종” 테스트로 의미를 유지하고, 별도 테스트에서 마스터 100종 수와 무결성을 검사한다.

## 11. 교차 검증 규칙

registry 생성 시 최소 다음을 실패 조건으로 둔다.

1. 마스터 slug와 이름·별칭의 정규화된 값이 중복되지 않는다.
2. 모든 상세 slug는 마스터에 정확히 하나 존재한다.
3. `detailStatus === "published"`인 마스터에는 상세 파일이 존재한다.
4. 상세 파일이 있는데 마스터가 `detailStatus === "none"`이면 실패한다.
5. 관련 견종 slug는 마스터에 존재하며 자기 자신이 아니다.
6. 모든 source ID는 출처 레지스트리에 존재한다.
7. 마스터 비교 축과 상세 행동 축의 band가 동시에 있으면 일치한다.
8. 공개 카드 이미지가 지정된 경우 public asset manifest에 존재한다.
9. 공개 마스터는 카드 카피와 최소 출처를 가진다.
10. 공개 상세는 하루 장면, 관련 견종, 건강 편집 안내 등 상세 필수 묶음을 모두 가진다.

이미지 파일 존재 여부는 Zod만으로 검사하지 말고 별도 Node 빌드 검증 스크립트에서 확인한다. 런타임 UI에도 텍스트 fallback을 유지한다.

## 12. 단계적 마이그레이션

### 단계 0 — 계약 테스트 고정

- 현재 5종 상세 페이지와 비교가 사용하는 필드 목록을 테스트로 고정한다.
- slug, 관련 견종, 이미지 경로, 출처 참조 검증을 유지한다.
- UI 변경 없이 데이터 계층 변경 전후 결과가 같은지 비교할 fixture를 만든다.

### 단계 1 — 공통 schema와 마스터 5종 도입

- `schemas/shared.ts`, `catalog-entry.ts`, source registry를 만든다.
- 현재 5종에서 마스터 필드를 추출한다.
- 기존 상세 데이터는 그대로 두고 master/detail 중복 값 일치 테스트를 먼저 추가한다.

완료 조건: 기존 페이지 출력과 테스트가 변하지 않는다.

### 단계 2 — 호환 selector와 Map 색인 도입

- `getCatalogEntry()`, `getPublishedBreed()`와 slug Map을 추가한다.
- `data.ts`의 `breeds`, `getBreed()`, `getRelatedBreeds()`는 호환 어댑터를 통해 같은 형태로 export한다.
- 사이트맵과 루트 후보 Provider처럼 상세 원고가 필요 없는 소비 지점부터 master API로 전환한다.

완료 조건: 상세·비교 UI 코드는 수정 없이 동작한다.

### 단계 3 — 마스터 20종, 이후 100종 확장

- `catalog-20-proposal.md`의 20종을 먼저 마스터로 입력하고 분류 통제 어휘를 확정한다.
- 검색·카테고리 화면은 `catalogStatus === "published"` 항목만 사용한다.
- 다음 묶음부터 편집 그룹별 파일에 20~30종씩 추가해 100종 이상으로 확장한다.

완료 조건: 마스터 수와 상세 수가 별도 지표로 보고된다.

### 단계 4 — 상세 5종 파일 분리

- 현재 `data.ts`의 5종을 `details/{slug}.ts`로 이동한다.
- 마스터 중복 필드를 상세에서 제거하고 adapter가 이전 `Breed` 형태를 조립한다.
- 출처 객체를 source ID 참조로 바꾼다.

완료 조건: 기존 5종 snapshot/contract test가 동일하다.

### 단계 5 — 상세 20종 완성

- 나머지 15종을 견종별 파일로 작성한다.
- `draft → source-reviewed → expert-reviewed`를 검수 흐름으로 사용한다.
- 화면 공개 여부는 별도 `detailStatus`로 제어한다.

완료 조건: 공개 상세만 정적 경로·검색 상세 CTA·비교 대상으로 노출된다.

### 단계 6 — 소비 코드의 명시적 모델 전환

- 홈 카드·검색은 `CatalogCardDto`를 사용한다.
- 상세 페이지는 `PublishedBreed`, 비교는 `ComparisonBreedDto`를 사용한다.
- 모든 소비자가 새 모델로 전환된 후 `LegacyBreed` 어댑터를 제거한다.

## 13. 운영 지표와 테스트 구분

현재의 `catalogGoal = 20` 하나 대신 다음을 분리한다.

```ts
type CatalogProgress = {
  catalogPublished: number;   // 검색 가능한 마스터 수
  catalogTarget: number;      // 예: 100
  detailsPublished: number;   // 완전한 상세 수
  detailTarget: number;       // 초기 20
  sourceReviewed: number;
  expertReviewed: number;
};
```

권장 테스트 묶음은 다음과 같다.

- `master.test.ts`: 100종 slug·이름·분류·출처 무결성
- `details.test.ts`: 상세 필수 카피 묶음과 source ID 검증
- `registry.test.ts`: master/detail/related/source 교차 참조
- `search-index.test.ts`: 한글·영문·별칭 검색과 순서
- `legacy-adapter.test.ts`: 기존 5종 `Breed` 결과 호환성
- `assets.test.ts`: 공개 이미지 경로 실제 존재 여부

## 14. 구현 시 피해야 할 선택

- 마스터 100종 모두에 현재 상세 `Breed` schema를 강제하지 않는다.
- 상세 유무를 `if (story)` 같은 필드 존재 여부로 추론하지 않는다.
- 한글 표시 문구를 필터 enum 값으로 사용하지 않는다.
- 협회 공식 그룹과 서비스 편집 그룹을 하나의 필드에 섞지 않는다.
- `undefined` 비교 축을 낮은 요구도로 간주하지 않는다.
- 목록 검색을 위해 상세 원고와 전체 출처를 Client Component에 직렬화하지 않는다.
- 활동·털 관리·알림 축을 합산해 난도·적합도·추천 순위를 만들지 않는다.
- 상세가 없는 마스터 항목을 완성된 상세 정보처럼 링크하지 않는다.

## 15. 첫 구현 단위

첫 코드 변경은 다음 범위로 제한하는 것이 안전하다.

1. shared/catalog/detail schema와 source registry 골격
2. 기존 5종의 마스터 엔트리
3. 기존 상세 데이터와 결합하는 legacy adapter
4. master/detail 교차 검증 테스트
5. 기존 UI 출력과 테스트가 그대로임을 확인

그 다음에 20종 마스터 입력을 시작한다. 100종 데이터를 먼저 대량 입력한 뒤 schema를 수정하면 편집 비용이 크게 늘어나므로, 5종으로 구조를 검증하고 20종으로 통제 어휘를 안정화한 다음 100종으로 확장하는 순서가 적절하다.
