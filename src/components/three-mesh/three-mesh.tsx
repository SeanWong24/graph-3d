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

  @Prop() geometry: BufferGeometry;

  @Watch('geometry')
  geometryChanged(geometry: BufferGeometry) {
    if (this.mesh) {
      this.mesh.geometry = geometry || new BufferGeometry();
    }
  }

  @Prop() material: Material;

  @Watch('material')
  materialChanged(material: Material) {
    if (this.mesh) {
      this.mesh.material = material || new Material();
    }
  }

  connectedCallback() {
    this.mesh = new Mesh(this.geometry, this.material);
    this.addToScene();
  }

  disconnectedCallback() {
    this.removeFromScene();
  }

  componentShouldUpdate(newVal: any, _oldVal: any, propName: string) {
    if (this.mesh) {
      this.mesh[propName] = newVal;
    }
    return false;
  }


  /**
   * Update the geometry for the mesh.
   * @param geometry the geometry to be added
   * 
   * @internal
   */
  @Method()
  async updateGeometry(geometry: BufferGeometry) {
    this.geometry = geometry;
  }

  /**
   * Update the mateiral for the mesh.
   * @param material the material to be added
   * 
   * @internal
   */
  @Method()
  async updateMaterial(material: Material) {
    this.material = material;
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
