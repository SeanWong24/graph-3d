/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { BufferGeometry, Camera, ColorRepresentation, Material, Object3D, Scene, Texture } from "three";
export namespace Components {
    interface ThreeAmbientLight {
        "color"?: ColorRepresentation;
        "intensity"?: number;
    }
    interface ThreeBoxGeometry {
        "depth"?: number;
        "depthSegments"?: number;
        "height"?: number;
        "heightSegments"?: number;
        "width"?: number;
        "widthSegments"?: number;
    }
    interface ThreeMesh {
        "rotationX"?: number;
        "rotationY"?: number;
        "rotationZ"?: number;
        /**
          * Update the geometry for the mesh.
          * @param geometry the geometry to be added
         */
        "updateGeometry": (geometry: BufferGeometry) => Promise<void>;
        /**
          * Update the mateiral for the mesh.
          * @param material the material to be added
         */
        "updateMaterial": (material: Material) => Promise<void>;
    }
    interface ThreeMeshBasicMaterial {
        "color"?: ColorRepresentation;
    }
    interface ThreeMeshStandardMaterial {
        "color"?: ColorRepresentation;
        /**
          * Update the map for the material.
          * @param texture the texture to be added
          * @param map the map to apply the texture on
         */
        "updateMap": (texture: Texture, map: string) => Promise<void>;
    }
    interface ThreePerspectiveCamera {
        "aspect"?: number;
        "far"?: number;
        "fov"?: number;
        "near"?: number;
        "x"?: number;
        "y"?: number;
        "z"?: number;
    }
    interface ThreeRenderer {
        "height": number;
        /**
          * Update the camera object for the rederer.
          * @param camera the camera object
         */
        "updateCamera": (camera: Camera) => Promise<void>;
        /**
          * Update the scene object for the rederer.
          * @param scene the scene object
         */
        "updateScene": (scene: Scene) => Promise<void>;
        "updateStyle": boolean;
        "width": number;
    }
    interface ThreeScene {
        /**
          * Add an object into the scene.
          * @param object the object to be added
         */
        "addObject": (object: Object3D) => Promise<void>;
        /**
          * Remove an object from the scene.
          * @param object the object to be removed
         */
        "removeObject": (object: Object3D) => Promise<void>;
    }
    interface ThreeTexture {
        "map": string;
        "src": string;
    }
}
declare global {
    interface HTMLThreeAmbientLightElement extends Components.ThreeAmbientLight, HTMLStencilElement {
    }
    var HTMLThreeAmbientLightElement: {
        prototype: HTMLThreeAmbientLightElement;
        new (): HTMLThreeAmbientLightElement;
    };
    interface HTMLThreeBoxGeometryElement extends Components.ThreeBoxGeometry, HTMLStencilElement {
    }
    var HTMLThreeBoxGeometryElement: {
        prototype: HTMLThreeBoxGeometryElement;
        new (): HTMLThreeBoxGeometryElement;
    };
    interface HTMLThreeMeshElement extends Components.ThreeMesh, HTMLStencilElement {
    }
    var HTMLThreeMeshElement: {
        prototype: HTMLThreeMeshElement;
        new (): HTMLThreeMeshElement;
    };
    interface HTMLThreeMeshBasicMaterialElement extends Components.ThreeMeshBasicMaterial, HTMLStencilElement {
    }
    var HTMLThreeMeshBasicMaterialElement: {
        prototype: HTMLThreeMeshBasicMaterialElement;
        new (): HTMLThreeMeshBasicMaterialElement;
    };
    interface HTMLThreeMeshStandardMaterialElement extends Components.ThreeMeshStandardMaterial, HTMLStencilElement {
    }
    var HTMLThreeMeshStandardMaterialElement: {
        prototype: HTMLThreeMeshStandardMaterialElement;
        new (): HTMLThreeMeshStandardMaterialElement;
    };
    interface HTMLThreePerspectiveCameraElement extends Components.ThreePerspectiveCamera, HTMLStencilElement {
    }
    var HTMLThreePerspectiveCameraElement: {
        prototype: HTMLThreePerspectiveCameraElement;
        new (): HTMLThreePerspectiveCameraElement;
    };
    interface HTMLThreeRendererElement extends Components.ThreeRenderer, HTMLStencilElement {
    }
    var HTMLThreeRendererElement: {
        prototype: HTMLThreeRendererElement;
        new (): HTMLThreeRendererElement;
    };
    interface HTMLThreeSceneElement extends Components.ThreeScene, HTMLStencilElement {
    }
    var HTMLThreeSceneElement: {
        prototype: HTMLThreeSceneElement;
        new (): HTMLThreeSceneElement;
    };
    interface HTMLThreeTextureElement extends Components.ThreeTexture, HTMLStencilElement {
    }
    var HTMLThreeTextureElement: {
        prototype: HTMLThreeTextureElement;
        new (): HTMLThreeTextureElement;
    };
    interface HTMLElementTagNameMap {
        "three-ambient-light": HTMLThreeAmbientLightElement;
        "three-box-geometry": HTMLThreeBoxGeometryElement;
        "three-mesh": HTMLThreeMeshElement;
        "three-mesh-basic-material": HTMLThreeMeshBasicMaterialElement;
        "three-mesh-standard-material": HTMLThreeMeshStandardMaterialElement;
        "three-perspective-camera": HTMLThreePerspectiveCameraElement;
        "three-renderer": HTMLThreeRendererElement;
        "three-scene": HTMLThreeSceneElement;
        "three-texture": HTMLThreeTextureElement;
    }
}
declare namespace LocalJSX {
    interface ThreeAmbientLight {
        "color"?: ColorRepresentation;
        "intensity"?: number;
    }
    interface ThreeBoxGeometry {
        "depth"?: number;
        "depthSegments"?: number;
        "height"?: number;
        "heightSegments"?: number;
        "width"?: number;
        "widthSegments"?: number;
    }
    interface ThreeMesh {
        "rotationX"?: number;
        "rotationY"?: number;
        "rotationZ"?: number;
    }
    interface ThreeMeshBasicMaterial {
        "color"?: ColorRepresentation;
    }
    interface ThreeMeshStandardMaterial {
        "color"?: ColorRepresentation;
    }
    interface ThreePerspectiveCamera {
        "aspect"?: number;
        "far"?: number;
        "fov"?: number;
        "near"?: number;
        "x"?: number;
        "y"?: number;
        "z"?: number;
    }
    interface ThreeRenderer {
        "height"?: number;
        "updateStyle"?: boolean;
        "width"?: number;
    }
    interface ThreeScene {
    }
    interface ThreeTexture {
        "map"?: string;
        "src"?: string;
    }
    interface IntrinsicElements {
        "three-ambient-light": ThreeAmbientLight;
        "three-box-geometry": ThreeBoxGeometry;
        "three-mesh": ThreeMesh;
        "three-mesh-basic-material": ThreeMeshBasicMaterial;
        "three-mesh-standard-material": ThreeMeshStandardMaterial;
        "three-perspective-camera": ThreePerspectiveCamera;
        "three-renderer": ThreeRenderer;
        "three-scene": ThreeScene;
        "three-texture": ThreeTexture;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "three-ambient-light": LocalJSX.ThreeAmbientLight & JSXBase.HTMLAttributes<HTMLThreeAmbientLightElement>;
            "three-box-geometry": LocalJSX.ThreeBoxGeometry & JSXBase.HTMLAttributes<HTMLThreeBoxGeometryElement>;
            "three-mesh": LocalJSX.ThreeMesh & JSXBase.HTMLAttributes<HTMLThreeMeshElement>;
            "three-mesh-basic-material": LocalJSX.ThreeMeshBasicMaterial & JSXBase.HTMLAttributes<HTMLThreeMeshBasicMaterialElement>;
            "three-mesh-standard-material": LocalJSX.ThreeMeshStandardMaterial & JSXBase.HTMLAttributes<HTMLThreeMeshStandardMaterialElement>;
            "three-perspective-camera": LocalJSX.ThreePerspectiveCamera & JSXBase.HTMLAttributes<HTMLThreePerspectiveCameraElement>;
            "three-renderer": LocalJSX.ThreeRenderer & JSXBase.HTMLAttributes<HTMLThreeRendererElement>;
            "three-scene": LocalJSX.ThreeScene & JSXBase.HTMLAttributes<HTMLThreeSceneElement>;
            "three-texture": LocalJSX.ThreeTexture & JSXBase.HTMLAttributes<HTMLThreeTextureElement>;
        }
    }
}
