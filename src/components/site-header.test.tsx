import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SiteHeader } from "./site-header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("SiteHeader", () => {
  it("keeps navigation in the header without a fixed mobile bar", () => {
    render(<SiteHeader />);
    expect(screen.queryByRole("navigation", { name: "모바일 주요 탐색" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "살아 있는 견종도감 홈" })).toHaveAttribute("href", "/");
  });

  it("opens the secondary destinations from the top-right menu", () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getByRole("button", { name: "메뉴" }));

    const navigation = screen.getByRole("navigation", { name: "더 둘러보기" });
    expect(within(navigation).getAllByRole("link")).toHaveLength(3);
    expect(
      within(navigation).getByRole("link", { name: /견종 카드/ }),
    ).toHaveAttribute("href", "/");
    const placesLink = within(navigation).getByRole("link", { name: /함께 갈 곳/ });
    expect(placesLink).toHaveAttribute("href", "/places");
    placesLink.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(placesLink);
    expect(screen.queryByRole("navigation", { name: "더 둘러보기" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "메뉴" })).toHaveAttribute("aria-expanded", "false");
  });
});
