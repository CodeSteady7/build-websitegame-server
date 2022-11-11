var express = require("express");
var router = express.Router();
const {
  landingPage,
  detailPage,
  category,
  checkout,
  getNominal,
  history,
  historyDetail,
  dashboard,
  profile,
  editProfile,
} = require("./controller");
const multer = require("multer");
const os = require("os");

const { isLoginPlayer } = require("../middleware/auth");

router.get("/landingpage", landingPage);
router.get("/:id/detail", detailPage);
router.get("/category", category);
router.get("/nominal", getNominal);
router.post("/checkout", isLoginPlayer, checkout);
router.get("/history", isLoginPlayer, history);
router.get("/history/:id/detail", isLoginPlayer, historyDetail);
router.get("/dashboard", isLoginPlayer, dashboard);
router.get("/profile", isLoginPlayer, profile);
router.put(
  "/profile/:id",
  isLoginPlayer,
  multer({ dest: os.tmpdir() }).single("image"),
  editProfile
);
//
module.exports = router;
