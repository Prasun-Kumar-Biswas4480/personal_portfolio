import { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { useScroll } from './ScrollContext';

const sectionConfigs = {
  hero: {
    cameraPos: [0, 1.8, 4.5], // Moved camera further back and slightly higher
    fov: 45, // Wider FOV makes objects appear smaller
    target: [0, 0, 0],
    rotation: [0, 0, 0],
    highlight: null,
  },
  about: {
    cameraPos: [2, 1.5, 2],
    fov: 35,
    target: [0, 0.3, 0],
    rotation: [0, -Math.PI / 6, 0],
    highlight: 'body',
  },
  skills: {
    cameraPos: [0, 2, 2.5],
    fov: 32,
    target: [0, 0.5, 0],
    rotation: [-Math.PI / 8, 0, 0],
    highlight: 'motor',
  },
  projects: {
    cameraPos: [-2, 1, 2],
    fov: 35,
    target: [0, -0.2, 0],
    rotation: [0, Math.PI / 6, 0],
    highlight: 'prop',
  },
  contact: {
    cameraPos: [0, 1, 3],
    fov: 40,
    target: [0, 0, 0],
    rotation: [0, 0, 0],
    highlight: null,
  },
};

const DroneModel = () => {
  const groupRef = useRef();
  const { activeSection, sectionProgress, scrollProgress } = useScroll();
  const [modelError, setModelError] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [scene, setScene] = useState(null);
  const targetConfig = sectionConfigs[activeSection] || sectionConfigs.hero;

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      '/models/drone-frame.glb',
      (gltf) => {
        console.log('GLTF loaded successfully');
        setScene(gltf.scene);
        setModelLoaded(true);
      },
      (progress) => {
        console.log('GLTF loading:', progress.loaded, '/', progress.total);
      },
      (error) => {
        console.warn('GLTF load failed:', error);
        setModelError(error);
      }
    );
  }, []);

  const meshes = useMemo(() => {
    if (!scene) return [];
    const meshList = [];
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = false;
        child.receiveShadow = false;
        child.frustumCulled = false;
        meshList.push(child);

        if (child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach((mat) => {
            mat.transparent = false;
            mat.opacity = 1;
            mat.depthWrite = true;
            mat.side = 2;
            mat.frustumCulled = false;

            const name = (child.name || '').toLowerCase();
            const isMain = name.includes('body') || name.includes('fuselage') || name.includes('main') || name.includes('frame') || name.includes('chassis');
            const isAccent = name.includes('prop') || name.includes('motor') || name.includes('rotor') || name.includes('blade') || name.includes('rotor');
            const isGlow = name.includes('light') || name.includes('led') || name.includes('glow') || name.includes('eye') || name.includes('camera');
            const isArm = name.includes('arm') || name.includes('boom') || name.includes('strut');

            // High-Visibility Solid Bright Colors
            let color, metalness, roughness, emissive, emissiveIntensity, clearcoat, clearcoatRoughness;

            if (isGlow) {
              color = new THREE.Color('#ffffff');
              emissive = new THREE.Color('#00E5FF');
              emissiveIntensity = 3.0;
              metalness = 0.1;
              roughness = 0.1;
              clearcoat = 1.0;
              clearcoatRoughness = 0.1;
            } else if (isAccent) {
              color = new THREE.Color('#FF4500');
              emissive = new THREE.Color('#FF2200');
              emissiveIntensity = 0.1;
              metalness = 0.3;
              roughness = 0.4;
              clearcoat = 0.8;
              clearcoatRoughness = 0.15;
            } else if (isArm) {
              color = new THREE.Color('#222222');
              emissive = new THREE.Color('#000000');
              emissiveIntensity = 0.0;
              metalness = 0.5;
              roughness = 0.6;
              clearcoat = 0.2;
              clearcoatRoughness = 0.4;
            } else if (isMain) {
              color = new THREE.Color('#ffffff');
              emissive = new THREE.Color('#000000');
              emissiveIntensity = 0.0;
              metalness = 0.1;
              roughness = 0.2;
              clearcoat = 1.0;
              clearcoatRoughness = 0.05;
            } else {
              color = new THREE.Color('#dddddd');
              emissive = new THREE.Color('#000000');
              emissiveIntensity = 0.0;
              metalness = 0.2;
              roughness = 0.3;
              clearcoat = 0.5;
              clearcoatRoughness = 0.2;
            }

            mat.color = color;
            mat.emissive = emissive;
            mat.emissiveIntensity = emissiveIntensity;
            mat.metalness = metalness;
            mat.roughness = roughness;
            mat.clearcoat = clearcoat;
            mat.clearcoatRoughness = clearcoatRoughness;
          });
        }
        if (child.geometry) {
          child.geometry.computeBoundingSphere();
          child.geometry.computeBoundingBox();

          // Add Edge Highlighting - Optimized (40 degree threshold to reduce line count)
          const oldEdges = child.children.find(c => c.isLineSegments);
          if (oldEdges) child.remove(oldEdges);

          const edgesGeometry = new THREE.EdgesGeometry(child.geometry, 40);
          const edgesMaterial = new THREE.LineBasicMaterial({
            color: new THREE.Color('#00E5FF'),
            transparent: true,
            opacity: 0.6,
          });
          const edgeLines = new THREE.LineSegments(edgesGeometry, edgesMaterial);
          child.add(edgeLines);
        }
      }
    });
    return meshList;
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) {
      // Calculate flight path based on scrollProgress
      const startPos = new THREE.Vector3(-1.5, 1.5, 0); 
      const midPos = new THREE.Vector3(0, 0, 0);    
      const endPos = new THREE.Vector3(2.0, -1.8, 1.5);   

      const baseScale = 0.01;
      const startScale = new THREE.Vector3().setScalar(baseScale * 0.4); 
      const midScale = new THREE.Vector3().setScalar(baseScale);          
      const endScale = new THREE.Vector3().setScalar(baseScale * 1.6);    

      let targetPos = new THREE.Vector3();
      let targetScale = new THREE.Vector3();

      if (scrollProgress < 0.5) {
        const t = scrollProgress * 2;
        targetPos.lerpVectors(startPos, midPos, t);
        targetScale.lerpVectors(startScale, midScale, t);
      } else {
        const t = (scrollProgress - 0.5) * 2;
        targetPos.lerpVectors(midPos, endPos, t);
        targetScale.lerpVectors(midScale, endScale, t);
      }

      // Smooth interpolation to the target position and scale
      groupRef.current.position.lerp(targetPos, 0.05);
      groupRef.current.scale.lerp(targetScale, 0.05);

      // Facing forward exactly (rotated -90 degrees on Y to face camera)
      groupRef.current.rotation.set(0, -Math.PI / 2, 0);
    }

    const highlightType = targetConfig.highlight;
    if (highlightType && meshes.length > 0) {
      const highlightProgress = sectionProgress[activeSection] || 0;
      meshes.forEach((mesh) => {
        const name = (mesh.name || '').toLowerCase();
        const isTarget = name.includes(highlightType);
        if (mesh.material) {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((mat) => {
            if (isTarget) {
              mat.emissiveIntensity = THREE.MathUtils.lerp(
                mat.emissiveIntensity || 0,
                1.2,
                highlightProgress * 0.5
              );
              mat.opacity = 1;
            } else {
              mat.opacity = THREE.MathUtils.lerp(1, 0.3, highlightProgress * 0.5);
            }
          });
        }
      });
    }
  });

  // Force render placeholder if model takes too long
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!modelLoaded && !modelError) {
        console.warn('Model loading timeout, showing placeholder');
        setModelError(new Error('Loading timeout'));
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [modelLoaded, modelError]);

  // Always render something - either the model or placeholder
  if (modelError || !modelLoaded) {
    return <DronePlaceholder />;
  }

  return (
    <group ref={groupRef} scale={0.01}>
      <primitive object={scene} dispose={null} />
    </group>
  );
};

const DronePlaceholder = () => {
  const groupRef = useRef();
  const { scrollProgress } = useScroll();

  useFrame(() => {
    if (groupRef.current) {
      const startPos = new THREE.Vector3(-1.5, 1.5, 0);
      const midPos = new THREE.Vector3(0, 0, 0);
      const endPos = new THREE.Vector3(2.0, -1.8, 1.5);

      const baseScale = 1.2;
      const startScale = new THREE.Vector3().setScalar(baseScale * 0.4);
      const midScale = new THREE.Vector3().setScalar(baseScale);
      const endScale = new THREE.Vector3().setScalar(baseScale * 1.6);

      let targetPos = new THREE.Vector3();
      let targetScale = new THREE.Vector3();
      
      if (scrollProgress < 0.5) {
        const t = scrollProgress * 2;
        targetPos.lerpVectors(startPos, midPos, t);
        targetScale.lerpVectors(startScale, midScale, t);
      } else {
        const t = (scrollProgress - 0.5) * 2;
        targetPos.lerpVectors(midPos, endPos, t);
        targetScale.lerpVectors(midScale, endScale, t);
      }

      groupRef.current.position.lerp(targetPos, 0.05);
      groupRef.current.scale.lerp(targetScale, 0.05);
      groupRef.current.rotation.set(0, -Math.PI / 2, 0);
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
          <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.2} emissive="#000000" emissiveIntensity={0.0} clearcoat={1.0} clearcoatRoughness={0.05} />
        </mesh>
      </group>

      <group rotation={[0, 0, Math.PI / 4]}>
        <mesh>
          <cylinderGeometry args={[0.06, 0.06, 1.2, 8]} />
          <meshStandardMaterial color="#222222" metalness={0.5} roughness={0.6} emissive="#000000" emissiveIntensity={0.0} clearcoat={0.2} clearcoatRoughness={0.4} />
        </mesh>
      </group>
      <group rotation={[0, 0, -Math.PI / 4]}>
        <mesh>
          <cylinderGeometry args={[0.06, 0.06, 1.2, 8]} />
          <meshStandardMaterial color="#222222" metalness={0.5} roughness={0.6} emissive="#000000" emissiveIntensity={0.0} clearcoat={0.2} clearcoatRoughness={0.4} />
        </mesh>
      </group>

      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.15, 16]} />
        <meshStandardMaterial color="#dddddd" metalness={0.2} roughness={0.3} emissive="#000000" emissiveIntensity={0.0} clearcoat={0.5} clearcoatRoughness={0.2} />
      </mesh>

      <mesh position={[0, 0.08, 0]}>
        <octahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial color="#050505" metalness={0.05} roughness={0.1} emissive="#00E5FF" emissiveIntensity={0.3} clearcoat={0.2} clearcoatRoughness={0.3} />
      </mesh>

      <mesh position={[0, -0.08, 0]}>
        <octahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial color="#050505" metalness={0.05} roughness={0.1} emissive="#FF003C" emissiveIntensity={0.3} clearcoat={0.2} clearcoatRoughness={0.3} />
      </mesh>

      {[-0.6, 0.6].map((x) => (
        <group key={x} position={[x, 0, -0.6]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.4, 6]} />
            <meshStandardMaterial color="#222222" metalness={0.5} roughness={0.6} emissive="#000000" emissiveIntensity={0.0} clearcoat={0.2} clearcoatRoughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.2]}>
            <boxGeometry args={[0.25, 0.05, 0.15]} />
            <meshStandardMaterial color="#FF4500" metalness={0.3} roughness={0.4} emissive="#FF2200" emissiveIntensity={0.1} clearcoat={0.8} clearcoatRoughness={0.15} />
          </mesh>
        </group>
      ))}

      {[-0.6, 0.6].map((x) => (
        <group key={`rear-${x}`} position={[x, 0, 0.6]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.4, 6]} />
            <meshStandardMaterial color="#222222" metalness={0.5} roughness={0.6} emissive="#000000" emissiveIntensity={0.0} clearcoat={0.2} clearcoatRoughness={0.4} />
          </mesh>
          <mesh position={[0, 0, -0.2]}>
            <boxGeometry args={[0.25, 0.05, 0.15]} />
            <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.1} emissive="#FF003C" emissiveIntensity={1.0} clearcoat={1.0} clearcoatRoughness={0.1} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 0, -0.8]}>
        <coneGeometry args={[0.06, 0.25, 8]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.1} emissive="#FF003C" emissiveIntensity={1.0} clearcoat={1.0} clearcoatRoughness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0.8]}>
        <coneGeometry args={[0.06, 0.25, 8]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.1} emissive="#00E5FF" emissiveIntensity={1.0} clearcoat={1.0} clearcoatRoughness={0.1} />
      </mesh>
    </group>
  );
};

const createCircleTexture = () => {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.2)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
};

const generateStarfield = () => {
  const count = 12000;
  const arr = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const radius = 60 + Math.random() * 250;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = radius * Math.cos(phi);

    const colorType = Math.random();
    if (colorType < 0.70) {
      colors[i * 3] = 0.9;
      colors[i * 3 + 1] = 0.95;
      colors[i * 3 + 2] = 1.0;
    } else if (colorType < 0.90) {
      colors[i * 3] = 0.5;
      colors[i * 3 + 1] = 0.7;
      colors[i * 3 + 2] = 1.0;
    } else {
      colors[i * 3] = 0.6;
      colors[i * 3 + 1] = 0.2;
      colors[i * 3 + 2] = 0.8;
    }

    sizes[i] = Math.random() > 0.95 ? Math.random() * 3 + 1 : Math.random() * 1 + 0.2;
  }
  return { positions: arr, colors, sizes };
};

const INITIAL_STARFIELD = generateStarfield();

const Starfield = () => {
  const starsRef = useRef();
  const texture = useMemo(() => createCircleTexture(), []);
  const positions = INITIAL_STARFIELD;

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.00002;
      starsRef.current.rotation.x += 0.00001;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[positions.colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[positions.sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={1}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        map={texture}
        alphaTest={0.01}
      />
    </points>
  );
};

const generateNebula = () => {
  const count = 3000;
  const arr = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const radius = 20 + Math.random() * 60;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.PI / 2 + (Math.random() - 0.5) * 1.5;

    arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = radius * Math.cos(phi);

    const colorType = Math.random();
    if (colorType < 0.4) {
      colors[i * 3] = 0.2;
      colors[i * 3 + 1] = 0.3;
      colors[i * 3 + 2] = 0.8;
    } else if (colorType < 0.7) {
      colors[i * 3] = 0.6;
      colors[i * 3 + 1] = 0.1;
      colors[i * 3 + 2] = 0.5;
    } else {
      colors[i * 3] = 0.1;
      colors[i * 3 + 1] = 0.7;
      colors[i * 3 + 2] = 0.8;
    }

    sizes[i] = Math.random() * 15 + 5;
  }
  return { positions: arr, colors, sizes };
};

const INITIAL_NEBULA = generateNebula();

const Nebula = () => {
  const nebulaRef = useRef();
  const texture = useMemo(() => createCircleTexture(), []);
  const positions = INITIAL_NEBULA;

  useFrame(() => {
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y += 0.0001;
      nebulaRef.current.rotation.z += 0.00005;
    }
  });

  return (
    <points ref={nebulaRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[positions.colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[positions.sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={1}
        vertexColors
        transparent
        opacity={0.08}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        map={texture}
        alphaTest={0.01}
      />
    </points>
  );
};

const generateAmbientParticles = () => {
  const arr = new Float32Array(200 * 3);
  for (let i = 0; i < 200; i++) {
    const radius = 5 + Math.random() * 15;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = radius * Math.cos(phi);
  }
  return arr;
};

const INITIAL_AMBIENT_PARTICLES = generateAmbientParticles();

const AmbientParticles = () => {
  const pointsRef = useRef();
  const texture = useMemo(() => createCircleTexture(), []);
  const positions = INITIAL_AMBIENT_PARTICLES;

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0002;
      pointsRef.current.rotation.x += 0.0001;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.15}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        map={texture}
        alphaTest={0.01}
      />
    </points>
  );
};

const generateAsteroids = (count) => {
  const temp = [];
  for (let i = 0; i < count; i++) {
    // Scattered throughout the entire screen volume
    const radius = 8 + Math.random() * 40; 
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    
    temp.push({
      position: new THREE.Vector3(x, y, z),
      rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
      scale: new THREE.Vector3(
        Math.random() * 0.5 + 0.15,
        Math.random() * 0.5 + 0.15,
        Math.random() * 0.5 + 0.15
      ),
      speedRotation: new THREE.Euler(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      )
    });
  }
  return temp;
};

const INITIAL_ASTEROIDS = generateAsteroids(300);

const Asteroids = () => {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const asteroids = INITIAL_ASTEROIDS;

  useEffect(() => {
    if (meshRef.current) {
      asteroids.forEach((asteroid, i) => {
        dummy.position.copy(asteroid.position);
        dummy.rotation.copy(asteroid.rotation);
        dummy.scale.copy(asteroid.scale);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [asteroids, dummy]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0003;
      meshRef.current.rotation.x += 0.0001;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, INITIAL_ASTEROIDS.length]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color="#888888" 
        roughness={0.8} 
        metalness={0.2}
      />
    </instancedMesh>
  );
};

const Hero3DCanvas = () => {
  // Hardcap pixel ratio to 1 for maximum scroll performance on all devices
  const pixelRatio = 1;

  const onCreated = ({ gl }) => {
    gl.domElement.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      console.warn('WebGL context lost');
    });
    gl.domElement.addEventListener('webglcontextrestored', () => {
      console.log('WebGL context restored');
    });
  };

  return (
    <Canvas
      camera={{ position: [0, 1.5, 4], fov: 35 }}
      gl={{
        antialias: false,
        alpha: true,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true
      }}
      style={{ touchAction: 'none' }}
      dpr={[1, pixelRatio]}
      onCreated={onCreated}
    >
      <color attach="background" args={['#000000', 0]} />
      <fog attach="fog" args={['#000000', 50, 200]} />

      <ambientLight color="#1a1a1a" intensity={0.4} />
      <directionalLight color="#ffffff" intensity={3.5} position={[15, 30, 15]} />
      <directionalLight color="#ffffff" intensity={2.5} position={[-15, 25, -15]} />
      <directionalLight color="#ffffff" intensity={2.0} position={[0, -25, 0]} />
      <directionalLight color="#ffffff" intensity={1.5} position={[-15, -20, -15]} />
      <hemisphereLight color="#ffffff" groundColor="#FF003C" intensity={0.1} />
      <pointLight color="#ffffff" intensity={1.0} position={[12, 12, 12]} distance={60} decay={2} />
      <pointLight color="#ffffff" intensity={0.8} position={[-12, 12, -12]} distance={60} decay={2} />
      <pointLight color="#1a00ff" intensity={0.3} position={[0, 0, 20]} distance={50} decay={2} />
      <pointLight color="#2a00ff" intensity={0.3} position={[0, 0, -20]} distance={50} decay={2} />

      <directionalLight color="#ffffff" intensity={2.0} position={[0, 0, -30]} />

      <Starfield />
      <Nebula />
      <AmbientParticles />
      <Asteroids />
      <DroneModel />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        autoRotate={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
};

export const Hero3D = () => (
  <div className="absolute inset-0 -z-10 w-full h-full pointer-events-none">
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `
          radial-gradient(circle at 15% 50%, rgba(20, 5, 40, 0.4) 0%, transparent 50%),
          radial-gradient(circle at 85% 30%, rgba(5, 20, 40, 0.4) 0%, transparent 50%),
          linear-gradient(180deg, #010205 0%, #000000 100%)
        `
      }}
    />
    <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-sensor/30 font-mono">INITIALIZING HUD...</div>}>
      <Hero3DCanvas />
    </Suspense>
  </div>
);

export default Hero3D;