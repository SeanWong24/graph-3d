import { consume } from "@lit/context";
import { customElement, property } from "lit/decorators.js";
import { Color, ColorRepresentation, MeshBasicMaterial, Texture } from "three";
import { meshContext, MeshContext } from "../utils/context/mesh";
import { ThreeMaterialBase } from "../utils/base/material";

@customElement("three-mesh-basic-material")
export class ThreeMeshBasicMaterial extends ThreeMaterialBase<MeshBasicMaterial> {
  protected override _material = new MeshBasicMaterial();

  #color?: ColorRepresentation;
  @property({ reflect: true })
  set color(value: ColorRepresentation) {
    this._material.color = new Color(value ?? "");
  }
  get color() {
    return this.#color ?? `#${this._material.color.getHexString()}`;
  }

  #map?: string;
  @property({ reflect: true })
  set map(value: string | undefined) {
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
    "three-mesh-basic-material": ThreeMeshBasicMaterial;
  }
}
