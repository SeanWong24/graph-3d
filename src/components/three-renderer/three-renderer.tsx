import { Component, Host, h, ComponentInterface, Prop, Element, Method } from '@stencil/core';
import { Renderer, WebGLRenderer, Camera, Scene } from 'three';

@Component({
  tag: 'three-renderer',
  styleUrl: 'three-renderer.css',
  shadow: true,
})
export class ThreeRenderer implements ComponentInterface {

  private renderer: Renderer;
  private camera: Camera;
  private scene: Scene;

  @Element() hostElmenet: HTMLThreeRendererElement;

  @Prop() width: number;
  @Prop() height: number;
  @Prop() updateStyle: boolean;

  componentDidLoad() {
    this.hostElmenet.shadowRoot.innerHTML = '';
    this.renderer = new WebGLRenderer();
    this.hostElmenet.shadowRoot.appendChild(this.renderer.domElement);
  }

  componentWillRender() {
    this.renderer?.setSize(this.width, this.height, this.updateStyle);
  }

  /**
   * Update the camera object for the rederer.
   * @param camera the camera object
   * 
   * @internal
   */
  @Method()
  async updateCamera(camera: Camera) {
    this.camera = camera;
    this.tryAnimate();
  }
  
  /**
   * Update the scene object for the rederer.
   * @param scene the scene object
   * 
   * @internal
   */
  @Method()
  async updateScene(scene: Scene) {
    this.scene = scene;
    this.tryAnimate();
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

  private tryAnimate() {
    if(this.renderer && this.camera && this.scene) {
      this.animate();
    }
  }

  private animate() {
    this.renderer?.render(this.scene, this.camera);
  }

}
