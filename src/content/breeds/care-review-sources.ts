import type { Source } from "./schema";

// Sources support only the selected passages recorded in docs/audits/care-review-2026-10-24.json.
const sources = {
  breathing: {
    title: "Recognizing and responding to canine respiratory distress",
    organization: "Cornell University College of Veterinary Medicine",
    url: "https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/recognizing-and-responding-canine-respiratory-distress",
    checkedAt: "2026-10-24",
  },
  eyes: {
    title: "Eye problems in dogs",
    organization: "PDSA",
    url: "https://www.pdsa.org.uk/pet-help-and-advice/pet-health-hub/symptoms/eye-problems-in-dogs",
    checkedAt: "2026-10-24",
  },
  ears: {
    title: "How to clean a dog’s ears",
    organization: "PDSA",
    url: "https://www.pdsa.org.uk/pet-help-and-advice/pet-health-hub/other-veterinary-advice/how-to-clean-a-dog-s-ears",
    checkedAt: "2026-10-24",
  },
  skin: {
    title: "Hot spots",
    organization: "Cornell University College of Veterinary Medicine",
    url: "https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/hot-spots",
    checkedAt: "2026-10-24",
  },
  dental: {
    title: "Recommending home oral hygiene and products",
    organization: "American Animal Hospital Association",
    url: "https://www.aaha.org/resources/2019-aaha-dental-care-guidelines-for-dogs-and-cats/recommending-products/",
    checkedAt: "2026-10-24",
  },
  allergy: {
    title: "Pet Allergy",
    organization: "American Academy of Allergy, Asthma & Immunology",
    url: "https://www.aaaai.org/conditions-treatments/allergies/pet-allergy",
    checkedAt: "2026-10-24",
  },
  exercise: {
    title: "Exercising your dog",
    organization: "PDSA",
    url: "https://www.pdsa.org.uk/pet-help-and-advice/looking-after-your-pet/puppies-dogs/how-much-exercise-does-your-dog-need",
    checkedAt: "2026-10-24",
  },
  alone: {
    title: "Separation Anxiety in Pets: Signs, Causes, and Solutions",
    organization: "American Animal Hospital Association",
    url: "https://www.aaha.org/resources/separation-anxiety-in-pets/",
    checkedAt: "2026-10-24",
  },
  behavior: {
    title:
      "Ancestry-inclusive dog genomics challenges popular breed stereotypes — research abstract",
    organization: "Broad Institute / Science",
    url: "https://www.broadinstitute.org/publications/broad1131786",
    checkedAt: "2026-10-24",
  },
  reward: {
    title: "Aversive training methods",
    organization: "British Small Animal Veterinary Association",
    url: "https://bsava.com/position-statement/aversive-training-methods/",
    checkedAt: "2026-10-24",
  },
} satisfies Record<string, Source>;

const sourceKeysByBreed: Partial<Record<string, (keyof typeof sources)[]>> = {
  "french-bulldog": ["breathing", "exercise", "ears", "skin"],
  pug: ["breathing", "eyes"],
  bulldog: ["breathing", "exercise"],
  "boston-terrier": ["breathing"],
  "english-cocker-spaniel": ["ears"],
  ariegeois: ["ears"],
  "continental-bulldog": ["skin", "exercise"],
  newfoundland: ["skin"],
  maltipoo: ["dental"],
  "yorkshire-terrier": ["dental"],
  goldendoodle: ["allergy", "behavior"],
  "border-collie": ["exercise", "reward", "behavior"],
  "australian-cattle-dog": ["exercise"],
  greyhound: ["exercise"],
  whippet: ["exercise"],
  "labrador-retriever": ["exercise"],
  "greater-swiss-mountain-dog": ["exercise"],
  havanese: ["alone", "exercise"],
  "cavalier-king-charles-spaniel": ["alone"],
  "japanese-spitz": ["alone"],
  maltese: ["behavior", "alone"],
  "siberian-husky": ["behavior"],
  rottweiler: ["behavior", "reward"],
};

export function getCareReviewSources(slug: string): Source[] {
  return (sourceKeysByBreed[slug] ?? []).map((key) => sources[key]);
}
