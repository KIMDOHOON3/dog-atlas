import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InterestBreedToggle } from "./interest-breed-toggle";
import { INTEREST_BREEDS_STORAGE_KEY, InterestBreedsProvider, type InterestBreedSummary } from "./interest-breeds";

const testBreeds: InterestBreedSummary[] = [
  { slug: "one", nameKo: "첫째" },
  { slug: "two", nameKo: "둘째" },
  { slug: "three", nameKo: "셋째" },
  { slug: "four", nameKo: "넷째" },
];

function TestToggles() {
  return <>{testBreeds.map((breed) => <InterestBreedToggle key={breed.slug} slug={breed.slug} nameKo={breed.nameKo} />)}</>;
}

describe("InterestBreedsProvider", () => {
  beforeEach(() => localStorage.clear());

  it("stores and removes a candidate without login", async () => {
    const user = userEvent.setup();
    render(<InterestBreedsProvider breeds={testBreeds}><InterestBreedToggle slug="one" nameKo="첫째" /></InterestBreedsProvider>);
    const addButton = await screen.findByRole("button", { name: "첫째 비교 후보에 담기" });
    await waitFor(() => expect(addButton).toBeEnabled());

    await user.click(addButton);
    expect(screen.getByRole("button", { name: "첫째 후보에서 빼기" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("비교 후보에 첫째를 담았어요.")).toBeVisible();
    expect(JSON.parse(localStorage.getItem(INTEREST_BREEDS_STORAGE_KEY)!)).toEqual(["one"]);

    await user.click(screen.getByRole("button", { name: "첫째 후보에서 빼기" }));
    expect(JSON.parse(localStorage.getItem(INTEREST_BREEDS_STORAGE_KEY)!)).toEqual([]);
  });

  it("keeps insertion order and refuses a fourth candidate", async () => {
    const user = userEvent.setup();
    render(<InterestBreedsProvider breeds={testBreeds}><TestToggles /></InterestBreedsProvider>);
    await waitFor(() => expect(screen.getByRole("button", { name: "첫째 비교 후보에 담기" })).toBeEnabled());

    for (const name of ["첫째", "둘째", "셋째"]) {
      await user.click(screen.getByRole("button", { name: `${name} 비교 후보에 담기` }));
    }
    await user.click(screen.getByRole("button", { name: "넷째 비교 후보에 담기" }));

    expect(JSON.parse(localStorage.getItem(INTEREST_BREEDS_STORAGE_KEY)!)).toEqual(["one", "two", "three"]);
    expect(screen.getByText("비교 후보는 3마리까지 담을 수 있어요. 먼저 한 마리를 빼주세요.")).toBeVisible();
  });

  it("recovers safely from damaged storage", async () => {
    localStorage.setItem(INTEREST_BREEDS_STORAGE_KEY, "not-json");
    render(<InterestBreedsProvider breeds={testBreeds}><InterestBreedToggle slug="one" nameKo="첫째" /></InterestBreedsProvider>);
    await waitFor(() => expect(screen.getByRole("button", { name: "첫째 비교 후보에 담기" })).toBeEnabled());
    expect(screen.getByRole("button", { name: "첫째 비교 후보에 담기" })).toHaveAttribute("aria-pressed", "false");
  });
});
