import { LitElement } from "lit";

export abstract class G3DWrapperBase extends LitElement {
  abstract get isReady(): boolean;
}
