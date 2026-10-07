const IMAGE_BASE = `${import.meta.env.BASE_URL}images/products`
export interface Product {
  number: string
  name: string
  category: string
  description: string
  code: string
  metric: string
  metricLabel: string
  image: string
}

export const products: Product[] = [
  {
    number: '01',
    name: 'NEXUS ONE',
    category: 'ARTIFICIAL INTELLIGENCE',
    description:
      'A personal intelligence platform designed to augment everyday human decision-making.',
    code: 'NX-ONE-01',
    metric: '99.8%',
    metricLabel: 'SYSTEM ACCURACY',
    image: `${IMAGE_BASE}/images/products/nexus-one.png`,
  },

  {
    number: '02',
    name: 'NEXUS LINK',
    category: 'NEURAL INTERFACE',
    description:
      'A direct interface between biological signals and intelligent digital systems.',
    code: 'NX-LINK-02',
    metric: '2.7',
    metricLabel: 'MS LATENCY',
    image: `${IMAGE_BASE}/images/products/nexus-link.png`,
  },

  {
    number: '03',
    name: 'NEXUS R',
    category: 'ADVANCED ROBOTICS',
    description:
      'An autonomous humanoid platform built for complex environments and human collaboration.',
    code: 'NX-R-03',
    metric: '18.4',
    metricLabel: 'HOURS AUTONOMY',
    image: `${IMAGE_BASE}/images/products/nexus-r.png`,
  },

  {
    number: '04',
    name: 'NEXUS CORE',
    category: 'QUANTUM COMPUTING',
    description:
      'A next-generation computational platform designed for problems beyond classical systems.',
    code: 'NX-CORE-04',
    metric: '128',
    metricLabel: 'QUBITS',
    image: `${IMAGE_BASE}/images/products/nexus-core.png`,
  },
]