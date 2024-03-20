const profile = document.getElementById("profile");
const sub_navbar = document.getElementById("sub-navbar");
const arrow = document.getElementById("arrow");
const user = document.getElementById("user");

const url = window.location.origin;

const name = localStorage.getItem("name");
const token = localStorage.getItem("token");

if (name == null || token == null) {
  window.location.href = url + "/login.html";
}
profile.addEventListener("mouseover", () => {
  user.innerHTML = name;
  sub_navbar.style.display = "block";
  arrow.classList.remove("fa-angle-down");
  arrow.classList.add("fa-angle-up");
});
profile.addEventListener("mouseout", () => {
  sub_navbar.style.display = "none";
  arrow.classList.remove("fa-angle-up");
  arrow.classList.add("fa-angle-down");
});

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("name");
  localStorage.removeItem("token");
  window.location.href = url;
});
document.getElementById("orders").addEventListener("click", () => {
  window.location.href = url + "/order.html";
});
document.getElementById("my_profile").addEventListener("click", () => {
  window.location.href = url + "/profile.html";
});
const products = document.getElementById("products");
window.onload = () => {
  fetch(url + "/fetchOrder", {
    method: "GET",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.Auth == "Decline User") {
        alert(data.Msg);
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        window.location.href = url;
      }
      if (data.Auth == "Success") {
        const product = data.Data.orders;
        for (let i = 0; i < product.length; i++) {
          let pro_img = product[i].product_image;
          let pro_brand = product[i].product_brand;
          let pro_name = product[i].product_name;
          let sell_price = product[i].selling_price;
          let mrp = product[i].mrp;
          let discount = product[i].discount;
          let color = product[i].color;
          let size = product[i].size;
          let quantity = product[i].quantity;

          let div_product = document.createElement("div");
          div_product.className = "product";

          let div_image = document.createElement("img");
          div_image.src = "../../uploads/" + pro_img;
          div_product.appendChild(div_image);

          let div_desc = document.createElement("div");
          div_desc.className = "pro-desc";

          let div_brand = document.createElement("div");
          div_brand.className = "brand";
          div_brand.innerHTML = pro_brand;
          div_desc.appendChild(div_brand);

          let div_product_name = document.createElement("div");
          div_product_name.className = "product-name";
          div_product_name.innerHTML = pro_name;
          div_desc.appendChild(div_product_name);

          let div_product_price = document.createElement("div");

          let div_selling_price = document.createElement("span");
          div_selling_price.className = "selling-price";
          div_selling_price.innerHTML = "₹" + sell_price;
          div_product_price.appendChild(div_selling_price);

          let div_mrp = document.createElement("span");
          div_mrp.className = "mrp";
          div_mrp.innerHTML = "<del>₹" + mrp + "</del>";
          div_product_price.appendChild(div_mrp);

          let div_discount = document.createElement("span");
          div_discount.className = "discount";
          div_discount.innerHTML = "(" + discount + "% off)";
          div_product_price.appendChild(div_discount);

          div_desc.appendChild(div_product_price);

          if (size != "") {
            let div_size = document.createElement("div");
            div_size.innerHTML = "Size: " + size;
            div_desc.appendChild(div_size);
          }

          if (color != "") {
            let div_color = document.createElement("div");
            div_color.innerHTML = "Color: " + color;
            div_desc.appendChild(div_color);
          }

          if (quantity != "") {
            let div_quantity = document.createElement("div");
            div_quantity.innerHTML = "Quantity: " + quantity;
            div_desc.appendChild(div_quantity);
          }

          div_product.appendChild(div_desc);

          products.appendChild(div_product);
        }
      }
    });
};
