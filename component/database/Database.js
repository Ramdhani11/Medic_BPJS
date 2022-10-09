const COLOURS = {
  white: "#fff",
  black: "#000",
  green: "#00AC76",
  red: "#C04345",
  blue: "#0043f9",
  backgroundLight: "#f0f0f3",
  backgroundMedium: "#b9b9b9",
  backgroundDark: "#777",
};
const Items = [
  {
    id: 1,
    category: "medic",
    productName: "Paracetamol",
    productPrice: 12000,
    description: "Obat pereda panas",
    isOff: true,
    offPercentage: 10,
    productImage: require("./images/medica.jpg"),
  },
  {
    id: 2,
    category: "medic",
    productName: "Loratadine",
    productPrice: 14000,
    description: "Mengatasi memar pada kulit",
    isOff: true,
    offPercentage: 10,
    productImage: require("./images/medic2.jpg"),
  },
  {
    id: 3,
    category: "medic",
    productName: "Thrombophod",
    productPrice: 15000,
    description: "Obat pereda panas",
    isOff: true,
    offPercentage: 10,
    productImage: require("./images/medic3.jpg"),
  },
  {
    id: 4,
    category: "medic",
    productName: "Siladex ",
    productPrice: 16000,
    description: "Obat Batuk Tidak Berdahak",
    isOff: true,
    offPercentage: 10,
    productImage: require("./images/medic4.jpg"),
  },
];

export { COLOURS, Items };
