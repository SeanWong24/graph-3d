import { consume, provide } from "@lit/context";
import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { BufferGeometry, Material, Mesh } from "three";
import { rendererContext, RendererContext } from "../utils/context/renderer";
import { sceneContext, SceneContext } from "../utils/context/scene";
import { meshContext, MeshContext } from "../utils/context/mesh";

@customElement("three-mesh")
export class ThreeMesh extends LitElement {
  #mesh?: Mesh;

  #x?: number;
  @property({ type: Number, reflect: true })
  set x(value: number | undefined) {
    this.#x = value;
    if (!this.#mesh) {
      return;
    }
    this.#mesh.position.x = this.#x ?? 0;
    this._rendererContext?.rerender();
  }
  get x() {
    return this.#x ?? 0;
  }

  #y?: number;
  @property({ type: Number, reflect: true })
  set y(value: number | undefined) {
    this.#y = value;
    if (!this.#mesh) {
      return;
    }
    this.#mesh.position.y = this.#y ?? 0;
    this._rendererContext?.rerender();
  }
  get y() {
    return this.#y ?? 0;
  }

  #z?: number;
  @property({ type: Number, reflect: true })
  set z(value: number | undefined) {
    this.#z = value;
    if (!this.#mesh) {
      return;
    }
    this.#mesh.position.z = this.#z ?? 0;
    this._rendererContext?.rerender();
  }
  get z() {
    return this.#z ?? 0;
  }

  #rotationX?: number;
  @property({ type: Number, reflect: true, attribute: "rotation-x" })
  set rotationX(value: number | undefined) {
    this.#rotationX = value;
    if (!this.#mesh) {
      return;
    }
    this.#mesh.rotation.x = this.#rotationX ?? 0;
    this._rendererContext?.rerender();
  }
  get rotationX() {
    return this.#rotationX ?? 0;
  }

  #rotationY?: number;
  @property({ type: Number, reflect: true, attribute: "rotation-y" })
  set rotationY(value: number | undefined) {
    this.#rotationY = value;
    if (!this.#mesh) {
      return;
    }
    this.#mesh.rotation.y = this.#rotationY ?? 0;
    this._rendererContext?.rerender();
  }
  get rotationY() {
    return this.#rotationY ?? 0;
  }

  #rotationZ?: number;
  @property({ type: Number, reflect: true, attribute: "rotation-z" })
  set rotationZ(value: number | undefined) {
    this.#rotationZ = value;
    if (!this.#mesh) {
      return;
    }
    this.#mesh.rotation.z = this.#rotationZ ?? 0;
    this._rendererContext?.rerender();
  }
  get rotationZ() {
    return this.#rotationZ ?? 0;
  }

  @consume({ context: rendererContext })
  _rendererContext?: RendererContext;

  @consume({ context: sceneContext })
  _sceneContext?: SceneContext;

  @provide({ context: meshContext })
  context: MeshContext = {
    updateGeometry: (geometry) => this.#updateGeometry(geometry),
    updateMaterial: (material) => this.#updateMaterial(material),
  };

  connectedCallback() {
    super.connectedCallback();
    this.#mesh = new Mesh();
    this.#mesh.position.x = this.x ?? 0;
    this.#mesh.position.y = this.y ?? 0;
    this.#mesh.position.z = this.z ?? 0;
    this.#mesh.rotation.x = this.rotationX ?? 0;
    this.#mesh.rotation.y = this.rotationY ?? 0;
    this.#mesh.rotation.z = this.rotationZ ?? 0;

    this.context.mesh = this.#mesh;
    this._sceneContext?.addObject(this.#mesh);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._sceneContext?.removeObject(this.#mesh);
  }

  render() {
    return null;
  }

  #updateGeometry(geometry: BufferGeometry) {
    if (!this.#mesh) {
      return;
    }
    this.#mesh.geometry = geometry;
    this._rendererContext?.rerender();
  }

  #updateMaterial(material: Material) {
    if (!this.#mesh) {
      return;
    }
    this.#mesh.material = material;
    this._rendererContext?.rerender();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "three-mesh": ThreeMesh;
  }
}
