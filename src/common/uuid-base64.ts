import { parse as uuidParse, stringify as uuidStringify } from 'uuid';

export default class UUIDBase64 {
  private readonly uuid: string;

  constructor (uuid: string) {
    this.uuid = uuid;
  }

  public uuidToBase64 () {
    const buffer = new Uint8Array(uuidParse(this.uuid));
    return btoa(String.fromCharCode(...buffer))
      .replace(/\+/gu, '-')
      .replace(/\//gu, '_')
      .replace(/[=]+$/u, '');
  };

  public static base64ToUuid (base64: string) {
    const charCode = 0;
    const binary = atob(base64.replace(/-/gu, '+').replace(/_/gu, '/'));
    const buffer = new Uint8Array([...binary].map((char) => char.charCodeAt(charCode)));
    return uuidStringify(buffer);
  };
}