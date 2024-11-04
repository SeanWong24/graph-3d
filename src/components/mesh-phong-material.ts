import { consume } from "@lit/context";
import { customElement, property } from "lit/decorators.js";
import {
  Color,
  ColorRepresentation,
  MeshPhongMaterial,
  Texture,
  Vector2,
} from "three";
import { meshContext, MeshContext } from "../utils/context/mesh";
import { ThreeMaterialBase } from "../utils/base/material";
import { vector2Converter } from "../utils/converter/vector2";

@customElement("three-mesh-phong-material")
export class ThreeMeshPhongMaterial extends ThreeMaterialBase<MeshPhongMaterial> {
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
    converter: vector2Converter,
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

  #shininess?: number;
  @property({ type: Number })
  set shininess(value: number | undefined) {
    this.#shininess = value;
    if (!this._material) {
      return;
    }
    this._material.shininess = value ?? 1;
    this._material.needsUpdate = true;
    this._rendererContext?.rerender();
  }
  get shininess() {
    return this.#shininess;
  }

  #emissiveIntensity?: number;
  @property({ type: Number, attribute: "emissive-intensity" })
  set emissiveIntensity(value: number | undefined) {
    this.#emissiveIntensity = value;
    if (!this._material) {
      return;
    }
    this._material.emissiveIntensity = value ?? 1;
    this._material.needsUpdate = true;
    this._rendererContext?.rerender();
  }
  get emissiveIntensity() {
    return this.#emissiveIntensity;
  }

  #emissive?: ColorRepresentation;
  @property()
  set emissive(value: ColorRepresentation | undefined) {
    this.#emissive = value;
    if (!this._material) {
      return;
    }
    this._material.emissive = new Color(value ?? "");
    this._material.needsUpdate = true;
    this._rendererContext?.rerender();
  }
  get emissive() {
    return this.#emissive;
  }

  #emissiveMap?: string;
  @property({ reflect: true, attribute: "emissive-map" })
  set emissiveMap(value: string | undefined) {
    this.#emissiveMap = value;
    if (!this._material) {
      return;
    }
    this._material.emissiveMap = this._obtainAsset(
      this.#emissiveMap
    ) as Texture;
    this._material.needsUpdate = true;
    this._rendererContext?.rerender();
  }
  get emissiveMap() {
    return this.#emissiveMap;
  }

  #specular?: ColorRepresentation;
  @property()
  set specular(value: ColorRepresentation | undefined) {
    this.#color = value;
    if (!this._material) {
      return;
    }
    this._material.specular = new Color(value ?? "");
    this._material.needsUpdate = true;
    this._rendererContext?.rerender();
  }
  get specular() {
    return this.#specular;
  }

  #specularMap?: string;
  @property({ reflect: true, attribute: "specular-map" })
  set specularMap(value: string | undefined) {
    this.#specularMap = value;
    if (!this._material) {
      return;
    }
    this._material.specularMap = this._obtainAsset(
      this.#specularMap
    ) as Texture;
    this._material.needsUpdate = true;
    this._rendererContext?.rerender();
  }
  get specularMap() {
    return this.#specularMap;
  }

  #displacementBias?: number;
  @property({ type: Number, attribute: "displacement-bias" })
  set displacementBias(value: number | undefined) {
    this.#displacementBias = value;
    if (!this._material) {
      return;
    }
    this._material.displacementBias = value ?? 1;
    this._material.needsUpdate = true;
    this._rendererContext?.rerender();
  }
  get displacementBias() {
    return this.#displacementBias;
  }

  #displacementMap?: string;
  @property({ reflect: true, attribute: "displacement-map" })
  set displacementMap(value: string | undefined) {
    this.#displacementMap = value;
    if (!this._material) {
      return;
    }
    this._material.displacementMap = this._obtainAsset(
      this.#displacementMap
    ) as Texture;
    this._material.needsUpdate = true;
    this._rendererContext?.rerender();
  }
  get displacementMap() {
    return this.#displacementMap;
  }

  #displacementScale?: number;
  @property({ type: Number, reflect: true, attribute: "displacement-scale" })
  set displacementScale(value: number | undefined) {
    this.#displacementScale = value ?? 1;
    if (!this._material) {
      return;
    }
    this._material.displacementScale = this.#displacementScale;
    this._material.needsUpdate = true;
    this._rendererContext?.rerender();
  }
  get displacementScale() {
    return this.#displacementScale ?? 1;
  }

  @consume({ context: meshContext })
  _meshContext?: MeshContext;

  protected override initializeMaterial() {
    this._material = new MeshPhongMaterial({
      color: this.color,
      opacity: this.opacity,
      transparent: this.transparent,
      map: this._obtainAsset(this.map) as Texture,
      bumpMap: this._obtainAsset(this.bumpMap) as Texture,
      bumpScale: this.bumpScale,
      normalMap: this._obtainAsset(this.normalMap) as Texture,
      normalScale: this.normalScale,
      shininess: this.shininess,
      emissiveIntensity: this.emissiveIntensity,
      emissive: this.#emissive,
      emissiveMap: this._obtainAsset(this.emissiveMap) as Texture,
      specular: this.specular,
      specularMap: this._obtainAsset(this.specularMap) as Texture,
      displacementBias: this.displacementBias,
      displacementScale: this.displacementScale,
      displacementMap: this._obtainAsset(this.displacementMap) as Texture,
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
      // @ts-expect-error
      case this.#emissiveMap:
        this._material.emissiveMap = this._obtainAsset(
          this.#emissiveMap
        ) as Texture;
      // @ts-expect-error
      case this.#specularMap:
        this._material.specularMap = this._obtainAsset(
          this.#specularMap
        ) as Texture;
      // @ts-expect-error
      case this.#displacementMap:
        this._material.displacementMap = this._obtainAsset(
          this.#displacementMap
        ) as Texture;
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
    "three-mesh-phong-material": ThreeMeshPhongMaterial;
  }
}
