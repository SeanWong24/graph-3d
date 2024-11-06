import { consume, provide } from "@lit/context";
import { PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { Euler, Object3D, Vector3 } from "three";
import { rendererContext, RendererContext } from "../context/renderer";
import { vector3Converter } from "../converter/vector3";
import { object3DContext, Object3DContext } from "../context/object-3d";
import { eulerConverter } from "../converter/euler";
import { G3DWrapperBase as G3DWrapperBase } from "./wrapper";

export abstract class ThreeObject3DBase<
  T extends Object3D
> extends G3DWrapperBase {
  protected abstract get _object(): T;

  override get isReady() {
    return !!this._object;
  }

  @property({ type: Boolean, reflect: true, attribute: "visible" })
  set visible(value: boolean) {
    this._object.visible = value;
    this._rendererContext?.rerender();
  }
  get() {
    return this._object.visible;
  }

  @property({
    type: Vector3,
    reflect: true,
    attribute: "position",
    converter: vector3Converter,
  })
  set position(value: Vector3) {
    this._object.position.copy(value);
    this._rendererContext?.rerender();
  }
  get position() {
    const _rendererContext = this._rendererContext;
    return new Proxy(this._object.position, {
      set(target, p, value) {
        try {
          switch (p) {
            case "x":
              target.setX(value);
              break;
            case "y":
              target.setY(value);
              break;
            case "z":
              target.setZ(value);
              break;
            default:
              (target as any)[p] = value;
              break;
          }
          _rendererContext?.rerender();
          return true;
        } catch {
          return false;
        }
      },
    });
  }

  @property({
    type: Euler,
    reflect: true,
    attribute: "rotation",
    converter: eulerConverter,
  })
  set rotation(value: Euler) {
    this._object.rotation.copy(value);
    this._rendererContext?.rerender();
  }
  get rotation() {
    const _rendererContext = this._rendererContext;
    return new Proxy(this._object.rotation, {
      set(target, p, value) {
        try {
          (target as any)[p] = value;
          _rendererContext?.rerender();
          return true;
        } catch {
          return false;
        }
      },
    });
  }

  @property({
    type: Vector3,
    reflect: true,
    attribute: "scale",
    converter: vector3Converter,
  })
  set scale(value: Vector3) {
    this._object.scale.copy(value);
    this._rendererContext?.rerender();
  }
  get scale() {
    const _rendererContext = this._rendererContext;
    return new Proxy(this._object.scale, {
      set(target, p, value) {
        try {
          switch (p) {
            case "x":
              target.setX(value);
              break;
            case "y":
              target.setY(value);
              break;
            case "z":
              target.setZ(value);
              break;
            default:
              (target as any)[p] = value;
              break;
          }
          _rendererContext?.rerender();
          return true;
        } catch {
          return false;
        }
      },
    });
  }

  @consume({ context: rendererContext })
  protected _rendererContext?: RendererContext;

  @consume({ context: object3DContext })
  protected _object3DContext?: Object3DContext;

  @provide({ context: object3DContext })
  protected _providedObject3DContext: Object3DContext = {
    addObject: (obj) => this.#addObject(obj),
    removeObject: (obj) => this.#removeObject(obj),
  };

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this._providedObject3DContext.object = this._object;
    this._object.position.copy(this.position);
    this._object.rotation.copy(this.rotation);
    this._object.scale.copy(this.scale);
    this._rendererContext?.rerender();
  }

  connectedCallback() {
    super.connectedCallback();
    this._object3DContext?.addObject(this._object);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._providedObject3DContext?.removeObject(this._object);
  }

  render() {
    return null;
  }

  protected _obtainAsset(id: string = "") {
    return this._rendererContext?.getAsset(id) ?? null;
  }

  #addObject(object?: Object3D) {
    if (!object) {
      return;
    }
    this._object?.add(object);
    this._rendererContext?.rerender();
  }

  #removeObject(object?: Object3D) {
    if (!object) {
      return;
    }
    this._object?.remove(object);
    this._rendererContext?.rerender();
  }
}
