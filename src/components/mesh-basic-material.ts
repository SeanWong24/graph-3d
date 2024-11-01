import { consume } from "@lit/context";
import { customElement, property } from "lit/decorators.js";
import { Color, ColorRepresentation, MeshBasicMaterial, Texture } from "three";
import { meshContext, MeshContext } from "../utils/context/mesh";
import { ThreeMaterialBase } from "../utils/base/material";

@customElement("three-mesh-basic-material")
export class ThreeMeshBasicMaterial extends ThreeMaterialBase<MeshBasicMaterial> {
  #color?: ColorRepresentation;
  @property()
  set color(value: ColorRepresentation | undefined) {
    this.#color = value;
    if (!this._material) {
      return;
    }
    this._material.color = new Color(value ?? "");
    this._material.needsUpdate = true;
    this._rendererContext?.rerender();
  }
  get color() {
    return this.#color;
  }

  #map?: string;
  @property({ reflect: true })
  set map(value: string | undefined) {
    this.#map = value;
    if (!this._material) {
      return;
    }
    this._material.map = this._obtainAsset(this.#map) as Texture;
    this._material.needsUpdate = true;
    this._rendererContext?.rerender();
  }
  get map() {
    return this.#map;
  }

  @consume({ context: meshContext })
  _meshContext?: MeshContext;

  protected override initializeMaterial() {
    this._material = new MeshBasicMaterial({
      color: this.color,
      opacity: this.opacity,
      transparent: this.transparent,
      map: this._obtainAsset(this.map) as Texture,
    });
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
