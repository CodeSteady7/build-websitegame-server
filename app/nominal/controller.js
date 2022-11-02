const Nominal = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const nominal = await Nominal.find();
      // res.status(200).json({ msg: "ada data", data: nominal });

      res.render("admin/nominal/view_nominal", {
        name: req.session.user.name,
        title: "Halaman Nominal",
        nominal,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/nominal/create", {
        name: req.session.user.name,
        title: "Halaman buat Nominal",
      });
    } catch (error) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { coinName, coinQuantity, price } = req.body;

      let nominal = await Nominal({ coinName, coinQuantity, price });
      await nominal.save();

      req.flash("alertMessage", "Berhasil tambah kategori");
      req.flash("alertStatus", "success");

      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const nominal = await Nominal.findOne({ _id: id });

      res.render("admin/nominal/edit", {
        name: req.session.user.name,
        title: "Halaman Edit",
        nominal,
      });
    } catch (error) {
      console.log("err", error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { coinName, coinQuantity, price } = req.body;

      await Nominal.findOneAndUpdate(
        {
          _id: id,
        },
        { coinName, coinQuantity, price }
      );

      req.flash("alertMessage", "Berhasil Ubah kategori");
      req.flash("alertStatus", "success");
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("id", id);
      await Nominal.findOneAndRemove({
        _id: id,
      });
      req.flash("alertMessage", "Berhasil Hapus Nominal");
      req.flash("alertStatus", "success");
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
};
