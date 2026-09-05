import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SiteHeader } from "./site-header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("SiteHeader", () => {
  it("keeps only home and discovery in the mobile primary navigation", () => {
    render(<SiteHeader />);
    const navigation = screen.getByRole("navigation", {
      name: "모바일 주요 탐색",
    });
    const links = within(navigation).getAllByRole("link");

    expect(links).toHaveLength(2);
    expect(links.map((link) => link.textContent)).toEqual(["홈", "견종 발견"]);
  });

  it("opens the secondary destinations from the top-right menu", () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getByRole("button", { name: "메뉴" }));

    const navigation = screen.getByRole("navigation", { name: "더 둘러보기" });
    expect(within(navigation).getAllByRole("link")).toHaveLength(1);
    expect(
      within(navigation).getByRole("link", { name: /견종 카드/ }),
    ).toHaveAttribute("href", "/");
  });
});
