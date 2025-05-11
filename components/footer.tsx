import Image from "next/image"
import Link from "next/link"
import "./footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-newsletter">
            <h3>BE THE FIRST TO KNOW</h3>
            <p>Sign up for updates from mettā muse.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your e-mail..." />
              <button>SUBSCRIBE</button>
            </div>
          </div>

          <div className="footer-contact">
            <h3>CONTACT US</h3>
            <p>+44 221 133 5360</p>
            <p>customercare@mettamuse.com</p>

            <div className="currency-selector">
              <h3>CURRENCY</h3>
              <div className="currency-option">
                <span className="currency-flag">$</span>
                <span>USD</span>
              </div>
              <p className="currency-note">
                Transactions will be completed in Euros and a currency reference is available on hover.
              </p>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-middle">
          <div className="footer-links-column">
            <h3>mettā muse</h3>
            <ul>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/stories">Stories</Link>
              </li>
              <li>
                <Link href="/artisans">Artisans</Link>
              </li>
              <li>
                <Link href="/boutiques">Boutiques</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/eu-compliance">EU Compliances Docs</Link>
              </li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h3>QUICK LINKS</h3>
            <ul>
              <li>
                <Link href="/orders">Orders & Shipping</Link>
              </li>
              <li>
                <Link href="/join">Join/Login as a Seller</Link>
              </li>
              <li>
                <Link href="/payment">Payment & Pricing</Link>
              </li>
              <li>
                <Link href="/returns">Return & Refunds</Link>
              </li>
              <li>
                <Link href="/faqs">FAQs</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          <div className="footer-social">
            <h3>FOLLOW US</h3>
            <div className="social-icons">
              <Link href="https://instagram.com" aria-label="Instagram">
                <div className="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                      fill="white"
                    />
                  </svg>
                </div>
              </Link>
              <Link href="https://linkedin.com" aria-label="LinkedIn">
                <div className="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                      fill="white"
                    />
                  </svg>
                </div>
              </Link>
            </div>

            <div className="payment-methods">
              <h3>mettā muse ACCEPTS</h3>
              <div className="payment-icons">
                <div className="payment-icon">
                  <Image src="/google-pay.png" alt="Google Pay" width={40} height={25} />
                </div>
                <div className="payment-icon">
                  <Image src="/mastercard.png" alt="Mastercard" width={40} height={25} />
                </div>
                <div className="payment-icon">
                  <Image src="/paypal.png" alt="PayPal" width={40} height={25} />
                </div>
                <div className="payment-icon">
                  <Image src="/amex.png" alt="American Express" width={40} height={25} />
                </div>
                <div className="payment-icon">
                  <Image src="/apple-pay.png" alt="Apple Pay" width={40} height={25} />
                </div>
                <div className="payment-icon">
                  <Image src="/shop-pay.png" alt="Shop Pay" width={40} height={25} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright © 2023 mettamuse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
