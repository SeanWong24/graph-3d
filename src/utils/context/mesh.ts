import { createContext } from "@lit/context";
import { Mesh, BufferGeometry, Material } from "three";

export type MeshContext = {
  mesh?: Mesh;
  updateGeometry: (geometry: BufferGeometry) => void;
  updateMaterial: (material: Material) => void;
};
export const MESH_CONTEXT_SYMBOL = Symbol("mesh-context");
export const meshContext = createContext<MeshContext>(MESH_CONTEXT_SYMBOL);
