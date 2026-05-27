declare module 'three/examples/jsm/controls/OrbitControls.js' {
  export class OrbitControls {
    constructor(object: any, domElement?: HTMLElement);
    enableDamping: boolean;
    dampingFactor: number;
    target: { set: (x: number, y: number, z: number) => void };
    update: () => void;
    dispose: () => void;
  }
}

declare module 'three/examples/jsm/loaders/GLTFLoader.js' {
  export class GLTFLoader {
    load: (
      url: string,
      onLoad: (gltf: { scene: any }) => void,
      onProgress?: ((event: ProgressEvent) => void) | undefined,
      onError?: ((event: unknown) => void) | undefined
    ) => void;
  }
}
