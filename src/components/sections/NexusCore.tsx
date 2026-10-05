import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import './NexusCore.css'

function ParticleField() {
  const pointsRef =
    useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const count = 1800
    const radius = 2.25

    const data = new Float32Array(
      count * 3,
    )

    for (let i = 0; i < count; i++) {
      const index = i * 3

      /*
       * Случайная точка внутри сферы.
       */
      const theta =
        Math.random() * Math.PI * 2

      const phi =
        Math.acos(
          2 * Math.random() - 1,
        )

      const distance =
        Math.cbrt(Math.random()) *
        radius

      data[index] =
        distance *
        Math.sin(phi) *
        Math.cos(theta)

      data[index + 1] =
        distance *
        Math.sin(phi) *
        Math.sin(theta)

      data[index + 2] =
        distance *
        Math.cos(phi)
    }

    return data
  }, [])

  useFrame((state, delta) => {
    if (!pointsRef.current) {
      return
    }

    /*
     * Постоянное вращение particle-сферы.
     */
    pointsRef.current.rotation.y +=
      delta * 0.08

    pointsRef.current.rotation.x +=
      delta * 0.025

    /*
     * Реакция на положение мыши.
     */
    pointsRef.current.rotation.y +=
      (state.pointer.x * 0.12) * delta

    pointsRef.current.rotation.x +=
      (-state.pointer.y * 0.08) * delta
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#00c8ff"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function CoreSphere() {
  const sphereRef =
    useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!sphereRef.current) {
      return
    }

    sphereRef.current.rotation.y +=
      delta * 0.15

    sphereRef.current.rotation.x +=
      delta * 0.05

    /*
     * Очень лёгкое дыхание ядра.
     */
    const scale =
      1 +
      Math.sin(
        state.clock.elapsedTime * 1.5,
      ) *
        0.025

    sphereRef.current.scale.setScalar(
      scale,
    )
  })

  return (
    <group>
      <mesh ref={sphereRef}>
        <sphereGeometry
          args={[0.68, 32, 32]}
        />

        <meshBasicMaterial
          color="#00c8ff"
          transparent
          opacity={0.13}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Центральное ядро */}

      <mesh>
        <sphereGeometry
          args={[0.32, 32, 32]}
        />

        <meshBasicMaterial
          color="#4de8ff"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

function OrbitalRing({
  rotation,
  scale = 1,
}: {
  rotation: [number, number, number]
  scale?: number
}) {
  const ringRef =
    useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ringRef.current) {
      return
    }

    ringRef.current.rotation.z =
      state.clock.elapsedTime * 0.12
  })

  return (
    <mesh
      ref={ringRef}
      rotation={rotation}
      scale={scale}
    >
      <torusGeometry
        args={[
          1.45,
          0.008,
          8,
          160,
        ]}
      />

      <meshBasicMaterial
        color="#00c8ff"
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

function CoreScene() {
  const groupRef =
    useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) {
      return
    }

    /*
     * Весь Core немного наклоняется
     * вслед за мышью.
     */
    const targetX =
      -state.pointer.y * 0.12

    const targetY =
      state.pointer.x * 0.18

    groupRef.current.rotation.x +=
      (targetX -
        groupRef.current.rotation.x) *
      0.04

    groupRef.current.rotation.y +=
      (targetY -
        groupRef.current.rotation.y) *
      0.04
  })

  return (
    <group ref={groupRef}>
      <ParticleField />

      <CoreSphere />

      <OrbitalRing
        rotation={[0.9, 0.2, 0.3]}
      />

      <OrbitalRing
        rotation={[0.2, 1.1, -0.3]}
        scale={1.15}
      />

      <OrbitalRing
        rotation={[1.5, -0.4, 0.8]}
        scale={1.3}
      />
    </group>
  )
}

function NexusCore() {
  return (
    <div className="nexus-core">
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 42,
        }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <CoreScene />
      </Canvas>
    </div>
  )
}

export default NexusCore