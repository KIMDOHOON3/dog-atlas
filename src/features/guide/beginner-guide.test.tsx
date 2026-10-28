import { afterEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BeginnerGuide } from "./beginner-guide";
import { BeginnerGuideLink } from "./beginner-guide-link";
import { StandardBreedDetailExperience } from "../breed-detail/breed-detail-standard";
import { japaneseSpitzDetail } from "@/content/standard-breed-detail/data";

afterEach(() => localStorage.clear());

describe("preparation information without assessment", () => {
  it("shows every section immediately without questions, scoring or completion controls", () => {
    render(<BeginnerGuide />);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(4);
    expect(screen.getByText("예방접종·진료 기록")).toBeVisible();
    expect(screen.getByText("강아지를 통제 대상이 아닌 감정과 선택이 있는 존재로 대하기")).toBeVisible();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    expect(screen.queryByText(/잠겨|진행률|확인 완료|점수/)).not.toBeInTheDocument();
  });

  it("links directly to the guide regardless of previously saved progress", () => {
    localStorage.setItem("dog-atlas:beginner-guide:v1:japanese-spitz", "4");
    render(<BeginnerGuideLink slug="japanese-spitz" nameKo="재패니즈 스피츠" />);
    expect(screen.getByRole("link", { name: "맞이 준비 가이드 읽기" })).toHaveAttribute("href", "/beginner-guide?breed=japanese-spitz");
    expect(screen.queryByText(/완료|계속하기/)).not.toBeInTheDocument();
  });

  it("keeps breed information without the life-condition checklist", () => {
    render(<StandardBreedDetailExperience detail={japaneseSpitzDetail} related={[]} realityCards={<p>생활과 돌봄 안내</p>} />);
    expect(screen.getByText("생활과 돌봄 안내")).toBeVisible();
    expect(screen.getByRole("heading", { name: japaneseSpitzDetail.story.title })).toBeVisible();
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: japaneseSpitzDetail.readinessTitle })).not.toBeInTheDocument();
  });
});
