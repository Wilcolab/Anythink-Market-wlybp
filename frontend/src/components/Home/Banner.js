import React from "react";
import logo from "../../imgs/logo.png";
import SearchBar from "./SearchBar";

class Banner extends React.Component {
  state = {
    showSearchField: false,
  };
  render() {
    return (
      <div className="banner text-white">
        <div className="container p-4 text-center">
          <img src={logo} alt="banner" />
          <div>
            <span>A place to</span>
            <span
              id="get-part"
              onClick={(_) => {
                this.setState({ showSearchField: true });
              }}
            >
              {" "}
              get{" "}
            </span>
            {this.state.showSearchField && <SearchBar />}
            <span> the cool stuff.</span>
          </div>
        </div>
      </div>
    );
  }
}
export default Banner;
