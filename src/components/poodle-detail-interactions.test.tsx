import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it } from "vitest";
import { PoodleRealityCards, PoodleSizePicker } from "./poodle-detail-interactions";

import { poodleDetail } from "@/content/poodle-detail/data";
import { StandardStorySteps, StandardReadinessChecklist } from "./breed-detail-standard-interactions";
const detail = { ...poodleDetail, slug: "poodle", nameKo: "푸들" };

describe("Poodle detail interactions", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => ({ matches: true }),
    });
  });

  it("connects the three story steps with accessible tabs and arrow keys", async () => {
    const user = userEvent.setup();
    render(<StandardStorySteps detail={detail} />);

    const past = screen.getByRole("tab", { name: /과거의 역할/ });
    const present = screen.getByRole("tab", { name: /현재의 경향/ });
    const reality = screen.getByRole("tab", { name: /생활의 현실/ });

    expect(past).toHaveAttribute("aria-selected", "true");
    expect(screen.getAllByRole("img")[0]).toHaveAttribute("src", expect.stringContaining("poodle-history.webp"));
    await user.click(present);
    expect(present).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("새로운 규칙을 배우는 활동");
    expect(screen.getAllByRole("img")[0]).toHaveAttribute("src", expect.stringContaining("poodle-feature-learning-retrieval.webp"));

    fireEvent.keyDown(present, { key: "ArrowRight" });
    expect(reality).toHaveFocus();
    expect(reality).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("알아서 잘 지낸다는 뜻은 아니에요");
    expect(screen.getAllByRole("img")[0]).toHaveAttribute("src", expect.stringContaining("poodle-daily-interaction.webp"));
    expect(screen.getAllByRole("group", { name: /\/ 3/ })).toHaveLength(3);
    expect(screen.getByRole("button", { name: "2단계 현재의 경향 보기" })).toBeInTheDocument();
  });

  it("changes the selected size button without adding a separate range box", async () => {
    const user = userEvent.setup();
    render(<PoodleSizePicker sizes={poodleDetail.sizes} />);

    await user.click(screen.getByRole("button", { name: "스탠다드" }));
    expect(screen.getByRole("button", { name: "스탠다드" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.queryByText(/추천|점수/)).not.toBeInTheDocument();
  });

  it("changes the focused size image and exposes the mobile reality controls", async () => {
    const user = userEvent.setup();
    render(<PoodleRealityCards sizes={poodleDetail.sizes} realities={poodleDetail.realities} />);

    expect(screen.getByRole("img", { name: /작은 체구의 토이 푸들 한 마리/ })).toHaveAttribute("src", expect.stringContaining("poodle-size-toy.webp"));
    await user.click(screen.getByRole("button", { name: "스탠다드" }));
    expect(screen.getByRole("img", { name: /가장 크게 표현한 스탠다드 푸들 한 마리/ })).toHaveAttribute("src", expect.stringContaining("poodle-size-standard.webp"));
    expect(screen.getByText("45~62cm")).toBeVisible();
    expect(screen.getByRole("button", { name: "2번째 곱슬 피모 관리 보기" })).toBeInTheDocument();
  });

  it("reveals the detailed readiness action only after all three checks", async () => {
    const user = userEvent.setup();
    render(<StandardReadinessChecklist detail={detail} />);

    expect(screen.queryByRole("link", { name: /더 자세한 맞이 준비 보기/ })).not.toBeInTheDocument();
    expect(screen.getByText("세 가지 중 0가지를 확인했어요.")).toBeVisible();

    for (const checkbox of screen.getAllByRole("checkbox")) await user.click(checkbox);

    expect(screen.getByText("세 가지 생활 조건을 모두 확인했어요.")).toBeVisible();
    expect(screen.getByRole("link", { name: /더 자세한 맞이 준비 보기/ })).toHaveAttribute("href", "/beginner-guide?breed=poodle");
  });
});
