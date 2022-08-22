var edit_or_insert = true;

const productsList = async () => {
    let response = await fetch("../src/list_products.php");
    let data_ = await response.json();

    let ar_products = new Array(data_);
    var content_td = "";
    ar_products.forEach(el => {
        for(let d of el) {
            content_td += `
                <tr>
                    <td style="display: none;">${d.id}</td>
                    <td>${d.nombre}</td>
                    <td>${d.cantidad}</td>
                    <td>${d.precio}</td>
                    <td>${d.tipo}</td>
                    <td>
                        <button class="btnEdit">Editar</button>
                    </td>
                    <td>
                        <button class="btnDel">Eliminar</button>
                    </td>
                </tr>
            `;
        }
    })

    t_products.innerHTML = content_td;

    const btnsDel = t_products.getElementsByClassName("btnDel");
    const btnsEdit = t_products.getElementsByClassName("btnEdit");
    for(let i = 0; i < btnsDel.length; i++) {
        btnsDel[i].addEventListener("click", () => {
            deletProduct(btnsDel[i].parentElement.parentElement.getElementsByTagName("td")[0].innerHTML);
        })

        btnsEdit[i].addEventListener("click", () => {
            edit_or_insert = false;
            form_product["id_p"].value = btnsEdit[i].parentElement.parentElement.getElementsByTagName("td")[0].innerHTML;
            form_product["producto"].value = btnsEdit[i].parentElement.parentElement.getElementsByTagName("td")[1].innerHTML;
            form_product["cantidad"].value = btnsEdit[i].parentElement.parentElement.getElementsByTagName("td")[2].innerHTML;
            form_product["precio"].value = btnsEdit[i].parentElement.parentElement.getElementsByTagName("td")[3].innerHTML;
        });
    }
}
window.addEventListener("DOMContentLoaded", () => {
    productsList();
})

let t_products = document.getElementById("t_products");
const form_product = document.querySelector(".form-product");


const sendNewProduct = () => {
    var answers = new FormData();
    answers.append("producto", form_product["producto"].value);
    answers.append("cantidad", form_product["cantidad"].value);
    answers.append("precio", form_product["precio"].value);
    answers.append("sl_tipo_c", form_product["sl_tipo_c"].value);
    
    console.log(answers);
    fetch(`../src/add_product.php`, {
        method: 'POST',
        body: answers
    })
    .then(res => {
        return res.text();
    })
    .then(res => {
        alert(res);
        productsList();
        form_product.reset();
    })
    .catch(err => {
        console.log(err);
    })
}

const deletProduct = (idProd) => {
    var prod_id = new FormData();
    prod_id.append("idProd", idProd);
    fetch("../src/delete_product.php", {
        method: 'POST',
        body: prod_id
    })
    .then(res => {
        return res.text();
    })
    .then((data) => {
        alert(data);
        alert("Producto eliminado");
        productsList();
    })
}

const editProduct = (id, name_p, quantity, price) => {
    var form_values = new FormData();
    form_values.append("id", id);
    form_values.append("nombre", name_p);
    form_values.append("cantidad", quantity);
    form_values.append("precio", price);
    fetch("../src/edit_product.php", {
        method: 'POST',
        body: form_values
    })
    .then(res => {
        return res.text();
    })
    .then((data) => {
        alert(data);
        form_product.reset();
        productsList();
    })
}

function validForm () {
    return form_product["producto"].value && form_product["cantidad"].value && form_product["precio"].value && form_product["sl_tipo_c"].value;
}

form_product.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(edit_or_insert);
    
    if(edit_or_insert) {
        if(validForm()) {
            sendNewProduct();
        } else {
            alert("Faltan campos por llenar");
        }
    } else {
        editProduct(form_product["id_p"].value, form_product["producto"].value, form_product["cantidad"].value, form_product["precio"].value);
        edit_or_insert = true;
    }
})