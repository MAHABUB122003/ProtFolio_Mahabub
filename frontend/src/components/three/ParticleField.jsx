import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════
   PREMIUM 3D BACKGROUND — Developer Portfolio
   Inspired by Stripe, Linear, Vercel aesthetics
   ═══════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   1. Morphing Gradient Sphere — the hero piece
   A smooth, organic blob that breathes & morphs
   ───────────────────────────────────────────── */
function MorphingSphere({ darkMode }) {
    const meshRef = useRef();
    const materialRef = useRef();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(darkMode ? '#f97316' : '#ea580c') },
        uColor2: { value: new THREE.Color(darkMode ? '#a855f7' : '#7c3aed') },
        uColor3: { value: new THREE.Color(darkMode ? '#06b6d4' : '#0891b2') },
        uOpacity: { value: darkMode ? 0.12 : 0.08 },
    }), [darkMode]);

    const vertexShader = `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vDisplacement;
        
        // Simplex noise functions
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        
        float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
            p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }
        
        void main() {
            vNormal = normal;
            vPosition = position;
            
            float noise1 = snoise(position * 0.8 + uTime * 0.15) * 0.4;
            float noise2 = snoise(position * 1.5 + uTime * 0.1) * 0.2;
            float noise3 = snoise(position * 2.5 + uTime * 0.2) * 0.1;
            
            float displacement = noise1 + noise2 + noise3;
            vDisplacement = displacement;
            
            vec3 newPosition = position + normal * displacement;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
    `;

    const fragmentShader = `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform float uOpacity;
        uniform float uTime;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vDisplacement;
        
        void main() {
            float mixFactor1 = (vPosition.y + 3.0) / 6.0;
            float mixFactor2 = sin(vDisplacement * 3.0 + uTime * 0.2) * 0.5 + 0.5;
            
            vec3 color = mix(uColor1, uColor2, mixFactor1);
            color = mix(color, uColor3, mixFactor2 * 0.3);
            
            // Fresnel-like edge glow
            float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
            color += fresnel * 0.3;
            
            float alpha = uOpacity + fresnel * 0.08;
            
            gl_FragColor = vec4(color, alpha);
        }
    `;

    useFrame((state) => {
        if (meshRef.current) {
            uniforms.uTime.value = state.clock.elapsedTime;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.03;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
        }
    });

    return (
        <mesh ref={meshRef} position={[6, 0, -5]} scale={2.8}>
            <icosahedronGeometry args={[1, 64]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                wireframe
                side={THREE.DoubleSide}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

/* ─────────────────────────────────────────────
   2. Network Constellation — connected nodes
   ───────────────────────────────────────────── */
function NetworkConstellation({ darkMode, count = 40 }) {
    const pointsRef = useRef();
    const linesRef = useRef();

    const { nodes, connections, nodeColors } = useMemo(() => {
        const nodes = [];
        const nodeColors = new Float32Array(count * 3);
        const orange = new THREE.Color('#f97316');
        const purple = new THREE.Color('#a855f7');
        const cyan = new THREE.Color('#22d3ee');
        const palette = [orange, purple, cyan];

        for (let i = 0; i < count; i++) {
            nodes.push({
                x: (Math.random() - 0.5) * 40,
                y: (Math.random() - 0.5) * 20,
                z: (Math.random() - 0.5) * 20 - 10,
                vx: (Math.random() - 0.5) * 0.003,
                vy: (Math.random() - 0.5) * 0.003,
                vz: (Math.random() - 0.5) * 0.001,
            });
            const c = palette[Math.floor(Math.random() * palette.length)];
            nodeColors[i * 3] = c.r;
            nodeColors[i * 3 + 1] = c.g;
            nodeColors[i * 3 + 2] = c.b;
        }

        // Pre-calculate connections (pairs within distance)
        const connections = [];
        const maxDist = 8;
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dz = nodes[i].z - nodes[j].z;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (dist < maxDist) {
                    connections.push({ i, j, dist });
                }
            }
        }

        return { nodes, connections, nodeColors };
    }, [count]);

    const positionsArray = useRef(new Float32Array(count * 3));
    const linePositions = useRef(new Float32Array(connections.length * 6));
    const lineColors = useRef(new Float32Array(connections.length * 6));

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        // Update node positions with gentle drift
        for (let i = 0; i < count; i++) {
            const node = nodes[i];
            node.x += node.vx + Math.sin(time * 0.1 + i) * 0.002;
            node.y += node.vy + Math.cos(time * 0.08 + i * 0.5) * 0.002;
            node.z += node.vz;

            // Soft boundary bounce
            if (Math.abs(node.x) > 22) node.vx *= -1;
            if (Math.abs(node.y) > 12) node.vy *= -1;
            if (node.z > -2 || node.z < -25) node.vz *= -1;

            positionsArray.current[i * 3] = node.x;
            positionsArray.current[i * 3 + 1] = node.y;
            positionsArray.current[i * 3 + 2] = node.z;
        }

        // Update line positions
        for (let c = 0; c < connections.length; c++) {
            const { i, j } = connections[c];
            const idx = c * 6;
            linePositions.current[idx] = nodes[i].x;
            linePositions.current[idx + 1] = nodes[i].y;
            linePositions.current[idx + 2] = nodes[i].z;
            linePositions.current[idx + 3] = nodes[j].x;
            linePositions.current[idx + 4] = nodes[j].y;
            linePositions.current[idx + 5] = nodes[j].z;

            // Dynamic line color based on distance
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dz = nodes[i].z - nodes[j].z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            const intensity = Math.max(0, 1 - dist / 8);

            const r = 0.97 * intensity;
            const g = 0.45 * intensity;
            const b = 0.09 * intensity + 0.66 * intensity * (1 - intensity);

            lineColors.current[idx] = r;
            lineColors.current[idx + 1] = g;
            lineColors.current[idx + 2] = b;
            lineColors.current[idx + 3] = r;
            lineColors.current[idx + 4] = g;
            lineColors.current[idx + 5] = b;
        }

        // Flag geometry updates
        if (pointsRef.current) {
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
        if (linesRef.current) {
            linesRef.current.geometry.attributes.position.needsUpdate = true;
            linesRef.current.geometry.attributes.color.needsUpdate = true;
        }
    });

    const nodeOpacity = darkMode ? 0.7 : 0.4;
    const lineOpacity = darkMode ? 0.12 : 0.06;

    return (
        <group>
            {/* Nodes */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={count} array={positionsArray.current} itemSize={3} />
                    <bufferAttribute attach="attributes-color" count={count} array={nodeColors} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.12}
                    vertexColors
                    transparent
                    opacity={nodeOpacity}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>

            {/* Connection Lines */}
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={connections.length * 2} array={linePositions.current} itemSize={3} />
                    <bufferAttribute attach="attributes-color" count={connections.length * 2} array={lineColors.current} itemSize={3} />
                </bufferGeometry>
                <lineBasicMaterial
                    vertexColors
                    transparent
                    opacity={lineOpacity}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </lineSegments>
        </group>
    );
}

/* ─────────────────────────────────────────────
   3. Particle Wave — flowing ocean of particles
   ───────────────────────────────────────────── */
function ParticleWave({ darkMode, count = 3000 }) {
    const meshRef = useRef();

    const { positions, colors, basePositions } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const basePositions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const cols = count;
        const rows = Math.floor(count / cols * 50);
        const gridCols = Math.ceil(Math.sqrt(count * 2));
        const gridRows = Math.ceil(count / gridCols);
        const spacing = 0.35;

        for (let i = 0; i < count; i++) {
            const col = i % gridCols;
            const row = Math.floor(i / gridCols);

            const x = (col - gridCols / 2) * spacing;
            const z = (row - gridRows / 2) * spacing - 5;
            const y = 0;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            basePositions[i * 3] = x;
            basePositions[i * 3 + 1] = y;
            basePositions[i * 3 + 2] = z;

            // Color gradient based on position
            const t = col / gridCols;
            if (t < 0.33) {
                const c = new THREE.Color('#f97316').lerp(new THREE.Color('#a855f7'), t * 3);
                colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
            } else if (t < 0.66) {
                const c = new THREE.Color('#a855f7').lerp(new THREE.Color('#06b6d4'), (t - 0.33) * 3);
                colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
            } else {
                const c = new THREE.Color('#06b6d4').lerp(new THREE.Color('#f97316'), (t - 0.66) * 3);
                colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
            }
        }
        return { positions, colors, basePositions };
    }, [count]);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime;
        const posAttr = meshRef.current.geometry.attributes.position;

        for (let i = 0; i < count; i++) {
            const bx = basePositions[i * 3];
            const bz = basePositions[i * 3 + 2];

            // Multi-layer wave
            const wave1 = Math.sin(bx * 0.3 + time * 0.4) * 0.5;
            const wave2 = Math.cos(bz * 0.4 + time * 0.3) * 0.3;
            const wave3 = Math.sin((bx + bz) * 0.2 + time * 0.5) * 0.2;

            posAttr.array[i * 3 + 1] = wave1 + wave2 + wave3;
        }
        posAttr.needsUpdate = true;
    });

    return (
        <points ref={meshRef} position={[0, -6, -8]} rotation={[-0.3, 0, 0]}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
                <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                vertexColors
                transparent
                opacity={darkMode ? 0.5 : 0.3}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

/* ─────────────────────────────────────────────
   4. Ambient Dust — ultra-subtle background fill
   ───────────────────────────────────────────── */
function AmbientDust({ count = 500, darkMode }) {
    const ref = useRef();

    const { positions, colors } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const white = new THREE.Color(darkMode ? '#64748b' : '#94a3b8');

        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 60;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10;
            col[i * 3] = white.r;
            col[i * 3 + 1] = white.g;
            col[i * 3 + 2] = white.b;
        }
        return { positions: pos, colors: col };
    }, [count, darkMode]);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * 0.005;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
                <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial
                size={0.025}
                vertexColors
                transparent
                opacity={darkMode ? 0.25 : 0.15}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

/* ─────────────────────────────────────────────
   5. Islamic 8-Pointed Star (Rub el Hizb)
   Classic octagram with nested concentric rings
   ───────────────────────────────────────────── */
function IslamicStarPattern({ position = [-8, 2, -6], scale = 1.8, darkMode }) {
    const groupRef = useRef();

    const starGeometry = useMemo(() => {
        const points = [];
        const addStar = (radius, innerRadius, numPoints, offset = 0) => {
            for (let i = 0; i < numPoints; i++) {
                const outerAngle = (i / numPoints) * Math.PI * 2 + offset;
                const innerAngle = ((i + 0.5) / numPoints) * Math.PI * 2 + offset;
                const nextOuterAngle = ((i + 1) / numPoints) * Math.PI * 2 + offset;

                points.push(
                    Math.cos(outerAngle) * radius, Math.sin(outerAngle) * radius, 0,
                    Math.cos(innerAngle) * innerRadius, Math.sin(innerAngle) * innerRadius, 0
                );
                points.push(
                    Math.cos(innerAngle) * innerRadius, Math.sin(innerAngle) * innerRadius, 0,
                    Math.cos(nextOuterAngle) * radius, Math.sin(nextOuterAngle) * radius, 0
                );
            }
        };

        // Outer 8-pointed star
        addStar(1.0, 0.55, 8, 0);
        // Inner 8-pointed star rotated 22.5°
        addStar(0.7, 0.38, 8, Math.PI / 8);
        // Core 8-pointed star
        addStar(0.4, 0.22, 8, 0);

        // Concentric circles (approximated with line segments)
        const circleSegments = 64;
        const radii = [1.05, 0.75, 0.45, 0.2];
        radii.forEach(r => {
            for (let i = 0; i < circleSegments; i++) {
                const a1 = (i / circleSegments) * Math.PI * 2;
                const a2 = ((i + 1) / circleSegments) * Math.PI * 2;
                points.push(
                    Math.cos(a1) * r, Math.sin(a1) * r, 0,
                    Math.cos(a2) * r, Math.sin(a2) * r, 0
                );
            }
        });

        // Connecting radial lines
        for (let i = 0; i < 16; i++) {
            const angle = (i / 16) * Math.PI * 2;
            points.push(
                Math.cos(angle) * 0.2, Math.sin(angle) * 0.2, 0,
                Math.cos(angle) * 1.05, Math.sin(angle) * 1.05, 0
            );
        }

        const arr = new Float32Array(points);
        const geom = new THREE.BufferGeometry();
        geom.setAttribute('position', new THREE.BufferAttribute(arr, 3));
        return geom;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.z = state.clock.elapsedTime * 0.03;
            // Gentle breathing scale
            const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.03;
            groupRef.current.scale.setScalar(scale * breathe);
        }
    });

    return (
        <group ref={groupRef} position={position}>
            <lineSegments geometry={starGeometry}>
                <lineBasicMaterial
                    color={darkMode ? '#f97316' : '#ea580c'}
                    transparent
                    opacity={darkMode ? 0.18 : 0.12}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </lineSegments>
        </group>
    );
}

/* ─────────────────────────────────────────────
   6. Islamic Geometric Tessellation
   Star-and-cross pattern grid
   ───────────────────────────────────────────── */
function IslamicTessellation({ position = [0, -7, -12], darkMode }) {
    const groupRef = useRef();

    const tessGeometry = useMemo(() => {
        const points = [];
        const gridSize = 5;
        const cellSize = 1.6;

        for (let gx = -gridSize; gx <= gridSize; gx++) {
            for (let gy = -gridSize; gy <= gridSize; gy++) {
                const cx = gx * cellSize;
                const cy = gy * cellSize;
                const r = cellSize * 0.45;

                // 8-pointed star at each cell center
                for (let i = 0; i < 8; i++) {
                    const a1 = (i / 8) * Math.PI * 2;
                    const a2 = ((i + 1) / 8) * Math.PI * 2;
                    const aMid = ((i + 0.5) / 8) * Math.PI * 2;
                    const innerR = r * 0.45;

                    // Star outer edge
                    points.push(
                        cx + Math.cos(a1) * r, cy + Math.sin(a1) * r, 0,
                        cx + Math.cos(aMid) * innerR, cy + Math.sin(aMid) * innerR, 0
                    );
                    points.push(
                        cx + Math.cos(aMid) * innerR, cy + Math.sin(aMid) * innerR, 0,
                        cx + Math.cos(a2) * r, cy + Math.sin(a2) * r, 0
                    );
                }

                // Cross pattern — connect to neighbors
                if (gx < gridSize) {
                    points.push(
                        cx + r, cy, 0,
                        cx + cellSize - r, cy, 0
                    );
                }
                if (gy < gridSize) {
                    points.push(
                        cx, cy + r, 0,
                        cx, cy + cellSize - r, 0
                    );
                }
            }
        }

        const arr = new Float32Array(points);
        const geom = new THREE.BufferGeometry();
        geom.setAttribute('position', new THREE.BufferAttribute(arr, 3));
        return geom;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.x = -Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
            groupRef.current.rotation.z = state.clock.elapsedTime * 0.008;
        }
    });

    return (
        <group ref={groupRef} position={position} rotation={[-Math.PI / 2, 0, 0]}>
            <lineSegments geometry={tessGeometry}>
                <lineBasicMaterial
                    color={darkMode ? '#a855f7' : '#7c3aed'}
                    transparent
                    opacity={darkMode ? 0.1 : 0.06}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </lineSegments>
        </group>
    );
}

/* ─────────────────────────────────────────────
   7. Crescent Moon & Star
   Elegant crescent with a small 5-pointed star
   ───────────────────────────────────────────── */
function CrescentMoon({ position = [-12, 5, -10], scale = 1.2, darkMode }) {
    const groupRef = useRef();

    const { crescentGeom, starGeom } = useMemo(() => {
        // Crescent — outer arc minus inner arc
        const crescentPts = [];
        const segments = 80;
        const outerR = 1.0;
        const innerR = 0.78;
        const innerOffset = 0.35; // shift inner circle to create crescent

        // Outer arc (full circle outline)
        for (let i = 0; i < segments; i++) {
            const a1 = (i / segments) * Math.PI * 2;
            const a2 = ((i + 1) / segments) * Math.PI * 2;

            const x1 = Math.cos(a1) * outerR;
            const y1 = Math.sin(a1) * outerR;
            const x2 = Math.cos(a2) * outerR;
            const y2 = Math.sin(a2) * outerR;

            // Only draw outer arc where it's outside the inner circle
            const distFromInner1 = Math.sqrt((x1 - innerOffset) ** 2 + y1 ** 2);
            const distFromInner2 = Math.sqrt((x2 - innerOffset) ** 2 + y2 ** 2);

            if (distFromInner1 > innerR || distFromInner2 > innerR) {
                crescentPts.push(x1, y1, 0, x2, y2, 0);
            }
        }

        // Inner arc (partial circle) — draw the visible edge of the inner cutout
        for (let i = 0; i < segments; i++) {
            const a1 = (i / segments) * Math.PI * 2;
            const a2 = ((i + 1) / segments) * Math.PI * 2;

            const x1 = innerOffset + Math.cos(a1) * innerR;
            const y1 = Math.sin(a1) * innerR;
            const x2 = innerOffset + Math.cos(a2) * innerR;
            const y2 = Math.sin(a2) * innerR;

            // Only draw inner arc where it's inside the outer circle
            const distFromCenter1 = Math.sqrt(x1 ** 2 + y1 ** 2);
            const distFromCenter2 = Math.sqrt(x2 ** 2 + y2 ** 2);

            if (distFromCenter1 < outerR && distFromCenter2 < outerR) {
                crescentPts.push(x1, y1, 0, x2, y2, 0);
            }
        }

        const crescentArr = new Float32Array(crescentPts);
        const crescentGeom = new THREE.BufferGeometry();
        crescentGeom.setAttribute('position', new THREE.BufferAttribute(crescentArr, 3));

        // Small 5-pointed star next to crescent
        const starPts = [];
        const starX = 0.85;
        const starY = 0.55;
        const outerStar = 0.18;
        const innerStar = 0.08;

        for (let i = 0; i < 5; i++) {
            const outerAngle = (i / 5) * Math.PI * 2 - Math.PI / 2;
            const innerAngle = ((i + 0.5) / 5) * Math.PI * 2 - Math.PI / 2;
            const nextOuter = ((i + 1) / 5) * Math.PI * 2 - Math.PI / 2;

            starPts.push(
                starX + Math.cos(outerAngle) * outerStar, starY + Math.sin(outerAngle) * outerStar, 0,
                starX + Math.cos(innerAngle) * innerStar, starY + Math.sin(innerAngle) * innerStar, 0
            );
            starPts.push(
                starX + Math.cos(innerAngle) * innerStar, starY + Math.sin(innerAngle) * innerStar, 0,
                starX + Math.cos(nextOuter) * outerStar, starY + Math.sin(nextOuter) * outerStar, 0
            );
        }

        const starArr = new Float32Array(starPts);
        const starGeom = new THREE.BufferGeometry();
        starGeom.setAttribute('position', new THREE.BufferAttribute(starArr, 3));

        return { crescentGeom, starGeom };
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
            const glow = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
            groupRef.current.scale.setScalar(scale * glow);
        }
    });

    const color = darkMode ? '#f5d07a' : '#d4a853';
    const opacity = darkMode ? 0.2 : 0.14;

    return (
        <group ref={groupRef} position={position}>
            <lineSegments geometry={crescentGeom}>
                <lineBasicMaterial
                    color={color}
                    transparent
                    opacity={opacity}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </lineSegments>
            <lineSegments geometry={starGeom}>
                <lineBasicMaterial
                    color={color}
                    transparent
                    opacity={opacity * 1.2}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </lineSegments>
        </group>
    );
}

/* ─────────────────────────────────────────────
   8. Mouse-Reactive Light — follows cursor subtly
   ───────────────────────────────────────────── */
function MouseLight({ darkMode }) {
    const lightRef = useRef();
    const mousePos = useRef({ x: 0, y: 0 });
    const { viewport } = useThree();

    const handleMouseMove = useCallback((e) => {
        mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * viewport.width * 0.5;
        mousePos.current.y = -(e.clientY / window.innerHeight - 0.5) * viewport.height * 0.5;
    }, [viewport]);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    useFrame(() => {
        if (lightRef.current) {
            lightRef.current.position.x += (mousePos.current.x - lightRef.current.position.x) * 0.02;
            lightRef.current.position.y += (mousePos.current.y - lightRef.current.position.y) * 0.02;
        }
    });

    return (
        <pointLight
            ref={lightRef}
            position={[0, 0, 8]}
            intensity={darkMode ? 0.4 : 0.2}
            color={darkMode ? '#f97316' : '#a855f7'}
            distance={25}
            decay={2}
        />
    );
}

/* ─────────────────────────────────────────────
   9. Shooting Stars — meteors streaking across
   ───────────────────────────────────────────── */
function ShootingStar({ darkMode }) {
    const trailRef = useRef();
    const headRef = useRef();
    const trailLength = 20;

    const state = useRef({
        // Random start position
        startX: (Math.random() - 0.5) * 40,
        startY: 5 + Math.random() * 10,
        startZ: -5 - Math.random() * 15,
        // Random direction (downward diagonal)
        dirX: (Math.random() - 0.3) * 1.5,
        dirY: -(0.6 + Math.random() * 0.8),
        dirZ: (Math.random() - 0.5) * 0.5,
        // Speed and timing
        speed: 8 + Math.random() * 12,
        progress: 0,
        delay: Math.random() * 8,
        duration: 1.2 + Math.random() * 1.0,
        waiting: true,
        cooldown: 3 + Math.random() * 6,
        cooldownTimer: 0,
    });

    const trailPositions = useRef(new Float32Array(trailLength * 3));
    const trailColors = useRef(new Float32Array(trailLength * 3));

    const resetStar = () => {
        const s = state.current;
        s.startX = (Math.random() - 0.5) * 40;
        s.startY = 5 + Math.random() * 10;
        s.startZ = -5 - Math.random() * 15;
        s.dirX = (Math.random() - 0.3) * 1.5;
        s.dirY = -(0.6 + Math.random() * 0.8);
        s.dirZ = (Math.random() - 0.5) * 0.5;
        s.speed = 8 + Math.random() * 12;
        s.progress = 0;
        s.duration = 1.2 + Math.random() * 1.0;
        s.waiting = true;
        s.cooldown = 3 + Math.random() * 6;
        s.cooldownTimer = 0;
    };

    useFrame((_, delta) => {
        const s = state.current;

        if (s.waiting) {
            s.cooldownTimer += delta;
            if (s.cooldownTimer >= s.cooldown) {
                s.waiting = false;
                s.cooldownTimer = 0;
            }
            // Hide while waiting
            if (headRef.current) headRef.current.visible = false;
            if (trailRef.current) trailRef.current.visible = false;
            return;
        }

        if (headRef.current) headRef.current.visible = true;
        if (trailRef.current) trailRef.current.visible = true;

        s.progress += delta / s.duration;

        if (s.progress >= 1) {
            resetStar();
            return;
        }

        const t = s.progress;
        // Current head position
        const headX = s.startX + s.dirX * s.speed * t;
        const headY = s.startY + s.dirY * s.speed * t;
        const headZ = s.startZ + s.dirZ * s.speed * t;

        // Update head glow position
        if (headRef.current) {
            headRef.current.position.set(headX, headY, headZ);
        }

        // Build trail behind the head
        const positions = trailPositions.current;
        const colors = trailColors.current;
        for (let i = 0; i < trailLength; i++) {
            const trailT = Math.max(0, t - (i / trailLength) * 0.15);
            positions[i * 3] = s.startX + s.dirX * s.speed * trailT;
            positions[i * 3 + 1] = s.startY + s.dirY * s.speed * trailT;
            positions[i * 3 + 2] = s.startZ + s.dirZ * s.speed * trailT;

            // Fade trail from bright to transparent
            const brightness = (1 - i / trailLength) * (1 - t * 0.5);
            colors[i * 3] = 1.0 * brightness;     // R
            colors[i * 3 + 1] = 0.85 * brightness; // G (warm white)
            colors[i * 3 + 2] = 0.6 * brightness;  // B
        }

        if (trailRef.current) {
            trailRef.current.geometry.attributes.position.needsUpdate = true;
            trailRef.current.geometry.attributes.color.needsUpdate = true;
        }
    });

    return (
        <group>
            {/* Trail */}
            <points ref={trailRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={trailLength} array={trailPositions.current} itemSize={3} />
                    <bufferAttribute attach="attributes-color" count={trailLength} array={trailColors.current} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.08}
                    vertexColors
                    transparent
                    opacity={darkMode ? 0.9 : 0.6}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>
            {/* Bright head */}
            <mesh ref={headRef}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshBasicMaterial
                    color="#fffbe6"
                    transparent
                    opacity={darkMode ? 0.9 : 0.6}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}

function ShootingStars({ darkMode, count = 5 }) {
    return (
        <group>
            {Array.from({ length: count }, (_, i) => (
                <ShootingStar key={i} darkMode={darkMode} />
            ))}
        </group>
    );
}

/* ─────────────────────────────────────────────
   Scene Composition
   ───────────────────────────────────────────── */
function Scene({ darkMode, isMobile }) {
    return (
        <>
            {/* Cinematic Lighting */}
            <ambientLight intensity={0.08} />
            <pointLight position={[20, 15, 10]} intensity={0.15} color="#f97316" distance={60} decay={2} />
            <pointLight position={[-20, -10, -5]} intensity={0.1} color="#a855f7" distance={60} decay={2} />
            <pointLight position={[0, -10, 15]} intensity={0.08} color="#06b6d4" distance={40} decay={2} />
            {/* Warm golden accent for Islamic elements */}
            <pointLight position={[-12, 5, -5]} intensity={0.08} color="#f5d07a" distance={30} decay={2} />

            {/* Mouse-reactive light */}
            {!isMobile && <MouseLight darkMode={darkMode} />}

            {/* Hero morphing sphere — the centerpiece */}
            {!isMobile && <MorphingSphere darkMode={darkMode} />}

            {/* Network constellation */}
            <NetworkConstellation darkMode={darkMode} count={isMobile ? 15 : 40} />

            {/* ── Islamic Geometric Art ── */}
            {/* 8-Pointed Star (Rub el Hizb) — top-left accent */}
            {!isMobile && <IslamicStarPattern position={[-9, 3, -6]} scale={1.8} darkMode={darkMode} />}

            {/* Second smaller star — bottom-right balance */}
            {!isMobile && <IslamicStarPattern position={[14, -4, -10]} scale={1.0} darkMode={darkMode} />}

            {/* Islamic Tessellation — floor grid pattern */}
            {!isMobile && <IslamicTessellation position={[0, -7, -12]} darkMode={darkMode} />}

            {/* Crescent Moon & Star — floating accent */}
            <CrescentMoon position={isMobile ? [-5, 4, -8] : [-12, 5, -8]} scale={isMobile ? 0.8 : 1.3} darkMode={darkMode} />

            {/* Flowing particle wave */}
            {!isMobile && <ParticleWave darkMode={darkMode} count={2500} />}

            {/* Shooting Stars */}
            <ShootingStars darkMode={darkMode} count={isMobile ? 3 : 6} />

            {/* Ambient dust fill */}
            <AmbientDust count={isMobile ? 200 : 500} darkMode={darkMode} />
        </>
    );
}

/* ─────────────────────────────────────────────
   Error Boundary
   ───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   Main Export
   ───────────────────────────────────────────── */
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
                    dpr={isMobile ? [0.5, 1] : [1, 1.5]}
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
