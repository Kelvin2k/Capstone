// Libraries need to be installed when start:
- react-router-dom (V6)
- axios
- tailwindcss
- redux-toolkit
- ant-design (V5)
- formik and yup
- font-awesome (V6)

let promise = axios({
    method: "GET" | "POST" | "DELETE"
    url: "https://shop.cyberlearn.vn/api/Product"
})

let promise2 = axios({
    method: "GET" | "POST" | "DELETE",
    url: :"https://shop.cyberlearn.vn/api/Product/getbyid?id=1"
})