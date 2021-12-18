import { Component, Host, h, ComponentInterface, Prop, Element } from '@stencil/core';
import { BoxGeometry } from "three";

@Component({
  tag: 'three-box-geometry',
  styleUrl: 'three-box-geometry.css',
  shadow: true,
})
export class ThreeBoxGeometry implements ComponentInterface {

  private meshElement: HTMLThreeMeshElement;
  private geometry: BoxGeometry;

  @Element() hostElement: HTMLThreeBoxGeometryElement;

  @Prop({ reflect: true }) width?: number;
  @Prop({ reflect: true }) height?: number;
  @Prop({ reflect: true }) depth?: number;
  @Prop({ reflect: true }) widthSegments?: number;
  @Prop({ reflect: true }) heightSegments?: number;
  @Prop({ reflect: true }) depthSegments?: number;

  connectedCallback() {
    this.geometry = new BoxGeometry(
      this.width,
      this.height,
      this.depth,
      this.widthSegments,
      this.heightSegments,
      this.depthSegments
    );
    this.addToMesh();
  }

  disconnectedCallback() {
    this.removeFromMesh();
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

  private addToMesh() {
    this.meshElement = this.hostElement.parentElement as HTMLThreeMeshElement;
    this.meshElement?.updateGeometry(this.geometry);
  }

  private removeFromMesh() {
    this.meshElement?.updateGeometry(undefined);
  }

}
