import {
  useMemo,
  useRef,
  type MutableRefObject,
} from 'react'

import {
  Canvas,
  useFrame,
} from '@react-three/fiber'

import * as THREE from 'three'

import './NexusCore.css'

interface NexusCoreProps {
  progressRef: MutableRefObject<number>
}

const stageColors = [
  '#00C8FF',
  '#4DE8FF',
  '#7C5CFF',
  '#8AE9FF',
]

const stageScales = [
  1,
  1.12,
  0.88,
  1.2,
]

const stageSpeeds = [
  0.07,
  0.12,
  0.2,
  0.32,
]

/* =========================================================
   PARTICLE FIELD
========================================================= */

function ParticleField({
  progressRef,
}: NexusCoreProps) {
  const pointsRef =
    useRef<THREE.Points>(null)

  const materialRef =
    useRef<THREE.PointsMaterial>(null)

  const positions = useMemo(() => {
    const count = 1800
    const radius = 2.25

    const data = new Float32Array(
      count * 3,
    )

    for (let i = 0; i < count; i++) {
      const index = i * 3

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

  const colors = useMemo(
    () =>
      stageColors.map(
        (color) =>
          new THREE.Color(color),
      ),
    [],
  )

  const currentColor = useMemo(
    () => new THREE.Color(),
    [],
  )

  useFrame(
    (state, delta) => {
      if (
        !pointsRef.current ||
        !materialRef.current
      ) {
        return
      }

      const progress =
        THREE.MathUtils.clamp(
          progressRef.current,
          0,
          0.999999,
        )

      /*
       * 0 → 3
       *
       * 0 = AI
       * 1 = ROBOTICS
       * 2 = NEURAL
       * 3 = QUANTUM
       */
      const stagePosition =
        progress * 3

      const stageIndex =
        Math.floor(stagePosition)

      const nextStage =
        Math.min(
          stageIndex + 1,
          3,
        )

      const localProgress =
        stagePosition -
        stageIndex

      /*
       * Smoothstep делает transition
       * значительно естественнее.
       */
      const smoothProgress =
        localProgress *
        localProgress *
        (3 -
          2 * localProgress)

      /*
       * Масштаб particle field.
       */
      const scale =
        THREE.MathUtils.lerp(
          stageScales[stageIndex],
          stageScales[nextStage],
          smoothProgress,
        )

      pointsRef.current.scale.setScalar(
        scale,
      )

      /*
       * Цвет частиц.
       */
      currentColor
        .copy(colors[stageIndex])
        .lerp(
          colors[nextStage],
          smoothProgress,
        )

      materialRef.current.color.lerp(
        currentColor,
        Math.min(
          delta * 5,
          1,
        ),
      )

      /*
       * Скорость вращения зависит
       * от текущей технологии.
       */
      const rotationSpeed =
        THREE.MathUtils.lerp(
          stageSpeeds[stageIndex],
          stageSpeeds[nextStage],
          smoothProgress,
        )

      pointsRef.current.rotation.y +=
        delta * rotationSpeed

      pointsRef.current.rotation.x +=
        delta *
        rotationSpeed *
        0.35

      /*
       * Небольшое дыхание.
       */
      const pulse =
        1 +
        Math.sin(
          state.clock.elapsedTime *
            1.3,
        ) *
          0.025

      pointsRef.current.scale.multiplyScalar(
        pulse,
      )
    },
  )

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        ref={materialRef}
        color={stageColors[0]}
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.68}
        depthWrite={false}
        blending={
          THREE.AdditiveBlending
        }
      />
    </points>
  )
}

/* =========================================================
   CORE
========================================================= */

function CoreSphere({
  progressRef,
}: NexusCoreProps) {
  const groupRef =
    useRef<THREE.Group>(null)

  const outerRef =
    useRef<THREE.Mesh>(null)

  const innerRef =
    useRef<THREE.Mesh>(null)

  const outerMaterialRef =
    useRef<THREE.MeshBasicMaterial>(null)

  const innerMaterialRef =
    useRef<THREE.MeshBasicMaterial>(null)

  useFrame(
    (state, delta) => {
      if (
        !groupRef.current ||
        !outerRef.current ||
        !innerRef.current ||
        !outerMaterialRef.current ||
        !innerMaterialRef.current
      ) {
        return
      }

      const progress =
        THREE.MathUtils.clamp(
          progressRef.current,
          0,
          0.999999,
        )

      const stagePosition =
        progress * 3

      const stageIndex =
        Math.floor(stagePosition)

      const nextStage =
        Math.min(
          stageIndex + 1,
          3,
        )

      const localProgress =
        stagePosition -
        stageIndex

      const smoothProgress =
        localProgress *
        localProgress *
        (3 -
          2 * localProgress)

      /*
       * Core scale.
       */
      const targetScale =
        THREE.MathUtils.lerp(
          stageScales[stageIndex],
          stageScales[nextStage],
          smoothProgress,
        )

      const pulse =
        1 +
        Math.sin(
          state.clock.elapsedTime *
            1.6,
        ) *
          0.025

const finalScale =
  targetScale * pulse

const smoothing =
  Math.min(
    delta * 5,
    1,
  )

groupRef.current.scale.x +=
  (finalScale -
    groupRef.current.scale.x) *
  smoothing

groupRef.current.scale.y =
  groupRef.current.scale.x

groupRef.current.scale.z =
  groupRef.current.scale.x

      /*
       * Постоянное вращение.
       */
      groupRef.current.rotation.y +=
        delta * 0.12

      /*
       * Реакция на мышь.
       */
      const targetRotationX =
        -state.pointer.y * 0.16

      const targetRotationY =
        state.pointer.x * 0.22

      groupRef.current.rotation.x +=
        (
          targetRotationX -
          groupRef.current.rotation.x
        ) *
        0.04

      groupRef.current.rotation.z +=
        (
          targetRotationY -
          groupRef.current.rotation.z
        ) *
        0.025

      /*
       * Интенсивность свечения.
       */
      const glow =
        THREE.MathUtils.lerp(
          0.12,
          0.28,
          smoothProgress,
        )

      outerMaterialRef.current.opacity =
        glow

      innerMaterialRef.current.opacity =
        THREE.MathUtils.lerp(
          0.78,
          1,
          smoothProgress,
        )

      outerRef.current.rotation.y +=
        delta * 0.2

      innerRef.current.rotation.x +=
        delta * 0.08
    },
  )

  return (
    <group ref={groupRef}>
      {/* Outer energy sphere */}

      <mesh ref={outerRef}>
        <sphereGeometry
          args={[0.68, 32, 32]}
        />

        <meshBasicMaterial
          ref={outerMaterialRef}
          color="#00C8FF"
          transparent
          opacity={0.15}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
        />
      </mesh>

      {/* Inner Core */}

      <mesh ref={innerRef}>
        <sphereGeometry
          args={[0.32, 32, 32]}
        />

        <meshBasicMaterial
          ref={innerMaterialRef}
          color="#4DE8FF"
          transparent
          opacity={0.9}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

/* =========================================================
   ORBIT
========================================================= */

interface OrbitalRingProps {
  rotation: [
    number,
    number,
    number,
  ]
  scale?: number
  speed: number
}

function OrbitalRing({
  rotation,
  scale = 1,
  speed,
}: OrbitalRingProps) {
  const ringRef =
    useRef<THREE.Mesh>(null)

  useFrame(
    (_, delta) => {
      if (!ringRef.current) {
        return
      }

      ringRef.current.rotation.z +=
        delta * speed
    },
  )

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
        color="#00C8FF"
        transparent
        opacity={0.42}
        blending={
          THREE.AdditiveBlending
        }
        depthWrite={false}
      />
    </mesh>
  )
}

/* =========================================================
   SCENE
========================================================= */

function CoreScene({
  progressRef,
}: NexusCoreProps) {
  const groupRef =
    useRef<THREE.Group>(null)

  useFrame(
    (state, delta) => {
      if (!groupRef.current) {
        return
      }

      /*
       * Медленная общая жизнь сцены.
       */
      groupRef.current.rotation.y +=
        delta * 0.015

      /*
       * Mouse tilt.
       */
      const targetX =
        -state.pointer.y * 0.08

      const targetY =
        state.pointer.x * 0.1

      groupRef.current.rotation.x +=
        (
          targetX -
          groupRef.current.rotation.x
        ) *
        0.035

      groupRef.current.rotation.y +=
        (
          targetY -
          groupRef.current.rotation.y
        ) *
        0.035
    },
  )

  return (
    <group ref={groupRef}>
      <ParticleField
        progressRef={progressRef}
      />

      <CoreSphere
        progressRef={progressRef}
      />

      <OrbitalRing
        rotation={[
          0.9,
          0.2,
          0.3,
        ]}
        speed={0.12}
      />

      <OrbitalRing
        rotation={[
          0.2,
          1.1,
          -0.3,
        ]}
        scale={1.15}
        speed={-0.08}
      />

      <OrbitalRing
        rotation={[
          1.5,
          -0.4,
          0.8,
        ]}
        scale={1.3}
        speed={0.18}
      />
    </group>
  )
}

/* =========================================================
   NEXUS CORE
========================================================= */

function NexusCore({
  progressRef,
}: NexusCoreProps) {
  return (
    <div className="nexus-core">
      <Canvas
        camera={{
          position: [
            0,
            0,
            6,
          ],
          fov: 42,
        }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <CoreScene
          progressRef={progressRef}
        />
      </Canvas>
    </div>
  )
}

export default NexusCore