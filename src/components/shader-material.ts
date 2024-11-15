import { consume } from "@lit/context";
import { customElement, property } from "lit/decorators.js";
import { IUniform, ShaderMaterial } from "three";
import { meshContext, MeshContext } from "../utils/context/mesh";
import { G3DMaterialBase } from "../utils/base/material";

@customElement("g3d-shader-material")
export class G3DShaderMaterial extends G3DMaterialBase<ShaderMaterial> {
  readonly #DEFAULT_VERTEX_SHADER: string;
  readonly #DEFAULT_FRAGMENT_SHADER: string;

  protected override _material = new ShaderMaterial();

  #vertexShader?: string;
  @property({ reflect: true, attribute: "vertex-shader" })
  set vertexShader(value: string) {
    this.requestUpdate("vertexShader", {});
    this.#vertexShader = value;
    const code = this._obtainAsset(this.#vertexShader) as string | undefined;
    if (code === this._material.vertexShader) {
      return;
    }
    this._material.vertexShader = code ?? this.#DEFAULT_VERTEX_SHADER;
  }
  get vertexShader() {
    return this.#vertexShader ?? "";
  }

  #fragmentShader?: string;
  @property({ reflect: true, attribute: "fragment-shader" })
  set fragmentShader(value: string) {
    this.requestUpdate("fragmentShader", {});
    this.#fragmentShader = value;
    const code = this._obtainAsset(this.#fragmentShader) as string | undefined;
    if (code === this._material.fragmentShader) {
      return;
    }
    this._material.fragmentShader = code ?? this.#DEFAULT_FRAGMENT_SHADER;
  }
  get fragmentShader() {
    return this.#fragmentShader ?? "";
  }

  @property({ type: Boolean, reflect: true, attribute: "wireframe" })
  set wireframe(value: boolean) {
    this.requestUpdate("wireframe", this._material.wireframe);
    this._material.wireframe = value;
  }
  get wireframe() {
    return this._material.wireframe;
  }

  @property({ type: Number, reflect: true, attribute: "wireframe-linewidth" })
  set wireframeLinewidth(value: number) {
    this.requestUpdate("wireframeLinewidth", this._material.wireframeLinewidth);
    this._material.wireframeLinewidth = value;
  }
  get wireframeLinewidth() {
    return this._material.wireframeLinewidth;
  }

  #uniforms?: string;
  @property({ reflect: true, attribute: "uniforms" })
  set uniforms(value: string) {
    this.requestUpdate("uniforms", {});
    this.#uniforms = value;
    const code = this._obtainAsset(this.#uniforms) as string;
    const uniforms = this.#convertStringPropertiesToAssets(
      JSON.parse(code ?? "{}")
    );
    for (const key in this._material.uniforms) {
      if (!uniforms.hasOwnProperty(key)) {
        delete this._material.uniforms[key];
      }
    }
    for (const key in uniforms) {
      if (this._material.uniforms[key]) {
        this._material.uniforms[key].value = uniforms[key].value;
        continue;
      }
      this._material.uniforms[key] = uniforms[key];
    }
    this._material.uniformsNeedUpdate = true;
  }
  get uniforms() {
    return this.#uniforms ?? "";
  }

  @consume({ context: meshContext })
  _meshContext?: MeshContext;

  protected override initializeMaterial() {
    super.initializeMaterial();
    this.vertexShader = this.vertexShader;
    this.fragmentShader = this.fragmentShader;
    this.uniforms = this.uniforms;
    this.wireframe = this.wireframe;
    this.wireframeLinewidth = this.wireframeLinewidth;
    this._material.uniformsNeedUpdate = true;
    this._material.needsUpdate = true;
    this._rendererContext?.watchAssetChange((id) =>
      this.#handleAssetsChange(id)
    );
    this._meshContext?.updateMaterial(this._material);
  }

  constructor() {
    super();
    this.#DEFAULT_VERTEX_SHADER = this._material.vertexShader;
    this.#DEFAULT_FRAGMENT_SHADER = this._material.fragmentShader;
  }

  #convertStringPropertiesToAssets(uniforms: Record<string, IUniform<any>>) {
    for (const key in uniforms) {
      const uniform = uniforms[key];
      if (typeof uniform.value === "string") {
        uniform.value = this._obtainAsset(uniform.value);
      } else if (typeof uniform.value === "object" && uniform.value != null) {
        this.#convertStringPropertiesToAssets(uniform.value);
      }
    }
    return uniforms;
  }

  #handleAssetsChange(id: string) {
    switch (id) {
      case this.uniforms:
        this.uniforms = id;
        break;
      case this.vertexShader:
        this.vertexShader = id;
        break;
      case this.fragmentShader:
        this.fragmentShader = id;
        break;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "g3d-shader-material": G3DShaderMaterial;
  }
}
