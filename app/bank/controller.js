const Bank = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const bank = await Bank.find();

      res.render("admin/bank/view_bank", {
        bank,
        alert,
        name: req.session.user.name,
        title: "Halaman Bank",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/bank/create", {
        name: req.session.user.name,
        title: "Halaman Buat Bank",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name, nameBank, noRekening } = req.body;

      let bank = await Bank({ name, nameBank, noRekening });
      await bank.save();

      req.flash("alertMessage", "Berhasil tambah kategori");
      req.flash("alertStatus", "success");

      res.redirect("/bank");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await Bank.findOne({ _id: id });

      res.render("admin/bank/edit", {
        name: req.session.user.name,
        title: "Halaman Edit Bank",
        bank,
      });
    } catch (err) {
      console.log("err", err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, nameBank, noRekening } = req.body;

      await Bank.findOneAndUpdate(
        {
          _id: id,
        },
        { name, nameBank, noRekening }
      );

      req.flash("alertMessage", "Berhasil Ubah kategori");
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("id", id);
      await Bank.findOneAndRemove({
        _id: id,
      });
      req.flash("alertMessage", "Berhasil Hapus bank");
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
};
