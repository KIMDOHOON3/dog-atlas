import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import NearbyPlaces from "./nearby-places";
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
it("only requests location after a click, sends rounded coordinates by POST and distinguishes distance from time", async () => {
  const locate = vi.fn((success) =>
    success({ coords: { latitude: 37.56651234, longitude: 126.9781234 } }),
  );
  vi.stubGlobal("navigator", { geolocation: { getCurrentPosition: locate } });
  const fetcher = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      total: 1,
      items: [
        {
          contentid: "12",
          title: "가까운 공원",
          contenttypeid: "12",
          dist: "1519",
          mapy: "37.57",
          mapx: "126.96",
        },
      ],
    }),
  });
  vi.stubGlobal("fetch", fetcher);
  const { rerender } = render(<NearbyPlaces />);
  expect(locate).not.toHaveBeenCalled();
  fireEvent.click(
    screen.getByRole("button", { name: "내 주변 가까운 곳 찾기" }),
  );
  expect(await screen.findByText("직선거리 약 1.5km")).toBeInTheDocument();
  expect(fetcher.mock.calls[0][0]).toBe("/api/places/nearby");
  expect(JSON.parse(fetcher.mock.calls[0][1].body)).toMatchObject({
    lat: 37.567,
    lng: 126.978,
  });
  expect(
    screen.getByRole("link", { name: "이동시간·길찾기 ↗" }),
  ).toHaveAttribute("href", expect.stringContaining("map.kakao.com/link/to/"));
  rerender(<NearbyPlaces type="39" />);
  expect(screen.queryByText("직선거리 약 1.5km")).not.toBeInTheDocument();
  expect(locate).toHaveBeenCalledTimes(1);
  expect(fetcher).toHaveBeenCalledTimes(1);
  fireEvent.click(
    screen.getByRole("button", { name: "내 주변 가까운 곳 찾기" }),
  );
  await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2));
  expect(JSON.parse(fetcher.mock.calls[1][1].body).type).toBe("39");
});
it("offers regional search on permission denial without fetching or retrying automatically", async () => {
  vi.stubGlobal("navigator", {
    geolocation: {
      getCurrentPosition: (
        _success: unknown,
        fail: (e: { code: number }) => void,
      ) => fail({ code: 1 }),
    },
  });
  const fetcher = vi.fn();
  vi.stubGlobal("fetch", fetcher);
  render(<NearbyPlaces />);
  fireEvent.click(
    screen.getByRole("button", { name: "내 주변 가까운 곳 찾기" }),
  );
  expect(
    await screen.findByText(/위치 권한이 꺼져 있어요/),
  ).toBeInTheDocument();
  expect(fetcher).not.toHaveBeenCalled();
});
it("ignores a result arriving after the user changes the selected category", async () => {
  let resolve: (value: unknown) => void = () => {};
  vi.stubGlobal("navigator", {
    geolocation: {
      getCurrentPosition: (success: (p: unknown) => void) =>
        success({ coords: { latitude: 37, longitude: 127 } }),
    },
  });
  const fetcher = vi.fn(
    () =>
      new Promise((r) => {
        resolve = r;
      }),
  );
  vi.stubGlobal("fetch", fetcher);
  const { rerender } = render(<NearbyPlaces />);
  fireEvent.click(
    screen.getByRole("button", { name: "내 주변 가까운 곳 찾기" }),
  );
  await waitFor(() => expect(fetcher).toHaveBeenCalled());
  rerender(<NearbyPlaces type="39" />);
  resolve({
    ok: true,
    json: async () => ({
      total: 1,
      items: [{ contentid: "12", title: "오래된 결과" }],
    }),
  });
  await waitFor(() =>
    expect(
      screen.getByRole("button", { name: "내 주변 가까운 곳 찾기" }),
    ).toBeEnabled(),
  );
  expect(screen.queryByText("오래된 결과")).not.toBeInTheDocument();
});
