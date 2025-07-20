import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Gem, Globe, Leaf, Languages, Tag, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const productData = [
  { id: 1, name: "Ruby Necklace", price: 1200, image: "/products/ruby-necklace.jpg" },
  { id: 2, name: "Sapphire Ring", price: 980, image: "/products/sapphire-ring.jpg" },
  { id: 3, name: "Emerald Earrings", price: 1500, image: "/products/emerald-earrings.jpg" },
];

export default function GemsByMikeHome() {
  const { t } = useTranslation();
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [products] = useState(productData);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <img src="/logo.png" alt="GemsByMike Logo" className="h-16" />
        <nav className="space-x-6 text-lg flex items-center">
          <a href="#about" className="hover:text-gold-600">{t("about")}</a>
          <a href="#products" className="hover:text-gold-600">{t("gemstones")}</a>
          <a href="#contact" className="hover:text-gold-600">{t("contact")}</a>
          <div className="flex items-center gap-1">
            <ShoppingCart className="w-5 h-5" />
            <span>{cart.length}</span>
          </div>
        </nav>
      </header>

      <section className="text-center py-16 px-4">
        <h1 className="text-5xl font-bold text-gold-700 mb-4">{t("title")}</h1>
        <p className="text-xl max-w-3xl mx-auto">{t("tagline")}</p>
        <Button className="mt-6 text-lg">{t("explore")}</Button>
      </section>

      <section className="py-6 px-6 flex justify-between gap-4 items-center">
        <div className="flex items-center gap-4">
          <Tag className="w-5 h-5 text-gold-600" />
          <div className="flex gap-2">
            {['Ruby', 'Sapphire', 'Emerald', 'Diamond'].map((cat) => (
              <Button key={cat} variant="outline" className="text-sm">
                {cat}
              </Button>
            ))}
          </div>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <div className="flex items-center gap-2">
          <Languages className="w-5 h-5 text-gold-600" />
          <select className="border px-2 py-1 rounded" onChange={handleLanguageChange} defaultValue={i18n.language}>
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="es">ES</option>
            <option value="de">DE</option>
          </select>
        </div>
      </section>

      <section id="products" className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">{t("ourProducts")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="text-center">
              <CardContent className="p-6">
                <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded mb-4" />
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-lg text-gold-600 mb-2">${product.price.toLocaleString()}</p>
                <Button onClick={() => addToCart(product)}>{t("addToCart")}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="checkout" className="py-12 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-6">{t("checkout")}</h2>
        {cart.length === 0 ? (
          <p className="text-center">{t("cartEmpty")}</p>
        ) : (
          <div className="max-w-2xl mx-auto space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between border-b pb-2">
                <span>{item.name}</span>
                <span>${item.price.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-xl">
              <span>{t("total")}</span>
              <span>${totalPrice.toLocaleString()}</span>
            </div>
            <Button className="w-full mt-4">{t("placeOrder")}</Button>
          </div>
        )}
      </section>

      <section id="contact" className="bg-gray-100 py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">{t("contactUs")}</h2>
        <div className="space-y-4">
          <div className="flex justify-center items-center gap-2">
            <Mail className="w-5 h-5 text-gold-600" />
            <span>contact@gemsbymike.com</span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Phone className="w-5 h-5 text-gold-600" />
            <span>+1 234 567 890</span>
          </div>
        </div>
      </section>

      <footer className="bg-white p-6 text-center text-sm text-gray-600">
        <p>&copy; 2025 GemsByMike. All rights reserved.</p>
      </footer>
    </div>
  );
}
