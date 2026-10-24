import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CardSearch, type CardSearchEntry } from "./card-search";

const entry: CardSearchEntry = {
  name: "프렌치 불도그",
  nameEn: "French Bulldog",
  slug: "french-bulldog",
  size: "중형견",
  index: 7,
  image: "/dog.webp",
};

describe("card search focus", () => {
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
