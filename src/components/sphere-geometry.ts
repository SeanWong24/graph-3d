import { consume } from "@lit/context";
import { LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { SphereGeometry } from "three";
import { meshContext, MeshContext } from "../utils/context/mesh";

@customElement("three-sphere-geometry")
export class ThreeSphereGeometry extends LitElement {
  #geometry?: SphereGeometry;

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
  }

  render() {
    return null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "three-sphere-geometry": ThreeSphereGeometry;
  }
}
