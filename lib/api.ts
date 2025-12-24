import { Products } from "@/types/product";

// Dev Data
export const products: Products = [
  {
    images: [
      "https://res.cloudinary.com/dbzs4nok9/image/upload/v1758053490/len4jl1pcgwlm5qc0ugq.jpg",
      "https://res.cloudinary.com/dbzs4nok9/image/upload/v1758053490/pesh0aydimtkgluse7vq.png",
      "https://res.cloudinary.com/dbzs4nok9/image/upload/v1758053490/azrq4khbodgthh4lbdbs.png",
      "https://res.cloudinary.com/dbzs4nok9/image/upload/v1758053490/qkoyq86suo4oxberooww.jpg",
      "https://res.cloudinary.com/dbzs4nok9/image/upload/v1758053491/as3840kxbbwipjeaf5e0.png",
    ],
    category: "laptop",
    brand: "hp",
    stock: 25,
    quantity: 20,
    description:
      "HP ProBook 460 16 inch Touch screen G11 Notebook PC 13-inch ultraportable laptop.",
    specs: {
      cpu: "Intel Core i7-1250U",
      ram: "16GB",
      storage: "512GB SSD",
      screen: '13.4" FHD+',
    },
    title: "HP ProBook 460 16 inch",
    unitPrice: 1200,
    reviews: [
      {
        id: "6941111dae03faffa8c11825",
        product: "68c9c47376841fdc633c260f",
        user: null,
        rating: 5,
        review: "Excellent product",
      },
    ],
    id: "68c9c47376841fdc633c260f",
  },
  {
    images: [
      "https://res.cloudinary.com/dbzs4nok9/image/upload/v1758452776/o2lk8be6wt0yhliouyvu.webp",
      "https://res.cloudinary.com/dbzs4nok9/image/upload/v1758452775/c8ye6rjvgluerxl2dspy.webp",
      "https://res.cloudinary.com/dbzs4nok9/image/upload/v1758452775/iwbiyypiaqrv1qmwv2im.webp",
    ],
    category: "laptop",
    brand: "hp",
    stock: 25,
    description: "13-inch ultraportable laptop.",
    specs: {
      cpu: "Intel Core i7-1250U",
      ram: "16GB",
      storage: "512GB SSD",
      screen: '13.4" FHD+',
    },
    title: "HP laptop",
    unitPrice: 500,
    quantity: 50,
    reviews: [],
    id: "68cc3f8ad0da946d33060842",
  },
  {
    title: "HikVision Dome",
    images: [
      "https://res.cloudinary.com/dbzs4nok9/image/upload/v1758397085/gni4nkmfy9n8k2j6zwsj.jpg",
      "https://res.cloudinary.com/dbzs4nok9/image/upload/v1758397086/inxy7yeav7gckuntpfr3.jpg",
      "https://res.cloudinary.com/dbzs4nok9/image/upload/v1758397086/hwnyblxzkl6oehtvk0lo.jpg",
    ],
    category: "cctv",
    quantity: 20,
    brand: "HikVision",
    unitPrice: 250,
    stock: 5,
    description:
      "4MP DeepinViewX Fixed Lens Dome Camera for Perimeter Protection",
    specs: {
      resolution: "4K",
      nightVision: true,
      connectivity: "Wired",
    },
    reviews: [],
    id: "68cf029e9a34259f915f2a27",
  },
  {
    id: "694281588d42dfe7038bc6a0",
    quantity: 20,
    images: [
      "https://res.cloudinary.com/dbzs4nok9/image/upload/v1758053490/len4jl1pcgwlm5qc0ugq.jpg",
      "https://res.cloudinary.com/dbzs4nok9/image/upload/v1758053490/pesh0aydimtkgluse7vq.png",
      "https://res.cloudinary.com/dbzs4nok9/image/upload/v1758053490/azrq4khbodgthh4lbdbs.png",
      "https://res.cloudinary.com/dbzs4nok9/image/upload/v1758053490/qkoyq86suo4oxberooww.jpg",
      "https://res.cloudinary.com/dbzs4nok9/image/upload/v1758053491/as3840kxbbwipjeaf5e0.png",
    ],
    category: "laptop",
    brand: "Dell",
    stock: 25,
    description:
      "Dell ProBook 460 16 inch Touch screen G11 Notebook PC 13-inch ultraportable laptop.",
    specs: {
      cpu: "Intel Core i7-1250U",
      ram: "16GB",
      storage: "512GB SSD",
      screen: '13.4" FHD+',
    },
    title: "Dell ProBook 460 16 inch",
    unitPrice: 1200,
    reviews: [],
  },
];
