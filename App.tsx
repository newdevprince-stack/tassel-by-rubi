import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { geminiService } from "./services/geminiService";
import { Category, Product } from "./types";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import MarkdownRenderer from "./components/MarkdownRenderer";
import HeroSlider from "./components/HeroSlider";
import CategoryIcons from "./components/CategoryIcons";

const App: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const {
    data: aiResult,
    isLoading: aiLoading,
    refetch,
  } = useQuery({
    queryKey: ["stylingAdvice", searchInput],
    queryFn: () => geminiService.getStylingAdvice(searchInput),
    enabled: false,
  });

  const boutiqueProducts: Product[] = useMemo(
    () => [
      {
        id: "1",
        title: "Royal Zardosi Latkan Pair",
        category: Category.LATKANS,
        description:
          "Extreme close-up of hand-threaded silk tassels featuring antique gold zardosi caps and semi-precious bead droplets. Pure artisanal perfection.",
        price: "PKR 12,500",
        imageUrl:
          "https://images.unsplash.com/photo-1610428011552-734764c290ee?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        isFeatured: true,
      },
      {
        id: "2",
        title: "Emerald Raw Silk Texture",
        category: Category.PRET,
        description:
          "Macro shot of our signature emerald raw silk, showcasing the natural slubs and rich pigment. Finished with hand-stitched silk buttons.",
        price: "PKR 28,000",
        imageUrl:
          "https://images.unsplash.com/photo-1765574780409-f1b8f7f0c3b6?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        isFeatured: true,
      },
      {
        id: "3",
        title: "Gold-Leaf Thread Embroidery",
        category: Category.UNSTITCHED,
        description:
          "A detailed view of unstitched luxury fabric featuring gold-leaf thread-work and delicate mirror highlights on premium cotton-silk.",
        price: "PKR 18,500",
        imageUrl:
          "https://plus.unsplash.com/premium_photo-1674617465296-1d8dd5e549ea?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "4",
        title: "Beaded Kiran Lace Detail",
        category: Category.DUPATTAS,
        description:
          "Heavy kiran border detail with real crystal beads, hand-applied to a champagne-hued net dupatta for an ethereal finish.",
        price: "PKR 9,800",
        imageUrl:
          "https://images.unsplash.com/photo-1698156581290-03689df66ee7?q=80&w=669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "5",
        title: "Ruby Velvet & Gold Tassels",
        category: Category.ACCENTS,
        description:
          "Lush micro-velvet texture paired with oversized corner tassels, featuring intricate bullion wire work and silk thread layers.",
        price: "PKR 35,000",
        imageUrl:
          "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "6",
        title: "Hand-Painted Organza Petals",
        category: Category.DUPATTAS,
        description:
          "Macro view of hand-painted floral motifs on crisp organza, featuring subtle pearl highlights and silk-piped edges.",
        price: "PKR 5,400",
        imageUrl:
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "7",
        title: "Artisan Tilla-Work Kalis",
        category: Category.BRIDAL,
        description:
          "Detailed embroidery of tilla and zardosi on 24 kalis, showcasing the weight and density of bridal craftsmanship.",
        price: "Bespoke Only",
        imageUrl:
          "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=800",
        isFeatured: true,
      },
      {
        id: "8",
        title: "Woven Chikankari Heritage",
        category: Category.SAREES,
        description:
          "The rhythmic beauty of hand-woven chikankari on ivory georgette. A testament to hours of meticulous artisan labor.",
        price: "PKR 48,000",
        imageUrl:
          "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=800",
      },
    ],
    []
  );

  const filteredProducts = useMemo(() => {
    return activeCategory === "All"
      ? boutiqueProducts
      : boutiqueProducts.filter((p) => p.category === activeCategory);
  }, [activeCategory, boutiqueProducts]);

  const selectedProduct = useMemo(
    () => boutiqueProducts.find((p) => p.id === selectedProductId),
    [selectedProductId, boutiqueProducts]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSelectedProductId(null);
      refetch();
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedProductId]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Promo Bar */}
      <div className="bg-maroon text-white text-[10px] uppercase tracking-[0.2em] font-bold py-2.5 text-center px-4">
        Handcrafted for Queens | Worldwide Express Shipping Available
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center py-10">
            <button
              onClick={() => {
                setSelectedProductId(null);
                setActiveCategory("All");
              }}
              className="flex flex-col items-center group"
            >
              <div className="relative mb-3 flex items-center gap-4">
                <div className="h-[1px] w-12 bg-[#b8860b]"></div>
                <svg
                  className="w-12 h-12 text-[#b8860b] group-hover:scale-110 transition-transform drop-shadow-md"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 16l-1 4h16l-1-4-3 1-2-5-2 5-3-1zm14.5-9c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zM4.5 7c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zM12 2c-.8 0-1.5.7-1.5 1.5S11.2 5 12 5s1.5-.7 1.5-1.5S12.8 2 12 2z" />
                </svg>
                <div className="h-[1px] w-12 bg-[#b8860b]"></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-[0.05em] text-slate-900 serif leading-none uppercase">
                <span className="italic text-[#b8860b] normal-case mr-3 font-medium">
                  Tassel Desgin by
                </span>
                <span className="text-maroon">RUBI</span>
              </h1>
              <p className="text-[11px] uppercase tracking-[0.8em] font-bold text-slate-400 mt-4 pl-2">
                TASSEL HOUSE LAHORE
              </p>
            </button>

            <div className="flex items-center gap-12 mt-8">
              {[
                "COLLECTIONS",
                "ARTISAN LATKANS",
                "PRET",
                "UNSTITCHED",
                "STYLING AI",
              ].map((link) => (
                <button
                  key={link}
                  className="text-[10px] font-bold text-slate-600 hover:text-maroon tracking-[0.2em] transition-all uppercase border-b border-transparent hover:border-maroon/30 pb-1"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setSelectedProductId(null)}
            relatedProducts={boutiqueProducts.filter(
              (p) =>
                p.category === selectedProduct.category &&
                p.id !== selectedProduct.id
            )}
            onSelectProduct={setSelectedProductId}
          />
        ) : (
          <>
            <HeroSlider />
            <CategoryIcons
              activeCategory={activeCategory}
              onSelectCategory={(cat) => {
                setActiveCategory(cat);
                setSelectedProductId(null);
              }}
            />

            <section className="max-w-4xl mx-auto px-4 py-20 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-12 h-1 bg-maroon/20"></div>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 serif italic text-maroon">
                Styling Concierge
              </h2>
              <p className="text-slate-500 mb-10 font-light text-base max-w-2xl mx-auto tracking-wide leading-relaxed">
                Let our AI-powered boutique assistant recommend the perfect
                tassels, fabric combinations, and royal color palettes for your
                next ensemble.
              </p>

              <form
                onSubmit={handleSearch}
                className="relative group max-w-2xl mx-auto"
              >
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="e.g., 'What tassels suit a gold Zardosi lehenga?'"
                  className="w-full px-10 py-6 rounded-full border border-slate-200 focus:border-maroon outline-none text-sm transition-all pr-44 shadow-lg focus:shadow-maroon/5"
                />
                <button
                  type="submit"
                  disabled={aiLoading}
                  className="absolute right-2 top-2 bottom-2 px-10 bg-maroon text-white text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-slate-900 transition-all disabled:opacity-50"
                >
                  {aiLoading ? "Searching..." : "Ask Concierge"}
                </button>
              </form>
            </section>

            {(aiResult || aiLoading) && (
              <section className="max-w-7xl mx-auto px-4 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {aiLoading && (
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="w-10 h-10 border-2 border-maroon border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-maroon text-[10px] uppercase tracking-[0.3em] font-bold">
                      Reviewing Artisan Records...
                    </p>
                  </div>
                )}

                {aiResult && !aiLoading && (
                  <div className="bg-white border border-slate-100 rounded-sm p-10 md:p-16 luxury-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                      <svg
                        className="w-64 h-64 text-maroon"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 16l-1 4h16l-1-4-3 1-2-5-2 5-3-1zm14.5-9c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zM4.5 7c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zM12 2c-.8 0-1.5.7-1.5 1.5S11.2 5 12 5s1.5-.7 1.5-1.5S12.8 2 12 2z" />
                      </svg>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
                      <div className="lg:col-span-8">
                        <div className="flex items-center gap-3 mb-8">
                          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-maroon">
                            Artisan Advice
                          </span>
                          <div className="h-[1px] flex-grow bg-maroon/10"></div>
                        </div>
                        <h3 className="text-3xl font-bold mb-8 serif text-slate-900 italic">
                          Recommended Styling Guide
                        </h3>
                        <MarkdownRenderer content={aiResult.answer} />
                      </div>
                      <div className="lg:col-span-4 border-l border-slate-100 pl-10">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400 mb-8">
                          Inspired Collections
                        </h4>
                        <div className="space-y-6">
                          {aiResult.sources.map(
                            (source, i) =>
                              source.web && (
                                <a
                                  key={i}
                                  href={source.web.uri}
                                  target="_blank"
                                  className="block p-5 bg-slate-50/50 rounded-sm border border-transparent hover:border-maroon/20 hover:bg-white transition-all group"
                                >
                                  <p className="text-[11px] font-bold leading-tight mb-2 text-slate-800">
                                    {source.web.title}
                                  </p>
                                  <span className="text-[9px] uppercase font-bold text-maroon opacity-60">
                                    {new URL(source.web.uri).hostname}
                                  </span>
                                </a>
                              )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            )}

            <section className="max-w-7xl mx-auto px-4 py-20 border-t border-slate-50">
              <div className="flex flex-col items-center mb-16 text-center">
                <h3 className="text-3xl md:text-4xl font-bold serif text-slate-900 mb-4 tracking-tight">
                  {activeCategory === "All"
                    ? "Signature Artisan Works"
                    : activeCategory}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] mb-6">
                  A Curation of Excellence
                </p>
                <div className="h-0.5 w-12 bg-maroon"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    title={product.title}
                    category={product.category}
                    description={product.description}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    isNew={product.isFeatured}
                    onSelect={() => setSelectedProductId(product.id)}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        <footer className="bg-slate-900 text-white pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16 border-b border-white/5 pb-20">
            <div className="col-span-1 md:col-span-1">
              <h4 className="text-2xl font-bold serif mb-6 tracking-tight text-[#b8860b]">
                THE QUEEN RUBI
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed font-light tracking-wide">
                Defining royal elegance through handcrafted tassels and luxury
                textiles. Every thread is a tribute to heritage artisanry.
              </p>
              <div className="flex gap-6 mt-10">
                {["FB", "IG", "WA"].map((social) => (
                  <button
                    key={social}
                    className="text-[10px] font-bold text-slate-500 hover:text-[#b8860b] transition-colors tracking-widest"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-[#b8860b]">
                The Boutique
              </h5>
              <ul className="text-xs text-slate-400 space-y-5 font-light">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Craft Process
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Bespoke Inquiry
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Artisan Registry
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    International Care
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-[#b8860b]">
                Collections
              </h5>
              <ul className="text-xs text-slate-400 space-y-5 font-light">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Bridal Latkans
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Luxury Pret
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Hand-Painted Organza
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Raw Silk Series
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-[#b8860b]">
                Contact House
              </h5>
              <ul className="text-xs text-slate-400 space-y-5 font-light">
                <li className="flex items-center gap-3">
                  <span className="text-[#b8860b]">WA:</span> +92 300 0000000
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#b8860b]">Email:</span>{" "}
                  concierge@rubiqueen.com
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#b8860b]">Atelier:</span> Lahore,
                  Pakistan
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[9px] uppercase tracking-[0.4em] text-slate-500 font-bold">
              &copy; 2025 THE RUBI QUEEN ATELIER. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-8 opacity-40 grayscale">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                className="h-3"
                alt="Visa"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                className="h-5"
                alt="Mastercard"
              />
            </div>
          </div>
        </footer>
      </main>

      <a
        href="https://wa.me/923000000000"
        target="_blank"
        className="fixed bottom-10 right-10 z-[100] bg-[#25d366] text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 group border-4 border-white/20"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 text-sm font-bold whitespace-nowrap uppercase tracking-widest">
          Inquiry
        </span>
      </a>
    </div>
  );
};

export default App;
