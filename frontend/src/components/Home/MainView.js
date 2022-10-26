import ItemList from "../ItemList";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import { CHANGE_TAB, UPDATE_TITLE_SEARCH_VALUE } from "../../constants/actionTypes";

const Search = (props) => {
  const clickHandler  = (e) => {
    e.preventDefault();
    props.onNewSearch(
      "all",
      agent.Items.all,
      agent.Items.all(props.searchValue || "")
    );
  };

  const onTextUpdate = (e) => props.onSearchValueChange(e.target.value);

  return (
    <div className="search-box">
      <input type="text" onChange={onTextUpdate} value={props.searchValue} />
      <button type="button" onClick={clickHandler}>Search</button>
    </div>
  );
};

const YourFeedTab = (props) => {
  if (props.token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      props.onTabClick("feed", agent.Items.feed, agent.Items.feed());
    };

    return (
      <li className="nav-item">
        <button
          type="button"
          className={props.tab === "feed" ? "nav-link active" : "nav-link"}
          onClick={clickHandler}
        >
          Your Feed
        </button>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = (props) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    props.onTabClick("all", agent.Items.all, agent.Items.all(props.searchValue || ""));
  };
  return (
    <li className="nav-item">
      <button
        type="button"
        className={props.tab === "all" ? "nav-link active" : "nav-link"}
        onClick={clickHandler}
      >
        Global Feed
      </button>
    </li>
  );
};

const TagFilterTab = (props) => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <button type="button" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </button>
    </li>
  );
};

const mapStateToProps = (state) => ({
  ...state.itemList,
  tags: state.home.tags,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (tab, pager, payload) =>
    dispatch({ type: CHANGE_TAB, tab, pager, payload }),
  onNewSearch: (tab, pager, payload) =>
    dispatch({ type: CHANGE_TAB, tab, pager, payload }),
  onSearchValueChange: (searchValue) =>
    dispatch({ type: UPDATE_TITLE_SEARCH_VALUE, payload: { searchValue }}),
});

const MainView = (props) => {
  return (
    <div>
      <div className="feed-toggle">
        <ul className="nav nav-tabs">
          <YourFeedTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick}
          />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} searchValue={props.searchValue} />

          <TagFilterTab tag={props.tag} />
        </ul>
      </div>

      {props.tab === "all" && (
        <Search
          onSearchValueChange={props.onSearchValueChange}
          searchValue={props.searchValue}
          onNewSearch={props.onNewSearch}
        />
      )}

      <ItemList
        pager={props.pager}
        items={props.items}
        loading={props.loading}
        itemsCount={props.itemsCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
