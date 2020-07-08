import React from "react";

const ProfileCard = () => {
  return (
    <>
      <div className='card rounded-md shadow-xl' key={listener.user_id}>
        <img
          src={`http://127.0.0.1:8887/userimgs/${listener.pic}`}
          alt='Person'
          className='card__image overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105'
        />
        <p className='card__name'>{listener.fullname}</p>
        <div className='grid-container'>
          <div className='grid-child-posts'>156 Clients</div>
        </div>
        <div className='mt-2'>
          {listener.rater_id === userid || !userid ? (
            <StyledRating
              name='rating'
              value={listener.avg}
              precision={0.5}
              size='large'
              readOnly
            />
          ) : (
            <StyledRating
              name='rating'
              value={listener.avg}
              precision={0.5}
              size='large'
              onChange={(event, newValue) => {
                ratelistener(listener.user_id, newValue);
              }}
            />
          )}
        </div>
        {username ? (
          <Link
            className='btn draw-border text-center'
            to={`/listeners/chat/${listener.user_id}`}>
            Chat
          </Link>
        ) : (
          <Link to='/register'>
            <button className='btn draw-border'>Please Login/SignUp</button>
          </Link>
        )}
      </div>{" "}
    </>
  );
};

export default ProfileCard;
