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
  { slug: "french-bulldog", nameKo: "프렌치 불도그", nameEn: "French Bulldog", aliases: ["프렌치 불독"] },
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
    expect(screen.getByText(/현재 도감에는 3종의 강아지가 있어요/)).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });

  it("navigates from a common Korean alias", () => {
    render(<SearchBox breeds={breeds} />);
    fireEvent.change(screen.getByLabelText("견종 이름 검색"), { target: { value: "프렌치 불독" } });
    fireEvent.click(screen.getByRole("button", { name: "찾기" }));
    expect(push).toHaveBeenCalledWith("/breeds/french-bulldog");
  });

  it("shows related breeds while typing and opens a suggestion", () => {
    render(<SearchBox breeds={breeds} />);
    fireEvent.change(screen.getByLabelText("견종 이름 검색"), { target: { value: "프렌치" } });
    expect(screen.getByRole("listbox", { name: "관련 견종" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("option", { name: /프렌치 불도그/ }));
    expect(push).toHaveBeenCalledWith("/breeds/french-bulldog");
  });

  it("finds a breed from a partial alias", () => {
    render(<SearchBox breeds={breeds} />);
    fireEvent.change(screen.getByLabelText("견종 이름 검색"), { target: { value: "불독" } });
    expect(screen.getByRole("option", { name: /프렌치 불도그/ })).toBeInTheDocument();
  });
});
