"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"
import "./styles.css"

export default function ProductShowcase() {
  const [showFilters, setShowFilters] = useState(true)
  const [selectedSort, setSelectedSort] = useState("RECOMMENDED")
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showMobileFilterDrawer, setShowMobileFilterDrawer] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    "IDEAL FOR": true,
    OCCASION: false,
    WORK: false,
    FABRIC: false,
    SEGMENT: false,
    "SUITABLE FOR": false,
    "RAW MATERIALS": false,
    PATTERN: false,
  })
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    "IDEAL FOR": ["All"],
    OCCASION: ["All"],
    WORK: ["All"],
    FABRIC: ["All"],
    SEGMENT: ["All"],
    "SUITABLE FOR": ["All"],
    "RAW MATERIALS": ["All"],
    PATTERN: ["All"],
  })
  const [customizable, setCustomizable] = useState(false)
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const toggleFilter = (category: string) => {
    setExpandedFilters({
      ...expandedFilters,
      [category]: !expandedFilters[category],
    })
  }

  const toggleFavorite = (productId: string) => {
    setFavorites({
      ...favorites,
      [productId]: !favorites[productId],
    })
  }

  const toggleFilterOption = (category: string, option: string) => {
    const currentOptions = selectedFilters[category] || []

    // If "All" is being selected, clear other options
    if (option === "All") {
      setSelectedFilters({
        ...selectedFilters,
        [category]: ["All"],
      })
      return
    }

    // If another option is being selected, remove "All"
    let newOptions = currentOptions.filter((opt) => opt !== "All")

    // Toggle the selected option
    if (newOptions.includes(option)) {
      newOptions = newOptions.filter((opt) => opt !== option)
      // If no options left, reselect "All"
      if (newOptions.length === 0) {
        newOptions = ["All"]
      }
    } else {
      newOptions.push(option)
    }

    setSelectedFilters({
      ...selectedFilters,
      [category]: newOptions,
    })
  }

  const sortProducts = (products: Product[]) => {
    switch (selectedSort) {
      case "NEWEST FIRST":
        // Fix: Convert string IDs to numbers or compare as strings
        return [...products].sort((a, b) => {
          // If IDs are numeric strings, convert to numbers
          const idA = parseInt(a.id) || 0;
          const idB = parseInt(b.id) || 0;
          return idB - idA;
        });
      case "POPULAR":
        return [...products].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      case "PRICE : HIGH TO LOW":
        return [...products].sort((a, b) => {
          const priceA = a.numericPrice || 0;
          const priceB = b.numericPrice || 0;
          return priceB - priceA;
        });
      case "PRICE : LOW TO HIGH":
        return [...products].sort((a, b) => {
          const priceA = a.numericPrice || 0;
          const priceB = b.numericPrice || 0;
          return priceA - priceB;
        });
      default:
        return [...products].sort((a, b) => (b.recommended || 0) - (a.recommended || 0));
    }
  };

  const filterProducts = (products: Product[]) => {
    return products.filter((product) => {
      // Filter by customizable
      if (customizable && !product.customizable) {
        return false
      }

      // Apply category filters
      for (const [category, options] of Object.entries(selectedFilters)) {
        // Skip if "All" is selected
        if (options.includes("All")) {
          continue
        }

        // Check if product matches any selected option in this category
        const productCategory = product.categories?.[category] || []
        const hasMatch = options.some((option) => productCategory.includes(option))
        if (!hasMatch) {
          return false
        }
      }

      return true
    })
  }

  const filteredAndSortedProducts = sortProducts(filterProducts(products))
  const totalItems = filteredAndSortedProducts.length

  return (
    <div className="page-container">
      <div className="container">
        <header className="header">
          {/* Desktop header */}
          <div className="logo-container">
            <div className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="2" />
                <path d="M4 12H20" stroke="currentColor" strokeWidth="2" />
                <path d="M12 4V20" stroke="currentColor" strokeWidth="2" />
                <path d="M4 4L20 20" stroke="currentColor" strokeWidth="2" />
                <path d="M20 4L4 20" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>

          <div className="logo">LOGO</div>

          <div className="header-actions">
            <button className="icon-button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <button className="icon-button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button className="icon-button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
                  fill="currentColor"
                />
                <path
                  d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
                  fill="currentColor"
                />
                <path
                  d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="language-selector">
              <span>ENG</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Mobile header */}
          <div className="mobile-header">
            <button className="menu-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="logo">LOGO</div>

            <div className="header-actions">
              <button className="icon-button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                  <path d="M21 21L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <button className="icon-button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>
              <button className="icon-button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
                    fill="currentColor"
                  />
                  <path
                    d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
                    fill="currentColor"
                  />
                  <path
                    d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <div className="breadcrumb">
          <Link href="/">HOME</Link> <span>›</span>{" "}
          <Link href="/shop" className="active">
            SHOP
          </Link>
        </div>

        <nav className="navigation">
          <ul>
            <li>
              <Link href="#shop" className="active">
                SHOP
              </Link>
            </li>
            <li>
              <Link href="#skills">SKILLS</Link>
            </li>
            <li>
              <Link href="#stories">STORIES</Link>
            </li>
            <li>
              <Link href="#about">ABOUT</Link>
            </li>
            <li>
              <Link href="#contact">CONTACT US</Link>
            </li>
          </ul>
        </nav>

        <main>
          <section className="hero">
            <h1>DISCOVER OUR PRODUCTS</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus scelerisque. Dolor integer scelerisque
              nibh amet mi ut elementum dolor.
            </p>
          </section>

          <section className="products-container">
            <div className="mobile-filters">
              <button className="filter-button" onClick={() => setShowMobileFilterDrawer(true)}>
                FILTER
              </button>
              <div className="sort-dropdown">
                <button className="sort-button" onClick={() => setShowSortDropdown(!showSortDropdown)}>
                  {selectedSort}
                  <svg
                    className={showSortDropdown ? "expanded" : ""}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {showSortDropdown && (
                  <div className="sort-options">
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        className={`sort-option ${selectedSort === option ? "active" : ""}`}
                        onClick={() => {
                          setSelectedSort(option)
                          setShowSortDropdown(false)
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Filter Drawer */}
            <div
              className={`mobile-filter-drawer ${showMobileFilterDrawer ? "open" : ""}`}
              onClick={() => setShowMobileFilterDrawer(false)}
            >
              <div className="mobile-filter-content" onClick={(e) => e.stopPropagation()}>
                <div className="mobile-filter-header">
                  <h3>FILTERS</h3>
                  <button className="mobile-filter-close" onClick={() => setShowMobileFilterDrawer(false)}>
                    ✕
                  </button>
                </div>
                <div className="filter-options">
                  <div className="filter-option customizable">
                    <label className="checkbox-container">
                      <input type="checkbox" checked={customizable} onChange={() => setCustomizable(!customizable)} />
                      <span className="checkmark"></span>
                      CUSTOMIZABLE
                    </label>
                  </div>

                  {Object.entries(filterCategories).map(([category, options]) => (
                    <div className="filter-category" key={category}>
                      <div className="filter-category-header" onClick={() => toggleFilter(category)}>
                        <span>{category}</span>
                        <svg
                          className={expandedFilters[category] ? "expanded" : ""}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      {expandedFilters[category] && (
                        <div className="filter-options-list">
                          <div className="filter-option">
                            <label className="radio-container">
                              <input
                                type="radio"
                                checked={selectedFilters[category]?.includes("All")}
                                onChange={() => toggleFilterOption(category, "All")}
                              />
                              <span className="radio-mark"></span>
                              All
                            </label>
                          </div>

                          {options.map((option) => (
                            <div className="filter-option" key={option}>
                              {category === "IDEAL FOR" ? (
                                <label className="checkbox-container">
                                  <input
                                    type="checkbox"
                                    checked={selectedFilters[category]?.includes(option)}
                                    onChange={() => toggleFilterOption(category, option)}
                                  />
                                  <span className="checkmark"></span>
                                  {option}
                                </label>
                              ) : (
                                <label className="radio-container">
                                  <input
                                    type="radio"
                                    checked={selectedFilters[category]?.includes(option)}
                                    onChange={() => toggleFilterOption(category, option)}
                                  />
                                  <span className="radio-mark"></span>
                                  {option}
                                </label>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`filters-sidebar ${showFilters ? "show" : "hide"}`}>
              <div className="filters-header">
                <span className="item-count">{totalItems} ITEMS</span>
                <button className="hide-filter-btn" onClick={() => setShowFilters(false)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15 6L9 12L15 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  HIDE FILTER
                </button>
              </div>

              <div className="filter-options">
                <div className="filter-option customizable">
                  <label className="checkbox-container">
                    <input type="checkbox" checked={customizable} onChange={() => setCustomizable(!customizable)} />
                    <span className="checkmark"></span>
                    CUSTOMIZABLE
                  </label>
                </div>

                {Object.entries(filterCategories).map(([category, options]) => (
                  <div className="filter-category" key={category}>
                    <div className="filter-category-header" onClick={() => toggleFilter(category)}>
                      <span>{category}</span>
                      <svg
                        className={expandedFilters[category] ? "expanded" : ""}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    {expandedFilters[category] && (
                      <div className="filter-options-list">
                        <div className="filter-option">
                          <label className="radio-container">
                            <input
                              type="radio"
                              checked={selectedFilters[category]?.includes("All")}
                              onChange={() => toggleFilterOption(category, "All")}
                            />
                            <span className="radio-mark"></span>
                            All
                          </label>
                        </div>

                        {options.map((option) => (
                          <div className="filter-option" key={option}>
                            {category === "IDEAL FOR" ? (
                              <label className="checkbox-container">
                                <input
                                  type="checkbox"
                                  checked={selectedFilters[category]?.includes(option)}
                                  onChange={() => toggleFilterOption(category, option)}
                                />
                                <span className="checkmark"></span>
                                {option}
                              </label>
                            ) : (
                              <label className="radio-container">
                                <input
                                  type="radio"
                                  checked={selectedFilters[category]?.includes(option)}
                                  onChange={() => toggleFilterOption(category, option)}
                                />
                                <span className="radio-mark"></span>
                                {option}
                              </label>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="products-section">
              <div className="products-header">
                {!showFilters && (
                  <button className="show-filter-btn" onClick={() => setShowFilters(true)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9 6L15 12L9 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    SHOW FILTER
                  </button>
                )}

                <div className="sort-dropdown">
                  <button className="sort-button" onClick={() => setShowSortDropdown(!showSortDropdown)}>
                    {selectedSort}
                    <svg
                      className={showSortDropdown ? "expanded" : ""}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {showSortDropdown && !isMobile && (
                    <div className="sort-options">
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          className={`sort-option ${selectedSort === option ? "active" : ""}`}
                          onClick={() => {
                            setSelectedSort(option)
                            setShowSortDropdown(false)
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="products-grid">
                {filteredAndSortedProducts.map((product) => (
                  <div className="product-card" key={product.id}>
                    <div className="product-image">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={250}
                        height={250}
                        className="product-img"
                      />
                      <button
                        className={`favorite-btn ${favorites[product.id] || product.favorite ? "active" : ""}`}
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            fill={favorites[product.id] || product.favorite ? "#FF0000" : "none"}
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                    </div>
                    <div className="product-pricing">
                      <p className="pricing-info">Sign in or Create an account to see pricing</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pagination">
                <div className="pagination-dots">
                  <button className="pagination-dot active">1</button>
                  <button className="pagination-dot">2</button>
                  <button className="pagination-dot">3</button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  )
}

interface Product {
  id: string
  name: string
  image: string
  price?: string
  numericPrice?: number
  favorite?: boolean
  customizable?: boolean
  recommended?: number
  popularity?: number
  categories?: Record<string, string[]>
}

const products: Product[] = [
  {
    id: "p1",
    name: "RECYCLED BACKPACK",
    image: "/gray-backpack.png",
    numericPrice: 99,
    favorite: false,
    customizable: true,
    recommended: 5,
    popularity: 8,
    categories: {
      "IDEAL FOR": ["Men"],
      OCCASION: ["Casual"],
      WORK: ["Office"],
      FABRIC: ["Canvas"],
      SEGMENT: ["Premium"],
      "SUITABLE FOR": ["Travel"],
      "RAW MATERIALS": ["Cotton"],
      PATTERN: ["Solid"],
    },
  },
  {
    id: "p2",
    name: "PRODUCT NAME",
    image: "/yellow-stuffed-toy.png",
    numericPrice: 45,
    favorite: true,
    customizable: false,
    recommended: 4,
    popularity: 10,
    categories: {
      "IDEAL FOR": ["Baby & Kids"],
      OCCASION: ["Gift"],
      WORK: ["Play"],
      FABRIC: ["Yarn"],
      SEGMENT: ["Standard"],
      "SUITABLE FOR": ["Home"],
      "RAW MATERIALS": ["Cotton"],
      PATTERN: ["Character"],
    },
  },
  {
    id: "p3",
    name: "PRODUCT NAME",
    image: "/leather-bracelet.png",
    numericPrice: 35,
    favorite: false,
    customizable: true,
    recommended: 3,
    popularity: 6,
    categories: {
      "IDEAL FOR": ["Women", "Men"],
      OCCASION: ["Casual", "Gift"],
      WORK: ["Fashion"],
      FABRIC: ["Leather"],
      SEGMENT: ["Premium"],
      "SUITABLE FOR": ["Daily Use"],
      "RAW MATERIALS": ["Leather"],
      PATTERN: ["Braided"],
    },
  },
  {
    id: "p4",
    name: "PRODUCT NAME",
    image: "/white-baseball-cap.png",
    numericPrice: 29,
    favorite: true,
    customizable: true,
    recommended: 2,
    popularity: 7,
    categories: {
      "IDEAL FOR": ["Men", "Women"],
      OCCASION: ["Casual", "Sports"],
      WORK: ["Outdoor"],
      FABRIC: ["Cotton"],
      SEGMENT: ["Standard"],
      "SUITABLE FOR": ["Daily Use"],
      "RAW MATERIALS": ["Cotton"],
      PATTERN: ["Solid"],
    },
  },
  {
    id: "p5",
    name: "PRODUCT NAME",
    image: "/dark-leather-backpack.png",
    numericPrice: 120,
    favorite: false,
    customizable: false,
    recommended: 5,
    popularity: 9,
    categories: {
      "IDEAL FOR": ["Men"],
      OCCASION: ["Business", "Travel"],
      WORK: ["Office"],
      FABRIC: ["Leather"],
      SEGMENT: ["Luxury"],
      "SUITABLE FOR": ["Work"],
      "RAW MATERIALS": ["Leather"],
      PATTERN: ["Solid"],
    },
  },
  {
    id: "p6",
    name: "PRODUCT NAME",
    image: "/yellow-dinosaur-toy.png",
    numericPrice: 40,
    favorite: false,
    customizable: false,
    recommended: 3,
    popularity: 8,
    categories: {
      "IDEAL FOR": ["Baby & Kids"],
      OCCASION: ["Gift", "Play"],
      WORK: ["Play"],
      FABRIC: ["Yarn"],
      SEGMENT: ["Standard"],
      "SUITABLE FOR": ["Home"],
      "RAW MATERIALS": ["Cotton"],
      PATTERN: ["Character"],
    },
  },
  {
    id: "p7",
    name: "PRODUCT NAME",
    image: "/leather-bracelet-brown.png",
    numericPrice: 30,
    favorite: false,
    customizable: true,
    recommended: 4,
    popularity: 5,
    categories: {
      "IDEAL FOR": ["Men", "Women"],
      OCCASION: ["Casual"],
      WORK: ["Fashion"],
      FABRIC: ["Leather"],
      SEGMENT: ["Standard"],
      "SUITABLE FOR": ["Daily Use"],
      "RAW MATERIALS": ["Leather"],
      PATTERN: ["Braided"],
    },
  },
  {
    id: "p8",
    name: "PRODUCT NAME",
    image: "/gray-fabric.png",
    numericPrice: 25,
    favorite: false,
    customizable: true,
    recommended: 2,
    popularity: 4,
    categories: {
      "IDEAL FOR": ["Women"],
      OCCASION: ["Casual"],
      WORK: ["Fashion"],
      FABRIC: ["Cotton"],
      SEGMENT: ["Standard"],
      "SUITABLE FOR": ["Home"],
      "RAW MATERIALS": ["Cotton"],
      PATTERN: ["Solid"],
    },
  },
]

const filterCategories = {
  "IDEAL FOR": ["Men", "Women", "Baby & Kids"],
  OCCASION: ["Casual", "Business", "Gift", "Sports", "Travel", "Play"],
  WORK: ["Office", "Fashion", "Outdoor", "Play"],
  FABRIC: ["Canvas", "Leather", "Cotton", "Yarn"],
  SEGMENT: ["Standard", "Premium", "Luxury"],
  "SUITABLE FOR": ["Daily Use", "Travel", "Work", "Home"],
  "RAW MATERIALS": ["Cotton", "Leather"],
  PATTERN: ["Solid", "Character", "Braided"],
}

const sortOptions = ["RECOMMENDED", "NEWEST FIRST", "POPULAR", "PRICE : HIGH TO LOW", "PRICE : LOW TO HIGH"]
