
import * as THREE from 'three';

export const useRender = ({ canvas, width, height }) => {
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
    });
    renderer.shadowMap.enabled = true;
    renderer.setSize(width, height);
    canvas.appendChild(renderer.domElement);
    
    return renderer
}