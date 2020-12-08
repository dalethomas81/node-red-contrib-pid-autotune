const AutoTuner = require("../core/pid-autotuner");

describe("AutoTuner", function () {
  describe("init", function () {
    it("should create AutoTuner", function (done) {
      const autoTuner = new AutoTuner(65);
      done();
    });

    it("should use current time if not supplied", function (done) {
      const autoTuner = new AutoTuner(65);
      var currentTimeMs = autoTuner._getTimeMs();
      currentTimeMs.should.be.above(1607437037954);
      done();
    });

    it("should use supplied current time", function (done) {
      const autoTuner = new AutoTuner(65, 10, 60, 60, 0, 10, 0, function () {
        return 10;
      });
      var time = autoTuner._getTimeMs();
      time.should.be.eql(10);
      done();
    });
  });

  describe("getPIDParameters", function() {
   it("should return pid parameters for brewing", function(done) {
      const autoTuner = new AutoTuner(65, 100, 5, 30, 0, 100);
      var params = autoTuner.getPIDParameters("brewing");
      params.Kp.should.be.eql(0);
      done();
   });
  });

  describe("run", function() {
     it("should run", function(done) {
      const autoTuner = new AutoTuner(65, 100, 5, 30, 0, 100);
      var result = true;
      result = autoTuner.run(60);
      result = autoTuner.run(61);
      result = autoTuner.run(62);
      result = autoTuner.run(63);
      result = autoTuner.run(64);
      result = autoTuner.run(65);
      result = autoTuner.run(64);
      result = autoTuner.run(63);
      result = autoTuner.run(62);

      result.should.be.eql(false);
      done();
     });
  })
});