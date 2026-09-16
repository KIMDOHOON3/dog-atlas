import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import PlacesPage from "./page";
import { listPetPlaces, placeRegions } from "@/lib/pet-tour-server";
vi.mock("@/lib/pet-tour-server", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/pet-tour-server")>()),
  listPetPlaces: vi.fn(),
  placeRegions: vi.fn(),
}));
afterEach(cleanup);
beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(listPetPlaces).mockResolvedValue({
    items: [{ contentid: "123", title: "테스트 장소", contenttypeid: "39" }],
    total: 50,
  });
  vi.mocked(placeRegions).mockResolvedValue([{ code: "41", name: "경기도" }]);
});
it("shares one category selection and preserves regional filters while resetting pagination", async () => {
  render(
    await PlacesPage({
      searchParams: Promise.resolve({
        type: "39",
        region: "41",
        q: "카페",
        page: "2",
      }),
    }),
  );
  expect(screen.getAllByRole("combobox")).toHaveLength(1);
  expect(screen.getByLabelText("지역")).toHaveValue("41");
  const category = within(
    screen.getByRole("navigation", { name: "장소 종류" }),
  ).getByRole("link", { name: "숙박" });
  const categoryUrl = new URL(
    category.getAttribute("href")!,
    "https://example.com",
  );
  expect(Object.fromEntries(categoryUrl.searchParams)).toMatchObject({
    type: "32",
    region: "41",
    q: "카페",
    page: "1",
    mode: "region",
  });
  const next = screen.getByRole("link", { name: "다음 →" });
  expect(
    new URL(next.getAttribute("href")!, "https://example.com").searchParams.get(
      "page",
    ),
  ).toBe("3");
  const form = screen.getByRole("button", { name: /^검색$/ }).closest("form")!;
  expect(new FormData(form).get("type")).toBe("39");
});
it("shows nearby controls without requesting regional data or an extra category selector", async () => {
  render(
    await PlacesPage({
      searchParams: Promise.resolve({ mode: "nearby", type: "39" }),
    }),
  );
  expect(listPetPlaces).not.toHaveBeenCalled();
  expect(placeRegions).not.toHaveBeenCalled();
  expect(screen.getAllByRole("combobox")).toHaveLength(1);
  expect(screen.getByLabelText("주변 범위")).toBeInTheDocument();
  expect(
    screen.queryByRole("region", { name: "장소 검색 결과" }),
  ).not.toBeInTheDocument();
});
it("keeps uncommon place types visible and selected", async () => {
  render(await PlacesPage({ searchParams: Promise.resolve({ type: "14" }) }));
  const culture = screen.getByRole("link", { name: "문화시설" });
  expect(culture).toHaveAttribute("aria-current", "page");
  expect(culture.closest("details")).toHaveAttribute("open");
});
it("resets edited fields when navigation changes the applied search", async () => {
  const { rerender } = render(
    await PlacesPage({
      searchParams: Promise.resolve({ q: "카페", region: "41" }),
    }),
  );
  const input = screen.getByRole("textbox", { name: "장소 이름" });
  fireEvent.change(input, { target: { value: "다른 검색" } });
  rerender(
    await PlacesPage({ searchParams: Promise.resolve({ q: "", region: "" }) }),
  );
  expect(screen.getByRole("textbox", { name: "장소 이름" })).toHaveValue("");
  expect(screen.getByLabelText("지역")).toHaveValue("");
});
