import { Component, Host, h, ComponentInterface, Prop, Element } from '@stencil/core';
import { ColorRepresentation, MeshBasicMaterial, MeshBasicMaterialParameters } from "three";

@Component({
  tag: 'three-mesh-basic-material',
  styleUrl: 'three-mesh-basic-material.css',
  shadow: true,
})
export class ThreeMeshBasicMaterial implements ComponentInterface, MeshBasicMaterialParameters {

  private meshElement: HTMLThreeMeshElement;
  private material: MeshBasicMaterial;

  @Element() hostElement: HTMLThreeMeshBasicMaterialElement;

  @Prop() color?: ColorRepresentation;

  connectedCallback() {
    this.material = new MeshBasicMaterial({
      color: this.color
    });
    this.addToMesh();
  }

  disconnectedCallback() {
    this.removeFromMesh();
  }

  componentShouldUpdate(newVal: any, _oldVal: any, propName: string) {
    if (this.material) {
      this.material[propName] = newVal;
    }
    return false;
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
    this.meshElement?.updateMaterial(this.material);
  }

  private removeFromMesh() {
    this.meshElement?.updateMaterial(undefined);
  }

}
