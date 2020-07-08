import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../chat/index.css";
import StripeCheckout from "react-stripe-checkout";
import Axios from "axios";

const Therapist = ({ therapist, userid }) => {
  const [paid, setpaid] = useState(false);

  useEffect(() => {
    const getpaymentstate = async () => {
      const paymentstate = await Axios.get(
        `http://localhost:5000/therapist/getpaymentstate/${userid}/${therapist.t_id}`
      );
      if (paymentstate.data.length > 0) {
        return setpaid(true);
      } else {
        return setpaid(false);
      }
    };
    getpaymentstate();
  }, [userid, therapist.t_id]);

  const errors = [];

  const makePayment = async (token) => {
    try {
      const body = {
        token,
        therapist,
        userid: userid,
      };
      const dopayment = await Axios.post("http://localhost:5000/payment", body);
      if (dopayment) {
        window.location.reload();
      } else {
        return (errors.payment = "Something went Wrong please try again Later");
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <>
      <div className='card rounded-md shadow-xl' key={therapist.t_id}>
        <img
          src={
            therapist.pic
              ? `http://127.0.0.1:8887/therapists/${therapist.pic}`
              : `http://127.0.0.1:8887/default/avatar.jpg`
          }
          alt='Person'
          className='card__image overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105'
        />
        <p className='card__name'>{therapist.fullname}</p>
        <div className='mt-2'>{therapist.education}</div>
        <div className='grid-container'>
          <div className='grid-child-posts'>{therapist.count} Clients</div>
        </div>

        {userid ? (
          paid ? (
            <Link to={`/therapists/chat/${therapist.t_id}`}>
              <button className='btn draw-border'>Chat</button>
            </Link>
          ) : (
            <StripeCheckout
              stripeKey='pk_test_51GxHgdD7aYTGXIEFEIDDhGbWQ31QZG39gdR2vkUekDgg1RyYB4beeDqHBx55QYphSjPI6rKQ3AERJIE4xMs2Od9200jIL1WAXZ'
              token={makePayment}
              label='Pay with Credit Card'
              name='Start Online Therapy'
              locale='en'
              image={
                therapist.pic
                  ? `http://127.0.0.1:8887/therapists/${therapist.pic}`
                  : `http://127.0.0.1:8887/default/avatar.jpg`
              }
              amount={10000 * 100}
              currency='PKR'>
              <button className='btn draw-border'>Pay with Credit Card</button>
            </StripeCheckout>
          )
        ) : (
          <Link to='/register'>
            <button className='btn draw-border'>Please Sign In</button>
          </Link>
        )}
      </div>
      {/* <div class="col-lg-3 ">
            <div class="card hovercard">
                <div class="cardheader">

                </div>
                <div class="avatar">
                    <img alt="" src={therapist.pic ? `http://127.0.0.1:8887/therapists/${therapist.pic}`:`http://127.0.0.1:8887/default/avatar.jpg`} className='pl-5 ml-2 w-75 h-50'/>
                </div>
                <div class="info">
                    <div class="title">
                        <Link className='pl-5 ml-2' to="https://scripteden.com/">{therapist.fullname}</Link>
                    </div>
                    <div class="text-center">{therapist.email}</div>
                    <div class="text-center">{therapist.education}</div>
                    <div class="text-center">{therapist.age}</div>
                </div>
                <div class="bottom">
                
                    {userid ? paid ? <Link to={`/therapists/chat/${therapist.t_id}`}><button className='btn btn-success ml-5 mt-2 mb-2'>Chat</button></Link>
                    :<StripeCheckout
                        stripeKey="pk_test_51GxHgdD7aYTGXIEFEIDDhGbWQ31QZG39gdR2vkUekDgg1RyYB4beeDqHBx55QYphSjPI6rKQ3AERJIE4xMs2Od9200jIL1WAXZ"
                        token={makePayment}
                        label='Pay with Credit Card'
                        name="Start Online Therapy"
                        locale= 'en'
                        image={therapist.pic ? `http://127.0.0.1:8887/therapists/${therapist.pic}`:`http://127.0.0.1:8887/default/avatar.jpg`}
                        amount={10000 * 100}
                        currency='PKR'>
                        
                        <button className='btn btn-success  ml-5 mt-2 mb-2'>Pay with Credit Card</button> 
                        </StripeCheckout>
                      :
                      <Link to='/register'><button className='btn btn-info ml-5 mt-2 mb-2'>Please Sign In</button></Link>  
                    }
                </div>
            </div>

        </div> */}
    </>
  );
};

export default Therapist;
