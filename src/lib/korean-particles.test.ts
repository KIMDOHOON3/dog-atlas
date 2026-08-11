import { describe, expect, it } from "vitest";

import {
  hasFinalConsonant,
  withObjectParticle,
  withTopicParticle,
} from "./korean-particles";

describe("Korean particles", () => {
  it("detects the final consonant of the last Hangul syllable", () => {
    expect(hasFinalConsonant("삽살개")).toBe(false);
    expect(hasFinalConsonant("보더콜리")).toBe(false);
    expect(hasFinalConsonant("시프독")).toBe(true);
    expect(hasFinalConsonant("그레이트 덴")).toBe(true);
  });

  it("adds a natural topic particle", () => {
    expect(withTopicParticle("삽살개")).toBe("삽살개는");
    expect(withTopicParticle("보더콜리")).toBe("보더콜리는");
    expect(withTopicParticle("셔틀랜드 시프독")).toBe("셔틀랜드 시프독은");
    expect(withTopicParticle("그레이트 덴")).toBe("그레이트 덴은");
  });

  it("adds a natural object particle", () => {
    expect(withObjectParticle("질주")).toBe("질주를");
    expect(withObjectParticle("무리 사냥")).toBe("무리 사냥을");
    expect(withObjectParticle("가축 보호")).toBe("가축 보호를");
    expect(withObjectParticle("경비 작업")).toBe("경비 작업을");
  });
});
