import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { breeds } from "@/content/breeds/data";
import { ConditionExplorer } from "./condition-explorer";

describe("ConditionExplorer", () => {
  it("switches the single comparison condition", () => {
    render(<ConditionExplorer breeds={breeds.slice(0, 3)} />);
    fireEvent.click(screen.getByRole("button", { name: /털 관리/ }));

    expect(screen.getByRole("button", { name: /매일의 활동/ })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button", { name: /털 관리/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByText("털 관리").length).toBeGreaterThan(1);
  });

  it("shows every published breed without ranking them", () => {
    render(<ConditionExplorer breeds={breeds} />);
    expect(screen.getAllByRole("article")).toHaveLength(breeds.length);
    expect(screen.getByText(/견종을 거르는 필터가 아니라/)).toBeInTheDocument();
  });
});
