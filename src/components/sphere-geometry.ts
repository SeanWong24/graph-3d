import { consume } from "@lit/context";
import { PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { SphereGeometry } from "three";
import { meshContext, MeshContext } from "../utils/context/mesh";
import { G3DBase } from "../utils/base/base";

@customElement("g3d-sphere-geometry")
export class G3DSphereGeometry extends G3DBase {
  #geometry?: SphereGeometry;

  isReady = false;

  @property({ type: Number, reflect: true })
  radius?: number;

  @property({ type: Number, reflect: true, attribute: "width-segments" })
  widthSegments?: number;

  @property({ type: Number, reflect: true, attribute: "height-segments" })
  heightSegments?: number;

  @consume({ context: meshContext })
  _meshContext?: MeshContext;

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.#geometry = new SphereGeometry(
      this.radius,
      this.widthSegments,
      this.heightSegments
    );
    this._meshContext?.updateGeometry(this.#geometry);
    this.isReady = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "g3d-sphere-geometry": G3DSphereGeometry;
  }
}
