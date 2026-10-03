import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════════════
   CYBER-AI QUANTUM 3D UNIVERSE — Elite Portfolio Background
   Built for Cybersecurity Specialist, ML Engineer & Full-Stack Developer
   ═══════════════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────
   1. Dynamic Camera Rig — Smooth interactive mouse parallax
   ───────────────────────────────────────────────────────────── */
function CameraRig({ isMobile }) {
    const { camera, pointer } = useThree();
    const vec = useMemo(() => new THREE.Vector3(), []);

    useFrame(() => {
        if (isMobile) return;
        // Smoothly lerp camera position towards pointer offset
        camera.position.lerp(
            vec.set(pointer.x * 2.5, pointer.y * 1.8, 18),
            0.04
        );
        camera.lookAt(0, 0, 0);
    });

    return null;
}

/* ─────────────────────────────────────────────────────────────
   2. Cyber Neural Core — Holographic Multi-Ring Quantum Reactor
   ───────────────────────────────────────────────────────────── */
function CyberCore({ darkMode }) {
    const coreRef = useRef();
    const ring1Ref = useRef();
    const ring2Ref = useRef();
    const ring3Ref = useRef();
    const outerIcosaRef = useRef();

    const colors = useMemo(() => ({
        orange: darkMode ? '#f97316' : '#ea580c',
        purple: darkMode ? '#a855f7' : '#7c3aed',
        cyan: darkMode ? '#06b6d4' : '#0891b2',
        coreGlow: darkMode ? '#ffedd5' : '#fed7aa',
    }), [darkMode]);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (coreRef.current) {
            coreRef.current.rotation.y = t * 0.2;
            coreRef.current.rotation.x = Math.sin(t * 0.15) * 0.2;
        }
        if (ring1Ref.current) {
            ring1Ref.current.rotation.x = t * 0.35;
            ring1Ref.current.rotation.y = t * 0.15;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.y = -t * 0.25;
            ring2Ref.current.rotation.z = t * 0.2;
        }
        if (ring3Ref.current) {
            ring3Ref.current.rotation.z = t * 0.4;
            ring3Ref.current.rotation.x = -t * 0.18;
        }
        if (outerIcosaRef.current) {
            outerIcosaRef.current.rotation.y = -t * 0.08;
            outerIcosaRef.current.rotation.x = Math.cos(t * 0.1) * 0.15;
            const pulse = 1 + Math.sin(t * 1.2) * 0.05;
            outerIcosaRef.current.scale.set(pulse, pulse, pulse);
        }
    });

    return (
        <group position={[7.5, 1, -4]} scale={1.8}>
            {/* Inner Core Pulse */}
            <mesh ref={coreRef}>
                <octahedronGeometry args={[0.9, 0]} />
                <meshBasicMaterial
                    color={colors.orange}
                    wireframe
                    transparent
                    opacity={darkMode ? 0.75 : 0.4}
                />
            </mesh>

            {/* Glowing Inner Solid Core */}
            <mesh scale={0.4}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial
                    color={colors.coreGlow}
                    transparent
                    opacity={darkMode ? 0.6 : 0.3}
                />
            </mesh>

            {/* Quantum Torus Ring 1 (Cyber Orange) */}
            <mesh ref={ring1Ref}>
                <torusGeometry args={[1.6, 0.02, 16, 64]} />
                <meshBasicMaterial
                    color={colors.orange}
                    transparent
                    opacity={darkMode ? 0.7 : 0.4}
                />
            </mesh>

            {/* Quantum Torus Ring 2 (Neon Purple) */}
            <mesh ref={ring2Ref}>
                <torusGeometry args={[2.0, 0.02, 16, 64]} />
                <meshBasicMaterial
                    color={colors.purple}
                    transparent
                    opacity={darkMode ? 0.6 : 0.35}
                />
            </mesh>

            {/* Quantum Torus Ring 3 (Cyber Cyan) */}
            <mesh ref={ring3Ref}>
                <torusGeometry args={[2.4, 0.015, 16, 64]} />
                <meshBasicMaterial
                    color={colors.cyan}
                    transparent
                    opacity={darkMode ? 0.5 : 0.3}
                />
            </mesh>

            {/* Outer Geodesic Shield (Floating Icosahedron) */}
            <mesh ref={outerIcosaRef} scale={1.2}>
                <icosahedronGeometry args={[2.2, 1]} />
                <meshBasicMaterial
                    color={colors.cyan}
                    wireframe
                    transparent
                    opacity={darkMode ? 0.18 : 0.09}
                />
            </mesh>
        </group>
    );
}

/* ─────────────────────────────────────────────────────────────
   3. Quantum Wave Field — Parametric undulating cyber grid wave
   ───────────────────────────────────────────────────────────── */
function QuantumWaveField({ darkMode, count = 2800 }) {
    const pointsRef = useRef();
    const { pointer } = useThree();

    const { positions, colors, originalPositions } = useMemo(() => {
        const rows = 70;
        const cols = 40;
        const total = rows * cols;
        const positions = new Float32Array(total * 3);
        const originalPositions = new Float32Array(total * 3);
        const colors = new Float32Array(total * 3);

        const color1 = new THREE.Color(darkMode ? '#f97316' : '#ea580c');
        const color2 = new THREE.Color(darkMode ? '#9333ea' : '#7c3aed');
        const color3 = new THREE.Color(darkMode ? '#06b6d4' : '#0891b2');

        let idx = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const x = (i - rows / 2) * 0.9;
                const z = (j - cols / 2) * 0.8 - 6;
                const y = -7;

                positions[idx * 3] = x;
                positions[idx * 3 + 1] = y;
                positions[idx * 3 + 2] = z;

                originalPositions[idx * 3] = x;
                originalPositions[idx * 3 + 1] = y;
                originalPositions[idx * 3 + 2] = z;

                const mixFactor = (i / rows + j / cols) * 0.5;
                const c = mixFactor < 0.5
                    ? color1.clone().lerp(color2, mixFactor * 2)
                    : color2.clone().lerp(color3, (mixFactor - 0.5) * 2);

                colors[idx * 3] = c.r;
                colors[idx * 3 + 1] = c.g;
                colors[idx * 3 + 2] = c.b;

                idx++;
            }
        }
        return { positions, colors, originalPositions };
    }, [darkMode]);

    useFrame((state) => {
        if (!pointsRef.current) return;
        const t = state.clock.elapsedTime * 0.8;
        const pos = pointsRef.current.geometry.attributes.position.array;
        const total = pos.length / 3;

        const mx = (pointer.x * 20);
        const mz = (pointer.y * 10) - 5;

        for (let i = 0; i < total; i++) {
            const ix = i * 3;
            const ox = originalPositions[ix];
            const oz = originalPositions[ix + 2];

            // Wave equation
            const wave1 = Math.sin(ox * 0.2 + t) * 1.2;
            const wave2 = Math.cos(oz * 0.25 + t * 0.7) * 0.8;
            const wave3 = Math.sin((ox + oz) * 0.15 + t * 0.5) * 0.5;

            // Interactive mouse ripple
            const dx = ox - mx;
            const dz = oz - mz;
            const dist = Math.sqrt(dx * dx + dz * dz);
            const mousePush = dist < 7 ? Math.sin((7 - dist) * 1.2) * 1.5 : 0;

            pos[ix + 1] = originalPositions[ix + 1] + wave1 + wave2 + wave3 + mousePush;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={darkMode ? 0.12 : 0.09}
                vertexColors
                transparent
                opacity={darkMode ? 0.75 : 0.45}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

/* ─────────────────────────────────────────────────────────────
   4. Neural Network Constellation — Dynamic Cyber Security Nodes
   ───────────────────────────────────────────────────────────── */
function NeuralMesh({ darkMode, count = 35 }) {
    const linesRef = useRef();
    const pointsRef = useRef();

    const { nodes, nodeColors } = useMemo(() => {
        const nodes = [];
        const nodeColors = new Float32Array(count * 3);
        const palette = [
            new THREE.Color('#f97316'),
            new THREE.Color('#a855f7'),
            new THREE.Color('#06b6d4'),
            new THREE.Color('#10b981'),
        ];

        for (let i = 0; i < count; i++) {
            nodes.push({
                x: (Math.random() - 0.5) * 36,
                y: (Math.random() - 0.5) * 22,
                z: (Math.random() - 0.5) * 16 - 5,
                vx: (Math.random() - 0.5) * 0.008,
                vy: (Math.random() - 0.5) * 0.008,
                vz: (Math.random() - 0.5) * 0.004,
            });
            const c = palette[i % palette.length];
            nodeColors[i * 3] = c.r;
            nodeColors[i * 3 + 1] = c.g;
            nodeColors[i * 3 + 2] = c.b;
        }
        return { nodes, nodeColors };
    }, [count]);

    const maxLines = count * (count - 1) / 2;
    const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
    const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
    const nodePositions = useMemo(() => new Float32Array(count * 3), [count]);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // Update node positions
        for (let i = 0; i < count; i++) {
            const n = nodes[i];
            n.x += n.vx + Math.sin(t * 0.2 + i) * 0.003;
            n.y += n.vy + Math.cos(t * 0.25 + i * 0.8) * 0.003;
            n.z += n.vz;

            // Bounce boundaries
            if (Math.abs(n.x) > 20) n.vx *= -1;
            if (Math.abs(n.y) > 12) n.vy *= -1;
            if (n.z > 2 || n.z < -20) n.vz *= -1;

            nodePositions[i * 3] = n.x;
            nodePositions[i * 3 + 1] = n.y;
            nodePositions[i * 3 + 2] = n.z;
        }

        if (pointsRef.current) {
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }

        // Connect nearby nodes
        let lineIdx = 0;
        const maxDist = 7.5;

        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dz = nodes[i].z - nodes[j].z;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < maxDist) {
                    const lPosIdx = lineIdx * 6;
                    linePositions[lPosIdx] = nodes[i].x;
                    linePositions[lPosIdx + 1] = nodes[i].y;
                    linePositions[lPosIdx + 2] = nodes[i].z;
                    linePositions[lPosIdx + 3] = nodes[j].x;
                    linePositions[lPosIdx + 4] = nodes[j].y;
                    linePositions[lPosIdx + 5] = nodes[j].z;

                    const alpha = Math.max(0, 1 - dist / maxDist) * (darkMode ? 0.7 : 0.35);
                    lineColors[lPosIdx] = 0.98 * alpha;
                    lineColors[lPosIdx + 1] = 0.45 * alpha;
                    lineColors[lPosIdx + 2] = 0.09 * alpha;

                    lineColors[lPosIdx + 3] = 0.58 * alpha;
                    lineColors[lPosIdx + 4] = 0.2 * alpha;
                    lineColors[lPosIdx + 5] = 0.95 * alpha;

                    lineIdx++;
                }
            }
        }

        if (linesRef.current) {
            linesRef.current.geometry.setDrawRange(0, lineIdx * 2);
            linesRef.current.geometry.attributes.position.needsUpdate = true;
            linesRef.current.geometry.attributes.color.needsUpdate = true;
        }
    });

    return (
        <group>
            {/* Glowing Nodes */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[nodePositions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[nodeColors, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={darkMode ? 0.28 : 0.2}
                    vertexColors
                    transparent
                    opacity={darkMode ? 0.9 : 0.6}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Connected Cyber Synapse Lines */}
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[linePositions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[lineColors, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    vertexColors
                    transparent
                    opacity={darkMode ? 0.55 : 0.3}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </lineSegments>
        </group>
    );
}

/* ─────────────────────────────────────────────────────────────
   5. Floating Cyber Security Polyhedrons (Octahedrons & Icosahedrons)
   ───────────────────────────────────────────────────────────── */
function FloatingCyberShapes({ darkMode }) {
    const shape1 = useRef();
    const shape2 = useRef();
    const shape3 = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (shape1.current) {
            shape1.current.rotation.x = t * 0.3;
            shape1.current.rotation.y = t * 0.4;
            shape1.current.position.y = 4 + Math.sin(t * 0.6) * 0.6;
        }
        if (shape2.current) {
            shape2.current.rotation.y = -t * 0.25;
            shape2.current.rotation.z = t * 0.3;
            shape2.current.position.y = -4 + Math.cos(t * 0.5) * 0.5;
        }
        if (shape3.current) {
            shape3.current.rotation.x = -t * 0.35;
            shape3.current.rotation.z = -t * 0.2;
            shape3.current.position.y = 0 + Math.sin(t * 0.7 + 1) * 0.7;
        }
    });

    return (
        <group>
            {/* Top Left Floating Octahedron (Cyber Purple) */}
            <mesh ref={shape1} position={[-11, 4, -8]} scale={1.3}>
                <octahedronGeometry args={[1, 0]} />
                <meshBasicMaterial
                    color={darkMode ? "#a855f7" : "#7c3aed"}
                    wireframe
                    transparent
                    opacity={darkMode ? 0.35 : 0.2}
                />
            </mesh>

            {/* Bottom Right Floating Icosahedron (Cyber Orange) */}
            <mesh ref={shape2} position={[12, -4, -10]} scale={1.5}>
                <icosahedronGeometry args={[1, 0]} />
                <meshBasicMaterial
                    color={darkMode ? "#f97316" : "#ea580c"}
                    wireframe
                    transparent
                    opacity={darkMode ? 0.35 : 0.2}
                />
            </mesh>

            {/* Center-Left Floating Torus Knot (Cyan Security Ring) */}
            <mesh ref={shape3} position={[-13, -1, -12]} scale={1.0}>
                <torusKnotGeometry args={[1, 0.25, 48, 8]} />
                <meshBasicMaterial
                    color={darkMode ? "#06b6d4" : "#0891b2"}
                    wireframe
                    transparent
                    opacity={darkMode ? 0.25 : 0.15}
                />
            </mesh>
        </group>
    );
}

/* ─────────────────────────────────────────────────────────────
   6. Islamic Geometric 8-Pointed Star (Rub el Hizb) 3D Accent
   ───────────────────────────────────────────────────────────── */
function Islamic3DStar({ darkMode }) {
    const starRef = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (starRef.current) {
            starRef.current.rotation.z = t * 0.08;
            starRef.current.rotation.y = Math.sin(t * 0.1) * 0.2;
        }
    });

    return (
        <group ref={starRef} position={[-8.5, 4.5, -6]} scale={1.4}>
            {/* Square 1 (Gold/Amber) */}
            <mesh>
                <boxGeometry args={[1.6, 1.6, 0.04]} />
                <meshBasicMaterial
                    color={darkMode ? "#fbbf24" : "#d97706"}
                    wireframe
                    transparent
                    opacity={darkMode ? 0.35 : 0.2}
                />
            </mesh>
            {/* Square 2 (Rotated 45deg to form 8-pointed star) */}
            <mesh rotation={[0, 0, Math.PI / 4]}>
                <boxGeometry args={[1.6, 1.6, 0.04]} />
                <meshBasicMaterial
                    color={darkMode ? "#f97316" : "#ea580c"}
                    wireframe
                    transparent
                    opacity={darkMode ? 0.35 : 0.2}
                />
            </mesh>
            {/* Central glowing octagram core */}
            <mesh scale={0.4}>
                <octahedronGeometry args={[1, 0]} />
                <meshBasicMaterial
                    color={darkMode ? "#fef08a" : "#f59e0b"}
                    transparent
                    opacity={darkMode ? 0.5 : 0.25}
                />
            </mesh>
        </group>
    );
}

/* ─────────────────────────────────────────────────────────────
   7. Deep Space Cyber Dust & Star Field
   ───────────────────────────────────────────────────────────── */
function CyberStarDust({ darkMode, count = 600 }) {
    const pointsRef = useRef();

    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const palette = [
            new THREE.Color(darkMode ? '#f97316' : '#ea580c'),
            new THREE.Color(darkMode ? '#a855f7' : '#7c3aed'),
            new THREE.Color(darkMode ? '#06b6d4' : '#0891b2'),
            new THREE.Color('#ffffff'),
            new THREE.Color('#fbbf24'),
        ];

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;

            const c = palette[Math.floor(Math.random() * palette.length)];
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;
        }
        return { positions, colors };
    }, [count, darkMode]);

    useFrame((state) => {
        if (!pointsRef.current) return;
        const t = state.clock.elapsedTime * 0.05;
        pointsRef.current.rotation.y = t * 0.2;
        pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={darkMode ? 0.08 : 0.06}
                vertexColors
                transparent
                opacity={darkMode ? 0.7 : 0.4}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

/* ─────────────────────────────────────────────────────────────
   Scene Composition
   ───────────────────────────────────────────────────────────── */
function Scene({ darkMode, isMobile }) {
    return (
        <>
            {/* Cinematic Cyber Lights */}
            <ambientLight intensity={darkMode ? 0.25 : 0.4} />
            <pointLight position={[15, 12, 10]} intensity={darkMode ? 0.8 : 0.5} color="#f97316" distance={60} />
            <pointLight position={[-15, -8, 5]} intensity={darkMode ? 0.7 : 0.4} color="#a855f7" distance={60} />
            <pointLight position={[0, -10, 12]} intensity={darkMode ? 0.6 : 0.3} color="#06b6d4" distance={50} />

            {/* Smooth Camera Parallax Controller */}
            <CameraRig isMobile={isMobile} />

            {/* Hero Piece: Cyber Holographic Quantum Reactor */}
            {!isMobile && <CyberCore darkMode={darkMode} />}

            {/* Interactive Undulating Quantum Wave Mesh */}
            <QuantumWaveField darkMode={darkMode} count={isMobile ? 1200 : 2800} />

            {/* Floating Cyber Security Nodes & Synaptic Lines */}
            <NeuralMesh darkMode={darkMode} count={isMobile ? 18 : 36} />

            {/* Holographic Geometric Accents */}
            {!isMobile && <FloatingCyberShapes darkMode={darkMode} />}

            {/* Islamic 8-Pointed Star Accent */}
            {!isMobile && <Islamic3DStar darkMode={darkMode} />}

            {/* Ambient Star & Data Particle Field */}
            <CyberStarDust darkMode={darkMode} count={isMobile ? 250 : 600} />
        </>
    );
}

/* ─────────────────────────────────────────────────────────────
   Error Boundary
   ───────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────
   Main Export
   ───────────────────────────────────────────────────────────── */
export default function ParticleField({ darkMode = true }) {
    const [webglSupported, setWebglSupported] = useState(true);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
            if (!gl) setWebglSupported(false);
        } catch {
            setWebglSupported(false);
        }

        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mq.matches);
        const handler = (e) => setReducedMotion(e.matches);
        mq.addEventListener('change', handler);
        setIsMobile(window.innerWidth < 768);
        const resizeHandler = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', resizeHandler);

        return () => {
            mq.removeEventListener('change', handler);
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    if (!webglSupported || reducedMotion) return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none" style={{ pointerEvents: 'none' }}>
            <ErrorBoundary>
                <Canvas
                    camera={{ position: [0, 0, 18], fov: 55 }}
                    dpr={isMobile ? [1, 1] : [1, 1.5]}
                    gl={{
                        antialias: !isMobile,
                        alpha: true,
                        powerPreference: 'high-performance',
                    }}
                    style={{ background: 'transparent', pointerEvents: 'none' }}
                    onCreated={({ gl }) => {
                        gl.setClearColor(0x000000, 0);
                    }}
                    eventSource={typeof document !== 'undefined' ? document.documentElement : undefined}
                    eventPrefix="client"
                >
                    <Scene darkMode={darkMode} isMobile={isMobile} />
                </Canvas>
            </ErrorBoundary>
        </div>
    );
}
