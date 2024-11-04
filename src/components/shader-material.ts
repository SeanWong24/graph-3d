import { consume } from "@lit/context";
import { customElement, property } from "lit/decorators.js";
import { IUniform, ShaderMaterial } from "three";
import { meshContext, MeshContext } from "../utils/context/mesh";
import { ThreeMaterialBase } from "../utils/base/material";

@customElement("three-shader-material")
export class ThreeShaderMaterial extends ThreeMaterialBase<ShaderMaterial> {
  protected override _material = new ShaderMaterial();

  @property({ reflect: true, attribute: "vertex-shader" })
  set vertexShader(value: string) {
    this._material.vertexShader = value;
  }
  get vertexShader() {
    return this._material.vertexShader;
  }

  @property({ reflect: true, attribute: "fragment-shader" })
  set fragmentShader(value: string) {
    this._material.fragmentShader = value;
  }
  get fragmentShader() {
    return this._material.fragmentShader;
  }

  @property({ type: Boolean, reflect: true, attribute: "wireframe" })
  set wireframe(value: boolean) {
    this._material.wireframe = value;
  }
  get wireframe() {
    return this._material.wireframe;
  }

  @property({ type: Number, reflect: true, attribute: "wireframe-line-width" })
  set wireframeLineWidth(value: number) {
    this._material.wireframeLinewidth = value;
  }
  get wireframeLineWidth() {
    return this._material.wireframeLinewidth;
  }

  #uniforms?: Record<string, IUniform<any>>;
  @property({ type: Object, reflect: true, attribute: "uniforms" })
  set uniforms(value: Record<string, IUniform<any>>) {
    this.#uniforms = value;
    this._material.uniforms =
      this.#convertStringPropertiesToAssets(this.#uniforms) ?? {};
    this._material.uniformsNeedUpdate = true;
  }
  get uniforms() {
    return this._material.uniforms ?? {};
  }

  @consume({ context: meshContext })
  _meshContext?: MeshContext;

  protected override initializeMaterial() {
    super.initializeMaterial();
    this._material.vertexShader = this.vertexShader;
    this._material.fragmentShader = this.fragmentShader;
    this._material.wireframe = this.wireframe;
    this._material.wireframeLinewidth = this.wireframeLineWidth;
    this._material.uniforms =
      this.#convertStringPropertiesToAssets(this.uniforms) ?? {};
    this._material.uniformsNeedUpdate = true;
    this._material.needsUpdate = true;
    this._meshContext?.updateMaterial(this._material);
  }

  #convertStringPropertiesToAssets(uniforms: Record<string, IUniform<any>>) {
    for (const key in uniforms) {
      const uniform = uniforms[key];
      if (typeof uniform.value === "string") {
        uniform.value = this.#obtainAsset(uniform.value);
      } else if (typeof uniform.value === "object" && uniform.value != null) {
        this.#convertStringPropertiesToAssets(uniform.value);
      }
    }
    return uniforms;
  }

  #obtainAsset(id: string = "") {
    return this._rendererContext?.getAsset(id) ?? null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "three-shader-material": ThreeShaderMaterial;
  }
}
