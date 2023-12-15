import { AxiosHttpClientAdapter } from '@/services/axios/AxiosHttpClientAdapter'
import { makeEdgeApplicationBaseUrl } from '../edge-application-services/make-edge-application-base-url'
import * as Errors from '@/services/axios/errors'

export const createOriginService = async (payload) => {
  const { id } = payload
  let httpResponse = await AxiosHttpClientAdapter.request({
    url: `${makeEdgeApplicationBaseUrl()}/${id}/origins`,
    method: 'POST',
    body: adapt(payload)
  })

  return parseHttpResponse(httpResponse, id)
}

const adapt = (payload) => {
  return {
    name: payload.name,
    origin_type: payload.originType,
    host_header: payload.hostHeader,
    method: payload.method,
    addresses: payload.addresses?.map((addressItem) => ({
      address: addressItem.address,
      weight: addressItem.weight,
      server_role: addressItem.serverRole,
      is_active: addressItem.isActive
    })),
    origin_path: payload.originPath,
    origin_protocol_policy: payload.originProtocolPolicy,
    hmac_authentication: payload.hmacAuthentication,
    hmac_region_name: payload.hmacRegionName,
    hmac_access_key: payload.hmacAccessKey,
    hmac_secret_key: payload.hmacSecretKey,
    connection_timeout: payload.connectionTimeout,
    timeout_between_bytes: payload.timeoutBetweenBytes
  }
}

/**
 * @param {Object} errorSchema - The error schema.
 * @param {string} key - The error key of error schema.
 * @returns {string|undefined} The result message based on the status code.
 */
const extractErrorKey = (errorSchema, key) => {
  if (Array.isArray(errorSchema[key])) {
    if (typeof errorSchema[key][0] === 'object') {
      const newError = errorSchema[key][0]
      const errorKey = Object.keys(errorSchema[key][0])
      return newError[errorKey]?.[0]
    }
    return errorSchema[key]?.[0]
  }
  return errorSchema[key]
}

/**
 * @param {Object} httpResponse - The HTTP response object.
 * @param {Object} httpResponse.body - The response body.
 * @returns {string} The result message based on the status code.
 */
const extractApiError = (httpResponse) => {
  const errorKey = Object.keys(httpResponse.body)[0]
  const apiError = extractErrorKey(httpResponse.body, errorKey)
  return `${errorKey}: ${apiError}`
}

/**
 * @param {Object} httpResponse - The HTTP response object.
 * @param {Object} httpResponse.body - The response body.
 * @param {String} httpResponse.statusCode - The HTTP status code.
 * @returns {string} The result message based on the status code.
 * @throws {Error} If there is an error with the response.
 */
const parseHttpResponse = (httpResponse, edgeApplicationId) => {
  switch (httpResponse.statusCode) {
    case 201:
      return {
        feedback: 'Your Origin has been created',
        urlToEditView: `/edge-applications/edit/${edgeApplicationId}/origins/edit/${httpResponse.body.results.origin_key}`
      }
    case 400:
      const apiError = extractApiError(httpResponse)
      throw new Error(apiError).message
    case 401:
      throw new Errors.InvalidApiTokenError().message
    case 403:
      throw new Errors.PermissionError().message
    case 404:
      throw new Errors.NotFoundError().message
    case 500:
      const apiError500 = extractApiError(httpResponse)
      throw new Error(apiError500).message
    default:
      throw new Errors.UnexpectedError().message
  }
}
