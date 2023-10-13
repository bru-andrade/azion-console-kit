import { AxiosHttpClientAdapter } from '@/services/axios/AxiosHttpClientAdapter'
import { listEdgeApplicationsService } from '@/services/edge-application-services'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const fixtures = {
  edgeApplicationsMock: {
    id: 1239875,
    active: true,
    debug_rules: true,
    last_editor: 'az editor',
    last_modified: new Date(2023, 10, 10),
    name: 'edge app AZ',
    origins: [{ name: 'origin 1' }, { name: 'origin 2' }]
  },
  disabledEdgeApplicationsMock: {
    id: 1239875,
    active: false,
    debug_rules: false,
    last_editor: 'az editor 2',
    last_modified: new Date(2023, 11, 10),
    name: 'edge app AZ 2',
    origins: [{ name: 'origin 3' }, { name: 'origin 4' }]
  }
}

const makeSut = () => {
  const sut = listEdgeApplicationsService

  return {
    sut
  }
}

describe('EdgeApplicationServices', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('should call api with correct params', async () => {
    const requestSpy = vi.spyOn(AxiosHttpClientAdapter, 'request').mockResolvedValueOnce({
      statusCode: 200,
      body: { results: [] }
    })
    const { sut } = makeSut()

    await sut({})

    expect(requestSpy).toHaveBeenCalledWith({
      url: `edge_applications?order_by=name&sort=asc&page=1&page_size=200`,
      method: 'GET'
    })
  })

  it('should parsed correctly all returned edge applications', async () => {
    vi.setSystemTime(new Date(2023, 10, 10, 10))
    vi.spyOn(AxiosHttpClientAdapter, 'request').mockResolvedValueOnce({
      statusCode: 200,
      body: { results: [fixtures.edgeApplicationsMock, fixtures.disabledEdgeApplicationsMock] }
    })
    const { sut } = makeSut()

    const result = await sut({})

    expect(result).toEqual([
      {
        active: 'active',
        debugRules: 'active',
        id: fixtures.edgeApplicationsMock.id,
        lastEditor: fixtures.edgeApplicationsMock.last_editor,
        lastModify: 'Friday, November 10, 2023',
        name: fixtures.edgeApplicationsMock.name,
        origins: `${fixtures.edgeApplicationsMock.origins.at(0).name},${
          fixtures.edgeApplicationsMock.origins.at(1).name
        }`
      },
      {
        active: 'disabled',
        debugRules: 'disabled',
        id: fixtures.disabledEdgeApplicationsMock.id,
        lastEditor: fixtures.disabledEdgeApplicationsMock.last_editor,
        lastModify: 'Sunday, December 10, 2023',
        name: fixtures.disabledEdgeApplicationsMock.name,
        origins: `${fixtures.disabledEdgeApplicationsMock.origins.at(0).name},${
          fixtures.disabledEdgeApplicationsMock.origins.at(1).name
        }`
      }
    ])
  })
})
