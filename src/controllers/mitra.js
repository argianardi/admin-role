const models = require("../configs/models/index");
const controllerMitra = {};

// post mitra
controllerMitra.post = async (req, res) => {
  const {
    mitra_name,
    mitra_owner,
    email,
    password,
    image,
    no_telp,
    provinsi,
    kota,
    kecamatan,
    jalan,
  } = req.body;

  if (
    !(
      mitra_name &&
      mitra_owner &&
      email &&
      password &&
      image &&
      no_telp &&
      provinsi &&
      kota &&
      kecamatan &&
      jalan
    )
  ) {
    return res.status(400).json({
      message: "Some input are required",
    });
  }

  try {
    const mitra = await models.mitra.create({
      mitra_name: mitra_name,
      mitra_owner: mitra_owner,
      email: email,
      password: password,
      image: image,
      no_telp: no_telp,
      provinsi: provinsi,
      kota: kota,
      kecamatan: kecamatan,
      jalan: jalan,
    });
    res.status(201).json({
      success: true,
      message: "The mitra added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "500 internal server error",
    });
  }
};

module.exports = controllerMitra;
