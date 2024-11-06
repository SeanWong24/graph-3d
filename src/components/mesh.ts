import { provide } from "@lit/context";
import { customElement } from "lit/decorators.js";
import { BufferGeometry, Material, Mesh } from "three";
import { meshContext, MeshContext } from "../utils/context/mesh";
import { ThreeObject3DBase } from "../utils/base/object-3d";

@customElement("g3d-mesh")
export class G3DMesh extends ThreeObject3DBase<Mesh> {
  protected override _object = new Mesh();

  @provide({ context: meshContext })
  context: MeshContext = {
    updateGeometry: (geometry) => this.#updateGeometry(geometry),
    updateMaterial: (material) => this.#updateMaterial(material),
  };

  #updateGeometry(geometry: BufferGeometry) {
    if (!this._object) {
      return;
    }
    this._object.geometry = geometry;
    this._rendererContext?.rerender();
  }

  #updateMaterial(material: Material) {
    if (!this._object) {
      return;
    }
    this._object.material = material;
    this._rendererContext?.rerender();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "g3d-mesh": G3DMesh;
  }
}
