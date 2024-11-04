import { ComplexAttributeConverter } from "lit";
import { Vector3 } from "three";

export const vector3Converter: ComplexAttributeConverter<Vector3, string> = {
  fromAttribute: (value: string) =>
    new Vector3(...value?.split(/\s+/).map((d) => +d)),
  toAttribute: (value: Vector3) => `${value.x} ${value.y} ${value.z}`,
};
