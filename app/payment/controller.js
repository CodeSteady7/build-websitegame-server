const Payment = require("./model");
const Bank = require("../bank/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const payment = await Payment.find().populate("bank");
      console.log("payment", payment);

      res.render("admin/payment/view_payment", {
        name: req.session.user.name,
        title: "Halaman Payment",
        payment,
        alert,
      });
    } catch (err) {
      console.log("err", err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  viewCreate: async (req, res) => {
    try {
      const bank = await Bank.find();
      console.log("bank", bank);
      res.render("admin/payment/create", {
        name: req.session.user.name,
        title: "Halaman Ubah Payment",
        bank,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { bank, type } = req.body;

      let payment = await Payment({ bank, type });
      await payment.save();

      req.flash("alertMessage", "Berhasil tambah kategori");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findOne({ _id: id }).populate("bank");
      const bank = await Bank.find();
      console.log("payment", payment.bank);
      console.log("bank", bank);

      res.render("admin/payment/edit", {
        name: req.session.user.name,
        title: "Halaman Edit Payment",
        payment,
        bank,
      });
    } catch (err) {
      console.log("err", err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { banks, type } = req.body;

      await Payment.findOneAndUpdate(
        {
          _id: id,
        },
        { banks, type }
      );

      req.flash("alertMessage", "Berhasil Ubah kategori");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Payment.findOneAndRemove({
        _id: id,
      });
      req.flash("alertMessage", "Berhasil Hapus payment");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
};
