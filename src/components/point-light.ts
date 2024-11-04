import { customElement, property } from "lit/decorators.js";
import { PointLight } from "three";
import { ThreeLightBase } from "../utils/base/light";

@customElement("three-point-light")
export class ThreePointLight extends ThreeLightBase<PointLight> {
  protected override _object = new PointLight();

  @property({ type: Number })
  set distance(value: number) {
    this._object.distance = value;
  }
  get distance() {
    return this._object.distance;
  }

  @property({ type: Number })
  set decay(value: number) {
    this._object.decay = value;
  }
  get decay() {
    return this._object.decay;
  }

  protected override _initializeLight() {
    super._initializeLight();
    this._object.distance = this.distance;
    this._object.decay = this.decay;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "three-point-light": ThreePointLight;
  }
}
