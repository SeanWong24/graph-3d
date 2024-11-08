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
import { G3DMaterialBase } from "../utils/base/material";
import { vector2Converter } from "../utils/converter/vector2";

@customElement("g3d-mesh-phong-material")
export class G3DMeshPhongMaterial extends G3DMaterialBase<MeshPhongMaterial> {
  protected override _material = new MeshPhongMaterial();

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

  #bumpMap?: string;
  @property({ reflect: true, attribute: "bump-map" })
  set bumpMap(value: string | undefined) {
    this.requestUpdate("bumpMap", this.#bumpMap);
    this.#bumpMap = value;
    this._material.map = this._obtainAsset(this.#bumpMap) as Texture;
  }
  get bumpMap() {
    return this.#bumpMap;
  }

  @property({ type: Number, reflect: true, attribute: "bump-scale" })
  set bumpScale(value: number) {
    this.requestUpdate("bumpScale", this._material.bumpScale);
    this._material.bumpScale = value;
  }
  get bumpScale() {
    return this._material.bumpScale;
  }

  #normalMap?: string;
  @property({ reflect: true, attribute: "normal-map" })
  set normalMap(value: string | undefined) {
    this.requestUpdate("normalMap", {});
    this.#normalMap = value;
    this._material.map = this._obtainAsset(this.#normalMap) as Texture;
  }
  get normalMap() {
    return this.#normalMap;
  }

  @property({
    type: Vector2,
    reflect: true,
    attribute: "normal-scale",
    converter: vector2Converter,
  })
  set normalScale(value: Vector2) {
    this.requestUpdate("normalScale", this._material.normalScale);
    this._material.normalScale = value;
  }
  get normalScale() {
    return this._material.normalScale;
  }

  @property({ type: Number })
  set shininess(value: number) {
    this.requestUpdate("shininess", this._material.shininess);
    this._material.shininess = value;
  }
  get shininess() {
    return this._material.shininess;
  }

  @property({ type: Number, attribute: "emissive-intensity" })
  set emissiveIntensity(value: number) {
    this.requestUpdate("emissiveIntensity", this._material.emissiveIntensity);
    this._material.emissiveIntensity = value;
  }
  get emissiveIntensity() {
    return this._material.emissiveIntensity;
  }

  #emissive?: ColorRepresentation;
  @property()
  set emissive(value: ColorRepresentation) {
    this.requestUpdate("emissive", this.#emissive);
    this._material.emissive = new Color(value ?? "");
  }
  get emissive() {
    return this.#emissive ?? `#${this._material.emissive.getHexString()}`;
  }

  #emissiveMap?: string;
  @property({ reflect: true, attribute: "emissive-map" })
  set emissiveMap(value: string | undefined) {
    this.requestUpdate("emissiveMap", {});
    this.#emissiveMap = value;
    this._material.emissiveMap = this._obtainAsset(
      this.#emissiveMap
    ) as Texture;
  }
  get emissiveMap() {
    return this.#emissiveMap;
  }

  #specular?: ColorRepresentation;
  @property()
  set specular(value: ColorRepresentation) {
    this.requestUpdate("specular", this.#specular);
    this._material.specular = new Color(value ?? "");
  }
  get specular() {
    return this.#specular ?? `#${this._material.specular.getHexString()}`;
  }

  #specularMap?: string;
  @property({ reflect: true, attribute: "specular-map" })
  set specularMap(value: string | undefined) {
    this.requestUpdate("specularMap", {});
    this.#specularMap = value;
    this._material.specularMap = this._obtainAsset(
      this.#specularMap
    ) as Texture;
  }
  get specularMap() {
    return this.#specularMap;
  }

  @property({ type: Number, attribute: "displacement-bias" })
  set displacementBias(value: number) {
    this.requestUpdate("displacementBias", this._material.displacementBias);
    this._material.displacementBias = value;
  }
  get displacementBias() {
    return this._material.displacementBias;
  }

  #displacementMap?: string;
  @property({ reflect: true, attribute: "displacement-map" })
  set displacementMap(value: string | undefined) {
    this.requestUpdate("displacementMap", {});
    this.#displacementMap = value;
    this._material.displacementMap = this._obtainAsset(
      this.#displacementMap
    ) as Texture;
  }
  get displacementMap() {
    return this.#displacementMap;
  }

  @property({ type: Number, reflect: true, attribute: "displacement-scale" })
  set displacementScale(value: number) {
    this.requestUpdate("displacementScale", this._material.displacementScale);
    this._material.displacementScale = value;
  }
  get displacementScale() {
    return this._material.displacementScale;
  }

  @consume({ context: meshContext })
  _meshContext?: MeshContext;

  protected override initializeMaterial() {
    super.initializeMaterial();
    this._material.map = this._obtainAsset(this.map) as Texture;
    this._material.bumpMap = this._obtainAsset(this.bumpMap) as Texture;
    this._material.bumpScale = this.bumpScale;
    this._material.normalMap = this._obtainAsset(this.normalMap) as Texture;
    this._material.normalScale = this.normalScale;
    this._material.shininess = this.shininess;
    this._material.emissiveIntensity = this.emissiveIntensity;
    this._material.emissive = new Color(this.emissive);
    this._material.emissiveMap = this._obtainAsset(this.emissiveMap) as Texture;
    this._material.specular = new Color(this.specular);
    this._material.specularMap = this._obtainAsset(this.specularMap) as Texture;
    this._material.displacementBias = this.displacementBias;
    this._material.displacementScale = this.displacementScale;
    this._material.displacementMap = this._obtainAsset(
      this.displacementMap
    ) as Texture;
    this._material.needsUpdate = true;
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
    "g3d-mesh-phong-material": G3DMeshPhongMaterial;
  }
}
