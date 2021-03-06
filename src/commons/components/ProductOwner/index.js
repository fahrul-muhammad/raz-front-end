import styles from "src/commons/styles/cardProduct.module.css"
import Image from "next/image"
import chair from "src/assets/img/chair-home.png"
// import { myProductAction } from "src/redux/actions/product"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import defaultProduct from "src/assets/img/default-product.jpg"
import { getMyProduct, deleteMyProduct } from "src/commons/module/product"
import basket from "src/assets/img/basket.png"

import formatRupiah from "src/commons/module/helper/formatRupiah"
import Swal from "sweetalert2"


function CardProductOwner() {
  const state = useSelector(state => state)
  const [myProductArr, setMyProductArr] = useState([])
  const { token } = state.auth
  const { store_name } = state.auth.userData

  useEffect(() => {
    getMyProduct(token)
      .then((res) => {
        setMyProductArr([...res.data.data])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [token])

  console.log(myProductArr)

  return (
    <>
      {store_name !== null ?
        (
          <>
            {myProductArr.length !== 0 ? (
              <>
                <div className="container" style={{ marginTop: '33px', marginBottom: '33px', }}>
                  {Array.isArray(myProductArr) && myProductArr.length > 0 &&
                    myProductArr.map((data, idx) => (
                      <section className={`${styles["main-section"]} row`} key={idx}>
                        <div className={`${styles["image-card"]} col-md-2`}>
                          <Image src={!data.image[0] ? defaultProduct : !data.image[0].image ? defaultProduct : data.image[0].image}
                            height={172}
                            width={170}
                            placeholder='blur'
                            blurDataURL={defaultProduct}
                            onError={() => {
                              defaultProduct
                            }}
                            alt='avatar' />
                        </div>
                        <div className={`${styles["product-name"]} col-md-3`}>{data.name !== '' ? data.name : 'No Name Product'}</div>
                        <div className={`${styles["stock-count"]} col-md-2`}>{data.stock !== null ? data.stock : 'Empty Stock'}</div>
                        <div className={`${styles["product-price"]} col-md-2`}>{data.price !== null ? formatRupiah(`Rp. ${data.price}`) : 'No Price'}</div>
                        <div className={`${styles["button-delete"]} col-md-3 btn`}
                          onClick={() => {
                            Swal.fire({
                              title: 'Are you sure delete this product?',
                              text: "You won't be able to revert product this!",
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#d94141',
                              cancelButtonColor: '#808080',
                              confirmButtonText: 'Yes, delete it!'
                            }).then((result) => {
                              if (result.isConfirmed) {
                                Swal.fire(
                                  'Deleted!',
                                  'Your Product has been deleted.',
                                  'success'
                                )
                                deleteMyProduct(data.id, token)
                                  .then((res) => {
                                    console.log(res)
                                    getMyProduct(token)
                                      .then((res) => {
                                        setMyProductArr([...res.data.data])
                                      }).catch((err) => console.log(err))

                                  }).catch((err) => console.log(err))
                              }
                            })
                          }}
                        >Delete</div>
                      </section>
                    ))
                  }
                </div>
              </>
            ) : (
              <>
                <div className="container">
                  <div style={{ textAlign: 'center', margin: '10%' }}>
                    <Image src={basket} alt='avatar' width={100} height={100} />
                    <p>your Store is still empty</p>
                  </div>
                </div>
              </>
            )}
          </>
        ) :
        (
          <>
            <div className="container">
              <div style={{ textAlign: 'center', margin: '10%' }}>
                <Image src={basket} alt='avatar' width={100} height={100} />
                <p>You dont have a store yet</p>
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

export default CardProductOwner