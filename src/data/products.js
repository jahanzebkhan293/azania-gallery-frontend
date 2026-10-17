import hoopMain from "../assets/products/earrings/hoops-earrings-1/main.webp";
import hoopImage1 from "../assets/products/earrings/hoops-earrings-1/image-1.webp";
import hoopImage2 from "../assets/products/earrings/hoops-earrings-1/image-2.webp";
import hoopImage3 from "../assets/products/earrings/hoops-earrings-1/image-3.webp";
import hoopImage4 from "../assets/products/earrings/hoops-earrings-1/image-4.webp";
import hoopImage5 from "../assets/products/earrings/hoops-earrings-1/image-5.webp";
import hoopImage6 from "../assets/products/earrings/hoops-earrings-1/image-6.webp";

// Bracelet-1
import braceletMain from "../assets/products/bracelets/Bracelet-1/main.png";
import braceletImage1 from "../assets/products/bracelets/Bracelet-1/image-1.png";
import braceletImage2 from "../assets/products/bracelets/Bracelet-1/image-2.png";
import braceletImage3 from "../assets/products/bracelets/Bracelet-1/image-3.png";

// Bracelet-2
import bracelet2Main from "../assets/products/bracelets/Bracelet-2/main.png";
import bracelet2Image1 from "../assets/products/bracelets/Bracelet-2/image-1.png";
import bracelet2Image2 from "../assets/products/bracelets/Bracelet-2/image-2.png";
import bracelet2Image3 from "../assets/products/bracelets/Bracelet-2/image-3.png";
import bracelet2Image4 from "../assets/products/bracelets/Bracelet-2/image-4.png";

// Bracelet-3
import bracelet3Main from "../assets/products/bracelets/Bracelet-3/main.png";
import bracelet3Image1 from "../assets/products/bracelets/Bracelet-3/image-1.png";
import bracelet3Image2 from "../assets/products/bracelets/Bracelet-3/image-2.png";
import bracelet3Image3 from "../assets/products/bracelets/Bracelet-3/image-3.png";

// Bracelet-4
import bracelet4Main from "../assets/products/bracelets/Bracelet-4/main.jpg";
import bracelet4Image1 from "../assets/products/bracelets/Bracelet-4/image-1.jpg";
import bracelet4Image2 from "../assets/products/bracelets/Bracelet-4/image-2.jpg";
import bracelet4Image3 from "../assets/products/bracelets/Bracelet-4/image-3.jpg";

// Ring-1
import ring1Main from "../assets/products/rings/Ring-1/main.webp";
import ring1Image1 from "../assets/products/rings/Ring-1/image-1.webp";
import ring1Image2 from "../assets/products/rings/Ring-1/image-2.webp";
import ring1Image3 from "../assets/products/rings/Ring-1/image-3.jpg";

// Ring-2
import ring2Main from "../assets/products/rings/Ring-2/main.webp";
import ring2Image1 from "../assets/products/rings/Ring-2/image-1.webp";
import ring2Image2 from "../assets/products/rings/Ring-2/image-2.webp";

// Necklace-1
import necklace1Main from "../assets/products/necklaces/Necklace-1/main.webp";
import necklace1Image1 from "../assets/products/necklaces/Necklace-1/image-1.webp";
import necklace1Image2 from "../assets/products/necklaces/Necklace-1/image-2.webp";
import necklace1Image3 from "../assets/products/necklaces/Necklace-1/image-3.webp";
import necklace1Image4 from "../assets/products/necklaces/Necklace-1/image-4.webp";

// Necklace-2
import necklace2Main from "../assets/products/necklaces/Necklace-2/main.webp";
import necklace2Image1 from "../assets/products/necklaces/Necklace-2/image-1.webp";
import necklace2Image2 from "../assets/products/necklaces/Necklace-2/image-2.webp";
import necklace2Image3 from "../assets/products/necklaces/Necklace-2/image-3.webp";
import necklace2Image4 from "../assets/products/necklaces/Necklace-2/image-4.webp";

// Earrings-2
import earrings2Main from "../assets/products/earrings/Earrings-2/main.webp";
import earrings2Image1 from "../assets/products/earrings/Earrings-2/image-1.webp";
import earrings2Image2 from "../assets/products/earrings/Earrings-2/image-2.webp";
import earrings2Image3 from "../assets/products/earrings/Earrings-2/image-3.webp";

// Chain-1
import chain1Main from "../assets/products/chains/Chain-1/main.jpg";
import chain1Image1 from "../assets/products/chains/Chain-1/image-1.jpg";
import chain1Image2 from "../assets/products/chains/Chain-1/image-2.jpg";

// Pendants-1
import pendant1Main from "../assets/products/pendants/Pendants-1/main.jpg";
import pendant1Image1 from "../assets/products/pendants/Pendants-1/image-1.jpg";
import pendant1Image2 from "../assets/products/pendants/Pendants-1/image-2.jpg";
import pendant1Image3 from "../assets/products/pendants/Pendants-1/image-3.jpg";

// Jewelry Set-1
import jewelrySet1Main from "../assets/products/jewelrysets/jewelryset-1/main.jpg";
import jewelrySet1Image1 from "../assets/products/jewelrysets/jewelryset-1/image-1.jpg";
import jewelrySet1Image2 from "../assets/products/jewelrysets/jewelryset-1/image-2.jpg";
import jewelrySet1Image3 from "../assets/products/jewelrysets/jewelryset-1/image-3.jpg";
import jewelrySet1Image4 from "../assets/products/jewelrysets/jewelryset-1/image-4.jpg";

// Bangles-1
const bangleFiles = import.meta.glob(
  "../assets/products/bangles/Bangles-1/*",
  {
    eager: true,
    import: "default",
  }
);

const getBangleImage = (name) => {
  const entry = Object.entries(bangleFiles).find(
    ([path]) => path.toLowerCase().endsWith(`/${name}`)
  );

  return entry ? entry[1] : "";
};

const bangleMain = Object.entries(bangleFiles).find(
  ([path]) => path.toLowerCase().includes("/main.")
)?.[1] || "";

const bangleImage1 = getBangleImage("image-1.jpg") ||
  getBangleImage("image-1.png") ||
  getBangleImage("image-1.webp");

const bangleImage2 = getBangleImage("image-2.jpg") ||
  getBangleImage("image-2.png") ||
  getBangleImage("image-2.webp");

const bangleImage3 = getBangleImage("image-3.jpg") ||
  getBangleImage("image-3.png") ||
  getBangleImage("image-3.webp");


const products = [
  {
    id: 1,
    name: "Sterling Silver Citrine Bracelet",
    category: "Jewelry",
    subcategory: "Bracelets",
    price: 89,
    image: bracelet2Main,
    images: [
      bracelet2Main,
      bracelet2Image1,
      bracelet2Image2,
      bracelet2Image3,
      bracelet2Image4,
    ],
    description:
      "A beautifully crafted sterling silver bracelet featuring an elegant citrine-inspired design.",
  },

  {
    id: 2,
    name: "Elegant Silver Tennis Bracelet",
    category: "Jewelry",
    subcategory: "Bracelets",
    price: 99,
    image: bracelet3Main,
    images: [
      bracelet3Main,
      bracelet3Image1,
      bracelet3Image2,
      bracelet3Image3,
    ],
    description:
      "A timeless bracelet designed to add a refined touch to both everyday and special occasions.",
  },

  {
    id: 3,
    name: "925 Sterling Silver Bracelet",
    category: "Jewelry",
    subcategory: "Bracelets",
    price: 109,
    image: bracelet4Main,
    images: [
      bracelet4Main,
      bracelet4Image1,
      bracelet4Image2,
      bracelet4Image3,
    ],
    description:
      "A refined sterling silver bracelet created for an elegant and sophisticated appearance.",
  },

  {
    id: 4,
    name: "Sterling Silver Hoop Earrings",
    category: "Jewelry",
    subcategory: "Earrings",
    price: 79,
    image: hoopMain,
    images: [
      hoopMain,
      hoopImage1,
      hoopImage2,
      hoopImage3,
      hoopImage4,
      hoopImage5,
      hoopImage6,
    ],
    description:
      "Elegant sterling silver hoop earrings designed for timeless everyday style.",
  },

  {
    id: 5,
    name: "925 Sterling Silver Tennis Bracelet",
    category: "Jewelry",
    subcategory: "Bracelets",
    price: 50,
    image: braceletMain,
    images: [
      braceletMain,
      braceletImage1,
      braceletImage2,
      braceletImage3,
    ],
    description:
      "A timeless 925 sterling silver tennis bracelet designed with a refined and elegant finish for everyday and special occasions.",
  },

  {
    id: 6,
    name: "Exemplary Sapphire Ring",
    category: "Jewelry",
    subcategory: "Rings",
    price: 150,
    image: ring1Main,
    images: [
      ring1Main,
      ring1Image1,
      ring1Image2,
      ring1Image3,
    ],
    description:
      "An exquisite sapphire ring designed with an elegant and refined finish for a timeless jewelry collection.",
  },

  {
    id: 7,
    name: "Petal Vine Ring",
    category: "Jewelry",
    subcategory: "Rings",
    price: 120,
    image: ring2Main,
    images: [
      ring2Main,
      ring2Image1,
      ring2Image2,
    ],
    description:
      "A delicate petal-inspired ring featuring an elegant vine design that adds a refined touch to any look.",
  },

  {
    id: 8,
    name: "Initial Noor Amour",
    category: "Jewelry",
    subcategory: "Necklaces",
    price: 150,
    image: necklace1Main,
    images: [
      necklace1Main,
      necklace1Image1,
      necklace1Image2,
      necklace1Image3,
      necklace1Image4,
    ],
    description:
      "An elegant initial necklace designed to add a personal and refined touch to your jewelry collection.",
  },

  {
    id: 9,
    name: "The Ultramarine Necklace",
    category: "Jewelry",
    subcategory: "Necklaces",
    price: 180,
    image: necklace2Main,
    images: [
      necklace2Main,
      necklace2Image1,
      necklace2Image2,
      necklace2Image3,
      necklace2Image4,
    ],
    description:
      "A sophisticated ultramarine-inspired necklace designed to bring an elegant and distinctive touch to any look.",
  },

  {
    id: 10,
    name: "AQUAMARINE ZIRCON EARRINGS - 925 SILVER",
    category: "Jewelry",
    subcategory: "Earrings",
    price: 100,
    image: earrings2Main,
    images: [
      earrings2Main,
      earrings2Image1,
      earrings2Image2,
      earrings2Image3,
    ],
    description:
      "Elegant aquamarine zircon earrings crafted in 925 sterling silver for a refined and timeless look.",
  },

  {
    id: 11,
    name: "Bangle Bracelets for Women 14K Gold Silver",
    category: "Jewelry",
    subcategory: "Bangles",
    price: 160,
    image: bangleMain,
    images: [
      bangleMain,
      bangleImage1,
      bangleImage2,
      bangleImage3,
    ],
    description:
      "Elegant bangle bracelets designed for women with a refined gold and silver finish.",
  },

  {
    id: 12,
    name: "925 Sterling Silver Chain Necklace for Women",
    category: "Jewelry",
    subcategory: "Chains",
    price: 145,
    image: chain1Main,
    images: [
      chain1Main,
      chain1Image1,
      chain1Image2,
    ],
    description:
      "A refined 925 sterling silver chain necklace designed for women seeking an elegant and timeless accessory.",
  },

  {
    id: 13,
    name: "Sterling Silver Diamond Accent Love Knot Pendant Necklace",
    category: "Jewelry",
    subcategory: "Pendants",
    price: 90,
    image: pendant1Main,
    images: [
      pendant1Main,
      pendant1Image1,
      pendant1Image2,
      pendant1Image3,
    ],
    description:
      "A refined sterling silver love knot pendant necklace featuring an elegant diamond accent.",
  },

  {
    id: 14,
    name: "Heart Necklace and Stud Earrings Jewelry Set",
    category: "Jewelry",
    subcategory: "Jewelry Sets",
    price: 150,
    image: jewelrySet1Main,
    images: [
      jewelrySet1Main,
      jewelrySet1Image1,
      jewelrySet1Image2,
      jewelrySet1Image3,
      jewelrySet1Image4,
    ],
    description:
      "A charming heart necklace and stud earrings jewelry set designed to create an elegant coordinated look.",
  },
];

export default products;