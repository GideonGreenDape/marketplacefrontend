import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const cat = params.get("cat") || "all";

  
  const categoryNameMap = {
    design: "Graphics & Design",
    video: "Video & Animation",
    writing: "Writing & Translation",
    ai: "AI Services",
    marketing: "Digital Marketing",
    music: "Music & Audio",
    tech: "Programming & Tech",
    business: "Business",
    lifestyle: "Lifestyle",
    photography: "photography",
    data: "data",
  };

  const categoryDisplay = categoryNameMap[cat] || "All Gigs";

   const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", search, sort],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}${
            search.includes("?") ? "&" : "?"
          }min=${minRef.current?.value || ""}&max=${
            maxRef.current?.value || ""
          }&sort=${sort}`
        )
        .then((res) => res.data),
  });

  
  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  
  useEffect(() => {
    refetch();
  }, [sort]);

  
  const apply = () => {
    refetch();
  };

  return (
    <div className="gigs">
     <div className="container">
        <span className="breadcrumbs">Talent Marketplace &gt; {categoryDisplay} &gt;</span>
        <h1>{categoryDisplay}</h1>
        <p>Explore the best {categoryDisplay.toLowerCase()} gigs on Talent Marketplace.</p>

        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
