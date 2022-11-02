const e = require("express");
const Category = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };

      const category = await Category.find();
      res.render("admin/category/view_category", {
        name: req.session.user.name,
        title: "Halaman Kategori",
        category,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/category/create", {
        name: req.session.user.name,
        title: "Halaman Buat Kategori",
      });
    } catch (error) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;
      console.log("nama : ", name);
      let category = await Category({ name });
      await category.save();

      req.flash("alertMessage", "Berhasil tambah kategori");
      req.flash("alertStatus", "success");

      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });

      res.render("admin/category/edit", {
        name: req.session.user.name,
        title: "Halaman Edit Kategori",
        category,
      });
    } catch (error) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  actionEdit: async (req, res) => {
    console.log("res", res);
    try {
      const { id } = req.params;
      const { name } = req.body;

      const category = await Category.findOneAndUpdate(
        {
          _id: id,
        },
        { name }
      );

      req.flash("alertMessage", "Berhasil Ubah kategori");
      req.flash("alertStatus", "success");
      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("id", id);
      const category = await Category.findOneAndRemove({
        _id: id,
      });
      req.flash("alertMessage", "Berhasil Hapus kategori");
      req.flash("alertStatus", "success");
      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
};
