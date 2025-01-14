const PAGES_DASHBOARDS = {
  build: [
    {
      id: 1,
      label: 'Edge Applications',
      path: 'edge-applications',
      groupId: 1,
      dashboards: [
        {
          id: 357548608166298191n,
          label: 'Data Transferred',
          path: 'data-transferred',
          dataset: 'httpMetrics'
        },
        {
          id: 357548623571976783n,
          label: 'Requests',
          path: 'requests',
          dataset: 'httpMetrics'
        },
        {
          id: 357548642810200653n,
          label: 'Status Codes',
          path: 'status-codes',
          dataset: 'httpMetrics'
        },
        {
          id: 357549179454620239n,
          label: 'Bandwidth Saving',
          path: 'bandwidth-saving',
          dataset: 'httpMetrics'
        }
      ]
    },
    {
      id: 2,
      label: 'L2 Caching',
      path: 'l2-caching',
      groupId: 1,
      dashboards: [
        {
          id: 357549371218199219n,
          label: 'Caching Offload',
          path: 'caching-offload',
          dataset: 'l2CacheMetrics'
        }
      ]
    },
    {
      id: 3,
      label: 'Edge Functions',
      path: 'edge-functions',
      groupId: 1,
      dashboards: [
        {
          id: 357549319029523021n,
          label: 'Invocations',
          path: 'invocations',
          dataset: 'edgeFunctionsMetrics'
        }
      ]
    },
    {
      id: 4,
      label: 'Image Processor',
      path: 'image-processor',
      groupId: 1,
      dashboards: [
        {
          id: 357549422933967445n,
          label: 'Requests',
          path: 'requests',
          dataset: 'imagesProcessedMetrics'
        }
      ]
    }
  ],
  secure: [
    {
      id: 6,
      label: 'WAF',
      path: 'waf',
      groupId: 2,
      dashboards: [
        {
          id: 357548675837198933n,
          label: 'Threats',
          path: 'threats',
          dataset: 'httpMetrics'
        }
      ]
    },
    {
      id: 7,
      label: 'Intelligent DNS',
      path: 'intelligent-dns',
      groupId: 2,
      dashboards: [
        {
          id: 357549371218199119n,
          label: 'Standard Queries',
          path: 'standard-queries',
          dataset: 'idnsQueriesMetrics'
        }
      ]
    }
  ],
  observe: [
    {
      id: 8,
      label: 'Data Streaming',
      path: 'data-streaming',
      groupId: 3,
      dashboards: [
        {
          id: 352149476039721549n,
          label: 'Data Streamed',
          path: 'requests',
          dataset: 'dataStreamedMetrics'
        }
      ]
    }
  ]
}

const GROUP_DASHBOARDS = [
  {
    label: 'Build',
    value: 'build',
    id: 1,
    pagesDashboards: PAGES_DASHBOARDS.build
  },
  {
    label: 'Secure',
    value: 'secure',
    id: 2,
    pagesDashboards: PAGES_DASHBOARDS.secure
  },
  {
    label: 'Observe',
    value: 'observe',
    id: 3,
    pagesDashboards: PAGES_DASHBOARDS.observe
  }
]

export default GROUP_DASHBOARDS
