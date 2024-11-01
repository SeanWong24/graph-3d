import { consume } from "@lit/context";
import { customElement, property } from "lit/decorators.js";
import {
  Color,
  ColorRepresentation,
  MeshStandardMaterial,
  Texture,
  Vector2,
} from "three";
import { meshContext, MeshContext } from "../utils/context/mesh";
import { ThreeMaterialBase } from "../utils/base/material";

@customElement("three-mesh-standard-material")
export class ThreeMeshStandardMaterial extends ThreeMaterialBase<MeshStandardMaterial> {
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

  #bumpMap?: string;
  @property({ reflect: true, attribute: "bump-map" })
  set bumpMap(value: string | undefined) {
    this.#bumpMap = value;
    if (!this._material) {
      return;
    }
    this._material.map = this._obtainAsset(this.#bumpMap) as Texture;
    this._material.needsUpdate = true;
    this._rendererContext?.rerender();
  }
  get bumpMap() {
    return this.#bumpMap;
  }

  #bumpScale?: number;
  @property({ type: Number, reflect: true, attribute: "bump-scale" })
  set bumpScale(value: number | undefined) {
    this.#bumpScale = value ?? 1;
    if (!this._material) {
      return;
    }
    this._material.bumpScale = this.#bumpScale;
    this._material.needsUpdate = true;
    this._rendererContext?.rerender();
  }
  get bumpScale() {
    return this.#bumpScale ?? 1;
  }

  #normalMap?: string;
  @property({ reflect: true, attribute: "normal-map" })
  set normalMap(value: string | undefined) {
    this.#normalMap = value;
    if (!this._material) {
      return;
    }
    this._material.map = this._obtainAsset(this.#normalMap) as Texture;
    this._material.needsUpdate = true;
    this._rendererContext?.rerender();
  }
  get normalMap() {
    return this.#normalMap;
  }

  #normalScale?: Vector2;
  @property({
    type: Vector2,
    reflect: true,
    attribute: "normal-scale",
    converter: {
      fromAttribute: (value) =>
        new Vector2(...(value ?? "0 0").split(/\s+/).map((d) => +d)),
      toAttribute: (value: Vector2) => `${value.x} ${value.y}`,
    },
  })
  set normalScale(value: Vector2 | undefined) {
    this.#normalScale = value ?? new Vector2(1, 1);
    if (!this._material) {
      return;
    }
    this._material.normalScale = this.#normalScale;
  }
  get normalScale() {
    return this.#normalScale ?? new Vector2(1, 1);
  }

  @consume({ context: meshContext })
  _meshContext?: MeshContext;

  protected override initializeMaterial() {
    this._material = new MeshStandardMaterial({
      color: this.color,
      opacity: this.opacity,
      transparent: this.transparent,
      map: this._obtainAsset(this.map) as Texture,
      bumpMap: this._obtainAsset(this.bumpMap) as Texture,
      bumpScale: this.bumpScale,
      normalMap: this._obtainAsset(this.normalMap) as Texture,
      normalScale: this.normalScale,
    });
    this._rendererContext?.watchAssetChange((id) =>
      this.#handleAssetsChange(id)
    );
    this._meshContext?.updateMaterial(this._material);
  }

  #handleAssetsChange(id: string) {
    if (!this._material) {
      return;
    }
    switch (id) {
      // @ts-expect-error
      case this.map:
        this._material.map = this._obtainAsset(this.map) as Texture;
      // @ts-expect-error
      case this.bumpMap:
        this._material.bumpMap = this._obtainAsset(this.bumpMap) as Texture;
      case this.normalMap:
        this._material.normalMap = this._obtainAsset(this.normalMap) as Texture;
        this._material.needsUpdate = true;
        this._rendererContext?.rerender();
        break;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "three-mesh-standard-material": ThreeMeshStandardMaterial;
  }
}
