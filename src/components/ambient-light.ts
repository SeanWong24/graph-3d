import { customElement } from "lit/decorators.js";
import { AmbientLight } from "three";
import { ThreeLightBase } from "../utils/base/light";

@customElement("three-ambient-light")
export class ThreeAmbientLight extends ThreeLightBase<AmbientLight> {
  protected override _object = new AmbientLight();
}

declare global {
  interface HTMLElementTagNameMap {
    "three-ambient-light": ThreeAmbientLight;
  }
}
