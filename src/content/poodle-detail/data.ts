import { z } from "zod";
import { sourceSchema } from "../breeds/schema";

const checkedAt = "2026-08-23";

const poodleDetailSchema = z.object({
  heroStatement: z.string().min(20),
  heroRolePreview: z.object({
    image: z.string().startsWith("/").endsWith(".webp"),
    imageAlt: z.string().min(15),
    label: z.string().min(5),
  }),
  heroSizeSummary: z.string().min(10),
  metadataDescription: z.string().min(50),
  sizes: z.array(z.object({
    id: z.enum(["toy", "miniature", "medium", "standard"]),
    label: z.string().min(2),
    range: z.string().regex(/^\d+~\d+cm$/),
    image: z.string().startsWith("/").endsWith(".webp"),
    imageAlt: z.string().min(15),
  })).length(4),
  story: z.object({
    title: z.string().min(15),
    description: z.string().min(20),
    steps: z.array(z.object({
      navLabel: z.string().min(4),
      eyebrow: z.string().min(5),
      title: z.string().min(10),
      body: z.string().min(25),
      image: z.string().startsWith("/").endsWith(".webp"),
      imageAlt: z.string().min(15),
    })).length(3),
    caution: z.string().min(30),
  }),
  realities: z.array(z.object({
    id: z.enum(["sizes", "coat"]),
    title: z.string().min(4),
    body: z.string().min(25),
    image: z.string().startsWith("/").endsWith(".webp").optional(),
    imageAlt: z.string().min(15).optional(),
  })).length(2),
  readinessQuestions: z.array(z.string().endsWith("?")).length(3),
  relatedDifferences: z.record(z.string(), z.string().min(20)),
  sources: z.array(sourceSchema).length(3),
});

export const poodleDetail = poodleDetailSchema.parse({
  heroStatement: "푸들은 장식견이 아니라 물속 사냥감을 회수하던 개였어요.",
  heroRolePreview: {
    image: "/illustrations/ui/breed-roles/poodle-water-retriever-silhouette.webp",
    imageAlt: "회수용 더미를 물고 물결 사이를 헤엄치는 푸들 실루엣",
    label: "물에서 회수하던 역할",
  },
  heroSizeSummary: "4가지 크기 · 23~62cm",
  metadataDescription: "우아한 곱슬 피모 안에는 물에서 회수하던 움직임과 크기별로 다른 생활 조건이 있어요. 푸들의 과거 역할과 오늘날의 행동 경향, 함께 살 때 체감되는 점을 살펴봅니다.",
  sizes: [
    { id: "toy", label: "토이", range: "23~28cm", image: "/illustrations/v6/poodle-size-toy.webp", imageAlt: "작은 체구의 토이 푸들 한 마리가 서 있는 삽화" },
    { id: "miniature", label: "미니어처", range: "28~35cm", image: "/illustrations/v6/poodle-size-miniature.webp", imageAlt: "토이보다 크게 표현한 미니어처 푸들 한 마리가 서 있는 삽화" },
    { id: "medium", label: "미디엄", range: "35~45cm", image: "/illustrations/v6/poodle-size-medium.webp", imageAlt: "미니어처보다 크게 표현한 미디엄 푸들 한 마리가 서 있는 삽화" },
    { id: "standard", label: "스탠다드", range: "45~62cm", image: "/illustrations/v6/poodle-size-standard.webp", imageAlt: "네 크기 중 가장 크게 표현한 스탠다드 푸들 한 마리가 서 있는 삽화" },
  ],
  story: {
    title: "푸들은 왜 찾고 가져오는 일을 좋아할까요?",
    description: "과거의 역할을 알면 오늘의 행동을 조금 다르게 이해할 수 있어요.",
    steps: [
      {
        navLabel: "과거의 역할",
        eyebrow: "1단계 · 무엇을 하던 개였을까?",
        title: "물속에서 찾아 사람에게 가져왔어요.",
        body: "푸들은 물속의 사냥감을 찾아 사람에게 가져오는 회수견으로 활용됐어요.",
        image: "/illustrations/v3/poodle-history.webp",
        imageAlt: "물가에서 회수용 더미를 물고 보호자에게 돌아오는 스탠다드 푸들 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "찾기와 배움에 적극적으로 참여할 수 있어요.",
        body: "그 배경은 오늘날에도 물건을 찾고 가져오거나 새로운 규칙을 배우는 활동에 적극적인 경향으로 나타날 수 있어요.",
        image: "/illustrations/v4/poodle-feature-learning-retrieval.webp",
        imageAlt: "보호자에게 회수용 더미를 가져오며 찾기 활동에 참여하는 푸들 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "영리하다는 건, 알아서 잘 지낸다는 뜻은 아니에요.",
        body: "푸들은 사람과 무언가를 주고받고 새로운 규칙을 알아가는 과정에 적극적으로 참여할 수 있어요. 보호자는 이런 참여와 활동에 매일 시간을 낼 수 있는지 살펴야 해요.",
        image: "/illustrations/v5/poodle-daily-interaction.webp",
        imageAlt: "집에서 보호자와 상자를 활용한 찾기 활동에 함께 참여하는 푸들 삽화",
      },
    ],
    caution: "견종의 과거는 행동을 이해하는 단서일 뿐이에요. 성장 환경과 경험, 개체에 따라 다르게 나타날 수 있어요.",
  },
  realities: [
    {
      id: "sizes",
      title: "예상 성견 크기 확인",
      body: "푸들은 한 이름 안에 네 가지 크기가 있어요. 함께 살 개체가 어느 크기로 자라는지 먼저 확인해야 해요.",
    },
    {
      id: "coat",
      title: "곱슬 피모 관리",
      body: "털 빠짐은 비교적 적게 보일 수 있지만 계속 자라는 곱슬 털은 빗질과 정기적인 미용이 필요해요.",
      image: "/illustrations/v4/poodle-feature-coat-care.webp",
      imageAlt: "보호자가 성견 푸들의 곱슬 피모를 나누어 빗는 삽화",
    },
  ],
  readinessQuestions: [
    "정기적인 미용과 집에서의 빗질을 꾸준히 이어갈 수 있나요?",
    "산책 외에도 매일 함께 놀고 새로운 활동을 해볼 시간이 있나요?",
    "함께 살 푸들의 성견 크기에 맞는 공간과 활동 리듬을 준비할 수 있나요?",
  ],
  relatedDifferences: {
    "labrador-retriever": "같은 회수견 배경을 공유하지만 크기 체계와 피모 관리 방식이 달라요.",
    maltese: "가정에서 가까이 지내는 소형견이지만 활동 리듬과 피모 구조가 달라요.",
  },
  sources: [
    {
      title: "FCI Standard No. 172 — Poodle",
      organization: "Fédération Cynologique Internationale",
      url: "https://www.fci.be/Nomenclature/Standards/172g09-en.pdf",
      checkedAt,
    },
    {
      title: "Poodle History: From Water Retriever to Versatile Companion",
      organization: "American Kennel Club",
      url: "https://www.akc.org/expert-advice/dog-breeds/poodle-history/",
      checkedAt,
    },
    {
      title: "How to Groom a Standard Poodle",
      organization: "American Kennel Club",
      url: "https://www.akc.org/expert-advice/health/how-to-groom-a-standard-poodle/",
      checkedAt,
    },
  ],
});

export type PoodleDetail = z.infer<typeof poodleDetailSchema>;
