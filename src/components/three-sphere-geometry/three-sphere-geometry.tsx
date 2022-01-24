import { Component, Host, h, Element, ComponentInterface, Prop } from '@stencil/core';
import { SphereGeometry } from 'three';

@Component({
  tag: 'three-sphere-geometry',
  styleUrl: 'three-sphere-geometry.css',
  shadow: true,
})
export class ThreeSphereGeometry implements ComponentInterface {

  private meshElement: HTMLThreeMeshElement;
  private geometry: SphereGeometry;

  @Element() hostElement: HTMLThreeSphereGeometryElement;

  @Prop({ reflect: true }) radius?: number;
  @Prop({ reflect: true }) widthSegments?: number;
  @Prop({ reflect: true }) heightSegments?: number;

  connectedCallback() {
    this.geometry = new SphereGeometry(
      this.radius,
      this.widthSegments,
      this.heightSegments
    )
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
