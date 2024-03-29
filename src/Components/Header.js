import React from "react";
import "../Scss/style.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeCategory } from "../features/categorySlice";
import { useState, useEffect ,useRef} from "react";
import { useSelector } from "react-redux";
const Header = () => {
  const myFunc = () => {
    document.querySelector(".navbar").classList.toggle("open");
  };
  const count = useSelector((state) => state.cart.cartTotalQuantity);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const handleChangeFilter = (category) => {
    dispatch(changeCategory(category));
    navigate("/productspage");
  };
  const [data, setData] = useState([]);
  let componentMounted = useRef(true);
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        `https://fakestoreapi.com/products/categories`
      );
      if (componentMounted) {
        setData(await response.json());
      }
      return () => {
        componentMounted.current = false;
      };
    };
    getProducts();
  }, []);
  return (
    <header className="container">
      <div className="headertop">
        <div>
          <img
            src={require("../Images/menu.png")}
            alt=""
            onClick={() => myFunc()}
          />
          <i
            className="fa-solid fa-house"
            onClick={() => {
              navigate("/");
            }}
          ></i>
          <h1
            onClick={() => {
              navigate("/");
            }}
          >
            Project
          </h1>
        </div>
        <div>
          <input type="text" placeholder="Not working for now" />
          <i className="fas fa-search"></i>
        </div>
        <div>
          <img src={require("../Images/person.png")} alt="" />
          <img src={require("../Images/heart.png")} alt="" />
          <span style={{position:"relative",}}>
            <img
              src={require("../Images/basket.png")}
              alt=""
              onClick={() => {
                navigate("/cart");
              }}
            />
            <span style={{color:"#2dd06e",fontWeight:"600",position:"absolute",top:"-12px"}}>{count}</span>
          </span>
        </div>
      </div>
      <nav className="navbar">
        <ul id="headermenu">
          {data.map((e) => (
            <li
              key={e}
              onClick={() => {
                handleChangeFilter(e);
                myFunc();
              }}
            >
              {e.slice(0, 1).toUpperCase() + e.slice(1)}
            </li>
          ))}
          <div className="menuCloser">
            <button onClick={() => myFunc()}>Close</button>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
