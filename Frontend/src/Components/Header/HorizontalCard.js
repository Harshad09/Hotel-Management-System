import React from 'react';


function HorizontalCard() {
    return (
      <>
    <div className="container-fluid p-3 my-3" >
        <h1 className='text-center'>Food Items</h1>
        
      <div className="row mt-3">
        <div className="col-md-3">
          <div className="card text-center" style={{ borderColor:"steelblue", borderRadius: '30px', cursor: 'pointer' }} >
            <img
              src="https://img.freepik.com/premium-photo/whole-italian-pizza-wooden-table-with-ingredients_251318-13.jpg"
              className="card-img-top mx-auto"
              alt="Card"
              style={{ width: '250px', height: '150px', objectFit: 'cover',  }}
            />
            <div className="card-body">
              <h5 className="card-title">Laziz Pizza</h5>
              <p className="card-text">Order a delicious pizza on the go, anywhere, anytime. </p>
              <button className="btn btn-primary btn-sm">more</button>
            </div>
          </div>
        </div>

        {/* Add similar code for the other cards */}
        
        <div className="col-md-3">
          <div className="card text-center" style={{ border: 'none', borderRadius: '30px', cursor: 'pointer' }}>
            <img
              src="https://b.zmtcdn.com/data/pictures/chains/2/19726482/c6f6c62be655c0868c1818d6b01b209b.jpg"
              className="card-img-top mx-auto"
              alt="Card"
              style={{ width: '270px', height: '150px', objectFit: 'cover',  }}
            />
            <div className="card-body">
              <h5 className="card-title">Rock N Roll</h5>
              <p className="card-text">A hearty roll stuffed with perfectly served with chutney and sauce.</p>
              <button className="btn btn-primary btn-sm">more</button>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center" style={{ border: 'none', borderRadius: '30px', cursor: 'pointer' }}>
            <img
              src="https://img.freepik.com/free-photo/front-view-yummy-meat-cheeseburger-with-french-fries-dark-background-dinner-burgers-snack-fast-food-sandwich-salad-dish-toast_140725-159215.jpg"
              className="card-img-top mx-auto"
              alt="Card"
              style={{ width: '270px', height: '150px', objectFit: 'cover',  }}
            />
            <div className="card-body">
              <h5 className="card-title">Burgers & Sandwiches</h5>
              <p className="card-text">a patty of ground beef grilled and placed between two halves of a bun</p>
              <button className="btn btn-primary btn-sm">more</button>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center" style={{ border: 'none', borderRadius: '30px', cursor: 'pointer' }}>
            <img
              src="https://images.pexels.com/photos/115740/pexels-photo-115740.jpeg?cs=srgb&dl=pexels-marco-fischer-115740.jpg&fm=jpg"
              className="card-img-top mx-auto"
              alt="Card"
              style={{ width: '270px', height: '150px', objectFit: 'cover',  }}
            />
            <div className="card-body">
              <h5 className="card-title">French Fries</h5>
              <p className="card-text">chips, finger chips, fries, or French pommes frites</p>
              <button className="btn btn-primary btn-sm">more</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="container-fluid p-3 my-3 bg-info">
      <div className="row mt-3">
        <div className="col-md-3">
          <div className="card text-center" style={{ border: 'none', borderRadius: '30px', cursor: 'pointer' }}>
            <img
              src="https://t4.ftcdn.net/jpg/03/31/65/45/360_F_331654539_FaCJJWVUB3SmrIPIkmeEOnk7TYgl7xQC.jpg"
              className="card-img-top mx-auto"
              alt="Card"
              style={{ width: '250px', height: '120px', objectFit: 'cover',  }}
            />
            <div className="card-body">
              <h5 className="card-title">Paneer Masala</h5>
              <p className="card-text">Paneer Masala, a delectable Indian dish made with succulent paneer in a fragrant tomato-based gravy.</p>
              <button className="btn btn-primary btn-sm">more</button>
            </div>
          </div>
        </div>

        {/* Add similar code for the other cards */}
        
        <div className="col-md-3">
          <div className="card text-center" style={{ border: 'none', borderRadius: '30px', cursor: 'pointer' }}>
            <img
              src="https://st.depositphotos.com/1692343/5094/i/450/depositphotos_50945415-stock-photo-healthy-homemade-fried-rice.jpg"
              className="card-img-top mx-auto"
              alt="Card"
              style={{ width: '250px', height: '150px', objectFit: 'cover', }}
            />
            <div className="card-body">
              <h5 className="card-title">Fried Rice</h5>
              <p className="card-text">Fried Rice, a delicious medley of aromatic rice.</p>
              <button className="btn btn-primary btn-sm">more</button>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center" style={{ border: 'none', borderRadius: '30px', cursor: 'pointer' }}>
            <img
              src="https://img.freepik.com/premium-photo/fried-chicken-legs-with-lemon-parsley_266870-45.jpg"
              className="card-img-top mx-auto"
              alt="Card"
              style={{ width: '250px', height: '150px', objectFit: 'cover'  }}
            />
            <div className="card-body">
              <h5 className="card-title">Fried Chicken</h5>
              <p className="card-text">Chicken is crispy on the outside,bursting with mouthwatering flavors.</p>
              <button className="btn btn-primary btn-sm">more</button>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center" style={{ border: 'none', borderRadius: '30px', cursor: 'pointer' }}>
            <img
              src="https://t4.ftcdn.net/jpg/02/75/39/13/360_F_275391367_Hro3Ql1iFsCNtd86zWYuqa0Qe5cc7goE.jpg"
              className="card-img-top mx-auto"
              alt="Card"
              style={{ width: '250px', height: '120px', objectFit: 'cover',  }}
            />
            <div className="card-body">
              <h5 className="card-title">Thali</h5>
              <p className="card-text">a platter brimming with a variety of dishes that showcase the vibrant and diverse flavors of our cuisine.</p>
              <button className="btn btn-primary btn-sm">more</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default HorizontalCard;


