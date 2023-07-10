import React from "react"
import "./style.css"

const Footer = () => {
  return (
    <>
      <footer className="py-3">
        <div className="">
          <div className="row">
            <div className="col 2 mb=0 text-white">
              <p className="text-center">&copy; {new Date().getFullYear()};Fashion Frenzy Style{""} </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
