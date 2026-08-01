import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { breeds } from "@/content/breeds/data";
import { TodayBreedCarousel } from "./today-breed-carousel";

vi.mock("./breed-visual", () => ({
  BreedVisual: ({ breed }: { breed: { nameKo: string } }) => <div aria-label={`${breed.nameKo} 일러스트`} />,
}));

describe("TodayBreedCarousel", () => {
  it("moves to the next breed and wraps around", () => {
    render(<TodayBreedCarousel breeds={breeds} initialIndex={breeds.length - 1} />);

    fireEvent.click(screen.getByRole("button", { name: "다음 강아지 보기" }));

    expect(screen.getByLabelText(`${breeds.length}개 중 1번째`)).toHaveTextContent(`1 / ${breeds.length}`);
    expect(screen.getByRole("link", { name: /이 강아지 이야기 보기/ })).toHaveAttribute("href", `/breeds/${breeds[0].slug}`);
  });

  it("does not render a visible today badge over the image", () => {
    render(<TodayBreedCarousel breeds={breeds} initialIndex={0} />);

    expect(screen.queryByText(`오늘의 강아지 · ${breeds[0].nameKo}`)).not.toBeInTheDocument();
  });
});
