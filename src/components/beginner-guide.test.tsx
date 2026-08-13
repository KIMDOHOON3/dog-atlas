import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BeginnerGuide } from "./beginner-guide";
import { BeginnerGuideLink } from "./beginner-guide-link";
import { getBeginnerGuideStorageKey } from "@/lib/beginner-guide-progress";

describe("BeginnerGuide", () => {
  beforeEach(() => localStorage.clear());

  it("unlocks the next step in order and stores breed-specific progress", async () => {
    const user = userEvent.setup();
    render(<BeginnerGuide slug="japanese-spitz" nameKo="재패니즈 스피츠" />);

    const firstButton = await screen.findByRole("button", { name: "입양처에 확인했어요" });
    await waitFor(() => expect(firstButton).toBeEnabled());
    expect(screen.getAllByText("앞 단계를 확인하면 준비 목록이 열려요.")).toHaveLength(2);

    await user.click(firstButton);
    expect(screen.getByRole("button", { name: "첫날 준비를 마쳤어요" })).toBeEnabled();
    expect(localStorage.getItem(getBeginnerGuideStorageKey("japanese-spitz"))).toBe("1");

    await user.click(screen.getByRole("button", { name: "첫날 준비를 마쳤어요" }));
    expect(screen.getByRole("button", { name: "첫 생활 가이드를 확인했어요" })).toBeEnabled();
    await user.click(screen.getByRole("button", { name: "첫 생활 가이드를 확인했어요" }));

    expect(screen.getByText("3 / 3 확인")).toBeVisible();
    expect(localStorage.getItem(getBeginnerGuideStorageKey("japanese-spitz"))).toBe("3");
  });

  it("shows safety information before any step is complete", async () => {
    render(<BeginnerGuide slug="maltese" nameKo="몰티즈" />);
    expect(await screen.findByRole("heading", { name: "동물병원에 바로 문의해야 할 신호" })).toBeVisible();
  });
});

describe("BeginnerGuideLink", () => {
  beforeEach(() => localStorage.clear());

  it("reflects saved progress on a breed detail CTA", async () => {
    localStorage.setItem(getBeginnerGuideStorageKey("japanese-spitz"), "2");
    render(<BeginnerGuideLink slug="japanese-spitz" nameKo="재패니즈 스피츠" />);

    const link = await screen.findByRole("link", { name: /맞이 준비 계속하기 · 2\/3/ });
    expect(link).toHaveAttribute("href", "/beginner-guide?breed=japanese-spitz");
  });
});
