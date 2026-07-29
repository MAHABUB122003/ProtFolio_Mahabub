import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 2000, darkMode }) {
    const mesh = useRef();
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            pos[i] = (Math.random() - 0.5) * 50;
        }
        return pos;
    }, [count]);

    const colors = useMemo(() => {
        const cols = new Float32Array(count * 3);
        const orange = new THREE.Color('#f97316');
        const purple = new THREE.Color('#a855f7');
        const white = new THREE.Color('#ffffff');
        const cyan = new THREE.Color('#06b6d4');
        const palette = [orange, purple, white, cyan];
        for (let i = 0; i < count; i++) {
            const color = palette[Math.floor(Math.random() * palette.length)];
            cols[i * 3] = color.r;
            cols[i * 3 + 1] = color.g;
            cols[i * 3 + 2] = color.b;
        }
        return cols;
    }, [count]);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
            mesh.current.rotation.x = state.clock.elapsedTime * 0.01;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.06}
                vertexColors
                transparent
                opacity={darkMode ? 0.8 : 0.4}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

function FloatingShape({ position, color, scale = 1, speed = 1 }) {
    const ref = useRef();
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
            ref.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
            ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.5;
        }
    });
    return (
        <mesh ref={ref} position={position} scale={scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={color} transparent opacity={0.15} wireframe emissive={color} emissiveIntensity={0.3} />
        </mesh>
    );
}

function TorusKnot({ position, color, scale = 1 }) {
    const ref = useRef();
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = state.clock.elapsedTime * 0.15;
            ref.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });
    return (
        <mesh ref={ref} position={position} scale={scale}>
            <torusKnotGeometry args={[1, 0.3, 100, 16, 2, 3]} />
            <meshStandardMaterial color={color} transparent opacity={0.1} wireframe emissive={color} emissiveIntensity={0.2} />
        </mesh>
    );
}

function Icosahedron({ position, color, scale = 1 }) {
    const ref = useRef();
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = state.clock.elapsedTime * 0.2;
            ref.current.rotation.z = state.clock.elapsedTime * 0.15;
        }
    });
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={ref} position={position} scale={scale}>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color={color} transparent opacity={0.12} wireframe emissive={color} emissiveIntensity={0.25} />
            </mesh>
        </Float>
    );
}

function Rings() {
    const ref = useRef();
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = state.clock.elapsedTime * 0.05;
            ref.current.rotation.y = state.clock.elapsedTime * 0.08;
        }
    });
    return (
        <group ref={ref}>
            <mesh>
                <torusGeometry args={[5, 0.02, 16, 100]} />
                <meshStandardMaterial color="#f97316" transparent opacity={0.2} emissive="#f97316" emissiveIntensity={0.5} />
            </mesh>
            <mesh rotation={[Math.PI / 3, 0, Math.PI / 6]}>
                <torusGeometry args={[6, 0.015, 16, 100]} />
                <meshStandardMaterial color="#a855f7" transparent opacity={0.15} emissive="#a855f7" emissiveIntensity={0.4} />
            </mesh>
            <mesh rotation={[Math.PI / 4, Math.PI / 3, 0]}>
                <torusGeometry args={[7, 0.01, 16, 100]} />
                <meshStandardMaterial color="#06b6d4" transparent opacity={0.1} emissive="#06b6d4" emissiveIntensity={0.3} />
            </mesh>
        </group>
    );
}

function Scene({ darkMode }) {
    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#f97316" />
            <pointLight position={[-10, -10, -10]} intensity={0.3} color="#a855f7" />
            <Particles count={1500} darkMode={darkMode} />
            <FloatingShape position={[-8, 3, -5]} color="#f97316" scale={0.8} speed={0.5} />
            <FloatingShape position={[10, -4, -8]} color="#a855f7" scale={1.2} speed={0.3} />
            <FloatingShape position={[-5, -6, -3]} color="#06b6d4" scale={0.6} speed={0.7} />
            <FloatingShape position={[7, 5, -10]} color="#f97316" scale={1} speed={0.4} />
            <TorusKnot position={[12, 0, -12]} color="#a855f7" scale={0.7} />
            <TorusKnot position={[-12, -2, -15]} color="#f97316" scale={0.5} />
            <Icosahedron position={[0, -5, -8]} color="#f97316" scale={0.9} />
            <Icosahedron position={[8, 7, -12]} color="#a855f7" scale={0.6} />
            <Icosahedron position={[-10, 4, -10]} color="#06b6d4" scale={0.7} />
            <Rings />
            <Stars radius={30} depth={60} count={2500} factor={4} saturation={0.5} fade speed={1.5} />
        </>
    );
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) return null;
        return this.props.children;
    }
}

export default function ParticleField({ darkMode = true }) {
    const [webglSupported, setWebglSupported] = useState(true);

    useEffect(() => {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
            if (!gl) setWebglSupported(false);
        } catch {
            setWebglSupported(false);
        }
    }, []);

    if (!webglSupported) return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <ErrorBoundary>
                <Canvas
                    camera={{ position: [0, 0, 15], fov: 60 }}
                    dpr={[1, 1.5]}
                    gl={{ antialias: true, alpha: true }}
                    style={{ background: 'transparent' }}
                    onCreated={({ gl }) => {
                        gl.setClearColor(0x000000, 0);
                    }}
                >
                    <Scene darkMode={darkMode} />
                </Canvas>
            </ErrorBoundary>
        </div>
    );
}
