type Params = Record<string, string | number | undefined | boolean | string[]>;

interface QueryProperties {
  endpoint: string
  params?: Params;
  querys?: Params;
  id?: string | number
}

/** 
 * Crea una url a partir de los parametros
 * @param baseURL: 'http://localhost:3000'
 * @param properites: { endpoint: "user/{id}/find", params: { id: 24 }, querys: { name: "example" } }
 * @returns (string) 'http://localhost:3000/user/24/find?name=example'
 */

export const buildUrl = (baseURL: string, properties: QueryProperties): string => {
  try {
    let url = properties.endpoint;
    if(properties.id) url += properties.id;
    if (properties?.params) {
      Object.entries(properties.params).forEach(([key, value]) => {
        if (value) url = url.replace(`{${key}}`, value.toString());
      });
    }

    const urlObject = new URL(url, baseURL);
    if (properties?.querys) {
      Object.entries(properties.querys).forEach(([key, value]) => {
        if (value) urlObject.searchParams.append(key, value.toString());
      });
    }

    return urlObject.toString();
  } catch (error) {
    throw new Error(`URL_MALFORMED: ${error instanceof Error ? error.message : ""}`);
  }
};