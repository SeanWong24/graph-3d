import { ComplexAttributeConverter } from "lit";
import { Vector2 } from "three";

export const vector2Converter: ComplexAttributeConverter<Vector2, string> = {
  fromAttribute: (value: string) =>
    new Vector2(...value?.split(/\s+/).map((d) => +d)),
  toAttribute: (value: Vector2) => `${value.x} ${value.y}`,
};
