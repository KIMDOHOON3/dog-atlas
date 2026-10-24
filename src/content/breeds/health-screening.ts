import type { Source } from "./schema";

// Claim records: docs/audits/genetic-health{,-second}-review-2026-10-24.json.
const sources = {
  chihuahuaHealth: {
    title: "Chihuahua Health Statement — November 2015",
    organization: "Chihuahua Club of America",
    url: "https://cdn.akc.org/Marketplace/Health-Statement/Chihuahua.pdf",
    checkedAt: "2026-10-24",
  },
  pomeranianHealth: {
    title: "Pomeranian Health Issues",
    organization: "American Pomeranian Club",
    url: "https://cdn.akc.org/Marketplace/Health-Statement/Pomeranian.pdf",
    checkedAt: "2026-10-24",
  },
  toyCurrent: {
    title: "Toy Group Health Testing Requirements — Pug",
    organization: "American Kennel Club",
    url: "https://www.akc.org/breeder-programs/breed-health-testing-requirements/toy-group-health-testing-requirements/",
    checkedAt: "2026-10-24",
  },
  pde: {
    title: "Susceptibility to Pug Dog Encephalitis (PDE)",
    organization: "UC Davis Veterinary Genetics Laboratory",
    url: "https://vgl.ucdavis.edu/test/pde-susceptibility",
    checkedAt: "2026-10-24",
  },
  rfg: {
    title: "Respiratory Function — RFGS",
    organization: "Orthopedic Foundation for Animals",
    url: "https://ofa.org/diseases/rfgs/",
    checkedAt: "2026-10-24",
  },
  yorkshireHealth: {
    title: "YTCA Health Statement — approved July 16, 2024",
    organization: "Yorkshire Terrier Club of America",
    url: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2024/07/24155257/YTCA-Health-Statement-June-16-2024-update.pdf",
    checkedAt: "2026-10-24",
  },
  shihTzuHealth: {
    title: "Health Statement — April 19, 2024",
    organization: "American Shih Tzu Club",
    url: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2024/07/05091018/Health-Statement-American-Shih-Tzu-Club.pdf",
    checkedAt: "2026-10-24",
  },
  bichonHealth: {
    title: "Bichon Frise Health Statement",
    organization: "Bichon Frise Club of America",
    url: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2023/02/22095319/Bichon-Frise-health-statement.pdf",
    checkedAt: "2026-10-24",
  },
  dalmatianHealth: {
    title: "Dalmatian Health Statement — October 30, 2014",
    organization: "Dalmatian Club of America",
    url: "https://cdn.akc.org/Marketplace/Health-Statement/Dalmatian.pdf",
    checkedAt: "2026-10-24",
  },
  frenchHealth: {
    title: "French Bulldog Health Statement — 2015",
    organization: "French Bull Dog Club of America",
    url: "https://images.akc.org/pdf/breeds/French-Bulldog.pdf",
    checkedAt: "2026-10-24",
  },
  borderHealth: {
    title: "BCSA Health Statement — October 2016",
    organization: "Border Collie Society of America",
    url: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2023/02/22102951/Border-Collie-Health-Statement-October-2016.pdf",
    checkedAt: "2026-10-24",
  },
  gsdHealth: {
    title: "German Shepherd Dog Health Statement — December 16, 2015",
    organization: "German Shepherd Dog Club of America",
    url: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2023/02/23143628/German-Shepherd-Dog-Health-Statement-December-2015.pdf",
    checkedAt: "2026-10-24",
  },
  berneseHealth: {
    title: "BMDCA Health Statement — March 2024",
    organization: "Bernese Mountain Dog Club of America",
    url: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2024/07/03131509/Health-Statement-for-the-BMDCA-final-2024.pdf",
    checkedAt: "2026-10-24",
  },
  boxerHealth: {
    title: "Testing and Reporting Guidelines — 2017 statement",
    organization: "American Boxer Club",
    url: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2023/02/22111430/Boxer-Health-Statement-2017.pdf",
    checkedAt: "2026-10-24",
  },
  daneHealth: {
    title: "Great Dane Health Statement — March 28, 2015",
    organization: "Great Dane Club of America",
    url: "https://cdn.akc.org/Marketplace/Health-Statement/Great-Dane.pdf",
    checkedAt: "2026-10-24",
  },
  pyreneesHealth: {
    title: "Great Pyrenees Health Statement — February 3, 2022",
    organization: "Great Pyrenees Club of America",
    url: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2023/02/23152706/Great-Pyrenees-Health-Statement-February-2022.pdf",
    checkedAt: "2026-10-24",
  },
  newfoundlandHealth: {
    title: "Newfoundland Health Statement",
    organization: "Newfoundland Club of America",
    url: "https://cdn.akc.org/Marketplace/Health-Statement/Newfoundland.pdf",
    checkedAt: "2026-10-24",
  },
  rottweilerHealth: {
    title: "Rottweiler Health Statement — approved October 15, 2019",
    organization: "American Rottweiler Club",
    url: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2023/05/16141744/Rottweiler2022.pdf",
    checkedAt: "2026-10-24",
  },
  samoyedHealth: {
    title: "Samoyed Health Statement — October 29, 2014",
    organization: "Samoyed Club of America",
    url: "https://cdn.akc.org/Marketplace/Health-Statement/Samoyed.pdf",
    checkedAt: "2026-10-24",
  },
  pembrokeHealth: {
    title: "Pembroke Welsh Corgi Health Statement — November 5, 2014",
    organization: "Pembroke Welsh Corgi Club of America",
    url: "https://cdn.akc.org/Marketplace/Health-Statement/Pembroke-Welsh-Corgi.pdf",
    checkedAt: "2026-10-24",
  },
  huskyHealth: {
    title: "Siberian Husky Health Statement — September 10, 2024",
    organization: "Siberian Husky Club of America",
    url: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2024/09/19083956/Siberian-Husky-Club-of-America-Health-Statement-2024-Final.pdf",
    checkedAt: "2026-10-24",
  },
  shibaHealth: {
    title: "Shiba Inu Health Statement — December 7, 2014",
    organization: "National Shiba Club of America",
    url: "https://cdn.akc.org/Marketplace/Health-Statement/Shiba-Inu.pdf",
    checkedAt: "2026-10-24",
  },
  chic: {
    title: "CHIC Program — certification and its limits",
    organization: "Orthopedic Foundation for Animals",
    url: "https://ofa.org/chic-programs/",
    checkedAt: "2026-10-24",
  },
  genetics: {
    title: "What Genetic Testing Can and Can’t Tell You About Your Pet",
    organization: "UC Davis School of Veterinary Medicine",
    url: "https://magazine.vetmed.ucdavis.edu/news-article-spring-2023/what-genetic-testing-can-and-cant-tell-you-about-your-pet",
    checkedAt: "2026-10-24",
  },
  poodle: {
    title: "PCA Health Statement — December 11, 2024",
    organization: "Poodle Club of America",
    url: "https://poodleclubofamerica.org/wp-content/uploads/pca-health-statement-for-akc-december-11-2024-.pdf",
    checkedAt: "2026-10-24",
  },
  maltese: {
    title: "Maltese Health Statement — January 8, 2018",
    organization: "American Maltese Association",
    url: "https://images.akc.org/pdf/Maltese_health_statement_2018.pdf",
    checkedAt: "2026-10-24",
  },
  malteseCurrent: {
    title: "Toy Group Health Testing Requirements — Maltese",
    organization: "American Kennel Club",
    url: "https://www.akc.org/breeder-programs/breed-health-testing-requirements/toy-group-health-testing-requirements/",
    checkedAt: "2026-10-24",
  },
  golden: {
    title: "Health Screenings for the Parents of a Litter",
    organization: "Golden Retriever Club of America",
    url: "https://grca.org/about-the-breed/health-research/health-screenings-for-the-parents-of-a-litter/",
    checkedAt: "2026-10-24",
  },
  labrador: {
    title: "Health Issues — Recommended Health Clearances",
    organization: "The Labrador Retriever Club",
    url: "https://thelabradorclub.com/health-issues/",
    checkedAt: "2026-10-24",
  },
  gana: {
    title: "Health Testing Standards",
    organization: "Goldendoodle Association of North America",
    url: "https://www.goldendoodleassociation.com/for-breeders/health-standards-and-ethical-breeding/",
    checkedAt: "2026-10-24",
  },
  cavalierHeart: {
    title: "Heart Scheme for Cavalier King Charles Spaniels",
    organization: "The Royal Kennel Club",
    url: "https://www.royalkennelclub.com/health-and-dog-care/health-dog-care/health/getting-started-with-health-testing-and-screening/heart-scheme-for-cavalier-king-charles-spaniels/",
    checkedAt: "2026-10-24",
  },
  cmsm: {
    title: "Chiari malformation and syringomyelia scheme",
    organization: "British Veterinary Association",
    url: "https://www.bva.co.uk/canine-health-schemes/cmsm-scheme/",
    checkedAt: "2026-10-24",
  },
  dcm: {
    title: "Dilated cardiomyopathy",
    organization: "Cornell University College of Veterinary Medicine",
    url: "https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/dilated-cardiomyopathy",
    checkedAt: "2026-10-24",
  },
  dcmDna: {
    title: "Dilated Cardiomyopathy 1 and 2 in Doberman Pinschers",
    organization: "UC Davis Veterinary Genetics Laboratory",
    url: "https://vgl.vetmed.ucdavis.edu/test/dcm1-2-doberman",
    checkedAt: "2026-10-24",
  },
  basenji: {
    title: "Basenji Health — recommended testing and Fanconi DNA tests",
    organization: "Basenji Club of America",
    url: "https://basenji.org/basenji/health/",
    checkedAt: "2026-10-24",
  },
  ivdd: {
    title: "IVDD Scheme for Dachshunds",
    organization: "The Royal Kennel Club / Dachshund Health UK",
    url: "https://www.royalkennelclub.com/health-and-dog-care/health-dog-care/health/getting-started-with-health-testing-and-screening/ivdd-scheme-for-dachshunds/",
    checkedAt: "2026-10-24",
  },
  mdr1: {
    title: "Drug sensitivity: MDR1",
    organization: "Cornell University College of Veterinary Medicine",
    url: "https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/health-info/drug-sensitivity-mdr1",
    checkedAt: "2026-10-24",
  },
  mdr1Dna: {
    title: "Multidrug Sensitivity (MDR1)",
    organization: "UC Davis Veterinary Genetics Laboratory",
    url: "https://vgl.vetmed.ucdavis.edu/test/multidrug-sensitivity-mdr1",
    checkedAt: "2026-10-24",
  },
} satisfies Record<string, Source>;

const sourceKeysByBreed: Partial<Record<string, (keyof typeof sources)[]>> = {
  chihuahua: ["chic", "genetics", "chihuahuaHealth"],
  "german-spitz": ["chic", "genetics", "pomeranianHealth"],
  pug: ["chic", "genetics", "toyCurrent", "pde", "rfg"],
  "yorkshire-terrier": ["chic", "genetics", "yorkshireHealth"],
  "shih-tzu": ["chic", "genetics", "shihTzuHealth"],
  "bichon-frise": ["chic", "genetics", "bichonHealth"],
  dalmatian: ["chic", "genetics", "dalmatianHealth"],
  "french-bulldog": ["chic", "genetics", "frenchHealth", "rfg"],
  "border-collie": ["chic", "genetics", "borderHealth"],
  "german-shepherd-dog": ["chic", "genetics", "gsdHealth"],
  "bernese-mountain-dog": ["chic", "genetics", "berneseHealth"],
  boxer: ["chic", "genetics", "boxerHealth"],
  "great-dane": ["chic", "genetics", "daneHealth"],
  "pyrenean-mountain-dog": ["chic", "genetics", "pyreneesHealth"],
  newfoundland: ["chic", "genetics", "newfoundlandHealth"],
  rottweiler: ["chic", "genetics", "rottweilerHealth"],
  samoyed: ["chic", "genetics", "samoyedHealth"],
  "welsh-corgi-pembroke": ["chic", "genetics", "pembrokeHealth"],
  "siberian-husky": ["chic", "genetics", "huskyHealth"],
  shiba: ["chic", "genetics", "shibaHealth"],
  poodle: ["chic", "genetics", "poodle"],
  maltese: ["chic", "genetics", "maltese", "malteseCurrent"],
  maltipoo: ["chic", "genetics", "maltese", "malteseCurrent", "poodle"],
  goldendoodle: ["chic", "genetics", "gana"],
  "golden-retriever": ["chic", "genetics", "golden"],
  "labrador-retriever": ["chic", "genetics", "labrador"],
  "cavalier-king-charles-spaniel": [
    "chic",
    "genetics",
    "cavalierHeart",
    "cmsm",
  ],
  dobermann: ["chic", "genetics", "dcm", "dcmDna"],
  basenji: ["chic", "genetics", "basenji"],
  dachshund: ["chic", "genetics", "ivdd"],
  "australian-shepherd": ["chic", "genetics", "mdr1", "mdr1Dna"],
  "shetland-sheepdog": ["chic", "genetics", "mdr1", "mdr1Dna"],
};

export const healthScreeningGuidance = {
  purpose:
    "아래 해외 협회의 번식 전 선별 기준은 부모견 기록을 읽는 참고자료예요. 국내 모든 반려견의 필수 검사 목록은 아니며, 실제 검진은 나이·증상·가족력과 진료 소견에 맞춰 수의사와 정해요.",
  records:
    "검사표의 개체 식별정보, 검사명·날짜·검사 당시 나이와 실제 결과를 함께 확인해요. OFA의 CHIC 번호는 필요한 검사와 결과 공개를 뜻하며, 모든 결과가 정상이라는 인증은 아니에요.",
  limits:
    "DNA 검사는 대상으로 삼은 변이를 확인해요. 결과가 정상이어도 검사하지 않은 질환까지 없다는 뜻은 아니며, 보인자·위험 변이의 의미는 질환마다 달라요. 부모 기록을 구할 수 없으면 건강함이나 질병을 단정하지 말고 현재 진료부터 계획해요.",
};

export function getHealthScreeningSources(slug: string): Source[] {
  return (sourceKeysByBreed[slug] ?? []).map((key) => sources[key]);
}
