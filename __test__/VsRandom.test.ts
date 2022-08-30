import random from "../src";
import constants from "../src/utils/constants";

const escapeRegex = (regexp: string) => {
  return regexp.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
};

describe("Random", () => {
  test("generate random numbers - should pass", () => {
    const randomNumbers = random({ length: 6, type: "numbers" });
    expect(Number(randomNumbers)).not.toBeNaN();
  });

  test("generate random lowercase alphabet - should pass", () => {
    const randomString = random({ length: 6, type: "lowercase" });
    expect(randomString).toMatch(/[a-z]+/);
  });

  test("generate random uppercase alphabet - should pass", () => {
    const randomString = random({ length: 6, type: "uppercase" });
    expect(randomString).toMatch(/[A-Z]+/);
  });

  test("generate random string - should pass", () => {
    const randomString = random({ length: 6, type: "random" });
    const regexp = new RegExp(`[a-zA-Z0-9${escapeRegex(constants.SYMBOLS)}]+`);
    expect(randomString).toMatch(regexp);
  });

  test("generate random string with charset - should pass", () => {
    const randomString = random({ length: 6, charset: "ABCDuifj987)(.:" });
    expect(randomString).toMatch(/[ABCDuifj987)(.:]+/);
  });
});
