import { YARD } from "./yard-layout";

export type GrassContact = {
  id: string;
  x: number;
  z: number;
  vx: number;
  vz: number;
  radius: number;
  grounded: boolean;
};

/** A small direction/pressure field shared by the lawn and visible grass blades. */
export function createGrassResponse(width = 128, height = 96) {
  const data = new Uint8Array(width * height * 4);
  const field = new Float32Array(width * height * 3);
  const previous = new Map<string, GrassContact>();
  let active = false;
  const encode = () => {
    for (let i = 0; i < width * height; i++) {
      data[i * 4] = Math.round(128 + field[i * 3] * 127);
      data[i * 4 + 1] = Math.round(128 + field[i * 3 + 1] * 127);
      data[i * 4 + 2] = Math.round(field[i * 3 + 2] * 255);
      data[i * 4 + 3] = 255;
    }
  };
  encode();
  return {
    data,
    width,
    height,
    reset() {
      previous.clear();
      field.fill(0);
      active = false;
      encode();
    },
    update(dt: number, contacts: readonly GrassContact[]) {
      let changed = active;
      active = false;
      const recovery = Math.exp(-Math.max(0, dt) / 1.1);
      for (let i = 0; i < width * height; i++) {
        const index = i * 3;
        if (field[index + 2] * recovery < 0.012) {
          field[index] = field[index + 1] = field[index + 2] = 0;
        } else {
          field[index] *= recovery;
          field[index + 1] *= recovery;
          field[index + 2] *= recovery;
          active = true;
        }
      }
      for (const contact of contacts) {
        const last = previous.get(contact.id);
        previous.set(contact.id, { ...contact });
        if (!contact.grounded) continue;
        const dx = last ? contact.x - last.x : 0;
        const dz = last ? contact.z - last.z : 0;
        const distance = Math.hypot(dx, dz);
        const speed = Math.hypot(contact.vx, contact.vz);
        // Ignore sleeping objects and repositioning; never bridge an airborne arc.
        if (distance > 1.5 || (distance < 0.008 && speed < 0.2)) continue;
        const continuous = last?.grounded && distance >= 0.008;
        const startX = continuous ? last.x : contact.x;
        const startZ = continuous ? last.z : contact.z;
        const dirX = continuous
          ? dx / distance
          : contact.vx / Math.max(speed, 0.001);
        const dirZ = continuous
          ? dz / distance
          : contact.vz / Math.max(speed, 0.001);
        const lengthX = contact.x - startX,
          lengthZ = contact.z - startZ;
        const lengthSq = lengthX * lengthX + lengthZ * lengthZ;
        const radius = Math.max(0.12, contact.radius);
        const toX = (x: number) =>
          ((x + YARD.radiusX) / (2 * YARD.radiusX)) * width;
        const toZ = (z: number) =>
          ((z + YARD.radiusZ) / (2 * YARD.radiusZ)) * height;
        const minX = Math.max(
          0,
          Math.floor(toX(Math.min(startX, contact.x) - radius)),
        );
        const maxX = Math.min(
          width - 1,
          Math.ceil(toX(Math.max(startX, contact.x) + radius)),
        );
        const minZ = Math.max(
          0,
          Math.floor(toZ(Math.min(startZ, contact.z) - radius)),
        );
        const maxZ = Math.min(
          height - 1,
          Math.ceil(toZ(Math.max(startZ, contact.z) + radius)),
        );
        for (let z = minZ; z <= maxZ; z++)
          for (let x = minX; x <= maxX; x++) {
            const wx = (((x + 0.5) / width) * 2 - 1) * YARD.radiusX;
            const wz = (((z + 0.5) / height) * 2 - 1) * YARD.radiusZ;
            if ((wx / YARD.radiusX) ** 2 + (wz / YARD.radiusZ) ** 2 > 1)
              continue;
            const t = lengthSq
              ? Math.max(
                  0,
                  Math.min(
                    1,
                    ((wx - startX) * lengthX + (wz - startZ) * lengthZ) /
                      lengthSq,
                  ),
                )
              : 0;
            const distanceToPath = Math.hypot(
              wx - startX - t * lengthX,
              wz - startZ - t * lengthZ,
            );
            if (distanceToPath >= radius) continue;
            const falloff = 1 - distanceToPath / radius;
            const pressure =
              falloff *
              falloff *
              (3 - 2 * falloff) *
              Math.min(0.9, 0.45 + speed * 0.1);
            const index = (z * width + x) * 3;
            if (pressure > field[index + 2]) {
              field[index] = dirX * pressure;
              field[index + 1] = dirZ * pressure;
              field[index + 2] = pressure;
              changed = active = true;
            }
          }
      }
      if (changed) encode();
      return changed;
    },
  };
}
