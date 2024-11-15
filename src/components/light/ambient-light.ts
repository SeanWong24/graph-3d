import { customElement } from "lit/decorators.js";
import { AmbientLight } from "three";
import { G3DLightBase } from "../../utils/base/light";

@customElement("g3d-ambient-light")
export class G3DAmbientLight extends G3DLightBase<AmbientLight> {
  protected override _object = new AmbientLight();
}

declare global {
  interface HTMLElementTagNameMap {
    "g3d-ambient-light": G3DAmbientLight;
  }
}
