import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { breeds } from "@/content/breeds/data";
import { homeCuriosityThemes } from "@/content/home-curiosity";
import { HomeCuriosityExplorer } from "./home-curiosity-explorer";

describe("HomeCuriosityExplorer", () => {
  it("links every curiosity topic directly to its detail page", () => {
    render(<HomeCuriosityExplorer breeds={breeds} themes={homeCuriosityThemes} />);

    expect(screen.getAllByRole("link")).toHaveLength(homeCuriosityThemes.length);
    expect(screen.getByRole("link", { name: /큰 체구/ })).toHaveAttribute("href", "/curiosity/giant-build");
    expect(screen.getByRole("link", { name: /독특한 털/ })).toHaveAttribute("href", "/curiosity/distinctive-coats");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("does not render the former breed preview panel", () => {
    render(<HomeCuriosityExplorer breeds={breeds} themes={homeCuriosityThemes} />);

    expect(screen.queryByText("코몬도르")).not.toBeInTheDocument();
    expect(screen.queryByText("풀리")).not.toBeInTheDocument();
    expect(screen.queryByText("베르가마스코 셰퍼드")).not.toBeInTheDocument();
  });
});
