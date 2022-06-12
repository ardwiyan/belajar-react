import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import axiosInstance from "../../services/axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [pname, setPname] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const resGetProducts = await axiosInstance.get("/products");
      setProducts(resGetProducts.data);
    } catch (error) {
      alert("Terjadi kesalahan");
      console.log({ error });
    }
  };

  const renderProducts = () => {
    return products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  // const filter = () => {};

  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  const handleChange2 = (e) => {
    setPname(e.target.value);
  };
  const btnSearchHandler = async () => {
    try {
      const resGetProducts = await axiosInstance.get("/products");
      setProducts(resGetProducts.data);
      const filteringCategory = await resGetProducts.data.filter((product) => {
        const name = product.category.toLowerCase();
        const lowerKeyword = category.toLowerCase();
        return name.includes(lowerKeyword);
      });
      setProducts(filteringCategory);

      const filteringProducts = await filteringCategory.filter((product) => {
        const name = product.productName.toLowerCase();
        const lowerKeyword = pname.toLowerCase();
        return name.includes(lowerKeyword);
      });
      setProducts(filteringProducts);
    } catch (error) {
      alert("Terjadi kesalahan");
      console.log({ error });
    }
  };
  const selectSortHandler = async (e) => {
    try {
      const resGetProducts = await axiosInstance.get("/products");
      if (e.target.value === "az") {
        const sortAsc = resGetProducts.data.sort((a, b) => {
          const name1 = a.productName.toLowerCase();
          const name2 = b.productName.toLowerCase();
          if (name1 < name2) {
            return -1;
          }
          if (name1 > name2) {
            return 1;
          }
          return 0;
        });
        setProducts(sortAsc);
      } else if (e.target.value === "za") {
        const sortDesc = resGetProducts.data.sort((a, b) => {
          const name1 = a.productName.toLowerCase();
          const name2 = b.productName.toLowerCase();
          if (name1 < name2) {
            return 1;
          }
          if (name1 > name2) {
            return -1;
          }
          return 0;
        });
        setProducts(sortDesc);
      } else if (e.target.value === "highPrice") {
        const sortByPriceAsc = resGetProducts.data.sort((a, b) => {
          const numA = a.price;
          const numB = b.price;
          return numB - numA;
        });
        setProducts(sortByPriceAsc);
      } else if (e.target.value === "lowPrice") {
        const sortByPriceDesc = resGetProducts.data.sort((a, b) => {
          const numA = a.price;
          const numB = b.price;
          return numA - numB;
        });
        setProducts(sortByPriceDesc);
      } else setProducts(resGetProducts.data);
    } catch (error) {
      alert("Terjadi kesalahan");
      console.log({ error });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          {/* Filter */}
          <div className="card">
            <div className="card-header">
              <strong>Filter products</strong>
            </div>
            <div className="card-body">
              <label>Product Name</label>
              <input
                name="keyword"
                type="text"
                className="form-control mb-3"
                onChange={handleChange2}
              />
              <label>Product Category</label>
              <select
                name="category"
                className="form-control"
                onChange={handleChange}
              >
                <option value="">All Items</option>
                <option value="kaos">Kaos</option>
                <option value="celana">Celana</option>
                <option value="aksesoris">Aksesoris</option>
              </select>
              <button
                onClick={btnSearchHandler}
                className="btn btn-outline-primary mt-3 d-block w-100"
              >
                Search
              </button>
            </div>
          </div>

          {/* Sort */}
          <div className="card mt-4">
            <div className="card-header">
              <strong>Sort Products</strong>
            </div>
            <div className="card-body">
              <label className="mb-2">Sort by</label>
              <select
                name="sortBy"
                className="form-control"
                onChange={selectSortHandler}
              >
                <option value="">Default</option>
                <option value="lowPrice">Lowest Price</option>
                <option value="highPrice">Highest Price</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-9 d-flex flex-wrap ">
          {renderProducts(products)}
        </div>
      </div>
    </div>
  );
}

export default Home;
