import { EResError } from "./../enums/EResError.js";

export class CRes {
  static error(message: string, code: EResError) {
    return {
        status: false,
        message: message
    }
  }
}
