import React from "react"

const FooterContainer = () => (
  <footer className="identification__footer bg-green-700 w-full font-sans text-white text-center p-2 md:p-4">
    <a href="https://product-identifier.pages.dev"><h4>Product Identifier © {new Date().getFullYear()}</h4></a>
  </footer>
)

export default FooterContainer