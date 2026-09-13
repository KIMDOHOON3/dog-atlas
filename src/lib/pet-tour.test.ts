import { describe, expect, it } from "vitest";
import { parseTourResponse, plainTourText } from "./pet-tour";

const response = (items: unknown, totalCount = 1) => ({
  response: { header: { resultCode: "0000" }, body: { items, totalCount } },
});
describe("photo-free public tourism records", () => {
  it("keeps all non-image fields including unfamiliar provider fields", () => {
    expect(
      parseTourResponse(
        response({
          item: [
            {
              contentid: "12",
              title: "공원",
              firstimage: "https://a/b.jpg",
              roomimg1: "https://a/c.jpg",
              newPolicy: "목줄",
              fee: 0,
              empty: null,
            },
          ],
        }),
      ),
    ).toEqual({
      total: 1,
      items: [{ contentid: "12", title: "공원", newPolicy: "목줄", fee: "0" }],
    });
  });
  it("handles an empty result and a singleton item", () => {
    expect(parseTourResponse(response("", 0)).items).toEqual([]);
    expect(
      parseTourResponse(response({ item: { title: "한 곳" } })).items,
    ).toHaveLength(1);
  });
  it("rejects malformed and provider-error responses", () => {
    expect(() =>
      parseTourResponse({ response: { header: { resultCode: "30" } } }),
    ).toThrow();
    expect(() =>
      parseTourResponse(response({ item: [{ bad: { nested: true } }] })),
    ).toThrow();
  });
  it("removes executable markup and photos while retaining paragraphs and website addresses", () => {
    expect(
      plainTourText(
        '<script>alert(1)</script>09:00<br>목줄 &amp; 가방<img src="https://a/b.jpg"><a href="https://example.com">예약</a>',
      ),
    ).toBe("09:00\n목줄 & 가방예약 (https://example.com)");
  });
});
