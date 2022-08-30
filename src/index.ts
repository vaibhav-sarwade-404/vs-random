import crypto from "crypto";

import { RandomCharGeneratorOptions } from "./types/VsRandomTypes";
import constants from "./utils/constants";

/**
 * Used to generate random string with provided options options
 * @param options - {Object}
 * @param options.length - number of chars to generate
 * @param options.type - { "numbers" | "uppercase" | "lowercase" | "symbols" | "random" }
 * @param options.charset - custom char set to use for random chars generation
 * @returns {string} - random generator string
 *
 * Eg:
 *
 * const random = required("vs@random")
 *
 * 1. Generate random numbers
 *    const randomNumbers = random({ length: 6, type: "numbers" });
 *
 *    output: "063367"
 *
 * 2. Generate random string with upper case alphabet
 *    const randomString = random({ length: 6, type: "uppercase" });
 *
 *    output: "PJIBBA"
 *
 * 3. Generate random string with lower case alphabet
 *    const randomString = random({ length: 6, type: "lowercase" });
 *
 *    output: "ochdid"
 *
 * 4. Generate random string with default random charset
 *    const randomString = random({ length: 6, type: "random" });
 *
 *    output: "RCIhj/"
 *
 * 5. Generate random string with custom charset
 *    const randomString = random({ length: 6, charset: "ABCDuifj987)(.:" });
 *
 *    output: "jC8(i8"
 *
 */
const random = (options: RandomCharGeneratorOptions) => {
  const { type = "numbers", length = 6, charset = "" } = options;

  let randomChar = "";
  let randomBytes = crypto.randomBytes(length);

  let _charSet = charset || constants.RANDOM_CHAR_BASE;

  if (!charset) {
    switch (type) {
      case "lowercase":
        _charSet = constants.LOWERCASE_ALPHABETE;
        break;
      case "numbers":
        _charSet = constants.NUMBERS;
        break;
      case "symbols":
        _charSet = constants.SYMBOLS;
        break;
      case "uppercase":
        _charSet = constants.UPPERCASE_ALPHABET;
        break;
      default:
        break;
    }
  }

  for (const element of randomBytes) {
    randomChar +=
      _charSet[Math.floor((element / 255.0) * (_charSet.length - 1))];
  }
  return randomChar;
};

export default random;
