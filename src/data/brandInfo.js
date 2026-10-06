export const BRAND_INFO = {
  name: "ADI’S CREATION",
  brandLine: "Adi’s Creation – Lights n Lamps",
  collection: "Diya Collection 2026",
  tagline: "Decorate Your Homes With Adi’s Creation",
  founder: "Rani Toshniwal",
  email: "knowaboutrani@gmail.com",
  location: "Hadapsar, Pune",
  city: "Pune",
  state: "Maharashtra",
  country: "India",
  phones: [
    { number: "7058182383", formatted: "+91 70581 82383", primary: true },
    { number: "8208841529", formatted: "+91 82088 41529", primary: false }
  ],
  whatsappNumber: "917058182383",
  aboutHeading: "15 Years of Creativity, Tradition & Light",
  aboutStory: [
    "For the past 15 years, Adi’s Creation has been bringing joy and festive charm to homes through our beautifully handcrafted diyas. What started as a passion has grown into a beloved tradition of creating creative, attractive and affordable diyas for everyone.",
    "Every Diwali, we offer 50+ varieties of diyas, with exciting new designs and unique creations added every year. From traditional favourites to modern and artistic designs, there is something for every home, celebration and budget.",
    "Our aim has always been simple — beautiful diyas at prices everyone can afford and enjoy. Each diya is made with creativity, care and a love for the festival of lights."
  ],
  closingLine: "Adi’s Creation — Lighting up celebrations, one beautiful diya at a time.",
  highlights: [
    { stat: "15+", label: "Years of Creativity", desc: "Handcrafting artisanal diyas with love and tradition since 2011" },
    { stat: "50+", label: "Diya Varieties Every Year", desc: "Diverse collection ranging from traditional pillars to contemporary lanterns" },
    { stat: "NEW", label: "Designs Every Diwali", desc: "Fresh, innovative aesthetic creations introduced for every festive season" },
    { stat: "AFFORDABLE", label: "For Every Home", desc: "Exceptional handcrafted beauty crafted to be accessible and cherished by all" }
  ],
  deliveryNotice: "Home delivery available. Delivery charges will be calculated separately based on location and order requirements.",
  indiaSupplyNotice: "Adi’s Creation supplies across India.",
  internationalNotice: "International supply available. Shipping and applicable charges will be calculated based on destination and order requirements."
};

export const BROCHURE_PAGES = Array.from({ length: 18 }, (_, i) => ({
  pageNumber: i + 1,
  title: getPageTitle(i + 1),
  image: `/assets/brochure/page-${String(i + 1).padStart(2, '0')}.jpg`,
}));

function getPageTitle(num) {
  const titles = {
    1: "Cover – Diya Collection 2026",
    2: "About Us & 15 Year Milestone",
    3: "Best Seller Collection",
    4: "In Pairs Collection (Swastik & Peacock Petal)",
    5: "Circular Lotus & Elephant Figurine Pairs",
    6: "Matsya Fish, Kurma Tortoise & Kalash Diyas",
    7: "Royal Shankh, Mango Paisley & Mini Peacock",
    8: "Handcrafted Samai Diya – Small (5 cm)",
    9: "Handcrafted Samai Diya – Medium (7 cm)",
    10: "Grand Peacock Pillar Samai Diya (Pair)",
    11: "Dome Akhand & Temple Lantern Diyas",
    12: "Crimson & Gold Dome Akhand Collection",
    13: "Tower Lanterns & Spherical Globe Diyas",
    14: "Hanging Diya Collection (Lotus, Peacock & Laxmi-Ganesh)",
    15: "Traditional 7-Flame Royal Peacock Diya",
    16: "Festive Shubh Labh Diya Sup Platter",
    17: "Decorative Laxmi Ganpati Puja Diya Plate",
    18: "Contact Information & Pune Location"
  };
  return titles[num] || `Brochure Page ${num}`;
}
