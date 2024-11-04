import { ComplexAttributeConverter } from "lit";
import { Euler, EulerOrder } from "three";

export const eulerConverter: ComplexAttributeConverter<Euler, string> = {
  fromAttribute: (value: string) =>
    new Euler(
      ...(value?.split(/\s+/).map((d, i) => (i < 3 ? +d : d)) as [
        number | undefined,
        number | undefined,
        number | undefined,
        EulerOrder | undefined
      ])
    ),
  toAttribute: (value: Euler) =>
    `${value.x} ${value.y} ${value.z} ${value.order}`,
};
