import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it } from "vitest";
import { getStandardBreedDetail, japaneseSpitzDetail } from "@/content/standard-breed-detail/data";
import { StandardReadinessChecklist, StandardRealityCards, StandardStorySteps } from "./breed-detail-standard-interactions";

describe("standard breed detail interactions", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => ({ matches: true }),
    });
  });

  it("connects Japanese Spitz story steps with tabs and arrow keys", async () => {
    const user = userEvent.setup();
    render(<StandardStorySteps detail={japaneseSpitzDetail} />);

    const background = screen.getByRole("tab", { name: /형성 배경/ });
    const tendency = screen.getByRole("tab", { name: /현재의 경향/ });
    expect(background).toHaveAttribute("aria-selected", "true");

    await user.click(tendency);
    expect(tendency).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("가족의 움직임");

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: /생활의 현실/ })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("현관 소리");
  });

  it("integrates an evidence-backed present-day job as Golden Retriever step four", async () => {
    const user = userEvent.setup();
    const detail = getStandardBreedDetail("golden-retriever")!;
    render(<StandardStorySteps detail={detail} />);

    const currentRole = screen.getByRole("tab", { name: /현재의 역할/ });
    expect(screen.getAllByRole("tab")).toHaveLength(4);
    expect(screen.getByRole("tablist")).toHaveAttribute("aria-label", expect.stringContaining("4단계"));

    await user.click(currentRole);
    expect(currentRole).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("안내견으로 사람과 안전한 이동");
    expect(screen.getAllByRole("img", { name: /시각장애인과 함께 안전하게/ })[0]).toHaveAttribute(
      "src",
      expect.stringContaining("golden-retriever-feature-modern-guide-work.webp"),
    );
  });

  it("exposes two reality slides and reveals preparation only after all checks", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<StandardRealityCards detail={japaneseSpitzDetail} />);

    expect(screen.getByRole("button", { name: /2번째 풍성한 이중모 관리 보기/ })).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(2);

    rerender(<StandardReadinessChecklist detail={japaneseSpitzDetail} />);
    expect(screen.queryByRole("link", { name: /더 자세한 맞이 준비 보기/ })).not.toBeInTheDocument();
    for (const checkbox of screen.getAllByRole("checkbox")) await user.click(checkbox);
    expect(screen.getByRole("link", { name: /더 자세한 맞이 준비 보기/ })).toHaveAttribute("href", "/beginner-guide?breed=japanese-spitz");
  });
});
