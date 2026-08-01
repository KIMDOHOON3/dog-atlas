import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SearchBox } from "./search-box";

const { push } = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

const breeds = [
  { slug: "japanese-spitz", nameKo: "재패니즈 스피츠", nameEn: "Japanese Spitz" },
  { slug: "samoyed", nameKo: "사모예드", nameEn: "Samoyed" },
];

describe("SearchBox", () => {
  beforeEach(() => push.mockClear());

  it("navigates to an exact Korean breed match", () => {
    render(<SearchBox breeds={breeds} />);
    fireEvent.change(screen.getByLabelText("견종 이름 검색"), { target: { value: "재패니즈 스피츠" } });
    fireEvent.click(screen.getByRole("button", { name: "찾기" }));
    expect(push).toHaveBeenCalledWith("/breeds/japanese-spitz");
  });

  it("shows a helpful message for an unavailable breed", () => {
    render(<SearchBox breeds={breeds} />);
    fireEvent.change(screen.getByLabelText("견종 이름 검색"), { target: { value: "진돗개" } });
    fireEvent.click(screen.getByRole("button", { name: "찾기" }));
    expect(screen.getByText(/첫 도감에는 다섯 견종이 있어요/)).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });
});
