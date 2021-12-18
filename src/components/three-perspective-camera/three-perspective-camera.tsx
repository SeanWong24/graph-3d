import { Component, Host, h, ComponentInterface, Prop, Element, Watch } from '@stencil/core';
import { PerspectiveCamera } from 'three';

@Component({
  tag: 'three-perspective-camera',
  styleUrl: 'three-perspective-camera.css',
  shadow: true,
})
export class ThreePerspectiveCamera implements ComponentInterface {

  private camera: PerspectiveCamera;

  @Element() hostElement: HTMLThreePerspectiveCameraElement;

  @Prop({ reflect: true }) fov?: number;

  @Watch('fov')
  fovChanged(fov?: number) {
    if (!this.camera) {
      return;
    }
    this.camera.fov = fov;
    this.updateProjectionMatrix();
    this.notifyChangeToRederer();
  }

  @Prop({ reflect: true }) aspect?: number;

  @Watch('aspect')
  aspectChanged(aspect?: number) {
    if (!this.camera) {
      return;
    }
    this.camera.aspect = aspect;
    this.updateProjectionMatrix();
    this.notifyChangeToRederer();
  }

  @Prop({ reflect: true }) near?: number;

  @Watch('near')
  nearChanged(near?: number) {
    if (!this.camera) {
      return;
    }
    this.camera.near = near;
    this.updateProjectionMatrix();
    this.notifyChangeToRederer();
  }

  @Prop({ reflect: true }) far?: number;

  @Watch('far')
  farChanged(far?: number) {
    if (!this.camera) {
      return;
    }
    this.camera.far = far;
    this.updateProjectionMatrix();
    this.notifyChangeToRederer();
  }

  @Prop({ reflect: true }) x?: number;

  @Watch('x')
  xChanged(x: number = 0) {
    if (!this.camera) {
      return;
    }
    this.camera.position.x = x;
    this.notifyChangeToRederer();
  }

  @Prop({ reflect: true }) y?: number;

  @Watch('y')
  yChanged(y: number = 0) {
    if (!this.camera) {
      return;
    }
    this.camera.position.y = y;
    this.notifyChangeToRederer();
  }

  @Prop({ reflect: true }) z?: number;

  @Watch('z')
  zChanged(z: number = 0) {
    if (!this.camera) {
      return;
    }
    this.camera.position.z = z;
    this.notifyChangeToRederer();
  }

  componentDidLoad() {
    this.camera = new PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
    this.camera.position.x = this.x || 0;
    this.camera.position.y = this.y || 0;
    this.camera.position.z = this.z || 0;
    this.notifyChangeToRederer();
  }

  componentShouldUpdate() {
    return false;
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

  private updateProjectionMatrix() {
    this.camera.updateProjectionMatrix();
  }

  private notifyChangeToRederer() {
    const rendererElement = this.hostElement.parentElement as HTMLThreeRendererElement;
    rendererElement?.updateCamera(this.camera);
  }

}
