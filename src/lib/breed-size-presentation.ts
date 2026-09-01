import { getBreedSizeProfile } from "@/content/breed-sizes/data";
import { breedSizeServiceOverrideBySlug } from "@/content/breed-sizes/service-overrides";
import type { DogAtlasSizeClass, Measurement } from "@/content/breed-sizes/schema";
import { DOG_ATLAS_SIZE_ORDER, resolveBreedSize } from "@/lib/breed-size";

export const dogAtlasSizeLabels: Record<DogAtlasSizeClass, string> = {
  "extra-small": "초소형",
  small: "소형",
  medium: "중형",
  large: "대형",
  giant: "초대형",
};

function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(1)));
}

export function formatBreedMeasurement(measurement: Measurement | undefined, unit: "cm" | "kg") {
  if (!measurement) return undefined;
  if (measurement.kind === "range") {
    if (measurement.min === measurement.max) return `${formatNumber(measurement.min)}${unit}`;
    return `${formatNumber(measurement.min)}~${formatNumber(measurement.max)}${unit}`;
  }
  if (measurement.kind === "representative") return `${formatNumber(measurement.value)}${unit}`;
  if (measurement.kind === "lower-bound") return `${formatNumber(measurement.value)}${unit} 이상`;
  return `${formatNumber(measurement.value)}${unit} 이하`;
}

export type BreedSizePresentation = {
  status: "confirmed" | "provisional" | "varieties" | "variable-parentage" | "conflict" | "missing";
  filterClasses: DogAtlasSizeClass[];
  displayLabel?: string;
  height?: string;
  weight?: string;
  varieties?: Array<{
    id: string;
    label: string;
    height?: string;
    weight?: string;
    otherMeasurement?: string;
    sizeClass?: DogAtlasSizeClass;
    sizeLabel?: string;
  }>;
};

export function getBreedSizePresentation(slug: string): BreedSizePresentation {
  const profile = getBreedSizeProfile(slug);
  if (!profile) return { status: "missing", filterClasses: [] };
  const resolved = resolveBreedSize(profile);

  if (resolved.status === "varieties") {
    const filterClasses = [...new Set(resolved.varieties.flatMap((variety) => (
      variety.result.status === "confirmed" && variety.result.finalClass ? [variety.result.finalClass] : []
    )))].sort((a, b) => DOG_ATLAS_SIZE_ORDER.indexOf(a) - DOG_ATLAS_SIZE_ORDER.indexOf(b));
    const first = filterClasses[0];
    const last = filterClasses.at(-1);
    const classLabel = first
      ? first === last ? dogAtlasSizeLabels[first] : `${dogAtlasSizeLabels[first]}~${dogAtlasSizeLabels[last!]}`
      : undefined;

    return {
      status: "varieties",
      filterClasses,
      displayLabel: classLabel ? `유형별 · ${classLabel}` : "유형별 크기",
      varieties: resolved.varieties.map((variety) => {
        const sizeClass = variety.result.status === "confirmed" ? variety.result.finalClass : undefined;
        return {
          id: variety.id,
          label: variety.label,
          height: formatBreedMeasurement(variety.heightCm, "cm"),
          weight: formatBreedMeasurement(variety.weightKg, "kg"),
          otherMeasurement: variety.otherMeasurement,
          sizeClass,
          sizeLabel: sizeClass ? dogAtlasSizeLabels[sizeClass] : undefined,
        };
      }),
    };
  }

  if (resolved.status === "variable-parentage") {
    return { status: resolved.status, filterClasses: [], displayLabel: "부모견에 따라 크기가 달라져요" };
  }

  if (resolved.status === "missing") return { status: resolved.status, filterClasses: [] };

  const serviceOverride = breedSizeServiceOverrideBySlug.get(slug);
  const finalClass = resolved.status === "confirmed" ? serviceOverride?.finalClass ?? resolved.finalClass : undefined;

  return {
    status: resolved.status,
    filterClasses: finalClass ? [finalClass] : [],
    displayLabel: finalClass
      ? dogAtlasSizeLabels[finalClass]
      : "크기 정보 보완 중",
    height: formatBreedMeasurement(profile.heightCm, "cm"),
    weight: formatBreedMeasurement(profile.weightKg, "kg"),
  };
}
