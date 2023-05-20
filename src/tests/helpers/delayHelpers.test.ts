import { pause } from "../../helpers/delayHelpers";

describe("pause", () => {
  test("Should pause for the specified duration", async () => {
    const startTime = new Date().getTime();
    const delay = 1000;

    await pause(delay);

    const endTime = new Date().getTime();
    const elapsed = endTime - startTime;

    expect(elapsed).toBeGreaterThanOrEqual(delay);
  });
});

