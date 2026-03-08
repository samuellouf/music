import { getWebsiteRoot } from "./utils"
import logo from "/icon.svg"
import "./header.css"

function Header(){
  return (
    <>
      <div id="header">
        <img src={logo} alt="My logo" title="Back to the main website" onClick={() => {open("https://samuellouf.github.io/", "_self")}}/>
        <h1 onClick={() => {open(getWebsiteRoot(), "_self")}}>My Music</h1>
      </div>
    </>
  )
}

export default Header;