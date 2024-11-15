import { consume } from "@lit/context";
import { customElement, property } from "lit/decorators.js";
import { Color, ColorRepresentation, MeshBasicMaterial, Texture } from "three";
import { meshContext, MeshContext } from "../../utils/context/mesh";
import { G3DMaterialBase } from "../../utils/base/material";

@customElement("g3d-mesh-basic-material")
export class G3DMeshBasicMaterial extends G3DMaterialBase<MeshBasicMaterial> {
  protected override _material = new MeshBasicMaterial();

  #color?: ColorRepresentation;
  @property({ reflect: true })
  set color(value: ColorRepresentation) {
    this.requestUpdate("color", this.color);
    this._material.color = new Color(value ?? "");
  }
  get color() {
    return this.#color ?? `#${this._material.color.getHexString()}`;
  }

  #map?: string;
  @property({ reflect: true })
  set map(value: string | undefined) {
    this.requestUpdate("map", {});
    this.#map = value;
    this._material.map = this._obtainAsset(this.#map) as Texture;
  }
  get map() {
    return this.#map;
  }

  @consume({ context: meshContext })
  _meshContext?: MeshContext;

  protected override initializeMaterial() {
    super.initializeMaterial();
    this._material.color = new Color(this.color ?? "");
    this._material.opacity = this.opacity;
    this._material.map = this._obtainAsset(this.map) as Texture;
    this._material.needsUpdate = true;
    this._rendererContext?.watchAssetChange((id) =>
      this.#handleAssetsChange(id)
    );
    this._meshContext?.updateMaterial(this._material);
    return;
  }

  #handleAssetsChange(id: string) {
    if (!this._material) {
      return;
    }
    switch (id) {
      case this.map:
        this._material.map = this._obtainAsset(this.map) as Texture;
        this._material.needsUpdate = true;
        this._rendererContext?.rerender();
        break;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "g3d-mesh-basic-material": G3DMeshBasicMaterial;
  }
}
