import { z } from "zod";

export const masterSourceSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  organization: z.string().min(1),
  url: z.url(),
  checkedAt: z.iso.date(),
  scope: z.enum([
    "registry",
    "provisional-registry",
    "breed-list",
    "group-list",
    "breed-standard",
    "heritage-record",
    "conservation-program",
    "research",
  ]),
});

const masterSourceCollectionSchema = z.array(masterSourceSchema).superRefine((sources, context) => {
  const ids = sources.map((source) => source.id);
  if (new Set(ids).size !== ids.length) {
    context.addIssue({ code: "custom", message: "마스터 출처 ID는 중복될 수 없습니다." });
  }
});

const checkedAt = "2026-08-03";

const kkfGroupTitles = [
  "쉽독과 캐틀독",
  "핀셔·슈나우저·몰로세르와 스위스 마운틴독",
  "테리어",
  "닥스훈트",
  "스피츠와 원시형 견종",
  "센트하운드와 관련 견종",
  "포인팅 독",
  "리트리버·플러싱 독·워터 독",
  "반려견과 토이 독",
  "사이트하운드",
] as const;

const kkfGroupSources = kkfGroupTitles.map((title, index) => ({
  id: `kkf-group-${index + 1}`,
  title: `국제 공인 견종 ${index + 1}그룹 — ${title}`,
  organization: "한국애견연맹 (KKF)",
  url: `https://www.thekkf.or.kr/new_home/03_kkf_service/03_approval_2.php?gid=${index + 1}`,
  checkedAt,
  scope: "group-list" as const,
}));

export const masterSources = masterSourceCollectionSchema.parse([
  {
    id: "fci-nomenclature",
    title: "FCI Breeds Nomenclature",
    organization: "Fédération Cynologique Internationale (FCI)",
    url: "https://www.fci.be/en/Nomenclature/",
    checkedAt,
    scope: "registry",
  },
  {
    id: "fci-provisional",
    title: "FCI Breeds Recognised on a Provisional Basis",
    organization: "Fédération Cynologique Internationale (FCI)",
    url: "https://www.fci.be/en/Nomenclature/",
    checkedAt,
    scope: "provisional-registry",
  },
  {
    id: "akc-breed-list",
    title: "Dog Breeds — Official AKC Breed List",
    organization: "American Kennel Club (AKC)",
    url: "https://www.akc.org/dog-breeds/",
    checkedAt,
    scope: "breed-list",
  },
  ...kkfGroupSources,
  {
    id: "mongolian-bankhar-project",
    title: "Mongolian Bankhar Dog Project Media Kit",
    organization: "Mongolian Bankhar Dog Project",
    url: "https://www.bankhar.org/press-kit/",
    checkedAt: "2026-08-10",
    scope: "conservation-program",
  },
  {
    id: "bankhar-predation-study",
    title: "Impact of livestock guardian dogs on livestock predation in rural Mongolia",
    organization: "Conservation Science and Practice",
    url: "https://conbio.onlinelibrary.wiley.com/doi/10.1111/csp2.509",
    checkedAt: "2026-08-10",
    scope: "research",
  },
  {
    id: "ukc-american-pit-bull-terrier",
    title: "Official UKC Breed Standard — American Pit Bull Terrier",
    organization: "United Kennel Club (UKC)",
    url: "https://www.ukcdogs.com/american-pit-bull-terrier",
    checkedAt,
    scope: "breed-standard",
  },
  {
    id: "ukc-american-bully",
    title: "Official UKC Breed Standard — American Bully",
    organization: "United Kennel Club (UKC)",
    url: "https://www.ukcdogs.com/american-bully",
    checkedAt,
    scope: "breed-standard",
  },
  {
    id: "kkf-non-fci-breeds",
    title: "FCI 미등록 견종 안내(풍산개·삽살개·동경이·제주개)",
    organization: "한국애견연맹 (KKF)",
    url: "https://www.thekkf.or.kr/new_home/06_studbook/02.studbook_request.php?request=2",
    checkedAt,
    scope: "breed-standard",
  },
  {
    id: "heritage-sapsaree",
    title: "천연기념물 경산의 삽살개",
    organization: "국가유산청 국가유산포털",
    url: "https://www.heritage.go.kr/heri/cul/culSelectDetail.do?VdkVgwKey=16%2C03680000%2C37&pageNo=1_1_1_1",
    checkedAt: "2026-08-11",
    scope: "heritage-record",
  },
  {
    id: "heritage-donggyeongi",
    title: "천연기념물 경주개 동경이",
    organization: "국가유산청 국가유산포털",
    url: "https://www.heritage.go.kr/heri/cul/culSelectDetail.do?ccbaCpno=1363705400000",
    checkedAt: "2026-08-11",
    scope: "heritage-record",
  },
  {
    id: "fci-standard-262",
    title: "FCI Standard No. 262 — Japanese Spitz",
    organization: "Fédération Cynologique Internationale (FCI)",
    url: "https://www.fci.be/Nomenclature/Standards/262g05-en.pdf",
    checkedAt,
    scope: "breed-standard",
  },
  {
    id: "fci-standard-65",
    title: "FCI Standard No. 65 — Maltese",
    organization: "Fédération Cynologique Internationale (FCI)",
    url: "https://www.fci.be/Nomenclature/Standards/065g09-en.pdf",
    checkedAt,
    scope: "breed-standard",
  },
  {
    id: "fci-standard-297",
    title: "FCI Standard No. 297 — Border Collie",
    organization: "Fédération Cynologique Internationale (FCI)",
    url: "https://www.fci.be/Nomenclature/Standards/297g01-en.pdf",
    checkedAt,
    scope: "breed-standard",
  },
  {
    id: "fci-standard-158",
    title: "FCI Standard No. 158 — Greyhound",
    organization: "Fédération Cynologique Internationale (FCI)",
    url: "https://www.fci.be/Nomenclature/Standards/158g10-en.pdf",
    checkedAt,
    scope: "breed-standard",
  },
  {
    id: "fci-standard-212",
    title: "FCI Standard No. 212 — Samoyed",
    organization: "Fédération Cynologique Internationale (FCI)",
    url: "https://www.fci.be/Nomenclature/Standards/212g05-en.pdf",
    checkedAt,
    scope: "breed-standard",
  },
]);

const masterSourceById = new Map(masterSources.map((source) => [source.id, source]));

export function getMasterSource(id: string) {
  return masterSourceById.get(id);
}

export type MasterSource = z.infer<typeof masterSourceSchema>;
