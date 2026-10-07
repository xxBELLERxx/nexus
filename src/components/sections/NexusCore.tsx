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

type StageBlend = {
  index: number
  next: number
  progress: number
  weights: [number, number, number, number]
}

const STAGE_COLORS = [
  new THREE.Color('#00C8FF'),
  new THREE.Color('#A9D9E8'),
  new THREE.Color('#7C5CFF'),
  new THREE.Color('#B7F5FF'),
]

const STAGE_SCALES = [
  1,
  1.08,
  0.9,
  1.18,
]

function getStageBlend(
  progress: number,
): StageBlend {
  const position =
    THREE.MathUtils.clamp(
      progress * 3,
      0,
      3,
    )

  const transitionSize = 0.12

  const weights: [
    number,
    number,
    number,
    number,
  ] = [0, 0, 0, 0]

  /*
   * В самом начале всегда AI.
   */
  if (position <= 0) {
    weights[0] = 1

    return {
      index: 0,
      next: 0,
      progress: 1,
      weights,
    }
  }

  /*
   * В самом конце всегда QUANTUM.
   */
  if (position >= 3) {
    weights[3] = 1

    return {
      index: 3,
      next: 3,
      progress: 1,
      weights,
    }
  }

  /*
   * Проверяем близость к границам:
   *
   * 1 = AI → ROBOTICS
   * 2 = ROBOTICS → NEURAL
   */
  for (let boundary = 1; boundary <= 2; boundary++) {
    const distance =
      Math.abs(position - boundary)

    if (distance <= transitionSize) {
      const transitionProgress =
        (
          position -
          (boundary - transitionSize)
        ) /
        (transitionSize * 2)

      const smoothProgress =
        transitionProgress *
        transitionProgress *
        (3 -
          2 * transitionProgress)

      const previousStage =
        boundary - 1

      const nextStage =
        boundary

      weights[previousStage] =
        1 - smoothProgress

      weights[nextStage] =
        smoothProgress

      return {
        index: previousStage,
        next: nextStage,
        progress: smoothProgress,
        weights,
      }
    }
  }

  /*
   * Если мы не в transition zone,
   * существует только одно активное состояние.
   */
  const stageIndex = Math.floor(position)

  weights[stageIndex] = 1

  return {
    index: stageIndex,
    next: stageIndex,
    progress: 1,
    weights,
  }
}

/* =========================================================
   AI — INTELLIGENCE FIELD
========================================================= */

function IntelligenceField({
  progressRef,
}: NexusCoreProps) {
  const pointsRef =
    useRef<THREE.Points>(null)

  const materialRef =
    useRef<THREE.PointsMaterial>(null)

  const connectionsRef =
    useRef<THREE.LineSegments>(null)

  const connectionMaterialRef =
    useRef<THREE.LineBasicMaterial>(null)

  const nodes = useMemo(() => {
    const count = 34

    const positions = new Float32Array(
      count * 3,
    )

    for (let i = 0; i < count; i++) {
      const radius = 1.2

      const theta =
        (i / count) *
        Math.PI *
        2

      const phi =
        Math.acos(
          1 -
            (2 * (i + 0.5)) /
              count,
        )

      const index = i * 3

      positions[index] =
        radius *
        Math.sin(phi) *
        Math.cos(theta)

      positions[index + 1] =
        radius *
        Math.sin(phi) *
        Math.sin(theta)

      positions[index + 2] =
        radius *
        Math.cos(phi)
    }

    return positions
  }, [])

  const connectionPositions =
    useMemo(() => {
      const center =
        new THREE.Vector3(
          0,
          0,
          0,
        )

      const lines: number[] = []

      for (
        let i = 0;
        i < nodes.length;
        i += 3
      ) {
        lines.push(
          center.x,
          center.y,
          center.z,

          nodes[i],
          nodes[i + 1],
          nodes[i + 2],
        )
      }

      return new Float32Array(lines)
    }, [nodes])

  useFrame(
    (state, delta) => {
      if (
        !pointsRef.current ||
        !materialRef.current ||
        !connectionsRef.current ||
        !connectionMaterialRef.current
      ) {
        return
      }

      const blend =
        getStageBlend(
          progressRef.current,
        )

      const opacity =
        blend.weights[0]

      materialRef.current.opacity =
        opacity * 0.85

      connectionMaterialRef.current.opacity =
        opacity * 0.3

      pointsRef.current.rotation.y +=
        delta * 0.08

      connectionsRef.current.rotation.y +=
        delta * 0.08

      const pulse =
        1 +
        Math.sin(
          state.clock.elapsedTime *
            1.5,
        ) *
          0.04

      pointsRef.current.scale.setScalar(
        pulse,
      )
    },
  )

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodes, 3]}
          />
        </bufferGeometry>

        <pointsMaterial
          ref={materialRef}
          color="#00C8FF"
          size={0.055}
          transparent
          opacity={0}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </points>

      <lineSegments
        ref={connectionsRef}
      >
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              connectionPositions,
              3,
            ]}
          />
        </bufferGeometry>

        <lineBasicMaterial
          ref={connectionMaterialRef}
          color="#00C8FF"
          transparent
          opacity={0}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </lineSegments>
    </group>
  )
}

/* =========================================================
   ROBOTICS — MECHANICAL CORE
========================================================= */

function RoboticsStructure({
  progressRef,
}: NexusCoreProps) {
  const groupRef =
    useRef<THREE.Group>(null)

  const materialRefs = useRef<
    THREE.MeshBasicMaterial[]
  >([])

  useFrame(
    (_, delta) => {
      if (!groupRef.current) {
        return
      }

      const blend =
        getStageBlend(
          progressRef.current,
        )

      const opacity =
        blend.weights[1]

      materialRefs.current.forEach(
        (material) => {
          material.opacity =
            opacity * 0.65
        },
      )

      groupRef.current.rotation.y +=
        delta * 0.16

      groupRef.current.rotation.z -=
        delta * 0.05
    },
  )

  return (
    <group ref={groupRef}>
      {/* Central mechanical rings */}

      <mesh rotation={[0.8, 0.2, 0.1]}>
        <torusGeometry
          args={[
            1.35,
            0.025,
            10,
            96,
          ]}
        />

        <meshBasicMaterial
          ref={(material) => {
            if (material) {
              materialRefs.current[0] =
                material
            }
          }}
          color="#A9D9E8"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      <mesh rotation={[0.2, 1, -0.4]}>
        <torusGeometry
          args={[
            1.65,
            0.02,
            10,
            96,
          ]}
        />

        <meshBasicMaterial
          ref={(material) => {
            if (material) {
              materialRefs.current[1] =
                material
            }
          }}
          color="#A9D9E8"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      <mesh rotation={[1.5, -0.3, 0.8]}>
        <torusGeometry
          args={[
            1.9,
            0.015,
            10,
            96,
          ]}
        />

        <meshBasicMaterial
          ref={(material) => {
            if (material) {
              materialRefs.current[2] =
                material
            }
          }}
          color="#A9D9E8"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      {/* Mechanical modules */}

      {Array.from({
        length: 6,
      }).map((_, index) => {
        const angle =
          (index / 8) *
          Math.PI *
          2

        const radius = 1.65

        return (
          <mesh
            key={index}
            position={[
              Math.cos(angle) *
                radius,

              Math.sin(angle) *
                radius,

              0,
            ]}
            rotation={[
              0,
              0,
              angle,
            ]}
          >
            <boxGeometry
              args={[
                0.2,
                0.5,
                0.2,
              ]}
            />

            <meshBasicMaterial
              ref={(material) => {
                if (
                  material
                ) {
                  materialRefs.current[
                    index + 3
                  ] = material
                }
              }}
              color="#A9D9E8"
              transparent
              opacity={0}
              depthWrite={false}
            />
          </mesh>
        )
      })}
    </group>
  )
}

/* =========================================================
   NEURAL — NETWORK
========================================================= */

function NeuralNetwork({
  progressRef,
}: NexusCoreProps) {
  const groupRef =
    useRef<THREE.Group>(null)

  const nodesRef =
    useRef<THREE.Points>(null)

  const linesRef =
    useRef<THREE.LineSegments>(
      null,
    )

  const nodeMaterialRef =
    useRef<THREE.PointsMaterial>(null)

  const lineMaterialRef =
    useRef<THREE.LineBasicMaterial>(null)

  const { nodePositions, linePositions } =
    useMemo(() => {
      const count = 55

      const nodes =
        new Float32Array(
          count * 3,
        )

      for (
        let i = 0;
        i < count;
        i++
      ) {
        const side =
          i % 2 === 0
            ? -1
            : 1

        const index = i * 3

        nodes[index] =
          side *
          (0.35 +
            Math.random() *
              1.55)

        nodes[index + 1] =
          (Math.random() - 0.5) *
          2.5

        nodes[index + 2] =
          (Math.random() - 0.5) *
          2
      }

      const lines: number[] = []

      for (
        let i = 0;
        i < count - 2;
        i+= 2
      ) {
        const a = i * 3

        const b =
          (i + 1) * 3

        lines.push(
          nodes[a],
          nodes[a + 1],
          nodes[a + 2],

          nodes[b],
          nodes[b + 1],
          nodes[b + 2],
        )
      }

      return {
        nodePositions: nodes,
        linePositions:
          new Float32Array(
            lines,
          ),
      }
    }, [])

  useFrame(
    (state, delta) => {
      if (
        !groupRef.current ||
        !nodesRef.current ||
        !linesRef.current ||
        !nodeMaterialRef.current ||
        !lineMaterialRef.current
      ) {
        return
      }

      const blend =
        getStageBlend(
          progressRef.current,
        )

      const opacity =
        blend.weights[2]

      nodeMaterialRef.current.opacity =
        opacity * 0.9

      lineMaterialRef.current.opacity =
        opacity * 0.5

      groupRef.current.rotation.y +=
        delta * 0.04

      groupRef.current.rotation.x =
        Math.sin(
          state.clock.elapsedTime *
            0.4,
        ) * 0.08

      const pulse =
        1 +
        Math.sin(
          state.clock.elapsedTime *
            2,
        ) *
          0.04

      nodesRef.current.scale.setScalar(
        pulse,
      )
    },
  )

  return (
    <group ref={groupRef}>
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              nodePositions,
              3,
            ]}
          />
        </bufferGeometry>

        <pointsMaterial
          ref={nodeMaterialRef}
          color="#7C5CFF"
          size={0.04}
          transparent
          opacity={0}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              linePositions,
              3,
            ]}
          />
        </bufferGeometry>

        <lineBasicMaterial
          ref={lineMaterialRef}
          color="#7C5CFF"
          transparent
          opacity={0}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </lineSegments>
    </group>
  )
}

/* =========================================================
   QUANTUM — UNSTABLE FIELD
========================================================= */

function QuantumField({
  progressRef,
}: NexusCoreProps) {
  const pointsRef =
    useRef<THREE.Points>(null)

  const materialRef =
    useRef<THREE.PointsMaterial>(null)

  const positions = useMemo(() => {
    const count = 1100

    const data =
      new Float32Array(
        count * 3,
      )

    for (
      let i = 0;
      i < count;
      i++
    ) {
      const index = i * 3

      const theta =
        Math.random() *
        Math.PI *
        2

      const phi =
        Math.acos(
          2 * Math.random() - 1,
        )

      const radius =
        0.8 +
        Math.random() *
          2.3

      data[index] =
        Math.sin(phi) *
        Math.cos(theta) *
        radius

      data[index + 1] =
        Math.sin(phi) *
        Math.sin(theta) *
        radius

      data[index + 2] =
        Math.cos(phi) *
        radius
    }

    return data
  }, [])

  useFrame(
    (state, delta) => {
      if (
        !pointsRef.current ||
        !materialRef.current
      ) {
        return
      }

      const blend =
        getStageBlend(
          progressRef.current,
        )

      const opacity =
        blend.weights[3]

      materialRef.current.opacity =
        opacity * 0.72

      pointsRef.current.rotation.y +=
        delta * 0.18

      pointsRef.current.rotation.x -=
        delta * 0.08

      const pulse =
        1 +
        Math.sin(
          state.clock.elapsedTime *
            2.4,
        ) *
          0.12

      pointsRef.current.scale.setScalar(
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
        color="#B7F5FF"
        size={0.022}
        transparent
        opacity={0}
        depthWrite={false}
        blending={
          THREE.AdditiveBlending
        }
      />
    </points>
  )
}

/* =========================================================
   CENTRAL CORE
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
    useRef<THREE.MeshBasicMaterial>(
      null,
    )

  const innerMaterialRef =
    useRef<THREE.MeshBasicMaterial>(
      null,
    )

  const currentColor =
    useMemo(
      () =>
        new THREE.Color(
          '#00C8FF',
        ),
      [],
    )

  const targetScale =
    useMemo(
      () =>
        new THREE.Vector3(
          1,
          1,
          1,
        ),
      [],
    )

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

      const blend =
        getStageBlend(
          progressRef.current,
        )

      currentColor
        .copy(
          STAGE_COLORS[
            blend.index
          ],
        )
        .lerp(
          STAGE_COLORS[
            blend.next
          ],
          blend.progress,
        )

      outerMaterialRef.current.color.lerp(
        currentColor,
        Math.min(
          delta * 6,
          1,
        ),
      )

      innerMaterialRef.current.color.lerp(
        currentColor,
        Math.min(
          delta * 8,
          1,
        ),
      )

      const stageScale =
        THREE.MathUtils.lerp(
          STAGE_SCALES[
            blend.index
          ],
          STAGE_SCALES[
            blend.next
          ],
          blend.progress,
        )

      const pulse =
        1 +
        Math.sin(
          state.clock.elapsedTime *
            1.6,
        ) *
          0.025

      const finalScale =
        stageScale * pulse

      targetScale.set(
        finalScale,
        finalScale,
        finalScale,
      )

      groupRef.current.scale.lerp(
        targetScale,
        Math.min(
          delta * 5,
          1,
        ),
      )

      /*
       * General rotation.
       */
      groupRef.current.rotation.y +=
        delta * 0.12

      /*
       * Mouse interaction.
       */
      const targetRotationX =
        -state.pointer.y * 0.16

      const targetRotationY =
        state.pointer.x * 0.2

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
       * Different technologies
       * have different energy levels.
       */
      const glow =
        0.1 +
        (
          blend.weights[0] *
            0.08 +
          blend.weights[1] *
            0.12 +
          blend.weights[2] *
            0.18 +
          blend.weights[3] *
            0.25
        )

      outerMaterialRef.current.opacity =
        glow

      innerMaterialRef.current.opacity =
        0.78 +
        (
          blend.weights[3] *
          0.2
        )

      outerRef.current.rotation.y +=
        delta * 0.2

      innerRef.current.rotation.x +=
        delta * 0.08
    },
  )

  return (
    <group ref={groupRef}>
      <mesh ref={outerRef}>
        <sphereGeometry
          args={[0.68, 32, 32]}
        />

        <meshBasicMaterial
          ref={outerMaterialRef}
          color="#00C8FF"
          transparent
          opacity={0.15}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      <mesh ref={innerRef}>
        <sphereGeometry
          args={[0.32, 32, 32]}
        />

        <meshBasicMaterial
          ref={innerMaterialRef}
          color="#4DE8FF"
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>
    </group>
  )
}

/* =========================================================
   COMPLETE CORE SCENE
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

      groupRef.current.rotation.y +=
        delta * 0.012

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
      <IntelligenceField
        progressRef={progressRef}
      />

      <RoboticsStructure
        progressRef={progressRef}
      />

      <NeuralNetwork
        progressRef={progressRef}
      />

      <QuantumField
        progressRef={progressRef}
      />

      <CoreSphere
        progressRef={progressRef}
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
          position: [0, 0, 6],
          fov: 42,
        }}
        dpr={[1, 1.5]}
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