import DASHBOARDS_TEXTS from './dashboards-texts'

const REPORTS = [
  /**
   * BUILD
   * Edge Applications - Data Transferred
   */
  {
    id: 356217848089018959n,
    label: 'Edge Caching',
    description: DASHBOARDS_TEXTS.edge_applications.data_transferred.edge_caching.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataUnit: 'bytes',
    dataset: 'httpMetrics',
    limit: 5000,
    fields: ['dataTransferredTotal', 'dataTransferredOut', 'dataTransferredIn'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548608166298191n
  },
  {
    id: 356220228059791957n,
    label: 'Edge Offload',
    description: DASHBOARDS_TEXTS.edge_applications.data_transferred.edge_offload.description,
    aggregationType: 'avg',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataUnit: 'percentage',
    dataset: 'httpMetrics',
    limit: 5000,
    fields: ['offload'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548608166298191n,
    colorSet: 'REGULAR_COLOR_SET',
    maxYAxis: 100
  },
  {
    id: 356220625185931855n,
    label: 'Saved Data',
    description: DASHBOARDS_TEXTS.edge_applications.data_transferred.saved_data.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'httpMetrics',
    dataUnit: 'bytes',
    limit: 5000,
    fields: ['savedData'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548608166298191n,
    colorSet: 'REGULAR_COLOR_SET'
  },
  {
    id: 356220671983878733n,
    label: 'Missed Data',
    description: DASHBOARDS_TEXTS.edge_applications.data_transferred.missed_data.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataUnit: 'bytes',
    dataset: 'httpMetrics',
    limit: 5000,
    fields: ['missedData'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548608166298191n,
    colorSet: 'INVERTED_COLOR_SET'
  },
  {
    id: 357550842741523030n,
    label: 'Total Bandwidth Usage',
    description:
      DASHBOARDS_TEXTS.edge_applications.data_transferred.total_bandwidth_usage.description,
    aggregationType: 'avg',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataUnit: 'bitsPerSecond',
    dataset: 'httpMetrics',
    limit: 5000,
    fields: ['bandwidthTotal'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548608166298191n,
    colorSet: 'REGULAR_COLOR_SET'
  },
  {
    id: 357550842741523029n,
    label: 'Bandwidth Offloaded',
    description:
      DASHBOARDS_TEXTS.edge_applications.data_transferred.bandwidth_offloaded.description,
    aggregationType: 'avg',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataUnit: 'percentage',
    dataset: 'httpMetrics',
    limit: 5000,
    fields: ['bandwidthOffload'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548608166298191n,
    colorSet: 'REGULAR_COLOR_SET',
    maxYAxis: 100
  },
  {
    id: 357817189325079119n,
    label: 'Saved Bandwidth',
    description: DASHBOARDS_TEXTS.edge_applications.data_transferred.saved_bandwidth.description,
    aggregationType: 'avg',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataUnit: 'bitsPerSecond',
    dataset: 'httpMetrics',
    limit: 5000,
    fields: ['bandwidthSavedData'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548608166298191n,
    colorSet: 'REGULAR_COLOR_SET'
  },
  {
    id: 357817270971400783n,
    label: 'Missed Bandwidth',
    description: DASHBOARDS_TEXTS.edge_applications.data_transferred.missed_bandwidth.description,
    aggregationType: 'avg',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataUnit: 'bitsPerSecond',
    dataset: 'httpMetrics',
    limit: 5000,
    fields: ['bandwidthMissedData'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548608166298191n,
    colorSet: 'INVERTED_COLOR_SET'
  },
  /**
   * BUILD
   * Edge Applications - Requests
   */
  {
    id: 357822254142194261n,
    label: 'Total Requests',
    description: DASHBOARDS_TEXTS.edge_applications.requests.total_requests.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'httpMetrics',
    dataUnit: 'count',
    limit: 5000,
    fields: ['edgeRequestsTotal', 'httpsRequestsTotal', 'httpRequestsTotal'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548623571976783n
  },
  {
    id: 357822606596899407n,
    label: 'Requests Offloaded',
    description: DASHBOARDS_TEXTS.edge_applications.requests.requests_offloaded.description,
    aggregationType: 'avg',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'httpMetrics',
    dataUnit: 'percentage',
    limit: 5000,
    fields: ['requestsOffloaded'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548623571976783n,
    colorSet: 'REGULAR_COLOR_SET',
    maxYAxis: 100
  },
  {
    id: 357823841952596559n,
    label: 'Saved Requests',
    description: DASHBOARDS_TEXTS.edge_applications.requests.saved_requests.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'httpMetrics',
    dataUnit: 'count',
    limit: 5000,
    fields: ['savedRequests'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548623571976783n,
    colorSet: 'REGULAR_COLOR_SET'
  },
  {
    id: 357823947031446101n,
    label: 'Missed Requests',
    description: DASHBOARDS_TEXTS.edge_applications.requests.missed_requests.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'httpMetrics',
    dataUnit: 'count',
    limit: 5000,
    fields: ['missedRequests'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548623571976783n,
    colorSet: 'INVERTED_COLOR_SET'
  },
  {
    id: 357824034956640847n,
    label: 'Total Requests per Second',
    description: DASHBOARDS_TEXTS.edge_applications.requests.total_requests_per_second.description,
    aggregationType: 'avg',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataUnit: 'perSecond',
    dataset: 'httpMetrics',
    limit: 5000,
    fields: ['edgeRequestsTotalPerSecond'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548623571976783n,
    colorSet: 'REGULAR_COLOR_SET'
  },
  {
    id: 357824230790791757n,
    label: 'Requests per Second Offloaded',
    description:
      DASHBOARDS_TEXTS.edge_applications.requests.requests_per_second_offloaded.description,
    aggregationType: 'avg',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataUnit: 'percentage',
    dataset: 'httpMetrics',
    limit: 5000,
    fields: ['requestsPerSecondOffloaded'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548623571976783n,
    colorSet: 'REGULAR_COLOR_SET',
    maxYAxis: 100
  },
  {
    id: 357824321753711189n,
    label: 'Saved Requests per Second',
    description: DASHBOARDS_TEXTS.edge_applications.requests.saved_requests_per_second.description,
    aggregationType: 'avg',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataUnit: 'perSecond',
    dataset: 'httpMetrics',
    limit: 5000,
    fields: ['savedRequestsPerSecond'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548623571976783n,
    colorSet: 'REGULAR_COLOR_SET'
  },
  {
    id: 357824572487107151n,
    label: 'Missed Requests per Second',
    description: DASHBOARDS_TEXTS.edge_applications.requests.missed_requests_per_second.description,
    aggregationType: 'avg',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataUnit: 'perSecond',
    dataset: 'httpMetrics',
    limit: 5000,
    fields: ['missedRequestsPerSecond'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548623571976783n,
    colorSet: 'INVERTED_COLOR_SET'
  },
  {
    id: 357825388709151309n,
    label: 'Requests by Method',
    description: DASHBOARDS_TEXTS.edge_applications.http_methods.requests_by_method.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'httpMetrics',
    dataUnit: 'count',
    limit: 5000,
    fields: [
      'requestsHttpMethodGet',
      'requestsHttpMethodPost',
      'requestsHttpMethodHead',
      'requestsHttpMethodOthers'
    ],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548623571976783n
  },
  /**
   * BUILD
   * Edge Applications - Status Codes
   */
  {
    id: 357824919768138325n,
    label: 'HTTP Status Codes 2XX',
    description: DASHBOARDS_TEXTS.edge_applications.status_codes.http_status_codes_2xx.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'httpMetrics',
    dataUnit: 'count',
    limit: 5000,
    fields: [
      'requestsStatusCode200',
      'requestsStatusCode204',
      'requestsStatusCode206',
      'requestsStatusCode2xx'
    ],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548642810200653n
  },
  {
    id: 357825000731837013n,
    label: 'HTTP Status Codes 3XX',
    description: DASHBOARDS_TEXTS.edge_applications.status_codes.http_status_codes_3xx.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'httpMetrics',
    dataUnit: 'count',
    limit: 5000,
    fields: [
      'requestsStatusCode301',
      'requestsStatusCode302',
      'requestsStatusCode304',
      'requestsStatusCode3xx'
    ],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548642810200653n
  },
  {
    id: 357825058049098319n,
    label: 'HTTP Status Codes 4XX',
    description: DASHBOARDS_TEXTS.edge_applications.status_codes.http_status_codes_4xx.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'httpMetrics',
    dataUnit: 'count',
    limit: 5000,
    fields: [
      'requestsStatusCode400',
      'requestsStatusCode403',
      'requestsStatusCode404',
      'requestsStatusCode4xx'
    ],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548642810200653n
  },
  {
    id: 357825090550760015n,
    label: 'HTTP Status Codes 5XX',
    description: DASHBOARDS_TEXTS.edge_applications.status_codes.http_status_codes_5xx.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'httpMetrics',
    dataUnit: 'count',
    limit: 5000,
    fields: [
      'requestsStatusCode500',
      'requestsStatusCode502',
      'requestsStatusCode503',
      'requestsStatusCode5xx'
    ],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548642810200653n
  },
  /**
   * BUILD
   * Edge Applications - Bandwidth Saving
   */
  {
    id: 357843490139275861n,
    label: 'Bandwidth Saving',
    description: DASHBOARDS_TEXTS.edge_applications.bandwidth_saving.bandwidth_saving.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'httpMetrics',
    dataUnit: 'bytes',
    limit: 5000,
    fields: ['bandwidthImagesProcessedSavedData'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357549179454620239n,
    colorSet: 'REGULAR_COLOR_SET'
  },
  /**
   * BUILD
   * L2 Caching - Caching Offload
   */
  {
    id: 357826217661956693n,
    label: 'L2 Caching',
    description: DASHBOARDS_TEXTS.l2_caching.caching_offload.l2_caching.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataUnit: 'bytes',
    dataset: 'l2CacheMetrics',
    groupBy: [],
    limit: 5000,
    fields: ['dataTransferredTotal', 'dataTransferredOut', 'dataTransferredIn'],
    orderDirection: 'ASC',
    dashboardId: 357549371218199219n
  },
  {
    id: 357826288204907093n,
    label: 'L2 Offload',
    description: DASHBOARDS_TEXTS.l2_caching.caching_offload.l2_offload.description,
    aggregationType: 'avg',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataUnit: 'percentage',
    groupBy: [],
    dataset: 'l2CacheMetrics',
    limit: 5000,
    fields: ['offload'],
    orderDirection: 'ASC',
    dashboardId: 357549371218199219n,
    colorSet: 'REGULAR_COLOR_SET',
    maxYAxis: 100
  },
  /**
   * BUILD
   * Edge Functions - Invocations
   */
  {
    id: 357843490139298763n,
    label: 'Total Invocations',
    description: DASHBOARDS_TEXTS.edge_functions.invocations.total_invocations.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'edgeFunctionsMetrics',
    dataUnit: 'count',
    limit: 5000,
    fields: ['edgeApplicationInvocations', 'edgeFirewallInvocations'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357549319029523021n
  },
  /**
   * BUILD
   * Image Processor - Requests
   */
  {
    id: 357844490139298789n,
    label: 'Total Requests',
    description: DASHBOARDS_TEXTS.image_processor.requests.total_requests.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'imagesProcessedMetrics',
    dataUnit: 'count',
    limit: 5000,
    aggregations: [
      {
        aggregation: 'sum',
        variable: 'requests'
      }
    ],
    filters: {
      or: {
        status: 304,
        statusRange: {
          begin: 199,
          end: 299
        }
      }
    },
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357549422933967445n,
    colorSet: 'REGULAR_COLOR_SET'
  },
  {
    id: 357843490195298789n,
    label: 'Total Requests per Second',
    description: DASHBOARDS_TEXTS.image_processor.requests.total_requests_per_second.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'imagesProcessedMetrics',
    dataUnit: 'perSecond',
    limit: 5000,
    filters: {
      or: {
        status: 304,
        statusRange: {
          begin: 200,
          end: 299
        }
      }
    },
    aggregations: [
      {
        aggregation: 'rate',
        variable: 'requests'
      }
    ],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357549422933967445n,
    colorSet: 'REGULAR_COLOR_SET'
  },
  /**
   * SECURE
   * Overview - Request
   */
  {
    id: 357842594513814093n,
    label: 'Total Attacks',
    description: '',
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'httpMetrics',
    limit: 5000,
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548675837199999n,
    colorSet: 'INVERTED_COLOR_SET'
  },
  /**
   * SECURE
   * WAF - threats
   */
  {
    id: 357842594513814093n,
    label: 'Threats vs Requests',
    description: DASHBOARDS_TEXTS.edge_applications.waf.threats_vs_requests.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'httpMetrics',
    dataUnit: 'count',
    limit: 5000,
    fields: ['wafRequestsAllowed', 'wafRequestsBlocked', 'wafRequestsThreat'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548675837198933n
  },
  {
    id: 357842775438262861n,
    label: 'Cross-Site scripting (XSS) Threats',
    description:
      DASHBOARDS_TEXTS.edge_applications.waf.cross_site_scripting_xss_threats.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'httpMetrics',
    dataUnit: 'count',
    limit: 5000,
    fields: ['wafRequestsXssAttacks'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548675837198933n,
    colorSet: 'INVERTED_COLOR_SET'
  },
  {
    id: 357842594513814012n,
    label: 'Remote File Inclusion (RFI) Threats',
    description:
      DASHBOARDS_TEXTS.edge_applications.waf.remote_file_inclusion_rfi_threats.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'httpMetrics',
    dataUnit: 'count',
    limit: 5000,
    fields: ['wafRequestsRfiAttacks'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548675837198933n,
    colorSet: 'INVERTED_COLOR_SET'
  },
  {
    id: 357842833307075157n,
    label: 'SQL Injection Threats',
    description: DASHBOARDS_TEXTS.edge_applications.waf.sql_injection_threats.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'httpMetrics',
    dataUnit: 'count',
    limit: 5000,
    fields: ['wafRequestsSqlAttacks'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548675837198933n,
    colorSet: 'INVERTED_COLOR_SET'
  },
  {
    id: 357842851576414805n,
    label: 'Other Threats',
    description: DASHBOARDS_TEXTS.edge_applications.waf.other_threats.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'httpMetrics',
    dataUnit: 'count',
    limit: 5000,
    fields: ['wafRequestsOthersAttacks'],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357548675837198933n,
    colorSet: 'INVERTED_COLOR_SET'
  },
  /**
   * SECURE
   * Intelligent DNS - Standard Queries
   */
  {
    id: 357843490139298789n,
    label: 'Total Queries',
    description: DASHBOARDS_TEXTS.intelligent_dns.standard_queries.total_queries.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataset: 'idnsQueriesMetrics',
    dataUnit: 'count',
    limit: 5000,
    aggregations: [
      {
        aggregation: 'sum',
        variable: 'requests'
      }
    ],
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 357549371218199119n,
    colorSet: 'REGULAR_COLOR_SET'
  },
  /**
   * OBSERVE
   * Data Streaming - Data Streamed
   */
  {
    id: 352149351588430415n,
    label: 'Total Data Streamed',
    description: DASHBOARDS_TEXTS.data_streaming.data_streamed.total_data.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataUnit: 'bytes',
    dataset: 'dataStreamedMetrics',
    aggregations: [
      {
        aggregation: 'sum',
        variable: 'dataStreamed'
      }
    ],
    limit: 5000,
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 352149476039721549n,
    colorSet: 'REGULAR_COLOR_SET'
  },
  {
    id: 352234687543902797n,
    label: 'Total Requests',
    description: DASHBOARDS_TEXTS.data_streaming.data_streaming_requests.total_requests.description,
    aggregationType: 'sum',
    columns: 4,
    type: 'line',
    xAxis: 'ts',
    isTopX: false,
    rotated: false,
    dataUnit: 'count',
    dataset: 'dataStreamedMetrics',
    aggregations: [
      {
        aggregation: 'sum',
        variable: 'streamedLines'
      }
    ],
    limit: 5000,
    groupBy: [],
    orderDirection: 'ASC',
    dashboardId: 352149476039721549n,
    colorSet: 'REGULAR_COLOR_SET'
  }
]

export default REPORTS
