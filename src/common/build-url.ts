type Params = Record<string, string | number | undefined | boolean | string[] | null>;

interface QueryProperties {
  endpoint: string
  params?: Params;
  querys?: Params;
  id?: string | number
}

/**
 * Crea una url a partir de los parametros
 * @returns (string) 'http://localhost:3000/user/24/find?name=example'
 * @param baseURL
 * @param properties
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
        if (value && !Array.isArray(value)) urlObject.searchParams.append(key, value.toString());
        else if (Array.isArray(value)) {
          value.forEach((val) => urlObject.searchParams.append(key, val));
        }
      });
    }

    return urlObject.toString();
  } catch (error) {
    throw new Error(`URL_MALFORMED: ${error instanceof Error ? error.message : ""}`);
  }
};