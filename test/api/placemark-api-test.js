import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { lahinch, testPlacemarks, maggie, maggieCredentials } from "../fixtures.js";

suite("Placemark API tests", () => {
  setup(async () => {
    placemarkService.clearAuth();
    let user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    await placemarkService.deleteAllPlacemarks();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[0] = await placemarkService.createPlacemark(testPlacemarks[i]);
    }
  });
  teardown(async () => {
  });

  test("create a placemark", async () => {
    const newPlacemark = await placemarkService.createPlacemark(lahinch);
    assertSubset(lahinch, newPlacemark);
    assert.isDefined(newPlacemark._id);
  });

  test("delete all placemarks", async () => {
    let returnedPlacemarks = await placemarkService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 2);
    await placemarkService.deleteAllPlacemarks();
    returnedPlacemarks = await placemarkService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 0);
  });

  test("get a placemark - success", async () => {
    const returnedPlacemark = await placemarkService.getPlacemark(testPlacemarks[0]._id);
    assert.deepEqual(testPlacemarks[0], returnedPlacemark);
  });

  test("get a placemark - fail", async () => {
    try {
      const returnedPlacemark = await placemarkService.getPlacemark("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Placemark with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a placemark - deleted placemark", async () => {
    await placemarkService.deleteAllPlacemarks();
    try {
      const returnedPlacemark = await placemarkService.getPlacemark(testPlacemarks[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Placemark with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});