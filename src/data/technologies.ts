export interface Technology {
  number: string
  name: string
  shortName: string
  description: string
  metric: string
  metricLabel: string
  label: string
}

export const technologies: Technology[] = [
  {
    number: '01',
    name: 'ARTIFICIAL INTELLIGENCE',
    shortName: 'AI',
    description:
      'Adaptive intelligence systems designed to understand, learn and act.',
    metric: '42.8',
    metricLabel: 'PFLOPS',
    label: 'COMPUTATIONAL POWER',
  },

  {
    number: '02',
    name: 'ADVANCED ROBOTICS',
    shortName: 'ROBOTICS',
    description:
      'Autonomous machines engineered to operate alongside humanity.',
    metric: '18.4',
    metricLabel: 'HOURS',
    label: 'AUTONOMY',
  },

  {
    number: '03',
    name: 'NEURAL INTERFACES',
    shortName: 'NEURAL',
    description:
      'Systems connecting biological thought with digital intelligence.',
    metric: '2.7',
    metricLabel: 'MS',
    label: 'SIGNAL LATENCY',
  },

  {
    number: '04',
    name: 'QUANTUM COMPUTING',
    shortName: 'QUANTUM',
    description:
      'Computational architectures built for problems beyond classical limits.',
    metric: '128',
    metricLabel: 'QUBITS',
    label: 'PROCESSING CORE',
  },
]