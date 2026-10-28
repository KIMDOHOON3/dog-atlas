import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CardSearch, type CardSearchEntry } from "./card-search";

const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

const entry: CardSearchEntry = {
  name: "프렌치 불도그",
  nameEn: "French Bulldog",
  slug: "french-bulldog",
  size: "중형견",
  index: 7,
  image: "/dog.webp",
};

describe("card search focus", () => {
  it("opens a non-card breed by its catalog alias when Enter submits the search", () => {
    push.mockClear();
    const onSelect = vi.fn();
    render(
      <CardSearch
        size="소형견"
        entries={[entry]}
        breeds={[
          {
            slug: "ariegeois",
            nameKo: "아리에주아",
            nameEn: "Ariegeois",
            imageSrc: "/ariegeois.webp",
            aliases: ["Ariege Hound"],
          },
        ]}
        disabled={false}
        onSize={vi.fn()}
        onSelect={onSelect}
      />,
    );
    const input = screen.getByRole("textbox", { name: "견종 이름 검색" });
    fireEvent.change(input, { target: { value: "Ariege Hound" } });
    expect(
      screen.getByRole("button", { name: "아리에주아 상세 보기" }),
    ).toBeInTheDocument();
    fireEvent.submit(screen.getByRole("search"));
    expect(push).toHaveBeenCalledWith("/breeds/ariegeois");
    expect(onSelect).not.toHaveBeenCalled();
  });
  it.each([
    { detail: 1, refocus: false },
    { detail: 0, refocus: true },
  ])(
    "selects a result with pointer/keyboard click detail $detail",
    ({ detail, refocus }) => {
      const onSelect = vi.fn();
      render(
        <CardSearch
          size="소형견"
          entries={[entry]}
          disabled={false}
          onSize={vi.fn()}
          onSelect={onSelect}
        />,
      );
      const input = screen.getByRole("textbox", { name: "견종 이름 검색" });
      input.focus();
      fireEvent.change(input, { target: { value: "프렌치" } });
      fireEvent.click(
        screen.getByRole("button", { name: "프렌치 불도그 중형견" }),
        { detail },
      );
      expect(onSelect).toHaveBeenCalledWith(entry);
      expect(input).toHaveValue("");
      expect(document.activeElement === input).toBe(refocus);
      expect(screen.queryByLabelText("검색 결과")).not.toBeInTheDocument();
    },
  );
});
