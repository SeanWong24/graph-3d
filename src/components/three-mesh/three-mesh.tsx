import { Component, Host, h, ComponentInterface, Prop, Element, Method, Watch } from '@stencil/core';
import { BufferGeometry, Material, Mesh } from 'three';

@Component({
  tag: 'three-mesh',
  styleUrl: 'three-mesh.css',
  shadow: true,
})
export class ThreeMesh implements ComponentInterface {

  @Element() hostElement: HTMLThreeMeshElement;

  private sceneElement: HTMLThreeSceneElement;
  private mesh: Mesh;

  @Prop({ reflect: true }) rotationX?: number;

  @Watch('rotationX')
  rotationXChanged(rotationX: number) {
    if (this.mesh) {
      this.mesh.rotation.x = rotationX || 0;
      this.addToScene();
    }
  }

  @Prop({ reflect: true }) rotationY?: number;

  @Watch('rotationY')
  rotationYChanged(rotationY: number) {
    if (this.mesh) {
      this.mesh.rotation.y = rotationY || 0;
      this.addToScene();
    }
  }

  @Prop({ reflect: true }) rotationZ?: number;

  @Watch('rotationZ')
  rotationZChanged(rotationZ: number) {
    if (this.mesh) {
      this.mesh.rotation.z = rotationZ || 0;
      this.addToScene();
    }
  }

  connectedCallback() {
    this.mesh = new Mesh();
    this.addToScene();
  }

  disconnectedCallback() {
    this.removeFromScene();
  }


  /**
   * Update the geometry for the mesh.
   * @param geometry the geometry to be added
   * 
   * @internal
   */
  @Method()
  async updateGeometry(geometry: BufferGeometry) {
    if (this.mesh) {
      this.mesh.geometry = geometry;
    }
  }

  /**
   * Update the mateiral for the mesh.
   * @param material the material to be added
   * 
   * @internal
   */
  @Method()
  async updateMaterial(material: Material) {
    if (this.mesh) {
      this.mesh.material = material;
    }
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

  private addToScene() {
    this.sceneElement = this.hostElement.parentElement as HTMLThreeSceneElement;
    this.sceneElement?.addObject(this.mesh);
  }

  private removeFromScene() {
    this.sceneElement?.removeObject(this.mesh);
  }

}
