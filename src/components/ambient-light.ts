import { customElement } from "lit/decorators.js";
import { AmbientLight } from "three";
import { ThreeLightBase } from "../utils/base/light";

@customElement("three-ambient-light")
export class ThreeAmbientLight extends ThreeLightBase<AmbientLight> {
  protected override initializeLight() {
    this._light = new AmbientLight(this.color, this.intensity);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "three-ambient-light": ThreeAmbientLight;
  }
}
